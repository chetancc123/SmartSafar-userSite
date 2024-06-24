import * as React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function CreateAccount({ navigation }, props) {

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassowrd] = useState();

    const NextPage = () => {
        navigation.navigate('EmailVerification', { email })
    }

    const SaveData = async () => {
        try {
            const response = await fetch(`http://192.168.1.14:8080/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    userName: userName,
                    email: email,
                    password: password

                })
            });
            const result = await response.text();
            // console.log(result)
            if (response.ok) {
                // let data = await response.json();
                Alert.alert('user created');
                const SaveEmail = async () => {
                    // console.warn("called")
                    // console.log(typeof phoneNo, phoneNo);
                    const url = `http://192.168.1.14:8080/api/sign-with-email`;
                    let result = await fetch(url, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email: email })
                    });
                    result = await result.json();
                    if (result) {
                        alert("data added")
                        // console.warn("data added")
                    }
                    else {
                        Alert("error")
                        return (false)
                    }
                    navigateToHome();
                }
                NextPage();
            } else if (result.includes('Username is already exist!')) {
                Alert.alert('Username is already exist!');
            } else if (result.includes('Email is already exist!')) {
                Alert.alert('Email is already exist!');
            } else {
                // console.log(response)
                Alert.alert("error")
            }
        }
        catch (error) {
            console.error("Error during fetch:", error);
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <LinearGradient
                    colors={['#4CE5B1', '#63ABF900']}
                    style={styles.background}
                />
                <Text style={styles.label}> Create account </Text>
                <Image
                    source={require('../img/Star1.png')}
                    style={styles.image}
                />
                <Text style={styles.label1}>First Name</Text>
                <TextInput
                    style={styles.inputitetext}
                    placeholder="Enter your first name"
                    placeholderTextColor="#00000080"
                    onChangeText={(text) => setFirstName(text)}
                />
                <Text style={styles.label1}>Last Name</Text>
                <TextInput
                    style={styles.inputitetext}
                    placeholder="Enter your last name"
                    placeholderTextColor="#00000080"
                    onChangeText={(text) => setLastName(text)}
                />
                <Text style={styles.label1}>User Name</Text>
                <TextInput
                    style={styles.inputitetext}
                    placeholder="Enter your user name"
                    placeholderTextColor="#00000080"
                    onChangeText={(text) => setUserName(text)}
                />

                <Text style={styles.label2}> Email</Text>
                <TextInput
                    style={styles.inputitetext1}
                    placeholder="example@gmail.com"
                    onChangeText={(text) => setEmail(text)}
                />

                <Text style={styles.label3}> Create a password </Text>
                <TextInput
                    style={styles.inputitetext2}
                    placeholder="must be 8 characters"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassowrd(text)}

                />

                <Text style={styles.policycheck}> I accept the terms and privacy policy </Text>

                <TouchableOpacity style={styles.loginbtn} onPress={SaveData}>
                    <Text style={{ color: 'white' }}> Next </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.createacclink} onPress={() => navigation.navigate('Login')}>
                    <Text>Already have an account? Log in</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: hp('100%'),
    },
    label: {
        color: 'black',
        fontSize: wp('7%'),
        fontWeight: '700',
        marginBottom: hp('2%'),
        marginRight: wp('5%'),
        marginLeft: wp('5%'),
        marginTop: hp('5%'),
    },
    image: {
        marginTop: hp('-10%'),
        marginLeft: hp('38%'),
        // marginRight: hp('6%'), 
        width: wp('12%'),
        height: hp('6%'),
        resizeMode: 'cover',
    },
    label1: {
        marginBottom: hp('1%'),
        width: wp('23%'),
        fontSize: wp('4%'),
        marginLeft: wp('10%'),
        marginTop: hp('3%'),
    },
    label2: {
        marginTop: hp('2%'),
        width: wp('40%'),
        fontSize: wp('4%'),
        marginLeft: wp('10%'),
    },
    label3: {
        marginTop: hp('2%'),
        width: wp('40%'),
        fontSize: wp('4%'),
        marginLeft: wp('10%'),
    },
    label4: {
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
    inputitetext1: {
        width: wp('80%'),
        marginTop: hp('1%'),
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
        width: wp('80%'),
        marginTop: hp('1%'),
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
    inputitetext3: {
        width: wp('80%'),
        marginTop: hp('1%'),
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
    policycheck: {
        marginTop: hp('3%'),
        width: wp('100%'),
        fontSize: wp('4%'),
        marginLeft: wp('16%'),
        marginRight: wp('16%'),
    },
    loginbtn: {
        width: wp('50%'),
        paddingLeft: wp('4%'),
        paddingRight: wp('4%'),
        paddingBottom: hp('2.5%'),
        paddingTop: hp('2.5%'),
        color: 'white',
        backgroundColor: '#13C39C',
        marginTop: hp('3%'),
        marginLeft: wp('24%'),
        marginRight: wp('24%'),
        borderRadius: wp('4%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    createacclink: {
        marginTop: hp('3%'),
        width: wp('100%'),
        fontSize: wp('4%'),
        marginLeft: wp('21%'),
        marginRight: wp('21%'),
    },
});

