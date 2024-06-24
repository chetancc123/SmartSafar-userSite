import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
// import { CheckBox } from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const NameEntry = ({ navigation }) => {
  const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  // const { fullPhoneNumber } = props.route.params;
  // const { userId } = props.route.params;
  // console.log(id.userId)

  const NextPage = async () => {
    try {
      // Remove stored items from AsyncStorage
      await AsyncStorage.removeItem("userId");
      // Navigate to the login page
      navigation.navigate("Login");
      // hide();
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("An error occurred while logging out");
    }
    // navigation.navigate('Login');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        // console.log('Stored id userId:', storedUserId);
        setUserId(storedUserId || "");
        // console.log(userId);
        // console.log("hii");
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };
    fetchData();
  }, []);

  const SendData = async () => {
    // const response = `http://localhost:8080/user/402/setName`;
    // console.warn(id)
    const response = await fetch(
      `http://192.168.1.14:8080/user/${userId}/setName`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      }
    );
    const result = await response.text();
    console.log("Response from server:", result);

    if (response.ok) {
      Alert.alert("Success', 'name send successfully");
      NextPage();
    } else {
      Alert.alert("Error", `Failed to connect. Server response: ${result}`);
    }
  };

  return (
    // <ScrollView>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={Styles.main}>
        {/* <View style={Styles.upper_right}>
                <Text style={{ fontSize: 35, fontWeight: '700', color: "white" }}>
                    Smart Safar
                </Text>
                <Text style={{ fontSize: 16, fontWeight: '700', color: "white" }}>
                    Safety Sharing Ride
                </Text>
            </View> */}
        <View style={Styles.first}>
          <Text style={{ fontSize: 20, padding: 1 }}>
            What’s your name {userId}{" "}
          </Text>
        </View>
        <Text style={{ fontSize: 15, padding: 10, marginLeft: 30 }}>
          Let us know how to properly address you{" "}
        </Text>

        <View style={{ display: "flex", alignItems: "center", marginTop: 1 }}>
          <View>
            <Text style={{ padding: 10 }}>Full Name</Text>
            <TextInput
              style={Styles.textInput}
              placeholder="Full name"
              onChangeText={(text) => setName(text)}
            />
          </View>
          {/* <View>
                    <Text style={{ padding: 10 }}> Last Name</Text>
                    <TextInput
                        style={Styles.textInput}
                        placeholder="Last name"
                        onChangeText={(text) => setLastName(text)}
                    />
                </View> */}
          <Image
            style={{ width: 410, flexGrow: 1, marginTop: 40 }}
            source={require("../img/nametag.png")}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginRight: 140, marginLeft: 10 }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("OtpValidation")}
            >
              <Text
                style={{
                  backgroundColor: "#13C39C",
                  width: wp("30%"),
                  height: hp("5%"),
                  textAlign: "center",
                  verticalAlign: "middle",
                  alignSelf: "flex-start",
                  marginRight: 10,
                  fontSize: 20,
                  borderRadius: 15,
                  marginTop: hp("2%"),
                }}
              >
                back
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            // onPress={SendData}
            onPress={SendData}
          >
            <Text
              style={{
                backgroundColor: "#13C39C",
                width: wp("30%"),
                height: hp("5%"),
                textAlign: "center",
                verticalAlign: "middle",
                alignSelf: "flex-end",
                marginRight: 10,
                fontSize: 20,
                borderRadius: 15,
                marginTop: hp("2%"),
              }}
            >
              {" "}
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    // </ScrollView>
  );
};
const Styles = StyleSheet.create({
  main: {
    flex: 1,
    // height: 820,
    backgroundColor: "#BDE6D9",
  },
  
  first: {
    display: "flex",
    flexDirection: "row",
    marginTop: hp("8%"),
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
    width: wp("80%"),
  },
});
export default NameEntry;
