import React, { useCallback } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import {
    View,
    StyleSheet,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Alert
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Transport3 = ({ navigation }) => {

    const handleTruckSelection = useCallback(async () => {
        try {
            // Retrieve necessary data from AsyncStorage
            const senderLatitude = 21.2390552;
            const senderLongitude = 81.6552196;
            const senderLocation = 'Raipur, Chhattisgarh';
            const senderAddress = await AsyncStorage.getItem('homeSender');
            const senderName = await AsyncStorage.getItem('senderName');
            const senderPhoneNumber = await AsyncStorage.getItem('senderMobile');
            const receiverLatitude = 22.2977922;
            const receiverLongitude = 82.0236751;
            const receiverLocation = 'Kargi Road Kota, Bilaspur';
            const receiverAddress = await AsyncStorage.getItem('homeReceiver');
            const receiverName = await AsyncStorage.getItem('receiverName');
            const receiverPhoneNumber = await AsyncStorage.getItem('receiverMobile');
            const vehicleType = 'FOUR_WHEELER';

            // Prepare the payload for the POST request
            const payload = {
                senderLatitude,
                senderLongitude,
                senderLocation,
                senderAddress,
                senderName,
                senderPhoneNumber,
                receiverLatitude,
                receiverLongitude,
                receiverLocation,
                receiverAddress,
                receiverName,
                receiverPhoneNumber,
                vehicleType,
                totalDistance: null,
                expectedTime: null,
            };

            // Configure the fetch request
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            };

            // Send the POST request to your backend server
            const response = await fetch(
                'http://192.168.1.14:8080/user/courier/1/select',
                requestOptions
            );

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const result1 = await response.json(); // Parse JSON response
            console.log('API Response:', result1);

            // Store the response in AsyncStorage
            await AsyncStorage.setItem('fourwheelerResponse', JSON.stringify(result1));

            // Navigate to the next screen
            navigation.navigate('Transport4');

        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to select truck. Please try again.');
        }
    }, [navigation]);

    const handleTwoWheelerSelection = useCallback(async () => {
        try {
            const senderLatitude = 21.2390552;
            const senderLongitude = 81.6552196;
            const senderLocation = 'Raipur, Chhattisgarh';
            const senderAddress = await AsyncStorage.getItem('homeSender');
            const senderName = await AsyncStorage.getItem('senderName');
            const senderPhoneNumber = await AsyncStorage.getItem('senderMobile');
            const receiverLatitude = 22.2977922;
            const receiverLongitude = 82.0236751;
            const receiverLocation = 'Kargi Road Kota, Bilaspur';
            const receiverAddress = await AsyncStorage.getItem('homeReceiver');
            const receiverName = await AsyncStorage.getItem('receiverName');
            const receiverPhoneNumber = await AsyncStorage.getItem('receiverMobile');
            const vehicleType = 'TWO_WHEELER';

            const payload = {
                senderLatitude,
                senderLongitude,
                senderLocation,
                senderAddress,
                senderName,
                senderPhoneNumber,
                receiverLatitude,
                receiverLongitude,
                receiverLocation,
                receiverAddress,
                receiverName,
                receiverPhoneNumber,
                vehicleType,
                totalDistance: null,
                expectedTime: null,
            };

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            };

            const response = await fetch(
                'http://192.168.1.14:8080/user/courier/1/select-two-wheeler',
                requestOptions
            );

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const result = await response.json(); // Parse JSON response
            

            // Store the response in AsyncStorage
            await AsyncStorage.setItem('twowheelerResponse', JSON.stringify(result));
            console.log('API Response:', result);
            

            // Navigate to the next screen
            navigation.navigate('Transport4');

        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to select two-wheeler. Please try again.');
        }
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={["#A7F57A", "#BDE6D9"]}
                style={styles.background}
            >
                <View style={styles.box3}>
                    <View style={styles.box}>
                        <Text style={styles.text}>Smart Safar</Text>
                        <Text style={styles.text1}>Safety Sharing Ride</Text>
                    </View>
                    <View style={styles.box2}>
                        <TouchableOpacity>
                            <Ionicons name="notifications" size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="menu" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    

                </View>
                <View style={styles.container3}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.container1} onPress={handleTwoWheelerSelection} >
                            <Image source={require('../img/bike.png')} />
                            <Text>2 Wheelers</Text>
                            <Text>for smaller Works</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.container1} onPress={handleTruckSelection}>
                            <Image source={require('../img/transport.png')} />
                            <Text>4 Wheelers</Text>
                            <Text>Choose from our fleet</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container2}>
                        <Image source={require('../img/top.png')} />
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
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: hp("100%"),
        flex: 1,
    },
    text: {
        color: 'white',
        fontSize: 30,
    },
    text1: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 10,
    },
    box: {
        width: wp('40%'),
        marginLeft: wp(5),
        flexDirection: 'column',
    },
    box3: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    box2: {
        flexDirection: 'row',
        margin: wp('4%'),
    },
    container1: {
        width: wp('45%'),
        height: hp('20%'),
        margin: wp('1%'),
        borderRadius: 20,
        borderColor: 'green',
        backgroundColor: 'white',
        padding: wp('2%'),
        alignItems: "center",
    },
    container3: {
        marginTop: wp('10%'),
        padding: wp('3%'),
        alignSelf: 'center'
    },
    container2: {
        top: hp('10%')
    },
    container4: {
        width: wp('45%'),
        height: hp('18%'),
        margin: 5,
        borderRadius: 20,
        borderColor: 'green',
        backgroundColor: 'white',
        padding: wp('2%'),
        alignSelf: 'center'
    },
});

export default Transport3;
