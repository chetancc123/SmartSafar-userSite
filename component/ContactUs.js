import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ContactUs = (props) => {
  const onPressMobileNumberClick = (number) => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={Styles.main}>
          <View style={Styles.upper_right}>
            <Text style={{ fontSize: 25, fontWeight: "700", color: "white" }}>
              Smart Safar
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "700", color: "white" }}>
              Safety Sharing Ride
            </Text>
          </View>
          <View style={Styles.heading}>
            <Text style={Styles.ride}>Ride</Text>
            <Text style={Styles.colour}>Anywhere</Text>
          </View>
          <View style={Styles.withrido}>
            <Text
              style={{
                fontSize: 35,
                textAlign: "center",
                letterSpacing: 1,
                color: "white",
                fontWeight: "500",
                shadowOffset: { width: -2, height: 4 },
                textShadowColor: "black",
              }}
            >
              With Smart Safar
            </Text>
          </View>
          <View style={{ marginTop: hp("10%"), alignItems: "center" }}>
            <View style={Styles.gifContainer}>
              <Image
                source={require("../img/contact-us-main.gif")}
                style={Styles.gifImage}
                resizeMode="contain"
              />
            </View>
            <Text
              style={{
                fontSize: 30,
                marginTop: hp("4%"),
                textDecorationLine: "underline",
                color: "#13C39C",
              }}
            >
              Contact Us
            </Text>
          </View>
          <View style={Styles.mainView}>
            <View style={Styles.innerView1}>
              <Image
                style={Styles.icon}
                source={require("../img/mail2.png")}
              />
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    "https://mail.google.com/mail/u/0/#sent?compose=new@gmail.com"
                  );
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "600", letterSpacing: 1 }}
                >
                  hello@rido.com
                </Text>
              </TouchableOpacity>
            </View>
            <View style={Styles.innerView1}>
              <Image
                style={Styles.icon}
                source={require("../img/Phone1.png")}
              />
              <TouchableOpacity
                onPress={() => {
                  onPressMobileNumberClick("+91 70000 12345");
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "600" }}>
                  +91 70000 12345
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 25,
                marginTop: 10,
                color:"#13C39C",
                textDecorationLine: "underline",
              }}
            >
              Write us at :
            </Text>
            <View style={Styles.bottom}>
              <Image
                style={Styles.icon}
                source={require("../img/chat.png")}
              />
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://www.google.co.in/");
                }}
              >
                <Text
                  style={{ fontSize: 20, letterSpacing: 0.5, fontWeight: "500",}}
                >
                  media@rido.com
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#BDE6D9",
    height: hp("100%"),
  },
  upper_right: {
    height: hp(4),
    // display: "flex",
    alignItems: "flex-start",
    paddingHorizontal:wp("3%")
    
  },
  heading: {
    display: "flex",
    flexDirection: "row",
    top: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  ride: {
    fontSize: 40,
    marginRight: 20,
    color: "white",
  },
  colour: {
    fontSize: 40,
    color: "#13C39C",
  },
  withrido: {
    top: hp("4%"),
    fontSize: 40,
  },
  mainView: {
    marginTop: hp("1%"),
    alignItems: "center",
  },
  innerView1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: hp("1%"),
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
  },
  gifContainer: {
    width: wp("70%"),
    height: hp("30%"),
  },
  gifImage: {
    width: "100%",
    height: "100%",
    borderRadius: 40
  },
  icon: {
    height: wp("10%"),
    width: wp("10%"),
    marginRight: wp("4%"),
  },
});

export default ContactUs;
