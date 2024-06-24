import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button, TouchableOpacity, TextInput, Alert } from "react-native"
// import { CheckBox } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const CreateIdPass = (props) => {
    const [userName, setUserName] = useState();
    const [password, setPassowrd] = useState();
    // const { fullPhoneNumber } = props.route.params;
    // const { userId } = props.route.params;
    // console.log(id.userId)

    const NextPage = () => {
        props.navigation.navigate('Privacy');
    }

    // const GetId = async () => {
    //     const url = `http://10.0.2.2:8080/user/getbyphoneno/${fullPhoneNumber}`;
    //     result = await fetch(url);
    //     result = await result.json();
    //     console.warn(result?.userId + 'hiiii');
    //     console.log(id);
    // }

    // useEffect = (() => {
    //     GetId();
    // }, [])

    const SendData = async () => {
        // const response = `http://localhost:8080/user/402/setName`;
        // console.warn(id)
        const response = await fetch(`http://192.168.1.14:8080/user/${userId}/setName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName: userName, password: password })
        });
        const result = await response.text();
        console.log('Response from server:', result);

        if (response.ok) {
            Alert.alert("Success', 'name and lastName send successfully")
            NextPage();
        } else {
            Alert.alert('Error', `Failed to connect. Server response: ${result}`)
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

                <Text style={{ fontSize: 20, padding: 1, }}>What’s your name </Text>

            </View>
            <Text style={{ fontSize: 15, padding: 10,  alignSelf:"center"}}>Let us know how to properly address you </Text>

            <View style={{ display: "flex", alignItems: "center",  }}>

                <View>
                    <Text style={{ padding: 10 }}> User name</Text>
                    <TextInput
                        style={Styles.textInput}
                        placeholder="Username"
                        onChangeText={(text) => setUserName(text)}
                    />
                </View>
                <View>
                    <Text style={{ padding: 10 }}> Password</Text>
                    <TextInput
                        style={Styles.textInput}
                        placeholder="password"
                        onChangeText={(text) => setPassowrd(text)}
                    />
                </View>
                <Image style={{ width: wp("80%"), flexGrow: 1, marginTop: hp("4%")}} source={require("../img/nametag.png")} />

            </View>
            <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: wp("35%"), marginLeft: wp("1%")}}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('NameEntry')}
                    >
                        <Text style={{ backgroundColor: "#13C39C", width: wp("30%"), height: hp("5%"), textAlign: "center", verticalAlign: "middle", alignSelf: "flex-start",   fontSize: 20, borderRadius: 15, marginTop: hp("2%"), }}>back</Text>
                    </TouchableOpacity>
                </View>


                <TouchableOpacity
                    // onPress={SendData}
                    onPress={() => props.navigation.navigate('Privacy')}
                >
                    <Text style={{ backgroundColor: "#13C39C", width: wp("30%"), height: hp("5%"), textAlign: "center", verticalAlign: "middle", alignSelf: "flex-end",  fontSize: 20, borderRadius: 15, marginTop: hp("2%") }}> Next</Text>
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
        marginTop: hp("10%"),
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
export default CreateIdPass;