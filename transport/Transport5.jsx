import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const Transport5 = ({ navigation }) => {
  const [combinedData, setCombinedData] = useState(null);

  useEffect(() => {
    const fetchCombinedData = async () => {
      try {
        const data = await AsyncStorage.getItem('combinedVehicleData');
        if (data) {
          const parsedData = JSON.parse(data);
          setCombinedData(parsedData);
          console.log('Fetched Combined Data:', parsedData);
        }
      } catch (error) {
        console.error('Error fetching combined data:', error);
      }
    };

    fetchCombinedData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#A7F57A", "#BDE6D9"]} style={styles.background}>
        <View style={styles.topContent}>
          <Text style={styles.text1}>Smart Safar</Text>
          <Text style={styles.text2}>Safety Sharing Ride</Text>
        </View>

        {combinedData && combinedData.requestData ? (
          <View style={styles.whiteBox}>
            <Image
              source={{ uri: combinedData.requestData.vehicleImage }}
              style={styles.carImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.price}>{combinedData.requestData.vehicleType}</Text>
              <Text style={styles.price}>{combinedData.requestData.vehicleCategory}</Text>
              <Text style={styles.price}>{combinedData.requestData.vehicleStatus}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{combinedData.requestData.timeAwayFromSender} away</Text>
            </View>
          </View>
        ) : (
          <Text>Loading vehicle data...</Text>
        )}

        <View style={styles.offeranddiscount}>
          <Text style={styles.selectCarText}>Offer and Discounts</Text>
        </View>

        <View style={styles.whiteBox}>
          <TouchableOpacity style={styles.icon}>
            <MaterialCommunityIcons
              name="brightness-percent"
              size={24}
              color="red"
            />
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <Text style={styles.priceText}>View Coupons</Text>
          </View>
          <View style={styles.priceContainer}>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Transport6')}>
              <Text style={{...styles.remove, color: 'blue'}}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.offeranddiscount}>
          <Text style={styles.summary}>Summary</Text>
        </View>

        <View style={{...styles.whiteBox1, height: hp("40%"), flexDirection: "row", justifyContent: "space-between", marginVertical: hp("3%"), paddingVertical: hp("3%")}}>
          <View>
            <Text style={styles.priceText}>Trip fare (incl. toll)</Text>
            <View style={{borderBottomWidth: 1, width: "250%", marginTop: 5, marginBottom: 5}} />
            <Text style={styles.priceText}>Net fare</Text>
            <View style={{borderBottomWidth: 1, width: "250%", marginTop: 5, marginBottom: 5}} />
            <Text style={styles.priceText}>GST Added</Text>
            <View style={{borderBottomWidth: 1, width: "250%", marginTop: 5, marginBottom: 5}} />
            <Text style={styles.priceText}>Amount Payable</Text>
          </View>
          {combinedData && combinedData.vehicleBooking ? (
            <View>
              <Text style={styles.priceText1}>{combinedData.vehicleBooking.baseAmount}</Text>
              <Text style={styles.priceText1}>{combinedData.vehicleBooking.baseAmount}</Text>
              <Text style={styles.priceText1}>{combinedData.vehicleBooking.gst}</Text>
              <Text style={styles.priceText1}>{combinedData.vehicleBooking.totalAmount}</Text>
            </View>
          ) : (
            <Text>Loading booking details...</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topContent: {
    marginTop: hp("5%"),
    left: -30,
  },
  text1: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: "bold",
  },
  text2: {
    fontSize: 18,
    color: "#FFF",
    marginTop: 10,
  },
  remove: {
    color: "red",
  },
  scrollView: {
    alignItems: "flex-start",
    marginTop: hp("2%"),
  },
  circleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: wp("15%"),
    height: wp("15%"),
    borderRadius: wp("10%"),
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp("1%"),
  },
  circleTouch: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: hp("2%"),
  },
  selectCarTextContainer: {
    position: "absolute",
    bottom: hp("70%"),
    width: "100%",
    alignItems: "flex-start",
    marginLeft: 10,
    justifyContent: "flex-start", // Add this line
  },
  selectCarText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center", // Change justifyContent to 'center'
    marginTop: hp("2%"),
    bottom: hp("5%"),
    position: "absolute",
    width: "100%", // Make sure it takes the full width
  },
  button: {
    width: wp("80%"),
    backgroundColor: "#5C6894",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    top: hp("-5%"),
    alignSelf: "center",
  },
  selectedButton: {
    backgroundColor: "#A7F57A", // You can change the color to indicate selection
  },
  buttonText: {
    fontSize: hp("2%"),
    color: "#FFF06BFF06B",
  },
  priceContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginVertical: hp("1%"), // add 10px top and bottom (20px in total)
  },
  whiteBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    alignItems: "flex-start", // Change alignItems to 'flex-start'
    width: wp("90%"),
    marginTop: hp("3%"),
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    marginBottom: hp("2%"),
  },
  whiteBox1: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    alignItems: "flex-start",
    width: wp("90%"),
    marginTop: hp("3%"),
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: 1,
    marginBottom: hp("2%"),
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceText1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:hp("1%"),
  },
  carImage: {
    width: wp("20%"),
    height: wp("20%"),
    resizeMode: "contain",
    marginRight: wp("5%"),
  },
  textContainer: {
    marginLeft: wp("5%"),
    marginBottom: hp("1%"),
  }, // add 10px margin bottom to the text container
  iconContainer: {
    position: "absolute",
    right: 10,
    top: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("-45%"),
    marginTop: hp("2%"),
  },
  icon: {
    marginRight: 2,
  },
  menuIcon: {
    marginRight: 20,
  },
  offeranddiscount: {
    flexDirection: "row",
    marginRight: wp("40%"),
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: wp("1%"),
  },
  summary: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
});

export default Transport5;
