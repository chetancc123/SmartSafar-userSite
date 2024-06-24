// import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpValidation = (props) => {

    const [otp, setOtp] = useState(['', '', '', '']);
    const [otpn, setOtpn] = useState("");
    const [fullPhoneNumber, setFullPhoneNumber] = useState('');
    const [id, setId] = useState("");
    // const { fullPhoneNumber } = props.route.params;
    // const fullPhoneNumber = SessionStorage.getItem('num');
    // const fullPhoneNumber = '+917999532097'
    var result;

    useEffect(() => {
        const fetchPhoneNumber = async () => {
            try {
                const storedPhoneNumber = await AsyncStorage.getItem('num');
                setFullPhoneNumber(storedPhoneNumber);
                // console.log(fullPhoneNumber);
            } catch (error) {
                console.error('Error fetching phone number:', error.message);
            }
        };

        fetchPhoneNumber();
    }, []);

    useEffect(() => {
        const concatenatedOtp = otp.join('');
        setOtpn(concatenatedOtp);
        // console.log("otpvalidation: using session" + AsyncStorage.getItem('num'));

        // console.warn(otpn);
    }, [otp]);

    // const NextPage = () => {
    //     props.navigation.navigate('NameEntry', { id });
    // }

    useEffect(() => {
        if (fullPhoneNumber) {
            GetId();
        }
    }, [fullPhoneNumber])

    const GetId = async () => {
        try {
            // const url = `http://10.0.2.2:8080/user/getbyphoneno/${fullPhoneNumber}`;
            const url = `http://192.168.1.14:8080/user/getbyphoneno/${fullPhoneNumber}`;
            const response = await fetch(url);
            const data = await response.json();
            const userId = data?.userId;
            // console.log('Fetched userId:', userId);
            setId(userId);
            console.log(userId);
            return userId;
            // console.log(userId + 'hii')
        } catch (error) {
            console.error('Error fetching userId:', error.message);
            throw error;
        }
    }


    const SendData = async () => {
        console.log(otpn)
        try {
            const userId = await GetId();
            const response = await fetch(`http://192.168.1.14:8080/locationapi/verifySmsOtp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: id, otp: otpn })
            });

            const result = await response.text();

            console.log('Response from server:', result);

            if (response.ok) {
                Alert.alert('Success', 'OTP verified successfully');
                const userId = await GetId();
                console.log('Received userId:', userId);
                // Use userId as needed
                props.navigation.navigate('NameEntry', { userId });
            } else {
                Alert.alert('Error', `Failed to verify OTP. Server response: ${result}`);
            }
        } catch (error) {
            console.error('Error during OTP verification:', error.message);
        }
    }

    const handleOtpChange = (index, value) => {
        console.log("index:", index);
        console.log("value:", value);
        const newOtp = [...otp];
        newOtp[index] = value;

        setOtp(newOtp);


        if (index < 3 && value !== '') {

            refs[index + 1]?.focus();
        }
        const concatenatedOtp = newOtp.join('');
        setOtpn(concatenatedOtp);

    };

    const refs = [];

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#4CE5B1', '#63ABF900']}
                style={styles.background}
            />
            <Text style={styles.logo}>Smart Safar</Text>
            <Text style={styles.label}>Safety Sharing Ride</Text>
            <Text style={styles.label1}>Enter the 4-digit code sent to you at {fullPhoneNumber}.</Text>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Signwithgoogle')}
            >
                <Text style={styles.label2}>Change your mobile number?</Text>
            </TouchableOpacity>
            <Image
                source={require('../img/Phone.png')}
                style={styles.image}
            />
            <View style={styles.container1}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={1}
                        value={digit}
                        onChangeText={(value) => handleOtpChange(index, value)}
                        ref={(ref) => (refs[index] = ref)}
                    />
                ))}

            </View>
            <Text style={styles.label3}>I didn’t receive a code (2:00)</Text>
            <Image
                source={require('../img/OTPV.png')}
                style={styles.image1}
            />
            <TouchableOpacity style={styles.loginbtn}
                onPress={() => props.navigation.navigate('Signwithgoogle')}
            >
                <Text style={{ color: 'white' }}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginbtn1}
                // onPress={SendData}
                onPress={() => props.navigation.navigate('NameEntry')}
            >
                <Text style={{ color: 'white' }}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OtpValidation;

const styles = StyleSheet.create({
    container: {
        //   flex: 1,
        //   justifyContent: 'center',
        //   alignItems: 'center',
    },
    container1: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: hp('100%'),
    },
    logo: {
        color: 'white',
        // fontFamily: 'Inter-Black',
        fontSize: wp('10%'),
        fontStyle: 'normal',
        fontWeight: '600',
        textAlign: 'right',
        // marginBottom: hp('2%'),
        marginTop: hp('4%'),
        marginRight: hp('2%'),
    },
    label: {
        color: 'white',
        // fontFamily: 'Inter-Black',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'right',
         
        
        marginRight: hp('6%'),
    },
    label1: {
        width: wp('100%'),
        color: 'black',
        // fontFamily: 'Inter-Black',
        fontSize: wp('5%'),
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'left',
        marginBottom: hp('3%'),
        marginTop: hp('1%'),
        marginLeft: hp('2%'),
    },
    label2: {
        color: 'blue',
        // fontFamily: 'Inter-Black',
        fontSize: wp('4%'),
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'left',
        marginBottom: hp('3%'),
        marginTop: hp('0%'),
        marginLeft: hp('2.5%'),
    },
    image: {
        width: wp('11%'),
        height: hp('5%'),
        resizeMode: 'cover',
        marginBottom: hp('2%'),
        marginLeft: hp('3%'),
    },
    input: {
        width: 50,
        height: 40,
        textAlign: 'center',
        fontSize: 18,
        // borderWidth: 0.2,
        borderRadius: wp('3%'),
        backgroundColor: '#D3E5FF',
        marginTop: hp('-7.5%'),
        marginLeft: wp('1%'),
        marginHorizontal: wp('-15%'),
    },
    label3: {
        color: 'red',
        // fontFamily: 'Inter-Black',
        fontSize: wp('3%'),
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'left',
        marginBottom: hp('5%'),
        marginTop: hp('2%'),
        marginLeft: hp('2.5%'),
    },

    image1: {
        width: wp('85%'),
        height: hp('42%'),
        resizeMode: 'cover',
        alignSelf: 'center',
        marginTop: hp('0%'),
        // marginLeft: hp('3%'), 
    },
    loginbtn: {
        width: wp('7%'),
        width: wp('32%'),
        paddingVertical: hp('1.5%'),
        backgroundColor: '#13C39C',
        borderRadius: wp('4%'),
        alignItems: 'baseline',
        marginTop: hp('8.5%'),
        marginLeft: hp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginbtn1: {
        width: wp('32%'),
        paddingVertical: hp('1.5%'),
        backgroundColor: "#13C39C",
        borderRadius: wp('4%'),
        alignItems: 'baseline',
        marginTop: hp('-5.3%'),
        // marginBottom: hp('10%'),
        marginLeft: hp('30%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
});