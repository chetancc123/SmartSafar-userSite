import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Coupan = ({ navigation }) => {
    const [coupons, setCoupons] = useState([]);
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };

                const response = await fetch("http://192.168.1.14:8080/user/getPromoCodeList", requestOptions);
                const result = await response.json(); // Assuming the API returns a JSON response
                setCoupons(result);

                // Save all coupons in AsyncStorage
                await AsyncStorage.setItem('coupons', JSON.stringify(result));
            } catch (error) {
                console.error("Error fetching coupons:", error);
            }
        };

        fetchCoupons();
    }, []);

    const applyCoupon = async (couponCode) => {
        try {
            const requestOptions = {
                method: "PUT",
                redirect: "follow"
            };

            const response = await fetch(`http://192.168.1.14:8080/user/courier/promo-code/3/${couponCode}`, requestOptions);
            const result = await response.json();

            // Store the applied coupon data including amount in AsyncStorage
            await AsyncStorage.setItem('appliedCoupon', JSON.stringify(result));
            setAppliedCoupon(result); // Update state to reflect applied coupon
            // console.log(response)

            Alert.alert('Coupon Applied', `Coupon ${couponCode} applied successfully!`);
            console.log(result);
            navigation.navigate('Transport7');
        } catch (error) {
            console.error("Error applying coupon:", error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.detailsContainer}>
            <View style={styles.couponRow}>
                <Text style={styles.couponLabel}>{item.code}</Text>
                <TouchableOpacity
                    style={styles.couponApplyButton}
                    onPress={() => applyCoupon(item.code)}
                >
                    <Text style={styles.couponApplyButtonText}>Apply</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.detailsText1}>{item.codeDescription}</Text>
            <Text style={styles.detailsText}>{item.discountPercentage}% Off</Text>
            <Text style={styles.detailsText}>Valid Till: {item.expirationDate}</Text>
        </View>
    );

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

                {/* Coupon List */}
                <FlatList
                    data={coupons}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                />
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
        justifyContent: 'center',
    },
    listContainer: {
        paddingBottom: hp('2%'),
    },
    detailsContainer: {
        backgroundColor: 'white',
        padding: wp('4%'),
        borderRadius: wp('2%'),
        marginTop: hp('2%'),
        width: wp('90%'),
        alignSelf: 'center',
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
        fontWeight: 'bold',
        marginBottom: hp('1%'),
    },
    detailsText1: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: hp('1%'),
    },
});

export default Coupan;
