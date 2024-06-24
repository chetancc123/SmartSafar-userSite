import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

export default function Signwithgoogle({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNo, setphonenumber] = useState("");
    const [emailOtp, setEmailOTP] = useState("");
    const [noOtp, setNoOTP] = useState("");
    const [isEmailOTPSent, setIsEmailOTPSent] = useState(false);
    const [isSMSOTPSent, setIsSMSOTPSent] = useState(false);
    const [isEmailOTPVerified, setIsEmailOTPVerified] = useState(false);
    const [isSMSOTPVerified, setIsSMSOTPVerified] = useState(false);
    const countryCode = '+91';

    const VerifyEmail = async () => {
        const response = await fetch(`http://192.168.1.14:8080/api/emailSendOtp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        });
        if (response.ok) {
            Alert.alert("OTP sent");
            setIsEmailOTPSent(true);
        } else {
            Alert.alert("Error");
        }
    }

    const VerifyNumber = async () => {
        const fullPhoneNumber = `${countryCode}${phoneNo}`;
        console.log(fullPhoneNumber)
        const response = await fetch(`http://192.168.1.14:8080/api/signUpWithPhone`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNo: fullPhoneNumber })
        });
        if (response.ok) {
            Alert.alert("OTP sent");
            setIsSMSOTPSent(true);
        } else {
            Alert.alert("Error");
        }
    }

    const VerifyEmailOTP = async () => {
        const response = await fetch(`http://192.168.1.14:8080/api/verify-email-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, emailOtp: emailOtp })
        });
        if (response.ok) {
            Alert.alert("Email OTP verified successfully");
            setIsEmailOTPVerified(true);
            setIsEmailOTPSent(false);
        } else {
            Alert.alert("Invalid Email OTP");
        }
    }

    const VerifySMSOTP = async () => {
        const fullPhoneNumber = `${countryCode}${phoneNo}`;
        const response = await fetch(`http://192.168.1.14:8080/api/verify-phoneno`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNo: fullPhoneNumber, smsOtp: noOtp })
        });
        if (response.ok) {
            Alert.alert("SMS OTP verified successfully");
            setIsSMSOTPVerified(true);
            setIsSMSOTPSent(false);
        } else {
            Alert.alert("Invalid SMS OTP");
        }
    }

    const SendData = async () => {
        if (isEmailOTPVerified && isSMSOTPVerified) {
            const fullPhoneNumber = `${countryCode}${phoneNo}`;
            const url = `http://192.168.1.14:8080/api/user/signup`;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: name, email: email, phoneNumber: fullPhoneNumber, password: password })
                });
                const result = await response.json();
                if (response.ok) {
                    Alert.alert("User signed up successfully");
                    // await AsyncStorage.setItem('userId', result.userId);
                    console.log(result.userId);
                    await AsyncStorage.setItem('userId', result.userId.toString());
                    navigation.navigate('NameEntry');
                } else {
                    console.warn("Server error:", result.status);
                }
            } catch (error) {
                console.error("Error during fetch:", error);
            }
        } else {
            Alert.alert("Please verify both email and SMS OTPs");
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient
                colors={['#4CE5B1', '#63ABF900']}
                style={styles.background}>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: hp('5%') }}>

                    <View style={styles.login}>
                        <Text style={{
                            fontSize: 30, fontStyle: 'normal',
                            fontWeight: '700',
                        }}> Create Account </Text>
                    </View>

                    <View style={{ width: wp('12%'), height: hp('6%') }}>
                        <Image source={require('../img/Star.png')} />
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label1}> Name</Text>
                    <TextInput
                        style={styles.inputitetext}
                        placeholder="Enter your name"
                        placeholderTextColor="#00000080"
                        onChangeText={(text) => setName(text)}
                    />
                    <Text style={styles.label1}>Gmail</Text>
                    <TextInput
                        style={styles.inputitetext}
                        placeholder="Enter Email name"
                        placeholderTextColor="#00000080"
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TouchableOpacity style={styles.otpButton} onPress={VerifyEmail}>
                        <Text style={{ color: '#FFF' }}>Send OTP to Email</Text>
                    </TouchableOpacity>
                    {isEmailOTPSent && (
                        <View style={{ flexDirection: "row" }} >
                            <TextInput
                                style={styles.inputitetext2}
                                placeholder="Enter OTP"
                                placeholderTextColor="#00000080"
                                onChangeText={(text) => setEmailOTP(text)}
                            />
                            <TouchableOpacity style={styles.otpButton2} onPress={VerifyEmailOTP}>
                                <Text style={{ color: '#FFF' }}>Verify Email OTP</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <Text style={styles.label1}>Number</Text>
                    <TextInput
                        style={styles.inputitetext}
                        placeholder="Enter your Number"
                        placeholderTextColor="#00000080"
                        onChangeText={(text) => setphonenumber(text)}
                    />
                    <TouchableOpacity style={styles.otpButton} onPress={VerifyNumber} >
                        <Text style={{ color: '#FFF' }}>Send OTP to Phone</Text>
                    </TouchableOpacity>

                    {isSMSOTPSent && (
                        <View style={{ flexDirection: "row" }} >
                            <TextInput
                                style={styles.inputitetext2}
                                placeholder="Enter OTP"
                                placeholderTextColor="#00000080"
                                onChangeText={(text) => setNoOTP(text)}
                            />
                            <TouchableOpacity style={styles.otpButton2} onPress={VerifySMSOTP}>
                                <Text style={{ color: '#FFF' }}>Verify SMS OTP</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <Text style={styles.label2}> Password</Text>
                    <TextInput
                        style={styles.inputitetext}
                        placeholder="Password*"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />

                    <TouchableOpacity style={styles.continuebtn}
                        onPress={SendData}
                    >
                        <Text style={{ color: '#FFF', fontSize: 20, }}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", alignSelf: 'center', margin: wp('5%'), }}>
                        <Text style={styles.createacclink}> Create an account? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={{ color: 'blue', fontSize: 20 }}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        marginTop: wp('10%')
    },
    createacclink: {
        fontSize: 20,
    },
    login: {
        color: 'black',
        fontFamily: 'Inter-Bold',
        fontSize: 30,
        marginRight: wp('30%'),
    },
    mobileheader: {
        color: '#020202',
        fontFamily: 'Inter',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 70,
        textDecorationLine: 'underline',
        marginLeft: 20
    },
    mobileinput: {
        marginLeft: 30,
        borderRadius: 10,
        borderBottomRightRadius: 30,
        borderEndEndRadius: 20,
        borderTopRightRadius: 30,
    },
    continuebtn: {
        marginTop: 20,
        width: 317,
        height: 35,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#13C39C',
        borderRadius: 10,
        alignSelf: 'center'

    },
    signgbn: {
        marginTop: 0,
        width: 317,
        height: 35,
        backgroundColor: '#8FB9F9',
        marginLeft: 21,
        marginRight: 23,
        borderRadius: 10,
        marginLeft: 45
    },
    signwemailbn: {
        marginTop: 15,
        width: 317,
        height: 35,
        justifyContent: 'center',
        backgroundColor: '#8FB9F9',
        marginLeft: 21,
        marginRight: 23,
        borderRadius: 10,
    },
    label1: {
        marginBottom: hp('1%'),
        width: wp('23%'),
        fontSize: wp('4%'),
        marginLeft: wp('10%'),
        marginTop: hp('0%'),
    },
    label2: {
        marginTop: hp('2%'),
        width: wp('40%'),
        fontSize: wp('4%'),
        marginLeft: wp('10%'),
    },
    inputitetext: {
        width: wp('80%'),

        marginTop: hp('0%'),
        marginLeft: wp('10%'),
        marginRight: wp('10%'),
        backgroundColor: 'white',
        paddingLeft: wp('5%'),
        // paddingRight: wp('5%'),
        paddingBottom: hp('1.7%'),
        paddingTop: hp('1.7%'),
        color: '#000',
        borderRadius: wp('4%'),
        fontSize: wp('4.5%'),
        marginRight: wp('5%'),
    },
    inputitetext2: {
        width: wp('50%'),
        height: hp('6%'),
        marginTop: hp('0.5%'),
        marginLeft: wp('10%'),
        marginRight: wp('10%'),
        backgroundColor: 'white',
        paddingLeft: wp('5%'),
        // paddingRight: wp('5%'),
        paddingBottom: hp('1.7%'),
        paddingTop: hp('1.7%'),
        color: '#000',
        borderRadius: wp('4%'),
        fontSize: wp('4.5%'),
        marginRight: wp('5%'),
    },
    otpButton: {
        backgroundColor: '#65B741',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginLeft: 65,
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('70%'),
        marginTop: 5
    },
    // otpButton2: {
    //     backgroundColor: '#8817EE',
    //     paddingHorizontal: 10,
    //     paddingVertical: 5,
    //     borderRadius: 5,
    //     marginTop: 13,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: hp("4%"),
    //     margin: 10,
    //     marginLeft: -5
    // },
});