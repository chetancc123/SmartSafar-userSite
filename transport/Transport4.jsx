import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const Transport4 = ({ navigation }) => {
  const [vehicleData, setVehicleData] = useState([]);
  const [senderName, setSenderName] = useState('');
  const [senderMobile, setSenderMobile] = useState('');
  const [senderLocation, setSenderLocation] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverMobile, setReceiverMobile] = useState('');
  const [receiverLocation, setReceiverLocation] = useState('');
  const [vehicleType, setVehicleType] = useState([]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedSenderName = await AsyncStorage.getItem('senderName');
        const storedSenderMobile = await AsyncStorage.getItem('senderMobile');
        const storedSenderLocation = await AsyncStorage.getItem('homeSender');
        const storedReceiverName = await AsyncStorage.getItem('receiverName');
        const storedReceiverMobile = await AsyncStorage.getItem('receiverMobile');
        const storedReceiverLocation = await AsyncStorage.getItem('homeReceiver');
        const storedVehicleType = await AsyncStorage.getItem('vehicleType');
        
        setSenderName(storedSenderName);
        setSenderMobile(storedSenderMobile);
        setSenderLocation(storedSenderLocation);
        setReceiverName(storedReceiverName);
        setReceiverMobile(storedReceiverMobile);
        setReceiverLocation(storedReceiverLocation);
        setVehicleType(storedVehicleType);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const getVehicleData = async () => {
      try {
        const selectedVehicleType = await AsyncStorage.getItem('selectedVehicleType');
        let data = null;
        
        if (selectedVehicleType === 'TWO_WHEELER') {
          data = await AsyncStorage.getItem('twowheelerResponse');
        } else if (selectedVehicleType === 'FOUR_WHEELER') {
          data = await AsyncStorage.getItem('fourwheelerResponse');
        }

        if (data) {
          const parsedData = JSON.parse(data);
          setVehicleData(parsedData);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchUserData();
    getVehicleData();
  }, []);

  const handleVehicleSelect = async (vehicle) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "courierId": vehicle.courierId,
        "vehicleType": vehicle.vehicleType,
        "vehicleNo": vehicle.vehicleNo,
        "price": vehicle.price,
        "distanceFromSender": vehicle.distanceFromSender,
        "weight": vehicle.weight,
        "vehicleImage": vehicle.vehicleImage,
        "vehicleStatus": vehicle.vehicleStatus,
        "hubId": vehicle.hubId,
        "senderReceiverInfoDto": {
          "id": null,
          "senderName": senderName,
          "senderLatitude": 21.2390552,
          "senderLongitude": 81.6552196,
          "senderLocation": senderLocation,
          "senderAddress": "Raipur",
          "senderPhoneNumber": senderMobile,
          "receiverName": receiverName,
          "receiverLatitude": 22.2977922,
          "receiverLongitude": 82.0236751,
          "receiverLocation": receiverLocation,
          "receiverAddress": "Raipur",
          "receiverPhoneNumber": receiverLocation,
          "vehicleType": vehicleType,
          "totalDistance": vehicle.totalDistance,
          "expectedTime": vehicle.expectedTime,
          "userId": 1,
          "courierBookingId": null,
          "courierId": null
        },
        "timeAwayFromSender": vehicle.timeAwayFromSender,
        "vehicleCategory": vehicle.vehicleCategory,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch("http://192.168.1.14:8080/user/courier/no-promo-code", requestOptions);
      const result = await response.json();

      const combinedData = {
        requestData: JSON.parse(raw),
        vehicleBooking: result,
      };

      await AsyncStorage.setItem('combinedVehicleData', JSON.stringify(combinedData));
      console.log(combinedData);
      // console.log(combinedVehicleData);

      // Navigate to the next screen
      navigation.navigate('Transport5');

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#A7F57A", "#BDE6D9"]} style={styles.background}>
        <View style={styles.topSection}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={wp("6%")} color="black" />
          </TouchableOpacity>
          <Text style={styles.applyCouponText}>Select Vehicle</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.namerow}>
            <View style={styles.dot} />
            <View>
              <Text style={styles.nameText}>{senderName}</Text>
              <Text style={styles.locationText}>{senderLocation}</Text>
            </View>
            <Text style={styles.locationText}>{senderMobile}</Text>
          </View>

          <View style={styles.iconrow}>
            <Text>|</Text>
            <TouchableOpacity>
              <MaterialIcons name="swap-vert-circle" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.namerow}>
            <View style={styles.dot} />
            <View>
              <Text style={styles.nameText}>{receiverName}</Text>
              <Text style={styles.locationText}>{receiverLocation}</Text>
            </View>
            <Text style={styles.locationText}>{receiverMobile}</Text>
          </View>
        </View>

        <View style={styles.vehicalContainer}>
          {vehicleData.map((vehicle, index) => (
            <View key={index}>
              <TouchableOpacity style={styles.vehicalrow} onPress={() => handleVehicleSelect(vehicle)}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: vehicle.vehicleImage }} style={styles.vehicleImage} resizeMode="contain" />
                </View>

                <View style={styles.middleContainer}>
                  <Text style={styles.vehicleType}>{vehicle.vehicleCategory}</Text>
                  <Text style={styles.vehicleWeight}>{vehicle.weight} kg</Text>
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.basePrice}>{vehicle.price}</Text>
                  <Text style={styles.discountRate}>1500</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
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
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    height: hp("7%"),
    backgroundColor: "white",
    paddingLeft: wp("5%"),
  },
  applyCouponText: {
    marginLeft: wp("2%"),
    fontSize: wp("4%"),
    fontWeight: "bold",
    justifyContent: "center",
    fontSize: 18,
  },
  detailsContainer: {
    backgroundColor: "white",
    padding: wp("4%"),
    borderRadius: wp("2%"),
    marginTop: hp("2%"),
    width: wp("90%"),
    alignSelf: "center",
    height: hp("20%"),
  },
  namerow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: hp("1%"),
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "green",
    marginHorizontal: wp("5%"),
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconrow: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: wp("5%"),
  },
  vehicalContainer: {
    backgroundColor: "white",
    padding: wp("4%"),
    borderRadius: wp("2%"),
    marginTop: hp("2%"),
    width: wp("98%"),
    alignSelf: "center",
    height: hp("65%"),
    marginTop: hp("3%"),
  },
  vehicalrow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "whitesmoke",
    marginVertical: hp("1%"),
  },
  imageContainer: {
    marginRight: wp("3%"),
  },
  vehicleImage: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("2%"),
  },
  middleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  vehicleType: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
  },
  vehicleWeight: {
    fontSize: wp("3%"),
    color: "#666666",
  },
  priceContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  basePrice: {
    fontSize: wp("4%"),
    color: "#000000",
    marginBottom: hp("1%"),
  },
  discountRate: {
    fontSize: wp("3%"),
    color: "red",
    textDecorationLine: "line-through",
  },
});

export default Transport4;
