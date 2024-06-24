import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Transport7 = () => {
  // State to hold fetched data
  const [appliedCoupon, setAppliedCoupon] = useState({
    promoCode: '',
    baseAmount: 0,
    totalAmount: 0,
    gst: 0,
  });

  // Fetch data from AsyncStorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const coupon = await AsyncStorage.getItem('appliedCoupon');
        if (coupon !== null) {
          setAppliedCoupon(JSON.parse(coupon));
        }
        console.log(coupon);
      } catch (error) {
        console.error('Failed to fetch data from AsyncStorage', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle promo code removal
  const handleRemovePromo = async () => {
    try {
      const requestOptions = {
        method: "PUT",
        redirect: "follow"
      };

      const response = await fetch("http://192.168.1.14:8080/user/courier/remove-promo/3", requestOptions);
      const result = await response.text();
      console.log(result);

      // Clear the promo code from state and AsyncStorage, preserving the original GST
      setAppliedCoupon({
        promoCode: '',
        baseAmount: appliedCoupon.baseAmount,
        totalAmount: appliedCoupon.baseAmount, // Adjust as per your logic for total amount calculation
        gst: appliedCoupon.gst, // Preserve the original GST amount
      });
      await AsyncStorage.removeItem('appliedCoupon');
    } catch (error) {
      console.error('Failed to remove promo code', error);
    }
  };

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
              <Text style={styles.price1}>{combinedData.requestData.vehicleType}</Text>
              <Text style={styles.price1}>{combinedData.requestData.vehicleCategory}</Text>
              <Text style={styles.price1}>{combinedData.requestData.vehicleStatus}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price1}>{combinedData.requestData.timeAwayFromSender} away</Text>
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
            <Text style={styles.priceText}>You save with {appliedCoupon.promoCode}</Text>
            <Text style={styles.priceText1}>Coupon Applied</Text>
          </View>
          <View style={styles.priceContainer}>
            <TouchableOpacity style={styles.icon} onPress={handleRemovePromo}>
              <Text style={{ ...styles.remove, color: 'blue' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.offeranddiscount}>
          <Text style={styles.summary}>Summary</Text>
        </View>

        <View style={styles.whiteBox1}>
          <View>
            <Text style={styles.priceText}>Trip fare (incl. toll)</Text>
            <Text style={styles.price}>Rs.{appliedCoupon.baseAmount.toFixed(2)}</Text>
            {appliedCoupon.promoCode && (
              <>
                <Text style={styles.priceText}>Coupon Applied</Text>
                <Text style={styles.price}>{appliedCoupon.promoCode}</Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    width: "250%",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                />
              </>
            )}
            <Text style={styles.priceText}>Gst</Text>
            <Text style={styles.price}>Rs.{appliedCoupon.gst.toFixed(2)}</Text>
            <View
              style={{
                borderBottomWidth: 1,
                width: "250%",
                marginTop: 5,
                marginBottom: 5,
              }}
            />
            <Text style={styles.priceText}>Amount Payable</Text>
            <Text style={styles.price}>Rs.{appliedCoupon.totalAmount.toFixed(2)}</Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button1}>
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
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
    right: wp("25%"),
  },
  text1: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: "bold",
  },
  text2: {
    fontSize: 18,
    color: "#FFF",
    marginTop: hp("1%"),
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
    justifyContent: "flex-start",
  },
  selectCarText: {
    fontSize: hp("2.5%"),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp("10%"),
    bottom: hp("-7%"),
    position: "absolute",
    width: "100%",
  },
  button: {
    width: wp("80%"),
    backgroundColor: "#5C6894",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("20%"),
  },
  selectedButton: {
    backgroundColor: "#A7F57A",
  },
  buttonText: {
    fontSize: hp("2%"),
    color: "#FFF06BFF06B",
  },
  priceContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginVertical: hp("1%"),
  },
  whiteBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    alignItems: "flex-start",
    width: wp("90%"),
    marginTop: hp("3%"),
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: wp("2%"),
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
  button1: {
    width: wp("80%"),
    backgroundColor: "#5C6894",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("50%"),
    alignSelf: "center",
  },
  buttonText: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    color: "white",
  },
  priceText: {
    fontSize: hp("2%"),
    marginBottom: hp("1%"),
  },
  priceText1: {
    fontSize: hp("1.5%"),
    marginBottom: hp("1%"),
  },
  price: {
    fontSize: hp("2%"),
    marginBottom: hp("1.7%"),
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
  },
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
    marginRight: wp("1%"),
  },
  menuIcon: {
    marginRight: wp("2%"),
  },
  offeranddiscount: {
    flexDirection: "row",
    marginRight: wp("40%"),
  },
  summary: {
    marginRight: wp("35%"),
    fontSize: hp("2%"),
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Transport7;
