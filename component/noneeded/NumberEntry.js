import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button, TouchableOpacity, TextInput, Alert } from "react-native"
// import { CheckBox } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
// import PhoneInput from 'react-native-phone-number-input'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

const NumberEntry = ({ navigation }) => {
    const [userId, setUserId] = useState(null);
    const [number, setNumber] = useState({
        "phoneNo": ""
    });
    const [otp, setOtp] = useState("");
    const countryCode = '+91';

    const VerifyOtp = async () => {
        const fullPhoneNumber = `${countryCode}${number}`;
        console.log(userId)
        const response = await fetch(`http://192.168.1.14:8080/user/forget-password-verify/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ forgotOtp: otp })
        })
        if (response.ok) {
            Alert.alert("OTP Verification done")
            navigation.navigate('SetNewPassword')
        }
        else (
            console.log('error')
        )
    }

    const SendData = async () => {
        try {
            const fullPhoneNumber = `${countryCode}${number}`;
            const formData = new FormData();
            formData.append('phoneNo', fullPhoneNumber);

            const response = await fetch(`http://192.168.1.14:8080/user/forget-password-phonenumber`, {
                method: 'POST',
                headers: {
                    // Include any headers here if required
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                setUserId(data.userId);
                await AsyncStorage.setItem('id', data.userId.toString());
                Alert.alert("OTP send Done");
                // navigation.navigate('OtpValidation');
            } else {
                const result = await response.text();
                Alert.alert('Error', `Failed to connect. Server response: ${result}`);
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'An error occurred. Please try again later.');
        }
    }

    return (
        // <ScrollView>
        // <SafeAreaView>
        <View style={Styles.main}>
            {/* <View style={Styles.upper_right}>
                <Text style={{ fontSize: 35, fontWeight: 700, color: "white" }}>
                    Rido
                </Text>
                <Text style={{ fontSize: 10, fontWeight: 700, color: "white" }}>
                    Safety Sharing Ride
                </Text>
            </View> */}
            <View style={Styles.first}>

                <Text style={{ fontSize: 20, padding: 1, }}>What’s your Mobile Number hiiii </Text>

            </View>
            <Text style={{ fontSize: 15, padding: 10, alignSelf:"center"}}>Let us know how to properly address you </Text>

            <View style={{ display: "flex", alignItems: "center" }}>

                <View>
                    <Text style={{ padding: 10, fontSize: 16, fontWeight: '700' }}> Please Enter The Registered Mobile Number</Text>
                    {/* <PhoneInput
                        // defaultValue={phonenumber}
                        containerStyle={{ borderRadius: 10 }}
                        defaultCode='IN'
                        placeholder='Mobile Number'
                        onChangeText={(text) => setphonenumber(text)}
                    /> */}
                    <View>
                        <Text style={{ padding: 10 }}> Enter Mobile Number</Text>
                        <TextInput
                            style={Styles.textInput}
                            placeholder={number.phoneNo}
                            // onChangeText={(text) => handleChange('name', text)}
                            onChangeText={(text) => setNumber(text)}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={SendData}>
                        <View
                            style={{ width: wp("80%"), backgroundColor: "#13C39C", padding: '3%', borderRadius: 10, alignSelf: 'center', marginTop: hp("2%"), alignItems: 'center' }}
                        >
                            <Text>Send Otp</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <TextInput
                        style={Styles.textInput}
                        placeholder="first name"
                        onChangeText={(text) => setFirstName(text)}
                    /> */}
                </View>
                <View>
                    <Text style={{ padding: 10 }}> Otp</Text>
                    <TextInput
                        style={Styles.textInput}
                        placeholder="1234"
                        onChangeText={(text) => setOtp(text)}
                    />
                </View>
                <TouchableOpacity
                    onPress={VerifyOtp}>
                    <View
                        style={{ width:wp("80%"), backgroundColor: "#13C39C", padding: '3%', borderRadius: 10, alignSelf: 'center',marginTop: hp("2%"), alignItems: 'center' }}
                    >
                        <Text>Verify</Text>
                    </View>
                </TouchableOpacity>
                <Image style={{ width:wp("100%"), flexGrow: 1, marginTop: hp("4%") }} source={require("../img/nametag.png")} />

            </View>
            <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: 140, marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('OtpValidation')}
                    >
                        <Text style={{ backgroundColor: "#13C39C", width: wp("30%"), height: hp("5%"), textAlign: "center", verticalAlign: "middle", alignSelf: "flex-start" , fontSize: 20, borderRadius: 15, marginTop: hp("2%"), }}>back</Text>
                    </TouchableOpacity>
                </View>


                <TouchableOpacity onPress={SendData}
                >
                        <Text style={{ backgroundColor: "#13C39C", width: wp("30%"), height: hp("5%"), textAlign: "center", verticalAlign: "middle", alignSelf: "flex-start" , fontSize: 20, borderRadius: 15, marginTop: hp("2%"), }}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
        // </SafeAreaView>
        // </ScrollView>

    )
}
const Styles = StyleSheet.create({
    main: {
        flex: 1,
        // height: 820,
        backgroundColor: "#BDE6D9",

    },
    
    first: {
        display: "flex",
        flexDirection: "row",
        marginTop: hp("6%"),
        justifyContent: "space-around",
        alignItems: "center",

    },
    textInput: {
        justifyContent: "center",
        color: "#7E7676",
        borderRadius: 10,
        border: "1px solid #B7A3A3",
        backgroundColor: "#D3E5FF",
        alignSelf: "start",
        alignItems: "stretch",
        padding: 12,
        width: wp("80%")
    }
})
export default NumberEntry;