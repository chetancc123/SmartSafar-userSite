// import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, AntDesign, Fontisto, Entypo } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from './config';
import Menu from './Menu';

export default function ChangePassword(props, { navigation }) {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPAss] = useState("");
    const [confPass, setConfPass] = useState("");
    const [id, setId] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedId = await AsyncStorage.getItem('id');
                console.log('Stored username:', storedId);
                setId(storedId || '');
            } catch (error) {
                console.error('Error retrieving data from AsyncStorage:', error);
            }
        };
        fetchData();
    }, []);

    const [eyeVisible, setEyeVisible] = useState(true);
    const [eyeWithLineVisible, setEyeWithLineVisible] = useState(false);
    const toggleIcon = () => {
        setEyeVisible(!eyeVisible);
        setEyeWithLineVisible(!eyeWithLineVisible);
    };

    const SendData = async () => {
        if (newPass !== confPass) {
            alert('new pass and confirn oass dosnt match');
            return;
        }
        console.log(oldPass);
        console.log(newPass);
        console.log(confPass);
        try {
            const response = await fetch(`http://${url}:8080/user/${id}/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass, confirmPassword: confPass })
            })
            if (response.ok) {
                const result = await response.text();
                console.log('Data saved successfully:', result);
                // alert("done")Harsh
                props.navigation.navigate('Login');
            } else {
                console.error('Failed to save data:', response.status, response.statusText);
                const responseData = await response.text(); // Log additional response data
                console.error('Response data:', responseData);
                alert('Failed to update passowrd. Please try again.');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            // Provide feedback to the user about the error
            alert('An error occurred. Please try again later.');
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#4CE5B1', '#63ABF900']}
                style={styles.background}>
                <Menu/>
                <View style={{marginTop: wp('10%')}}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Change Password</Text>
                    </View>
                    <View style={styles.buttons}>
                        <View style={styles.button}>
                            <TextInput placeholder='Enter Your Old Password' onChangeText={(text) => setOldPass(text)} />
                            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                                <Entypo
                                    name="eye"
                                    size={24}
                                    color="black"
                                    // Use the style prop to set the opacity based on the state variable
                                    style={{ opacity: eyeVisible ? 1 : 0 }}
                                    // Use the onPress prop to call the toggle function
                                    onPress={toggleIcon}
                                />
                                <Entypo
                                    name="eye-with-line"
                                    size={24}
                                    color="black"
                                    style={{ opacity: eyeWithLineVisible ? 1 : 0 }}
                                    onPress={toggleIcon}
                                />
                            </View>
                        </View>
                        <View style={styles.button}>
                            <TextInput placeholder='Enter Your New Password' onChangeText={(text) => setNewPAss(text)} />
                            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                                <Entypo
                                    name="eye"
                                    size={24}
                                    color="black"
                                    // Use the style prop to set the opacity based on the state variable
                                    style={{ opacity: eyeVisible ? 1 : 0 }}
                                    // Use the onPress prop to call the toggle function
                                    onPress={toggleIcon}
                                />
                                <Entypo
                                    name="eye-with-line"
                                    size={24}
                                    color="black"
                                    style={{ opacity: eyeWithLineVisible ? 1 : 0 }}
                                    onPress={toggleIcon}
                                />
                            </View>
                        </View>
                        <View style={styles.button} >
                            <TextInput placeholder='Confirm Password' onChangeText={(text) => setConfPass(text)} />
                            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                                <Entypo
                                    name="eye"
                                    size={24}
                                    color="black"
                                    style={{ opacity: eyeVisible ? 1 : 0 }}
                                    onPress={toggleIcon}
                                />
                                <Entypo
                                    name="eye-with-line"
                                    size={24}
                                    color="black"
                                    style={{ opacity: eyeWithLineVisible ? 1 : 0 }}
                                    onPress={toggleIcon}
                                />
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ textAlign: 'center' }}>
                            Atleast 1 number or a special character
                        </Text>
                    </View>
                </View>
                <View>
                    <Pressable onPress={SendData} style={styles.continueButton}>
                        <Text style={{ color: 'white',fontSize: 30 }}>Save</Text>
                    </Pressable>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
    },
    background: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        padding: wp('3%'),
    },
    headerText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 18,
        color: '#444',
        textAlign: 'center',
    },
    buttons: {
        flexDirection: 'column',
        marginTop: hp('2%'),
        padding: wp('2%'),
    },
    button: {
        padding: wp('3%'),
        marginHorizontal: wp('5%'),
        marginVertical: hp('0.1%'),
        backgroundColor: '#D9E4FF',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#9747FF',
    },
    buttonText: {
        fontSize: 20,
        color: '#333',
    },
    continueButton: {
        position: 'absolute',
        top: hp('35%'),
        alignItems: 'center',
        backgroundColor: '#13C39C',
        padding: wp('2%'),
        borderRadius: 8,
        margin: wp('2%'),
        width: wp('85%'),
        alignSelf: 'center'
    }
});