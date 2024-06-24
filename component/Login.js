import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { url } from './config';

export default function Login({ navigation }) {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const response = await fetch(`http://${url}:8080/api/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usernameOrEmailOrPhoneNumber: username, password: password })
            });

            const responseText = await response.text();  // Get the raw response text
            console.log('Raw response text:', responseText);

            // Attempt to parse the response text as JSON
            let result;
            try {
                result = JSON.parse(responseText);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                Alert.alert('An error occurred', 'Server response is not in JSON format');
                return;
            }

            if (response.ok) {
                console.log(result.phoneNo);
                await AsyncStorage.setItem('token', result.token);
                const response1 = await fetch(`http://${url}:8080/user/getbyphoneno/${result.phoneNo}`);
                const response1Text = await response1.text();
                let result1;
                try {
                    result1 = JSON.parse(response1Text);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    Alert.alert('An error occurred', 'Server response is not in JSON format');
                    return;
                }

                if (response1.ok) {
                    await AsyncStorage.setItem('name', result1.name);
                    await AsyncStorage.setItem('id', result1.userId.toString());
                    navigation.navigate('Home');
                } else {
                    Alert.alert('Error', result1.message || 'An error occurred');
                }
            } else {
                // Handle error cases
                Alert.alert('Error', result.message || 'An error occurred');
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            Alert.alert('An error occurred');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#4CE5B1', '#63ABF900']} style={styles.background}>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: hp('5%') }}>
                    <View style={styles.login}>
                        <Text style={{ fontSize: 30, fontStyle: 'normal', fontWeight: '700' }}>Login</Text>
                    </View>
                    <View style={{ width: wp('12%'), height: hp('6%') }}>
                        <Image source={require('../img/Star.png')} />
                    </View>
                </View>

                <View style={{ marginVertical: wp('10%') }}>
                    <View style={{ margin: wp('2%') }}>
                        <View style={styles.label}>
                            <Text style={{ fontSize: 20, fontStyle: 'normal', fontWeight: '400' }}>User Name</Text>
                        </View>
                        <View style={styles.inputText}>
                            <TextInput
                                onChangeText={(text) => setUsername(text)}
                                style={{ fontSize: 23 }}
                                placeholder="Enter your user name"
                                placeholderTextColor='#00000080'
                            />
                        </View>
                    </View>

                    <View style={{ margin: wp('2%') }}>
                        <View style={styles.label}>
                            <Text style={{ fontSize: 20, fontStyle: 'normal', fontWeight: '400' }}>Password</Text>
                        </View>
                        <View style={styles.inputText}>
                            <TextInput
                                style={{ fontSize: 23 }}
                                secureTextEntry={!isPasswordShown}
                                placeholder='password'
                                onChangeText={(text) => setPassword(text)}
                            />
                            <TouchableOpacity
                                onPress={() => setIsPasswordShown(!isPasswordShown)}
                                style={{ position: 'absolute', right: 1, top: 20, marginRight: 20 }}
                            >
                                {isPasswordShown ? (
                                    <Ionicons name="eye" size={24} color='black' />
                                ) : (
                                    <Ionicons name="eye-off" size={24} color='black' />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.loginBtn} onPress={login}>
                    <Text style={{ color: 'white' }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={{ color: 'red', textAlign: 'center', margin: wp('2%'), fontSize: 20 }}>Reset Password</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", alignSelf: 'center' }}>
                    <Text style={styles.createAccLink}>Create an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signwithgoogle')}>
                        <Text style={{ color: 'blue', fontSize: 20 }}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    login: {
        color: 'black',
        fontFamily: 'Inter-Bold',
        fontSize: 30,
        marginRight: wp('50%'),
    },
    label: {
        marginBottom: wp("1%"),
        marginLeft: wp('6%'),
    },
    inputText: {
        marginVertical: wp('2%'),
        marginHorizontal: wp('5%'),
        backgroundColor: 'white',
        padding: wp('3%'),
        borderRadius: 10,
    },
    loginBtn: {
        padding: wp('5%'),
        color: 'white',
        backgroundColor: '#13C39C',
        marginHorizontal: wp('5%'),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createAccLink: {
        fontSize: 20,
        flexDirection: "column",
    },
});
