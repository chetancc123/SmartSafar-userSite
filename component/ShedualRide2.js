import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ImageBackground, FlatList, Dimensions, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, Foundation } from "@expo/vector-icons";
import BackGround from '../Styles/BackGround';

const ShedualRide2 = (props) => {


    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [selectedPayment, setSelectedPayment] = useState(null);

    const handlePaymentSelection = (paymentOption) => {
        setSelectedPayment(paymentOption);
        console.log('Selected Payment Option:', paymentOption);
    };

    const swapText = () => {
        // Swap the values of text1 and text2
        const temp = text1;
        setText1(text2);
        setText2(temp);
    };

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={{ flex: 1, }}>
                <LinearGradient
                    colors={['#63ABF9', '#63ABF900']}
                    style={BackGround.background} >
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7, }}>
                            <TouchableOpacity style={{ flexDirection: 'row', }}
                                onPress={() => props.navigation.navigate('ShedualRide1')}>
                                <View style={{ height: 24, width: 24, }}>
                                    <Image
                                        source={require('../img/arrowLeft.png')}
                                        style={{ marginLeft: 1, }}
                                    />
                                </View>
                                <Text style={{ marginLeft: 0.5, fontSize: 16, fontWeight: '700', }} >Back</Text>
                            </TouchableOpacity>
                            <View style={{ marginLeft: 40, }}>
                                <Text style={{ fontSize: 18, fontWeight: '700', }}>Request For Rent</Text>
                            </View>
                            <View style={{ marginLeft: 50, }}>
                                <Text style={{ color: 'white', fontSize: 24, fontWeight: '700', }}>Rido</Text>
                                <Text style={{ color: 'white', fontSize: 6, fontWeight: '700', }}>Safety Sharing Ride</Text>
                            </View>

                        </View>
                        <View style={{ marginLeft: -70 }}>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Image
                                    source={require('../img/RedLocation.png')}
                                    style={{ height: 27, width: 22, position: 'absolute', marginTop: 5 }}
                                />
                                <View style={{ marginLeft: 40 }}>
                                    <Text style={{ color: '#5A5A5A', fontSize: 17, fontWeight: '700', textAlign: 'left', }}>Current Location</Text>
                                    <Text style={{ color: 'black', fontSize: 12, }}>Telibandha Square, Raipur</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Image
                                    source={require('../img/YellowLocation.png')}
                                    style={{ height: 28, width: 30, position: 'absolute', marginTop: 4 }}
                                />
                                <View style={{ marginLeft: wp('12%') }}>
                                    <Text style={{ color: '#5A5A5A', fontSize: 17, fontWeight: '700', textAlign: 'left', }}>Office</Text>
                                    <Text style={{ color: 'black', fontSize: 12 }}>Magneto Mall, Labhandih, Raipur</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.container1}>
                            <LinearGradient
                                colors={["#742886", "#402775"]}
                                style={styles.container1} >
                                <Text style={{ fontSize: 18, color: "white", fontWeight: "bold", marginBottom: 10, }}>Mini Cab</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", }}>
                                    <Foundation name="star" size={24} color="green" />

                                    <Text style={{ color: "yellow", fontSize: 18, fontWeight: "bold", marginRight: 5, marginLeft: 7 }}>4.1</Text>

                                    <Text style={{ color: "yellow", fontSize: 16, }}>(531 reviews)</Text>
                                    <View>
                                        <Image
                                            source={require("../img/MiniCab.png")} // Replace with the actual path to your image
                                            style={{ width: 90, height: 53, marginLeft: 80, marginTop: -30, }}
                                        />
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                        <View style={{ marginLeft: -40, marginTop: 7 }} >

                            <Text style={{ fontSize: 13, fontWeight: "700", textAlign: 'left' }}>Charge</Text>

                            <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                                <Text style={{ fontSize: 10, textAlign: 'left' }}>Fare & Charges</Text>
                                <Text style={{ fontSize: 10, textAlign: 'left', marginLeft: wp('50%') }}>280 rs</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                                <Text style={{ fontSize: 10, textAlign: 'left' }}>Promo Code</Text>
                                <Text style={{ fontSize: 10, textAlign: 'left', marginLeft: wp('53%') }}>-40 rs</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                                <Text style={{ fontSize: 10, textAlign: 'left' }}>Final Fare</Text>
                                <Text style={{ fontSize: 10, textAlign: 'left', marginLeft: wp('56%') }}>250 rs</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 15 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center', color: '#5A5A5A' }}>
                                Select Payment Method
                            </Text>
                        </View>

                        <View style={{ marginBottom: -30, marginTop: 15, marginLeft: -50, marginRight: -50, }}>
                            <TouchableOpacity onPress={() => handlePaymentSelection('My Rido Wallet')}>
                                <View style={[styles.paylist, selectedPayment === 'My Rido Wallet' && { borderColor: 'green' }]}>
                                    <Image style={styles.walletimg} source={require('../img/Payment.png')} />
                                    <View style={{ left: 10 }}>
                                        <Text>My Rido Wallet </Text>
                                        <Text style={{ color: 'grey' }}>349 .00 </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handlePaymentSelection('Phone Pay')}>
                                <View style={[styles.paylist, selectedPayment === 'Phone Pay' && { borderColor: 'green' }]}>
                                    <Image style={styles.phonepayimg} source={require('../img/phoneppay.png')} />
                                    <View style={{ left: 10 }}>
                                        <Text>Phone Pay</Text>
                                        <Text style={{ color: 'grey' }}>15% Off</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handlePaymentSelection('Google Pay')}>
                                <View style={[styles.paylist, selectedPayment === 'Google Pay' && { borderColor: 'green' }]}>
                                    <Image style={styles.phonepayimg} source={require('../img/Googlepay.png')} />
                                    <View style={{ left: 10 }}>
                                        <Text>Google Pay </Text>
                                        <Text style={{ color: 'grey' }}>10% Off</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handlePaymentSelection('Visa')}>
                                <View style={[styles.paylist, selectedPayment === 'Visa' && { borderColor: 'green' }]}>
                                    <Image style={styles.visaimg} source={require('../img/Paymentvisa.png')} />
                                    <View style={{ left: 10 }}>
                                        <Text>**** **** **** 8970</Text>
                                        <Text style={{ color: 'grey' }}>Expires: 12/26</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handlePaymentSelection('Other UPI/Card/Wallet')}>
                                <View style={[styles.paylist, selectedPayment === 'Other UPI/Card/Wallet' && { borderColor: 'green' }]}>
                                    <Image style={styles.phonepayimg} source={require('../img/indiarupiee.png')} />
                                    <View style={{ left: 10 }}>
                                        <Text>Add money via other UPI/Card/Wallet </Text>
                                        <Text style={{ color: 'grey' }}>More Options</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: 350, height: 55, justifyContent: 'flex-end', alignItems: 'center', marginTop: 1 }}>
                        <TouchableOpacity>
                            <View style={{ width: 350, height: 55, backgroundColor: '#8E288E', borderRadius: 10, shadowColor: '#D3E5FF', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                <Text style={{ color: "yellow", fontSize: 25, textAlign: 'center' }}>Confirm Booking</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
};
export default ShedualRide2;

const styles = StyleSheet.create({

    paylist: {
        flexDirection: 'row',
        backgroundColor: '#FFFBE7',
        borderColor: 'yellow',
        borderWidth: 2,
        borderRadius: 5,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 8,
        paddingTop: 8,
    },
    amount: {
        left: 150,
        fontSize: 22,
        color: 'red'
    },
    phonepayimg: {
        height: 40,
        width: 40,
        borderRadius: 50
    },
    visaimg: {
        height: 40,
        width: 40,
    },
    button1: {
        left: 40,
        top: 1,
        width: 103,
        backgroundColor: "red",
        borderRadius: 7,
        elevation: 5,
        height: 35
    },
    container1: {
        paddingVertical: '2%',
        paddingHorizontal: '3%',
        borderRadius: 5,
        marginTop: 8,
    }
});