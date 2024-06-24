import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, TouchableOpacity, Text, Alert, Modal, TextInput } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from "react-native-responsive-screen";
import ModalDropdown from 'react-native-modal-dropdown';
import { MaterialIcons, FontAwesome, Entypo, AntDesign, Fontisto, } from "@expo/vector-icons";
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import {url} from './config';

import Menu from "./Menu";
// import { Picker } from "@react-native-picker/picker";
// import RNPickerSelect from 'react-native-picker-select';
const BookInitialize = ({ navigation }) => {

    const [showNoteInput, setShowNoteInput] = useState(false);
    const [noteText, setNoteText] = useState('');

    const toggleNoteInput = () => {
        setShowNoteInput(!showNoteInput);
    };

    const saveNote = () => {
        console.log("Note saved:", noteText);
        setShowNoteInput(false);
        // PaymentApi(noteText);
        // setNoteText('');

    };

    const cancelNote = () => {
        setShowNoteInput(false);
        setNoteText(''); // Clear the note text
    };

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [data, setData] = useState("");
    const [paymentId, setPaymentId] = ("");
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const couponOptions = ["Coupon Option 1", "Coupon Option 2", "Coupon Option 3"];
    const paymentOptions = ["GPay", "PhonePay", "Cards"];
    const [PromoCodeList, setPromoCodeList] = useState();
    const [dropdownKey, setDropdownKey] = useState(0);
    const [selectedCouponText, setSelectedCouponText] = useState('');
    // const amount = "23.04";
    const [amount, setAmount] = useState("");

    // const renderDropdownButton = (value, onPress) => (
    //     <TouchableOpacity onPress={onPress} style={styles.dropdownButton}>
    //         <Text style={styles.dropdownButtonText}>{value || "Select an option..."}</Text>
    //     </TouchableOpacity>
    // );

    const placeholder = {
        label: "Select an option...",
        value: null,
    };

    // const options = [
    //     { label: "Option 1", value: "Raja" },
    //     { label: "Option 2", value: "Baja" },
    //     { label: "Option 3", value: "Saja" },
    // ];

    const options2 = [
        { label: "Option 1", value: "GPay" },
        { label: "Option 2", value: "PhonePay" },
        { label: "Option 3", value: "Cards" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedId = await AsyncStorage.getItem('BookingId');
                const storedname = await AsyncStorage.getItem('name');
                console.log('Stored id:', storedId);
                setName(storedname || '');
                setId(storedId || '');
                GetData(storedId);
            } catch (error) {
                console.error('Error retrieving data from AsyncStorage:', error);
            }
        };
        GetPromoCodeList();
        fetchData();
    }, []);

    const GetPromoCodeList = async () => {
        try {
            const response = await fetch(`http://${url}:8080/user/getPromoCodeList`);
            if (response.ok) {
                const result = await response.json();
                console.log(result)
                setPromoCodeList(result);
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        // finally {
        //     setLoading(false);
        // }
    }

    const applyPromoCode = async(selectedPromoCode) => {
        try {
            const formData = new FormData();
            formData.append('promoCode', selectedPromoCode,);

            const response = await fetch(`http://${url}:8080/user/apply-promo-code/${id}`, {
                method: 'PUT',
                body: formData
            });
            const result = await response.json();
            if (response.ok) {
                console.log(result);
                await AsyncStorage.setItem('appliedCoupon', JSON.stringify(result));
                await AsyncStorage.setItem('PayableAmmount', JSON.stringify(result.totalAmount));
                // console.log(result.totalAmount)
                // route.params.updateCouponStatus(true);
                // navigation.navigate('RentalBooking3', { totalAmount: result.totalAmount });
            } else {
                console.log('Error:', response);
            }
        } catch (error) {
            console.error('Error applying coupon:', error);
        }
        setSelectedCoupon(selectedPromoCode);
        // Increment the dropdown key to force a re-render of the dropdown
        setDropdownKey((prevKey) => prevKey + 1);
    };

    // useEffect(() => {
    //     GetData();
    // }, []);

    const GetData = async (storedId) => {
        // console.log(storedId);
        const response = await fetch(`http://${url}:8080/user/bookings/${storedId}`)
        if (response.ok) {
            const deta = await response.json();
            setData(deta);
            setAmount(deta.amount);
            // console.log(data.amount);
        } else {
            console.log('error');
        }
    }

    const PaymentApi = async () => {
        try {
            console.log("Booking id : " + id)
            const response = await fetch(`http://${url}:8080/user/create-payment-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookingId: id,
                    note: noteText
                })
            });

            // Check if the response is successful
            // if (!response.ok) {
            //     throw new Error(`HTTP error! Status: ${response.status}`);
            // }

            // Parse the JSON response
            const result = await response.json();
            console.log('PaymentApi result:', result);
            // console.log(result.paymentActivity.orderStatus)

            // Handle the response
            if (result.paymentActivity.orderStatus === "created") {
                if (result.paymentActivity.orderId) {
                    openRazorpay(result.paymentActivity.orderId);
                } else {
                    console.log('Error', 'Order ID not found in response');
                }
            } else {
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle different types of errors
            if (error.response && error.response.status === 400) {
                const errorMessage = await error.response.text();
                console.error('Server Error Message:', errorMessage);
            } else {
                console.error('Network Error:', error);
            }
        }
    };



    const openRazorpay = (orderId) => {
        console.log(data.amount * 100)
        console.log('orderId:', orderId); // Log the orderId parameter
        const options = {
            description: 'Payment Description',
            currency: 'INR',
            key: 'rzp_test_7uOZSUAOJBrYul',
            amount: data.amount * 100,
            order_id: orderId,
            name: 'Your App Name',
            theme: { color: '#742886' },
        };

        console.log('Razorpay Options:', options);

        const onSuccess = async (data) => {
            // console.log('payment_id: +++ ', orderId);
            console.log('Payment ID:', data.razorpay_payment_id);
            try {
                const response1 = await fetch(`http://${url}:8080/user/payment_update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderId: orderId, // Assuming payment_id is the orderId
                        status: 'paid',
                    })
                });
                if (response1.ok) {
                    navigation.navigate('Ridebooked');
                    console.log('Payment details update result:');
                } else {
                    console.log("error")
                }
                // Handle success response if needed
            } catch (error) {
                console.error('Error updating payment details:', error);
                // Handle error if needed
            }
            // console.log('payment_id: ', orderId);
            // Handle success
        };

        const onCancel = () => {
            console.log('Payment Cancelled');
            // Handle cancellation
        };

        const onError = (error) => {
            console.error('Error in payment: ', error);
            // Handle error
        };

        RazorpayCheckout.open(options)
            .then(onSuccess)
            .catch(onError)
        // .then(onCancel);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Background Gradient */}
            <LinearGradient
                colors={['#4CE5B1', '#63ABF900']}
                style={styles.background}
            >
                {/* Top Section */}
                <Menu/>

                {/* Middle Section */}
                <View style={styles.middlesection}>
                    <Text style={styles.middleText}>Total Fees RS {data.amount}</Text>
                    <Text style={styles.middleText1}>Distance:{data.totalDistance}</Text>
                    <View style={styles.box}>
                        <Entypo
                            style={styles.icon}
                            name="location-pin"
                            size={28}
                            color="black"
                        />
                        <Text style={styles.text}>{data.pickupLocation}</Text>
                    </View>
                    <View style={styles.box}>
                        <Entypo
                            style={styles.icon}
                            name="location-pin"
                            size={28}
                            color="black"
                        />
                        <Text style={styles.text}>{data.dropOffLocation}</Text>
                    </View>

                    <View style={styles.box}>
                        <AntDesign name="clockcircle" size={24} color="black" />
                        <Text style={styles.text}>{data.startTimeDuration}</Text>
                    </View>

                    <TouchableOpacity style={styles.box} onPress={toggleNoteInput}>
                        <FontAwesome name="sticky-note" size={24} color="black" />
                        <Text style={styles.text}>Note</Text>
                    </TouchableOpacity>

                    <Modal
                        visible={showNoteInput}
                        transparent
                        animationType="slide"
                        onRequestClose={() => setShowNoteInput(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.noteModal}>
                                <TouchableOpacity style={styles.cancelButton} onPress={cancelNote}>
                                    <FontAwesome name="times" size={20} color="black" />
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.noteInput}
                                    multiline
                                    placeholder="Write your note here..."
                                    value={noteText}
                                    onChangeText={(text) => setNoteText(text)}
                                />
                                <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
                                    <Text style={styles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* <View style={styles.options}> */}
                    <View style={styles.box}>
                        <MaterialIcons name="discount" size={24} color="black" />
                        <Text style={styles.text}>Coupon</Text>
                        <ModalDropdown
        options={PromoCodeList ? PromoCodeList.map(item => item.code) : []}
        onSelect={(index, value) => applyPromoCode(value)}
        renderButtonText={() => selectedCouponText || "Please select"} // Display selected value or "Please select"
    />
                    </View>

                    <View style={styles.box}>
                        <FontAwesome name="money" size={24} color="black" />
                        <Text style={styles.text}>Payment</Text>
                        <ModalDropdown
                            options={paymentOptions}
                            onSelect={(index, value) => setSelectedPayment(value)}
                            renderButton={() => renderDropdownButton(selectedPayment, () => { })}
                        />
                    </View>
                    <TouchableOpacity style={styles.button}
                        onPress={PaymentApi}>
                        <Text style={styles.buttonText}>Pay Now</Text>
                    </TouchableOpacity>
                </View>


               
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    topSection: {
        borderBottomLeftRadius: wp("10%"),
        borderBottomRightRadius: wp("10%"),
    },
    gradient: {
        borderBottomLeftRadius: wp("10%"),
        borderBottomRightRadius: wp("10%"),
        height: hp("25%"),
    },
    iconrow: {
        flexDirection: "row",
        marginTop: hp("5%"),
    },
    logo: {
        marginLeft: wp("4%"),
    },
    rido: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "center",
    },
    tag: {
        color: "white",
        fontSize: 12,
    },
    iconContainer2: {
        padding: wp("2%"),
        marginLeft: wp("50%"),
        flexDirection: "row",
        right: wp("5%"),
    },
    bellicon: {
        paddingHorizontal: wp("3%"),
    },
    cogicon: {
        paddingHorizontal: wp("3%"),
    },
    greet: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("1%"),
    },
    text1: {
        color: "white",
        fontSize: wp("5%"),
        fontWeight: "bold",
    },
    text2: {
        color: "white",
        fontSize: wp("6%"),
        fontWeight: "bold",
    },
    middlesection: {
        alignItems: "center",
        marginTop: hp("10%"),
        width: wp("95%"),
        height: hp("65%"),
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 10,
    },
    middleText: {
        fontSize: wp("6%"),
        fontWeight: "bold",
        marginTop: hp("2%"),
        textAlign: "center",
    },
    middleText1: {
        fontSize: wp("5%"),
        marginTop: hp("2%"),
        textAlign: "center",
    },

    options: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    box: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#13C39C",
        width: "90%",
        padding: hp("1%"),
        marginVertical: hp("1%"),
        borderRadius: 5,
        justifyContent: "space-evenly",
    },
    icon: {
        marginRight: wp("2%"),
    },
    text: {
        fontSize: 18,
    },
    box1: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#742886",
        width: "43%",
        padding: hp("2%"),
        marginVertical: hp("2%"),
        borderRadius: 5,
        justifyContent: "space-evenly",
    },
    button: {
        width: wp("80%"),
        backgroundColor: "#13C39C",
        paddingVertical: hp("2%"),
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    noteContainer: {
        alignItems: 'center',
        marginTop: hp("2%"),
        width: '90%',

    },
    noteInput: {
        width: wp("90%"),
        height: hp("10%"),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
    },
    noteModal: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    noteInput: {
        height: 150,
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 20,
    },
     
     
     
});

export default BookInitialize;