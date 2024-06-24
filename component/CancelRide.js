import React, { useState } from "react";
import {
    View, Text, StyleSheet, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackGround from "../Styles/BackGround";
import Popup2 from "./modal3";
import { useEffect } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CancelRide = ({ navigation }) => {
    const [Bookingid, setBookingId] = useState("");
    const [id, setId] = useState("");
    const [selectedReason, setSelectedReason] = useState(null);
    const [customReason, setCustomReason] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [userId, SetUserID] = useState("");
    // const [reason, SetReason] = useState([]);
    const [driverId, SetDriverID] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedBookingId = await AsyncStorage.getItem('Pid');
                const storedId = await AsyncStorage.getItem('id');
                console.log('Stored id:', storedId);
                console.log('Stored storedBookingId:', storedBookingId);
                setBookingId(storedBookingId || '');
                setId(storedId || '');
                // GetData(storedId);
            } catch (error) {
                console.error('Error retrieving data from AsyncStorage:', error);
            }
        };
        fetchData();
    }, []);

    const handleCheckboxPress = (reason) => {
        if (reason === "Other") {
            console.log("Selected Reason:", customReason);
        } else {
            console.log("Selected Reason:", reason);
        }
        setSelectedReason(reason === selectedReason ? null : reason);
        setIsButtonDisabled(
            (reason === selectedReason || (reason === "Other" && !customReason.trim())) ? true : false
        );
    };

    const handleCustomReasonChange = (value) => {
        setCustomReason(value);
        setIsButtonDisabled(
            (selectedReason && !value.trim()) ? true : false
        );
    };

    const handleCancelRide = () => {
        // console.log("Cancel Ride button pressed");
        sendData();
    };

    const sendData = async () => {
        let reasonArray = [];
        if (selectedReason) {
            reasonArray.push(selectedReason);
        }

        if (selectedReason === "Other" && customReason.trim()) {
            reasonArray.push(customReason);
        }

        const response = await fetch(`http://192.168.1.14:8080/user/cancel-from-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "bookingId": Bookingid,
                "driverId": 1,
                "userId": id,
                "reason": reasonArray
            })
        });

        if (response.ok) {
            const result = await response.text();
            setIsModalVisible(true);
            // alert('done')
        } else {
            alert("sorry")
        }
    };


    const renderCheckbox = (reason, placeholder) => (
        <View
            style={{
                width: wp("100%"),
                height:hp("11%"),
                justifyContent: "flex-end",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View
                style={{
                    width:wp("95%"),
                    height:hp("100%") ,
                    borderRadius: 10,
                    shadowColor: "#D3E5FF",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft:wp("5%"),
                    paddingRight:wp("5%"),
                }}
            >
                <CheckBox
                    checked={reason === selectedReason}
                    onPress={() => handleCheckboxPress(reason)}
                />
                <View style={{ marginRight:wp("1%") }}>
                    <Text
                        style={styles.textInput}>
                        {placeholder}</Text>
                </View>
            </View>
        </View>
    );

    const GoTOHome = () => {
        setIsModalVisible(false);
        navigation.navigate('Home');

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <Popup2 isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} /> */}
            <Popup2 isVisible={isModalVisible} GoTOHome={GoTOHome} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <LinearGradient
                    colors={['#4CE5B1', '#63ABF900']}
                    style={BackGround.background}
                >
                    <View style={{ marginTop:hp("5%"), flexDirection: "row" }}>
                        <TouchableOpacity>
                            <View style={{ flexDirection: "row", marginLeft:wp("5%") }}>
                                <AntDesign name="left" size={18} color="black" />
                                <Text style={{ marginLeft:wp("2%"),fontSize:18,fontWeight:"bold" }}>back</Text>
                            </View>
                            {/* <Popup2 /> */}
                        </TouchableOpacity>
                        <Text style={{ marginLeft:wp("20%"),fontSize:22,fontWeight:"bold" }}>Cancel Taxi</Text>
                    </View>
                    <View style={{ alignItems: "center", marginTop:hp("2%") }}>
                        <Text style={{ marginLeft:wp("2%"),fontSize:18,fontWeight:"bold" }}>Please select the reason for cancellation.</Text>
                    </View>

                    {renderCheckbox("Waiting For Long Time", "Waiting for long time")}
                    {renderCheckbox("Unable To Contact Driver", "Unable to contact driver")}
                    {renderCheckbox(
                        "Driver Denied To Go To Destination",
                        "Driver denied to go to destination"
                    )}
                    {renderCheckbox(
                        "Driver Denied To Come To Pickup",
                        "Driver denied to come to pickup"
                    )}
                    {renderCheckbox("Wrong Address Shown", "Wrong address shown")}
                    {/* {renderCheckbox("Other", "Other")} */}

                    <View
                        style={{
                            width:wp( "100%"),
                            height: hp("11%"),
                            justifyContent: "flex-end",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: wp("95%"),
                                height: hp("100%"),
                                borderRadius: 10,
                                shadowColor: "#D3E5FF",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingLeft:wp("5%"),
                                paddingRight:wp("5%"),
                            }}
                        >
                            <CheckBox
                                checked={selectedReason === "Other"}
                                onPress={() => handleCheckboxPress("Other")}
                            />
                            <View style={{ marginRight: wp("5%") }}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Other"
                                    value={selectedReason === "Other" ? customReason : ""}
                                    onChangeText={(text) => handleCustomReasonChange(text)}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity
                            style={{
                                opacity: isButtonDisabled ? 0.5 : 1, // Adjust the opacity based on button state
                            }}
                            disabled={isButtonDisabled}
                            onPress={handleCancelRide}
                        >
                            <Text
                                style={{
                                    backgroundColor: "#13C39C",
                                    width:wp("65%"),
                                    height:hp("6%"),
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                    alignSelf: "flex-start",
                                    
                                    fontSize: 16,
                                    fontWeight:"bold",
                                    color:"white",
                                    borderRadius: 15,
                                    marginTop:hp("5%"),
                                    shadowColor: "#000",
                                }}
                            >
                                Cancel Ride
                            </Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
export default CancelRide;

const styles = StyleSheet.create({
    
    
    
    textInput: {
        justifyContent: "center",
        color: "black",
        borderRadius: 10,
        border: "1px solid #B7A3A3",
        backgroundColor: "#fff",
        alignSelf: "start",
        alignItems: "stretch",
        padding:wp("4%"),
        width:wp("65%"),
    },
});
