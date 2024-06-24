import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { url } from './config';


const OtpValidation = ({ navigation,route }) => {
  const { id } = route.params;
  const {mobile} = route.params;
  const [otp, setOtp] = useState(["", "", "", ""]);
//   const [fullPhoneNumber, setFullPhoneNumber] = useState(""); // Placeholder phone number
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (index < 3 && value !== "") {
      refs[index + 1]?.focus();
    }
  };

  const refs = [];

  const handleNext = async () => {
    if (otp.join("").length !== 4) {
      Alert.alert("Error", "Please enter a 4-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://${url}:8080/user/forget-password-verify/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            forgotOtp: otp.join(""),
          }),
        }
      );
      console.log(response);
      const result = await response.text();
      console.log(result);
      if (result === "OTP verified successfully") {
        // Alert.alert("Success", result);
        navigation.navigate("SetNewPassword",{id: id});
        // console.log("response");
      } 
    } catch (error) {
      Alert.alert("Error", "An error occurred while verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#4CE5B1", "#63ABF900"]}
        style={styles.background}
      />
      <Text style={styles.label1}>Enter OTP at {mobile}</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("ForgotPassword")}
      >
        <Text style={styles.label2}>Change your mobile number?</Text>
      </TouchableOpacity>
      <Image source={require("../img/otpvv.png")} style={styles.image1} />
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
      <TouchableOpacity
        style={styles.loginbtn1}
        onPress={handleNext}
        disabled={loading}
      >
        <Text style={{ color: "white" }}>
          {loading ? "Verifying..." : "Next"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OtpValidation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flex: 1,
    // marginBottom: hp("5%")
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: hp("100%"),
  },
  label1: {
    width: wp("100%"),
    color: "black",
    fontSize: wp("5%"),
    fontWeight: "bold",
    textAlign: "left",
    marginTop: hp("10%"),
    marginLeft: hp("3%"),
  },
  label2: {
    color: "blue",
    fontSize: wp("4%"),
    textAlign: "left",
    marginBottom: hp("3%"),
    marginLeft: hp("2.5%"),
  },
  image1: {
    width: wp("70%"),
    height: hp("30%"),
    resizeMode: "cover",
    alignSelf: "center",
  },
  input: {
    width: wp("15%"),
    height: hp("8%"),
    textAlign: "center",
    fontSize: 18,
    borderRadius: wp("3%"),
    backgroundColor: "#D3E5FF",
    marginTop: hp("6%"),
    marginHorizontal: wp("3%"),
    borderColor: "black",
    borderWidth: 0.5,
  },
  label3: {
    color: "red",
    fontSize: wp("3%"),
    textAlign: "left",
    // marginBottom: hp('1%'),
    marginTop: hp("19%"),
    // marginLeft: hp('3%'),
    alignSelf: "flex-start",
    paddingHorizontal: wp("5%"),
  },
  loginbtn1: {
    width: wp("50%"),
    paddingVertical: hp("2%"),
    backgroundColor: "#13C39C",
    borderRadius: wp("4%"),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: hp("50%"),
  },
});
