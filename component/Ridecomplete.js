import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import BackGround from "../Styles/BackGround";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
// import Offer from "../component/Modal";
// import Hr from "./Hr";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { useNavigation } from "@react-navigation/native";

const Ridecomplete = ({ navigation }) => {
  const [isBlinking, setIsBlinking] = useState(true);
  const colorAnimation = new Animated.Value(0);

  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedname = await AsyncStorage.getItem("name");
        setName(storedname || "");
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking((prevIsBlinking) => !prevIsBlinking);
    }, 500); // Toggle every 500 milliseconds (adjust as needed)

    const colorChangeAnimation = Animated.timing(colorAnimation, {
      toValue: isBlinking ? 1 : 0,
      duration: 500, // Animation duration (adjust as needed)
      easing: Easing.linear,
      useNativeDriver: false,
    });

    colorChangeAnimation.start();

    return () => {
      clearInterval(blinkInterval);
      colorAnimation.removeAllListeners();
    };
  }, [isBlinking, colorAnimation]);

  const textColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["lightgreen", "darkgreen"], // Change colors as needed
  });

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const swapText = () => {
    // Swap the values of text1 and text2
    const temp = text1;
    setText1(text2);
    setText2(temp);
  };

  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={styles.box1}>
            
            <View style={{ flexDirection: "row", marginTop:wp("2%") }}>
              <View>
                <Text style={styles.rido}>Smart Safar</Text>
                <Text style={styles.text}>Safety Sharing Ride</Text>
              </View>
              <View style={{ height: 20,marginTop:hp("6%"),  }}>
                <Text style={{ fontSize: 16, fontWeight: 500, color: "white" }}>
                  Good Morning,
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {name}!
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
                    // onPress={openDrawer}
                    name="menu"
                    size={25}
                    color="#fff"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ height: 18 }}></View>
          </View>
          {/* modal for Image */}

          <Image
            source={require("../img/CheckAll.png")}
            style={{ marginTop: 100 }}
          ></Image>

          <Animated.Text style={{ color: textColor, fontSize: 48 }}>
            Ride Complete
          </Animated.Text>
          <View>
           
            <View>
              

              
              <Text
                style={{
                  textAlign: "center",
                  top: 0,
                  color: "green",
                  fontSize: 25,
                }}
              >
                Thank you for ride with us
              </Text>
            </View>
          </View>
        </View>
        {/* buttom navbar */}

        <View
          style={{
            width: wp("90%"),
            height:hp("7%") ,
            backgroundColor: "#13C39C",
            justifyContent: "center",
            marginBottom:hp("7%"),
            alignSelf:"center",
            borderRadius:wp("2%")
          }}
        >
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                Home
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Ridecomplete;

const styles = StyleSheet.create({
  rido: {
    width:wp("30%"),
    height: wp("7%"),
    color: "white",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "left",
  },
  text: {
    width:wp("30%"),
    height: wp("5%"),
    color: "#FFF",
    // fontFamily: 'itlaic',
    fontSize: 13,
    fontWeight: "700",
    textAlign: "left",
  },
  box1: {
    backgroundColor: "#13C39C",
    // flexDirection: 'row',
    marginTop:hp("2%"),
    width:wp("95%"),
    height:hp("16%"),
    borderRadius:wp("3%"),
    alignItems: "center",
  },

});
