import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import BackGround from "../Styles/BackGround";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Nav from "./Nav";

const DeriverConnect = ({ navigation }) => {

    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedname = await AsyncStorage.getItem('name');
                setName(storedname || '');
            } catch (error) {
                console.error('Error retrieving data from AsyncStorage:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            // setVisible(false); // Hide the component
            navigation.navigate('Ridecomplete'); // Navigate to the next screen
        }, 6000); // 3 seconds

        // Clear the timer on component unmount to avoid memory leaks
        return () => clearTimeout(timer);
    }, []);

    // const swapText = () => {
    //     // Swap the values of text1 and text2
    //     const temp = text1;
    //     setText1(text2);
    //     setText2(temp);
    // };

    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(!isPressed);
    };

    const [show, setShow] = useState(false);
    const display = () => {
        setShow(true)
    }
    const hide = () => {
        setShow(false)
    }
    const navigateToHome = () => {
        // Navigate to the 'Home' screen
        navigation.navigate('Home');
        // Close the modal
        hide();
    };
    const navigateToSetPassword = () => {
        // Navigate to the 'Home' screen
        navigation.navigate('ChangePassword');
        // Close the modal
        hide();
    };
    const navigateToHistory = () => {
        // Navigate to the 'Home' screen
        navigation.navigate('History_Upcoming');
        // Close the modal
        hide();
    };
    const navigateToContactUs = () => {
        // Navigate to the 'Home' screen
        navigation.navigate('History_Upcoming');
        // Close the modal
        hide();
    };

    const handleLogout = async () => {
        try {
            // Remove stored items from AsyncStorage
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('name');
            await AsyncStorage.removeItem('id');
            // Navigate to the login page
            navigation.navigate('Login');
            hide();
        } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('An error occurred while logging out');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Nav isDisplay={show} isHide={hide} navigateToHome={navigateToHome} navigateToSetPassword={navigateToSetPassword} navigateToHistory={navigateToHistory} handleLogout={handleLogout} />
                <ImageBackground
                    source={require("../img/MAP.jpg")}
                    style={BackGround.background}
                >

                    <View style={{ flex: 1, alignItems: "center" }}>
                        <View style={styles.box1}>

                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <View style={{ marginLeft: 0 }}>
                                    <Text style={styles.rido}>Rido</Text>
                                    <Text style={styles.text}>Safety Sharing Ride</Text>
                                </View>
                                <View style={{ height: 20, marginTop: 10, marginLeft: 10 }}>
                                    <Text
                                        style={{ fontSize: 16, fontWeight: 500, color: "white" }}
                                    >
                                        Good Morning,
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 500,
                                            textAlign: "center",
                                            color: "white",
                                        }}
                                    >
                                        {name}
                                    </Text>
                                </View>
                                <TouchableOpacity>
                                    <View style={{ marginLeft: 30, top: 5.1 }}>
                                        <FontAwesome name="bell" size={20} color="#fff" />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={{ marginLeft: 20, marginRight: 0 }}>
                                        <MaterialCommunityIcons
                                            onPress={display}
                                            name="menu"
                                            size={25}
                                            color="#fff"
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: 18 }}></View>
                        </View>

                        <View
                            style={{
                                width: "100%",
                                height: "11%",
                                justifyContent: "flex-end",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    width: "100%",
                                    height: "120%",
                                    backgroundColor: "#8E288E",
                                    borderRadius: 0,
                                    shadowColor: "#D3E5FF",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    top: 515,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: "white",
                                        left: -3,
                                        borderRadius: 5,
                                    }}
                                >
                                    <Image
                                        style={{ height: 50, width: 50 }}
                                        source={require("../img/driving_man.png")}
                                    // style={{ height: '70%', width: '5%' }}
                                    ></Image>
                                </View>

                                <View>
                                    <Text
                                        style={{
                                            textAlign: "start",
                                            left: -8,
                                            fontWeight: "600",
                                            fontSize: 15,
                                            color: "white",
                                        }}
                                    >
                                        Ishan
                                    </Text>
                                    <Text
                                        style={{
                                            textAlign: "start",
                                            left: -8,
                                            color: "white",
                                            fontSize: 10,
                                        }}
                                    >
                                        Mini Cab
                                    </Text>
                                    <Text
                                        style={{
                                            textAlign: "start",
                                            left: -8,
                                            color: "white",
                                            fontSize: 10,
                                        }}
                                    >
                                        CG 04 PC 9895
                                    </Text>
                                </View>

                                <View>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "white",
                                            fontSize: 15,
                                            left: -20,
                                        }}
                                    >
                                        Payment Mode
                                    </Text>
                                    <Text
                                        style={{ textAlign: "center", color: "white", left: -20 }}
                                    >
                                        Wallet
                                    </Text>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "white",
                                            fontWeight: "800",
                                            left: -20,
                                        }}
                                    >
                                        280 Rs
                                    </Text>
                                </View>

                                <View>
                                    <TouchableOpacity style={[styles.button3]}>
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                bottom: 1,
                                                right: 15,
                                                fontWeight: 600,
                                                fontSize: 20,
                                                color: "white",
                                            }}
                                        >
                                            4.0
                                        </Text>
                                        <Image
                                            style={{ height: 15, width: 15, left: 50, bottom: 20 }}
                                            source={require("../img/StarW.png")}
                                        ></Image>
                                    </TouchableOpacity>
                                    <Text style={{ textAlign: "center", color: "white", top: 5 }}>
                                        Arriving in
                                    </Text>
                                    <Text style={{ textAlign: "center", color: "white", top: 4 }}>
                                        12 min
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            width: "100%",
                            height: "11%",
                            justifyContent: "flex-end",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                height: "90%",
                                backgroundColor: "#8E288E",
                                borderRadius: 10,
                                shadowColor: "#D3E5FF",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingLeft: 10,
                                paddingRight: 10,
                                bottom: -15,

                            }}
                        >
                            <TouchableOpacity style={[styles.button1]}
                                onPress={() => navigation.navigate('CancelRide')}>
                                <Text style={{ width: 95, textAlign: "center", top: -2 }}>
                                    Cancel Booking
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity>
                                <Image
                                    style={styles.img1}
                                    source={require("../img/CallY.jpg")}
                                ></Image>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('ChatBot')}
                            >
                                <Image
                                    style={styles.img2}
                                    source={require("../img/message1.jpg")}
                                ></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button2]}
                                onPress={() => props.navigation.navigate('Ridebooked')}>
                                <Text style={{ width: 95, textAlign: "center", top: -2 }}>
                                    Confirm Booking
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
};
export default DeriverConnect;

const styles = StyleSheet.create({
    rido: {
        width: 96,
        height: 30,
        color: "white",
        // fontFamily: 'itlaic',
        fontSize: 25,
        fontWeight: "600",
        textAlign: "left",
    },
    text: {
        width: 92,
        height: 20,
        color: "#FFF",
        // fontFamily: 'itlaic',
        fontSize: 10,
        fontWeight: "700",
        textAlign: "left",
    },
    box1: {
        backgroundColor: "#8E288E",
        marginTop: 10,
        width: 350,
        height: 70,
        borderRadius: 30,
        alignItems: "center",
    },

    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 600,
    },

    button1: {
        left: 10,
        top: -5,
        backgroundColor: "red",
        borderRadius: 10,
        elevation: 5,
        height: 35,
    },

    button2: {
        right: 10,
        top: -5,
        backgroundColor: "#CE10ED",
        // borderWidth:1,
        borderRadius: 10,
        elevation: 5,
        height: 35,
    },

    button3: {
        // right:5,
        top: 5,
        backgroundColor: "#65AD48",
        // borderWidth:1,
        borderRadius: 15,
        width: 80,
        height: 25,
    },

    img1: {
        left: 10,
        height: 35,
        width: 35,
        borderRadius: 30,
        bottom: 7,
    },

    img2: {
        // marginLeft: 55,
        height: 35,
        width: 35,
        borderRadius: 30,
        bottom: 7,
    },

    box2: {
        backgroundColor: "#FFFFFF",
        width: 256,
        height: 130,
        borderRadius: 25,
        flexShrink: 0,
        marginTop: 30,
        alignItems: "center",
    },
    book: {
        color: "grey",
        width: 22,
        height: 30,
        marginLeft: 8,
        marginTop: 5,
        textAlignVertical: "center",
    },
    buttonPressed: {
        color: "blue",
    },
});