import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import Menu from "../component/Menu";
import { url } from '../component/config';

const RentalBooking3 = ({ navigation, route }) => {

    const [DateTime, setDateTime] = useState();
    const [PickupLocation, setPickUpLocation] = useState();
    const [carTime, setcarTime] = useState();
    const [carDist, setcarDist] = useState();
    const [carType, setcarType] = useState();
    const [SelectedVehicleId, setvehicleId] = useState();
    const [id, setId] = useState("");
    const [BookedData, setBookedData] = useState(null);
    const [couponApplied, setCouponApplied] = useState(false);
    const [PayableAmount, setPayableAmount] = useState(null);
    // const route = useRoute(); // Add this line

    const updateCouponStatus = (status) => {
        setCouponApplied(status);
    };

    const fetchData = async () => {
        // console.log(id)
        try {
            const storedDateTime = await AsyncStorage.getItem('DateTime');
            const storedPickUpLocation = await AsyncStorage.getItem('PickUpLocation');
            const storedcarTime = await AsyncStorage.getItem('selectedCircleText');
            const storedcarDist = await AsyncStorage.getItem('selectedCircleSubtext');
            const storedcarType = await AsyncStorage.getItem('carType');
            const storedselectedCar = await AsyncStorage.getItem('selectedCar');
            const storedId = await AsyncStorage.getItem('id');
            const storedAppliedCoupon = await AsyncStorage.getItem('appliedCoupon');
            if (storedAppliedCoupon) {
                setBookedData(JSON.parse(storedAppliedCoupon));
                setCouponApplied(false);
            }

            setDateTime(storedDateTime || '');
            setPickUpLocation(storedPickUpLocation || '');
            setcarTime(storedcarTime || '');
            setcarDist(storedcarDist || '');
            setcarType(storedcarType || '');
            setId(storedId || '');
            if (storedselectedCar !== null) {
                const parsedCar = JSON.parse(storedselectedCar);
                setvehicleId(parsedCar);

                const Data = {
                    travelLocation: {
                        pickupAddress: setPickUpLocation,
                        userPickupLatitude: 123.456,
                        userPickupLongitude: 456.789
                    },
                    hours: carTime,
                    distance: carDist,
                    vehicle: {
                        vehicleId: parsedCar.vehicleId
                    },
                    driver: {
                        driverId: parsedCar.driverId
                    },
                    timeDuration: {
                        startDateTime: DateTime
                    }
                };
                return Data;
            }
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
            throw error;
        }
    };

    const applyCoupon = async () => {
        try {
            setCouponApplied(true);
        } catch (error) {
            console.error('Error applying coupon:', error);
        }
    };

    const [applied, setapplied] = useState();
    const Remove = async () => {
        try {
            const bookingData = await AsyncStorage.getItem('appliedCoupon');
            console.log('bookingData:', bookingData); // Log the value of bookingData
            if (bookingData) {
                const parsedBookingData = JSON.parse(bookingData);
                setapplied(parsedBookingData);
            } else {
                console.log('No data found in AsyncStorage for "appliedCoupon"');
            }
        } catch (error) {
            console.error('Error retrieving applied coupon data:', error);
        }
    };

    // Use useEffect to handle side effects after setting the applied state
    useEffect(() => {
        if (applied) {
            console.log('applied:', applied); // Log the value of applied
            // Call removeCoupon only if applied is not null or undefined
            if (applied) {
                removeCoupon();
            } else {
                console.log('Applied data is null or undefined.');
            }
        }
    }, [applied]);


    const removeCoupon = async () => {
        console.log(BookedData.rentalBookingId)
        try {
            console.log('applied:', applied); // Log applied variable
            if (applied) {

                const response = await fetch(`http://${url}:8080/user/rentalRemovePromocode/${BookedData.rentalBookingId}`, {
                    method: 'POST',
                });

                if (response.ok) {
                    const result = await response.json();
                    setBookedData(result);
                    console.log(result);
                    setCouponApplied(false);
                    await AsyncStorage.removeItem('PayableAmmount');
                } else {
                    console.log('Error removing coupon:', response.status);
                }
            } else {
                console.log('applied or rentalBookingId is null or undefined.');
            }
        } catch (error) {
            console.error('Error removing coupon:', error);
        }
    };

    useEffect(() => {
        const fetchDataAndSendData = async () => {
            try {
                const data = await fetchData();
                if (data && id) {
                    // console.log(id);
                    SendData(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataAndSendData();

    }, [id]);

    useEffect(() => {
        const fetchPayableAmount = async () => {
            try {
                const PayableAmmount = await AsyncStorage.getItem('PayableAmount');
                if (PayableAmmount !== null) {
                    setPayableAmount(parseFloat(PayableAmmount));
                } else if (BookedData !== null) {
                    setPayableAmount(parseFloat(BookedData.totalAmount));
                }
            } catch (error) {
                console.error('Error fetching PayableAmount from AsyncStorage:', error);
            }
        };

        fetchPayableAmount();
    }, [BookedData]);

    const SendData = async (data) => {
        // console.log('h' + id);
        try {
            // const Data = await fetchData();
            const response = await fetch(`http://${url}:8080/user/rentalBooking/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                console.log(result.rentalBookingId);
                console.log(result.amount);
                await AsyncStorage.setItem('ResponseFromTheServerWhileBooking', JSON.stringify(result.rentalBookingId));
                setBookedData(result)
            } else {
                console.log('Error:', response);
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }

    useEffect(() => {
        // Check if the totalAmount parameter exists in the route
        if (route.params && route.params.totalAmount) {
            // Update the state variable BookedData with the new totalAmount
            setBookedData({ ...BookedData, totalAmount: route.params.totalAmount });
        }
    }, [route.params]);

    const PaymentApi = async () => {
        console.log(BookedData.timeDuration.startDateTime)
        try {
            const deta = {
                rentalBookingId: BookedData.rentalBookingId,

            }
            const response = await fetch(`http://${url}:8080/user/createPaymentOrderForRentalBooking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deta)
            });

            // Log the response body before parsing it as JSON
            const responseBody = await response.text();
            console.log('Response Body:', responseBody);

            // Parse the JSON response
            const result = JSON.parse(responseBody);
            console.log('PaymentApi result:', result);

            // Handle the response
            if (result.orderStatus === "created") {
                if (result.orderId) {
                    openRazorpay(result.orderId);
                } else {
                    console.log('Error', 'Order ID not found in response');
                }
            } else {
                // Handle other cases
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
        console.log(BookedData.totalAmount * 100)
        console.log('orderId:', orderId); // Log the orderId parameter
        const options = {
            description: 'Payment Description',
            currency: 'INR',
            key: 'rzp_test_7uOZSUAOJBrYul',
            amount: BookedData.totalAmount * 100,
            order_id: orderId,
            name: 'Your App Name',
            theme: { color: '#742886' },
        };

        console.log('Razorpay Options:', options);

        const onSuccess = async (data) => {
            // console.log('payment_id: +++ ', orderId);
            console.log('Data:', data);
            console.log('Payment ID:', data.razorpay_payment_id);
            try {
                const response1 = await fetch(`http://${url}:8080/user/payment_detail_update_rental`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderId: orderId, // Assuming payment_id is the orderId
                        status: 'paid',
                        paymentId: data.razorpay_payment_id
                    })
                });
                if (response1.ok) {
                    // navigation.navigate('Ridebooked');
                    // console.log('Payment details update result:');
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

        const onError = async (error) => {
            console.error('Error in payment: ', error);
            console.log(orderId)
            try {
                const response = await fetch(`http://${url}:8080/user/deleteRentalBooking`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderId: orderId, // Assuming payment_id is the orderId

                    })
                });
                if (response.ok) {
                    console.log('deleted done')
                    navigation.navigate('RentalBooking1');
                    // console.log('Payment details update result:');
                } else {
                    console.log("error")
                }
                // Handle success response if needed
            } catch (error) {
                console.error('Error updating payment details:', error);
                // Handle error if needed
            }
            // Handle error
        };

        RazorpayCheckout.open(options)
            .then(onSuccess)
            .catch(onError)
        // .then(onCancel);
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={["#A7F57A", "#BDE6D9"]} style={styles.background}>
                <Menu />


                <View style={styles.whiteBox}>
                    {/* <Image
                        source={require('../img/Luxury.png')}
                        style={styles.carImage}
                    /> */}
                    <View style={styles.textContainer}>
                        <Text style={styles.priceText}>
                            {carType}
                        </Text>
                        <Text style={styles.priceText}>
                            {carDist}km / {carTime}hr
                        </Text>
                    </View>
                    <View style={styles.priceContainer}>
                        {/* <Text style={styles.price}>5 min away</Text> */}
                    </View>
                </View>

                <View style={styles.offeranddiscount}>
                    <Text style={styles.selectCarText}>Offer and Discounts </Text>
                </View>

                <View style={styles.whiteBox}>
                    <TouchableOpacity style={styles.icon}>
                        <MaterialCommunityIcons
                            name="brightness-percent"
                            size={24}
                            color="red"
                        />
                    </TouchableOpacity>

                    <View style={styles.textContainer}>
                        <Text style={styles.priceText}>Apply coupon </Text>
                        {/* <Text style={styles.priceText}> 3 hr /30 km</Text> */}
                    </View>
                    <View style={styles.priceContainer}>

                        {couponApplied ? (
                            <TouchableOpacity onPress={Remove}>
                                <Text>Remove</Text>
                            </TouchableOpacity>
                        ) : (

                            <TouchableOpacity style={styles.icon}
                                onPress={() => navigation.navigate('RentalBooking5', { updateCouponStatus })}>
                                <Entypo name="arrow-long-right" size={24} color="black" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={styles.offeranddiscount}>
                    <Text style={styles.summary}>Summary</Text>
                </View>

                {BookedData ? (
                    <View style={{ ...styles.whiteBox1, height: hp("40%"), flexDirection: "row", justifyContent: "space-between", }}>
                        <View>
                            <Text style={styles.priceText}>Trip fare (incl. toll)</Text>
                            <Text style={styles.priceText}>Coupon Applied</Text>
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    width: "250%",
                                    marginTop: 5,
                                    marginBottom: 5,
                                }}
                            />
                            <Text style={styles.priceText}>Net fare</Text>
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    width: "250%",
                                    marginTop: 5,
                                    marginBottom: 5,
                                }}
                            />
                            <Text style={styles.priceText}>Amount Payable</Text>
                        </View>
                        <View>
                            <Text style={styles.price}>{BookedData.amount}</Text>
                            <Text style={styles.price}>{BookedData.totalAmount - BookedData.amount}</Text>
                            <Text style={styles.price}>{BookedData ? BookedData.totalAmount : 'Loading...'}</Text>
                            <Text style={styles.price}>{BookedData ? BookedData.totalAmount : 'Loading...'}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button}
                                onPress={PaymentApi}
                            >
                                <Text style={styles.buttonText}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <ActivityIndicator size="large" color="#0000ff" />
                )}
                <View style={styles.offeranddiscount}></View>
            </LinearGradient>
        </SafeAreaView >
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    topContent: {
        marginTop: hp("5%"),
        marginRight: wp("45%"),
    },
    text1: {
        fontSize: 40,
        color: "#FFF",
        fontWeight: "bold",
    },
    text2: {
        fontSize: 20,
        color: "#FFF",
        marginTop: 10,
    },
    scrollView: {
        alignItems: "flex-start",
        marginTop: hp("2%"),
    },
    circleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    circle: {
        width: wp("15%"),
        height: wp("15%"),
        borderRadius: wp("10%"),
        backgroundColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: wp("1%"),
    },
    circleTouch: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: hp("2%"),
    },
    selectCarTextContainer: {
        position: "absolute",
        bottom: hp("70%"),
        width: "100%",
        alignItems: "flex-start",
        marginLeft: 10,
        justifyContent: "flex-start", // Add this line
    },
    selectCarText: {
        fontSize: hp("2.5%"),
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center", // Change justifyContent to 'center'
        marginTop: hp("2%"),
        bottom: hp("5%"),
        position: "absolute",
        width: "100%", // Make sure it takes the full width
    },
    button: {
        width: wp("80%"),
        backgroundColor: "#5C6894",
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp("20px"),
    },
    selectedButton: {
        backgroundColor: "#A7F57A", // You can change the color to indicate selection
    },
    buttonText: {
        fontSize: hp("2%"),
        color: "#FFF06BFF06B",
    },
    priceContainer: {
        flex: 1,
        alignItems: "flex-end",
        marginVertical: hp("1%"), // add 10px top and bottom (20px in total)
    },
    whiteBox: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 10,
        alignItems: "flex-start", // Change alignItems to 'flex-start'
        width: wp("90%"),
        marginTop: hp("3%"),
        flexDirection: "row",
        justifyContent: "space-between",

        marginBottom: hp("2%"),
    },
    whiteBox1: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 10,
        alignItems: "flex-start",
        width: wp("90%"),
        marginTop: hp("3%"),
        flexDirection: "column",
        justifyContent: "space-between",
        marginRight: 1,
        marginBottom: hp("2%"),
    },
    button: {
        width: wp("80%"),
        backgroundColor: "#5C6894",
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp("20px"),
    },
    buttonText: {
        fontSize: hp("2%"),
        color: "#FFF06BFF06B",
    },
    priceText: {
        fontSize: hp("2%"),
        marginBottom: hp("1%"), // Add this line
    },
    price: {
        fontSize: hp("2%"),
        marginBottom: hp("1.7%"),
    },
    carImage: {
        width: wp("20%"),
        height: wp("20%"),
        resizeMode: "contain",
        marginRight: wp("5%"),
    },
    textContainer: {
        marginLeft: wp("5%"),
        marginBottom: hp("1%"),
    }, // add 10px margin bottom to the text container
    iconContainer: {
        position: "absolute",
        right: 10,
        top: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: wp("-45%"),
        marginTop: hp("2%"),
    },
    icon: {
        marginRight: 2,
    },
    menuIcon: {
        marginRight: 20,
    },
    offeranddiscount: {
        flexDirection: "row",
        marginRight: wp("40%"),
    },
    summary: {
        //   marginTop: hp("10%"),
        marginRight: wp("35%"),
        fontSize: hp("2%"),
    },
});

export default RentalBooking3;
