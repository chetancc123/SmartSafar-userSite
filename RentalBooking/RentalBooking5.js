import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import RentalBooking3 from './RentalBooking3';
import { url } from '../component/config';

const RentalBooking5 = ({ navigation, route }) => {
    const [couponCode, setCouponCode] = useState('');
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [rentalBookingId, setRentalBookingId] = useState();
    // const[bookedData, setBookedData]=useState();

    const updateCouponStatus = (status) => {
        setCouponApplied(status);
    };


    const applyCoupon = async (promoCode) => {
        console.log(rentalBookingId)
        console.log(promoCode)
        try {
            const formData = new FormData();
            formData.append('promoCode', promoCode,);

            const response = await fetch(`http://${url}:8080/user/rentalApplyPromocode/${rentalBookingId}`, {
                method: 'POST',
                // headers:{
                //     'Content-Type': 'application/json'
                // },
                body: formData
            });
            const result = await response.json();
            if (response.ok) {
                console.log(result);
                await AsyncStorage.setItem('appliedCoupon', JSON.stringify(result));
                await AsyncStorage.setItem('PayableAmmount', JSON.stringify(result.totalAmount));
                // console.log(result.totalAmount)
                route.params.updateCouponStatus(true);
                navigation.navigate('RentalBooking3', { totalAmount: result.totalAmount });
            } else {
                console.log('Error:', response);
            }
        } catch (error) {
            console.error('Error applying coupon:', error);
        }
    };

    const GetData = async () => {
        try {
            const response = await fetch(`http://${url}:8080/user/getPromoCodeList`);
            if (response.ok) {
                const result = await response.json();
                setData(result);
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    const GetBookingId = async () => {
        try {
            const BookingData = await AsyncStorage.getItem('ResponseFromTheServerWhileBooking');
            if (BookingData) {
                setRentalBookingId(JSON.parse(BookingData));
                // console.log(BookingData)
            } else {
                console.log('No data found in AsyncStorage for "ResponseFromTheServerWhileBooking"');
            }
        } catch (error) {
            console.error('Error retrieving booking data:', error);
        }
    }




    useEffect(() => {
        GetData();
        GetBookingId();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {/* Background Gradient */}
            <LinearGradient colors={["#A7F57A", "#BDE6D9"]} style={styles.background}>

                {/* Top Section */}
                <View style={styles.topSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Entypo name="chevron-left" size={wp('6%')} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.applyCouponText}>Apply Coupon</Text>
                </View>

                {/* Coupon Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Coupon Code"
                        value={couponCode}
                        onChangeText={setCouponCode}
                    />
                    <TouchableOpacity style={styles.applyButton}>
                        <Text style={styles.applyButtonText}>Apply</Text>
                    </TouchableOpacity>
                </View>

                <View >
                    <Text style={styles.text1}>For Drive (Executive) </Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="red" style={styles.loadingIndicator} />
                ) : (
                    <View>
                        {data.map(item => (
                            <View key={item.id} style={styles.detailsContainer}>
                                <View style={styles.couponRow}>
                                    <Text style={styles.couponLabel}>{item.code}</Text>
                                    <TouchableOpacity style={styles.applyButton}
                                        onPress={() => applyCoupon(item.code, navigation)}
                                    >
                                        <Text style={styles.applyButtonText}>Apply</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.detailsText}>{item.codeDescription}</Text>
                                <Text style={styles.detailsText}>{`Get ${item.discountPercentage * 100}% off on all rides.`}</Text>
                            </View>
                        ))}
                    </View>
                )}



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
        flexDirection: 'row',
        alignItems: 'center',
        height: hp('7%'),
        backgroundColor: 'white',

    },
    applyCouponText: {
        marginLeft: wp('2%'),
        fontSize: wp('4%'),
        fontWeight: 'bold',
        justifyContent: "center",
        fontSize: 18,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: wp('1%'),
        marginTop: hp('3%'),
        width: wp("90%"),
        alignSelf: "center",

    },
    text1: {
        fontSize: wp('5%'),
        fontWeight: "bold",
        marginLeft: wp("5%"),
        marginTop: hp("3%"),
    },
    input: {
        flex: 1,
        height: hp('6%'),
        paddingHorizontal: wp('2%'),
        borderRadius: wp('1%'),
        marginRight: wp('2%'),
    },
    applyButton: {
        backgroundColor: 'red',
        borderRadius: wp('1%'),
        height: hp("6%"),
        width: wp("15%"),
        justifyContent: 'center',
        alignSelf: "center",
    },
    applyButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: wp('3.5%'),
        textAlign: "center",


    },
    detailsContainer: {
        backgroundColor: 'white',
        padding: wp('4%'),
        borderRadius: wp('2%'),
        marginTop: hp('2%'),
        width: wp("90%"),
        alignSelf: "center",
    },
    couponRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('1%'),
    },
    couponLabel: {
        fontWeight: 'bold',
    },
    couponApplyButton: {
        backgroundColor: 'red',
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('1%'),
        borderRadius: wp('1.5%'),
    },
    couponApplyButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: wp('4%'),
    },
    detailsText: {
        fontSize: wp('3.5%'),
        fontWeight: "bold",
        marginBottom: hp('1%'),
    },
    loadingIndicator: {
        marginTop: hp('10%'),
    },
});

export default RentalBooking5;