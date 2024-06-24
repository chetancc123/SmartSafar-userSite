import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { url } from './config';

export default function ForgotPassword({ navigation }) {
    const [contactDetail, setContactDetail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        if (contactDetail.trim() === '') {
            alert('Please enter your phone number');
            return;
        }

        setLoading(true);

        const phoneNo = `+91${contactDetail}`;

        const formdata = new FormData();
        formdata.append("phoneNo", phoneNo);

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        try {
            const response = await fetch(`http://${url}:8080/user/forget-password-phonenumber`, requestOptions);
            const result = await response.text();

            if (response.ok) {
                const response1 = await fetch(`http://${url}:8080/user/getbyphoneno/${phoneNo}`);
                const result1 = await response1.json();
                if (response1.ok) {
                    navigation.navigate("Otpverified", { id: result1.userId, mobile: phoneNo });
                    console.log(result);
                } else {
                    Alert.alert('Error', 'Failed to retrieve user by phone number.');
                }
            } else {
                alert('Failed to send OTP. Please try again.');
                console.log(result1);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#4CE5B1', '#FFFFFF']}
                style={styles.background}>
                <View style={styles.titleContainer}>
                    <Text style={styles.rido}>Smart Safar</Text>
                    <Text style={styles.text}>Safety Sharing Ride</Text>
                </View>
                <View style={{ marginTop: wp('10%') }}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Forgot password</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.paragraph}>
                            Enter the Phone Number to Set a New Password
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your phone number"
                            value={contactDetail}
                            onChangeText={setContactDetail}
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                        />
                    </View>
                    <TouchableOpacity style={styles.continueButton} onPress={handleForgotPassword} disabled={loading}>
                        {loading ? (
                            <Text style={styles.continueButtonText}>Loading...</Text>
                        ) : (
                            <Text style={styles.continueButtonText}>Continue</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    container: {
        flex: 1,
    },
    titleContainer: {
        margin: wp('5%'),
        justifyContent: 'center',
    },
    rido: {
        color: 'white',
        fontSize: 25,
        fontWeight: "500",
        textAlign: 'left',
    },
    text: {
        color: '#FFF',
        fontSize: 13,
        fontWeight: "700",
        textAlign: 'left',
    },
    header: {
        alignItems: 'center',
        padding: wp('5%'),
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        alignItems: 'center',
        marginHorizontal: wp('10%'),
    },
    paragraph: {
        fontSize: 18,
        color: '#444',
        textAlign: 'center',
        marginBottom: wp('5%'),
    },
    input: {
        width: wp('90%'),
        padding: wp('3%'),
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: wp('5%'),
        backgroundColor: "white",
        marginVertical: wp('20%')
    },
    continueButton: {
        alignItems: 'center',
        backgroundColor: '#13C39C',
        padding: wp('3%'),
        borderRadius: 8,
        margin: wp('1%'),
        width: wp('90%'),
        alignSelf: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: "bold"
    },
});
