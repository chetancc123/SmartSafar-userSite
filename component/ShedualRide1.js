import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ImageBackground, FlatList, Dimensions, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, Foundation } from "@expo/vector-icons";
import BackGround from '../Styles/BackGround';

const ShedualRide1 = (props) => {

    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');

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
                                onPress={() => props.navigation.navigate('Home')}>
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
                        <View style={{ marginTop: -20 }}>
                            <View style={{ flexDirection: 'row', marginTop: 40, height: 36, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                <TextInput
                                    style={{ borderRadius: 10, width: 320, height: 50, borderWidth: 1.2, fontWeight: "700", padding: 8, backgroundColor: 'white', fontSize: 18, textAlign: 'center', }}
                                    onChangeText={(value) => setText1(value)}
                                    value={text1}
                                    placeholder='Current Location'
                                >
                                </TextInput>
                                <Image
                                    source={require('../img/RedLocation.png')}
                                    style={{ height: 27, width: 22, position: 'absolute', left: 35, top: 7 }}
                                />

                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 30, height: 36, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                <TextInput
                                    style={{ borderRadius: 10, width: 320, height: 50, borderWidth: 1.2, fontWeight: "700", padding: 8, backgroundColor: 'white', fontSize: 18, textAlign: 'center' }}
                                    onChangeText={(value) => setText2(value)}
                                    value={text2}
                                    placeholder='Office'
                                />
                                <Image
                                    source={require('../img/YellowLocation.png')}
                                    style={{ height: 28, width: 30, position: 'absolute', left: 33, top: 6 }}
                                />

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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginTop: 13 }} >
                            <View style={{ borderRadius: 6, borderWidth: 1, padding: 7, marginRight: 30 }}>
                                <Text style={{ fontSize: 8, fontWeight: "700", textAlign: 'center' }}>Enter Traveling Date</Text>
                            </View>
                            <View style={{ borderRadius: 6, borderWidth: 1, padding: 7, marginRight: 30 }}>
                                <Text style={{ fontSize: 8, fontWeight: "700", textAlign: 'center' }}>Choose Time</Text>
                            </View>
                            <View style={{ borderRadius: 6, borderWidth: 1, padding: 7, marginRight: 5 }}>
                                <Text style={{ fontSize: 8, fontWeight: "700", textAlign: 'center' }}>Enter Promo Code</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 15 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center', color: '#5A5A5A' }}>
                                Select Payment Method
                            </Text>
                        </View>

                        <View style={{ marginBottom: -30, marginTop: 15, marginLeft: -50, marginRight: -50, }}>
                            <TouchableOpacity >
                                <View style={styles.paylist}>
                                    <Image style={styles.walletimg} source={require('../img/Payment.png')} />
                                    <View style={{ left: 10 }}>
                                        <Text>My Rido Wallet </Text>
                                        <Text style={{ color: 'grey' }}>349 .00 </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.paylist}>
                                    <Image style={styles.phonepayimg} source={require('../img/phoneppay.png')} />
                                    <View style={{ left: 10 }}>
                                        <Text>Phone Pay</Text>
                                        <Text style={{ color: 'grey' }}>15% Off</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.paylist}>
                                    <Image style={styles.phonepayimg} source={require('../img/Googlepay.png')} />
                                    <View style={{ left: 10 }}>
                                        <Text>Google Pay </Text>
                                        <Text style={{ color: 'grey' }}>10% Off</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.paylist}>
                                    <Image style={styles.visaimg} source={require('../img/Paymentvisa.png')} />
                                    <View style={{ left: 10 }}>
                                        <Text>**** **** **** 8970</Text>
                                        <Text style={{ color: 'grey' }}>Expires: 12/26</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.paylist}>
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
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('ShedualRide2')}>
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

export default ShedualRide1;

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
        paddingHorizontal: '2%',
        borderRadius: 5,
        marginTop: 8,
    }
});
