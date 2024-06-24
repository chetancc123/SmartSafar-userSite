import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { url } from './config';

const SetNewPassword = ({ navigation,route }) => {
    const {id} = route.params;
    const [isPasswordShown, setisPasswordShown] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfPass] = useState("");

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const storedId = await AsyncStorage.getItem('id');
    //             console.log('Stored id:', storedId);
    //             setId(storedId || '');
    //         } catch (error) {
    //             console.error('Error retrieving data from AsyncStorage:', error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    const SetNewPass = async () => {
        if (password === confirmPassword) {
            // Alert.alert("Passwords match");
            const response = await fetch(`http://${url}:8080/user/setpassword/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newpassword: password, confirmPassword: confirmPassword })
            })
            if (response.ok) {
                // Alert.alert("password change done")
                navigation.navigate('Login')
            } else {
                Alert.alert('Failed to update password')
            }
        } else {
            Alert.alert("Passwords do not match");
            // Optionally, you can perform any action here when passwords do not match
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#4CE5B1', '#63ABF900']}
                    style={styles.background}
                >
                    <TouchableOpacity>
                        <View style={{ flexDirection: "row", marginLeft: 30, marginTop: 40 }}>
                            <AntDesign name="left" size={23} color="black" />
                            <Text style={{ fontSize: 16 }}>back</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: "center", marginTop: 30 }}>
                        <Text style={{ fontSize: 20 }}>Set New password</Text>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 18 }}>
                        <Text style={{ fontSize: 15, color: "#A0A0A0" }}>
                            Set your New password
                        </Text>
                    </View>
                    <View style={styles.inputitetext1}>
                        <TextInput
                            style={{ fontSize: 15 }}
                            secureTextEntry={isPasswordShown}
                            onChangeText={(text) => setPassword(text)}
                            placeholder="Enter your new password"
                        />
                        <TouchableOpacity
                            onPress={() => setisPasswordShown(!isPasswordShown)}
                            style={{ position: "absolute", right: 1, top: 21, marginRight: 20 }}
                        >
                            {isPasswordShown == true ? (
                                <Ionicons name="ios-eye-off-outline" size={24} color="black" />
                            ) : (
                                <Ionicons name="eye" size={24} color="black" />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputitetext2}>
                        <TextInput
                            style={{ fontSize: 15 }}
                            secureTextEntry={isPasswordShown}
                            onChangeText={(text) => setConfPass(text)}
                            placeholder="confirm password"
                        />
                        <TouchableOpacity
                            onPress={() => setisPasswordShown(!isPasswordShown)}
                            style={{ position: "absolute", right: 1, top: 21, marginRight: 20 }}
                        >
                            {isPasswordShown == true ? (
                                <Ionicons name="ios-eye-off-outline" size={24} color="black" />
                            ) : (
                                <Ionicons name="eye" size={24} color="black" />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 10 }}>
                        <Text style={{ fontSize: 12, color: "#A0A0A0" }}>
                            At least 1 number or a special character
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={SetNewPass}>
                            <Text style={styles.button}> Next</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        // Add your background styles here
    },
    inputitetext1: {
        marginTop: hp("2%"),
        // marginLeft: 30,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 18,
        paddingTop: 18,
        borderWidth: 0.9,
        borderColor: "black",
        borderRadius: 10,
        fontSize: 26,
        width:wp("90%"),
        justifyContent:"center",
        alignSelf:"center"
    },
    inputitetext2: {
        marginTop: hp("2%"),
        // marginLeft: 30,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 18,
        paddingTop: 18,
        borderWidth: 0.9,
        borderColor: "black",
        borderRadius: 10,
        fontSize: 26,
        width:wp("90%"),
        justifyContent:"center",
        alignSelf:"center"

        // marginRight: 23,
    },
    button: {
        backgroundColor: "#13C39C",
        width: wp("60%"),
        height: hp("5%"),
        textAlign: "center",
        verticalAlign: "middle",
        alignItems: "center",
        // marginRight: 1,
        fontSize: 25,
        borderRadius: 3,
        marginTop: hp("10%"),
        color: '#fff'
    }
});

export default SetNewPassword;
