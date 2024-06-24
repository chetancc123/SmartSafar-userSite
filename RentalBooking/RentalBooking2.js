import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from "../component/Menu";
import { url } from '../component/config';


const RentalBooking2 = ({ navigation, route }) => {
    const [currentPage, setCurrentPage] = useState("standard");
    const [standardCars, setStandardCars] = useState([]);
    const [premiumCars, setPremiumCars] = useState([]);
    const [selectedCircle, setSelectedCircle] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);


    const handleNext = async (car) => {
        if (selectedCircle === null) {
            Alert.alert("Error", "Please select a time slot before proceeding.");
        } else {
            // console.log("Selected Circle Text:", data[selectedCircle].text);
            // console.log("Selected Car:", car.vehicleId);
            // console.log("Selected Circle Subtext:", data[selectedCircle].subText);
            // const selectedData = {
            //     timeSlot: data[selectedCircle],
            //     carType: currentPage,
            // };
            await AsyncStorage.setItem('selectedCircleText', data[selectedCircle].text);
            await AsyncStorage.setItem('selectedCircleSubtext', data[selectedCircle].subText);
            await AsyncStorage.setItem('carType', currentPage);
            await AsyncStorage.setItem('selectedCar', JSON.stringify(car));
            navigation.navigate("RentalBooking3"); // Pass the selected data to Rental10
        }
    };
    useEffect(() => {
        const fetchStandardCars = async () => {
            try {
                const response = await fetch(
                    `http://${url}:8080/user/standardVehiclesList`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch standard cars");
                }
                const data = await response.json();
                // console.log("Standard Cars Data:", data); // Log the data to the console
                setStandardCars(data);
            } catch (error) {
                console.error(error);
                // Handle error, e.g., display a message to the user
            }
        };

        const fetchPremiumCars = async () => {
            const response = await fetch(
                `http://${url}:8080/user/premiumVehiclesList`
            );
            const data = await response.json();
            // console.log("Premium Cars Data:", data); // Log the data to the console
            setPremiumCars(data);
        };
        fetchStandardCars();
        fetchPremiumCars();
    }, []);

    // const { source, destination, selectedPickupDate, selectedPickupTime } = route.params;

    const data = [
        { text: "4", subText: "40" },
        { text: "5", subText: "50" },
        { text: "6", subText: "60" },
        { text: "7", subText: "70" },
        { text: "8", subText: "80" },
        { text: "9", subText: "90" },
        { text: "10", subText: "100" },
        { text: "11", subText: "110" },
        { text: "12", subText: "120" },
    ];

    const switchToStandard = () => {
        setCurrentPage("standard");
    };

    const switchToPremium = () => {
        setCurrentPage("premium");
    };


    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={["#A7F57A", "#BDE6D9"]} style={styles.background}>
                <Menu />


                <ScrollView horizontal={true} contentContainerStyle={styles.scrollView}>
                    <View style={styles.circleContainer}>
                        {data.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.circle,
                                    selectedCircle === index && styles.selectedCircle,
                                ]}
                            >
                                <TouchableOpacity
                                    style={styles.circleTouch}
                                    onPress={() => setSelectedCircle(index)}
                                >
                                    <Text style={styles.text}>{item.text}hr</Text>
                                    <Text style={styles.text}>{item.subText}km</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </LinearGradient>
            <View style={styles.selectCarTextContainer}>
                <Text style={styles.selectCarText}>Select car</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        currentPage === "standard" && styles.selectedButton,
                    ]}
                    onPress={switchToStandard}
                >
                    <Text style={styles.buttonText}>Standard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        currentPage === "premium" && styles.selectedButton,
                    ]}
                    onPress={switchToPremium}
                >
                    <Text style={styles.buttonText}>Premium</Text>
                </TouchableOpacity>
            </View>
            {currentPage === "standard" && (
                <View style={styles.priceContainer}>
                    <ScrollView vertical={true}>
                        {standardCars.map((car, index) => (
                            <TouchableOpacity onPress={() => handleNext(car)}>
                                <View key={index} style={styles.whiteBox}>
                                    {/* Use the car object from the state variable */}
                                    <Image
                                        source={{ uri: car.vehicleImgLink }}
                                        style={styles.carImage}
                                    />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.priceText}>{car.vehicleName}</Text>
                                        <Text style={styles.priceText}>
                                            Seats: {car.seatingCapacity}
                                        </Text>
                                    </View>
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.price}>{car.pricePerKm} km/hr</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
            {currentPage === "premium" && (
                <View style={styles.priceContainer}>
                    <ScrollView vertical={true}>
                        {premiumCars.map((car, index) => (
                            <TouchableOpacity onPress={() => handleNext(car)}>
                                <View key={index} style={styles.whiteBox}>
                                    <Image
                                        source={{ uri: car.vehicleImgLink }}
                                        style={styles.carImage}
                                    />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.priceText}>{car.vehicleName}</Text>
                                        <Text style={styles.priceText}>
                                            Seats: {car.seatingCapacity}
                                        </Text>
                                    </View>
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.price}>{car.pricePerKm} km/hr</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
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
    },

    text1: {
        fontSize: 40,
        color: "#FFF",
        fontWeight: "bold",
    },
    text2: {
        fontSize: 20,
        color: "#FFF",
        marginTop: 10,
    },
    scrollView: {
        alignItems: "flex-start",
        marginTop: hp("2%"),

    },
    circleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp("1%")
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
    },
    selectCarText: {
        fontSize: hp("2.5%"),
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: wp("10%"),
        marginTop: hp("2%"),
        bottom: hp("63%"),
        position: "absolute",
    },
    button: {
        width: wp("44%"),
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: "center",
    },
    selectedButton: {
        backgroundColor: "#A7F57A", // You can change the color to indicate selection
    },
    buttonText: {
        fontSize: hp("2%"),
    },
    priceContainer: {
        flex: 1,
        alignItems: "flex-end",
    },
    whiteBox: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        width: wp("90%"),
        marginTop: hp("3%"),
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 20,
    },
    priceText: {
        fontSize: hp("2%"),
    },
    price: {
        fontSize: hp("2%"),
        fontWeight: "bold",
    },
    carImage: {
        width: wp("20%"),
        height: wp("20%"),
        resizeMode: "contain",
        marginRight: wp("5%"),
    },
    textContainer: {
        marginLeft: wp("5%"),
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
        marginRight: 2,
    },
    menuIcon: {
        marginRight: 20,
    },
    selectedCircle: {
        backgroundColor: "#006400", // Change this to the desired color
    },
});

export default RentalBooking2;
