import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from "@react-native-community/datetimepicker";
import Menu from "./Menu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Nav from "./Nav";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Map from "../transport/Map";
import {url} from './config';

const ScheduleBook1 = ({ navigation }) => {
  const [id, setId] = useState("");
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [places, setPlaces] = useState([
    "Magnato",
    "Marin Drive",
    "New Raipur",
    "Raipur",
    "Railway",
    "Airport",
    "Gadhi Chock",
  ]);
  const [filteredPlaces1, setFilteredPlaces1] = useState([]);
  const [filteredPlaces2, setFilteredPlaces2] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchText2, setSearchText2] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedId = await AsyncStorage.getItem("id");
        const storedname = await AsyncStorage.getItem("name");
        console.log("Stored id:", storedId);
        setId(storedId || "");
        setName(storedname || "");

        const currentHour = new Date().getHours();
        if (currentHour < 12) {
          setGreeting("Good Morning");
        } else if (currentHour < 18) {
          setGreeting("Good Afternoon");
        } else {
          setGreeting("Good Evening");
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };
    fetchData();
  }, []);

  const showDateTimePicker = () => {
    setIsDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setIsDateTimePickerVisible(false);
  };

  const handleDatePicked = (selectedDate) => {
    hideDateTimePicker();
    if (mode === "date") {
      setDate(selectedDate);
    } else {
      setTime(selectedDate);
    }
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
    showDateTimePicker();
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    setFilteredPlaces1(places);
    setFilteredPlaces2(places);
    // GetPromoCodeList();
  }, [places]);

  const handlePlaceSelection = (selectedPlace) => {
    setSearchText(selectedPlace);
    // if (selectedPlace === 'Magnato') {
    //     const magnatoData = {
    //         address: "Magneto Mall Raipur",
    //         userLatitude: 21.2409,
    //         userLongitude: 81.6842
    //     };
    //     setFilteredPlaces1([magnatoData]);
    // } else {
    //     // setFilteredPlaces1([]);
    // }
    setFilteredPlaces1([]);
  };

  const handlePlaceSelection2 = (selectedPlace) => {
    setSearchText2(selectedPlace);
    // if (selectedPlace === 'Raipur') {
    //     const magnatoData = {
    //         address: "Raipur",
    //         userLatitude: 21.2409,
    //         userLongitude: 81.6842
    //     };
    //     setFilteredPlaces2([magnatoData]);
    // } else {
    //     setFilteredPlaces2([]);
    // }
    setFilteredPlaces2([]);
  };

  const handlePlaceChange = (text) => {
    setSearchText(text);
    const filtered = places.filter((place) =>
      place.toLowerCase().startsWith(text.toLowerCase())
    );
    setFilteredPlaces1(filtered);
  };

  const handlePlaceChange2 = (text) => {
    setSearchText2(text);
    const filtered = places.filter((place) =>
      place.toLowerCase().startsWith(text.toLowerCase())
    );
    setFilteredPlaces2(filtered);
  };

  const Booking = async () => {
    try {
      const data =
      // {
      //     pickupLocation: {
      //         address: "123 Main St",
      //         userLatitude: 21.2407,
      //         userLongitude: 81.6604
      //     },
      //     dropOffLocation: {
      //         address: "456 Elm St",
      //         userLatitude: 20.7114,
      //         userLongitude: 82.0120
      //     },
      //     timeDuration: {
      //         startDateTime: "2024-03-01T10:30:30.1902633",
      //         endDateTime: "2024-03-01T12:30:30.1902633"
      //     },
      //     packageType: "PREMIUM",
      //     promoCode: "PROMO10"
      // };
      {
        pickupLat: 5.7749,
        pickupLon: -0.4194,
        dropoffLat: 5.3352,
        dropoffLon: -1.8811,
        vehicleType: "FOUR_WHEELER",

        startDateTime: "2024-04-30T18:00:00",
      };
      // const response = await fetch(`http://10.0.2.2:8080/user/calculate/1/${id}`, {
      const response = await fetch(
        `http://192.168.1.14:8080/user/schedule-ride/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (response.ok) {
        // Alert.alert('data send')
        // console.log(result.bookingId);
        if (result && result.bookingId) {
          await AsyncStorage.setItem("BookingId", result.bookingId.toString());
          navigation.navigate("BookInitialize");
        } else {
          console.error("Error: ID not found in response");
          // Handle the case where result.id is missing
        }
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error sending data to backend:", error.message);
    }
  };

  const [show, setShow] = useState(false);
  const display = () => {
    setShow(true);
  };
  const hide = () => {
    setShow(false);
  };
  const navigateToHome = () => {
    // Navigate to the 'Home' screen
    navigation.navigate("Home");
    // Close the modal
    hide();
  };
  const navigateToSetPassword = () => {
    // Navigate to the 'Home' screen
    navigation.navigate("ChangePassword");
    // Close the modal
    hide();
  };
  const navigateToHistory = () => {
    // Navigate to the 'Home' screen
    navigation.navigate("History_Upcoming");
    // Close the modal
    hide();
  };
  const navigateToContactUs = () => {
    // Navigate to the 'Home' screen
    navigation.navigate("History_Upcoming");
    // Close the modal
    hide();
  };
  const handleLogout = async () => {
    try {
      // Remove stored items from AsyncStorage
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("name");
      await AsyncStorage.removeItem("id");
      // Navigate to the login page
      navigation.navigate("Login");
      hide();
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("An error occurred while logging out");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>

        <Map />
        <Menu />
        <Nav
          isDisplay={show}
          isHide={hide}
          navigateToHome={navigateToHome}
          navigateToSetPassword={navigateToSetPassword}
          navigateToHistory={navigateToHistory}
          handleLogout={handleLogout}
        />
        <View style={styles.parent}>
          <View style={styles.divider} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Select address</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Select pickup address"
                style={styles.input}
                onChangeText={handlePlaceChange}
                value={searchText}
              />
            </View>
          </View>
          {/* {searchText !== "" && (
          <FlatList
            data={filteredPlaces1}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePlaceSelection(item)}>
                <View style={styles.filteredItem}>
                  <Text style={styles.filteredItemText}>{item}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )} */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Select delivery address"
                style={styles.input}
                onChangeText={handlePlaceChange2}
                value={searchText2}
              />
            </View>
          </View>
          {/* {searchText2 !== "" && (
          <FlatList
            data={filteredPlaces2}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePlaceSelection2(item)}>
                <View style={styles.filteredItem}>
                  <Text style={styles.filteredItemText}>{item}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )} */}
          <View style={styles.pickupTimeContainer}>
            <Text style={styles.pickupTimeText}>Select pickup Time</Text>
          </View>
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeWrapper}>
              <Text style={styles.text}>Date:</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={showDatepicker}
              >
                <Text style={styles.buttonText}>{formatDate(date)}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dateTimeWrapper}>
              <Text style={styles.text}>Time:</Text>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={showTimepicker}
              >
                <Text style={styles.buttonText}>{formatTime(time)}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {isDateTimePickerVisible && (
            <DateTimePicker
              value={mode === "date" ? date : time}
              mode={mode}
              is24Hour={false}
              display="default"
              onChange={(event, selectedDate) =>
                handleDatePicked(selectedDate || new Date())
              }
            />
          )}
          <TouchableOpacity onPress={Booking} style={styles.scheduleButton}>
            <Text style={styles.scheduleButtonText}>Schedule</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  parent: {
    borderRadius: 25,
    backgroundColor: "#fff",
    paddingHorizontal: wp("5%"),
    marginTop: hp("45%"),
    paddingVertical: wp("7%"),
  },
  divider: {
    // marginVertical: hp("1%"),
  },
  titleContainer: {
    marginBottom: hp("1%"),
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    marginVertical: hp("0.5%"),
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: wp("2%"),
    borderColor: "#ccc",
    padding: wp("2%"),
  },
  input: {
    fontSize: wp("4%"),
  },
  filteredItem: {
    padding: wp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  filteredItemText: {
    fontSize: wp("4%"),
  },
  pickupTimeContainer: {
    marginVertical: hp("1%"),
  },
  pickupTimeText: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    // marginVertical: hp("1%"),
  },
  dateTimeWrapper: {
    width: wp('30%'),
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between'
  },
  text: {
    fontSize: wp("4%"),
  },
  dateButton: {
    padding: wp("2%"),
    backgroundColor: "#eee",
    borderRadius: wp("2%"),
    marginTop: hp("1%"),
  },
  timeButton: {
    padding: wp("2%"),
    backgroundColor: "#eee",
    borderRadius: wp("2%"),
    marginTop: hp("1%"),
  },
  buttonText: {
    fontSize: wp("4%"),
  },
  scheduleButton: {
    backgroundColor: '#13C39C',
    marginTop: hp("2%"),
    alignItems: "center",
    height: hp("5%"),
    padding: wp("2%"),
    borderRadius: hp("1%")
  },
  //   scheduleButtonGradient: {
  //     width: "100%",

  //     paddingVertical: hp("2%"),
  //     borderRadius: wp("2%"),
  //     alignItems: "center",
  //   },
  scheduleButtonText: {
    color: "#fff",
    fontSize: wp("5.5%"),
    fontWeight: "bold",

  },
});

export default ScheduleBook1;
