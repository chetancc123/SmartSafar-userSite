import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";

export default function topSection() {
  const name = "Harsh"; 

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
        <View style={styles.topSection}>
        <View style={styles.leftSection}>
          <Image
           source={require("../img/Profile_logo.png")}
            style={styles.profileImage}
          />
        </View>

        {/* Center Section - Greeting Text */}
        <View style={styles.centerSection}>
          <Text style={styles.greetingText}>HELLO !</Text>
          <Text style={styles.nameText}>{name}</Text>
        </View>

        {/* Right Section - Bell and Settings Icons */}
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.iconContainer}>
          <MaterialCommunityIcons name="bell-badge" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="settings" size={24} color="black" />
          </TouchableOpacity>
        </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // container: {
    
  //   elevation: 4, // Android shadow effect
  //   shadowColor: 'black', // iOS shadow color
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 4,
    
  // },
  topSection: {
    position: 'absolute',
    flexDirection: "row",
    marginTop:hp("10%"),
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("4%"),
    width:wp("90%"),
    height:hp("12%"),
       backgroundColor: "#13C39C",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftSection: {
    alignItems: "flex-start",
  },
  profileImage: {
    width: wp("15%"),
    height: wp("15%"),
    borderRadius: wp("5%"),
  },
  centerSection: {
    flex: 2,
    alignItems: "left",
    marginLeft:wp("4%"),
  },
  greetingText: {
    color: "black",
    fontSize: wp("4%"),
    fontWeight: "bold",
  },
  nameText: {
    color: "black",
    fontSize: wp("6%"),
    fontWeight: "bold",
  },
  rightSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  iconContainer: {
    marginLeft: wp("4%"),
  },
});
