import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Nav from './Nav';
import * as Location from 'expo-location';
import { Linking } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Menu from './Menu';


// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Home = ({ navigation }) => {
    // const data = SessionStorage.getItem('token', 'username');
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [greeting, setGreeting] = useState('');


    useEffect(() => {
        const checkGPS = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log('GPS status:', status);
            if (status === 'granted') {
                console.log(status + "status")
                console.log("status")
            } else {
                // Prompt the user to enable GPS
                Alert.alert(
                    'Permission required',
                    'Please enable GPS to proceed',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                // Open device settings to enable GPS
                                Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings();
                            },
                        },
                    ],
                    { cancelable: false }
                );
            }
        };

        checkGPS();

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            const storedName = await AsyncStorage.getItem('name');
            console.log('Stored token:', storedToken);
            console.log('Stored username:', storedName);
            setToken(storedToken || '');
            setName(storedName || '');

            const currentHour = new Date().getHours();
            if (currentHour < 12) {
                setGreeting('Good Morning');
            } else if (currentHour < 18) {
                setGreeting('Good Afternoon');
            } else {
                setGreeting('Good Evening');
            }
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
        }
    };

    const [show, setShow] = useState(false);
    const display = () => {
        setShow(true)
    }
    const hide = () => {
        setShow(false)
    }
    const navigateToHome = () => {
        // Navigate to the 'Home' screen
        navigation.navigate('Home');
        // Close the modal
        hide();
    };
    const navigateToSetPassword = () => {
        // Navigate to the 'Home' screen
        navigation.navigate('ChangePassword');
        // Close the modal
        hide();
    };
    const navigateToHistory = () => {
        // Navigate to the 'Home' screen
        navigation.navigate('History_Upcoming');
        // Close the modal
        hide();
    };
    const navigateToProfile = () => {
        // Navigate to the 'Home' screen
        navigation.navigate('Profile');
        // Close the modal
        hide();
    };

    const NavigatePrivacy = () => {
        // Navigate to the 'Home' screen
        navigation.navigate('Privacy');
        // Close the modal
        hide();
    };
    const NavigateContact = () => {
        // Navigate to the 'Home' screen
        navigation.navigate('ContactUs');
        // Close the modal
        hide();
    };

    const handleLogout = async () => {
        try {
            // Remove stored items from AsyncStorage
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('name');
            await AsyncStorage.removeItem('id');
            // Navigate to the login page
            navigation.navigate('Login');
            hide();
        } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('An error occurred while logging out');
        }
    };

    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');

    const swapText = () => {
        // Swap the values of text1 and text2
        const temp = text1;
        setText1(text2);
        setText2(temp);
    };

    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(!isPressed);
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <LinearGradient
                colors={['#4CE5B1', '#63ABF900']}
                style={styles.background}>
                <Menu />
                <View style={{}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: hp("5%"), }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ScheduleBook1')} style={styles.section}>
                            <Text style={styles.texxt}>Quick Ride</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('RentalBooking1')} style={styles.section}>
                            <Text style={styles.texxt}>Rental Car</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Transport1')} style={styles.section}>
                            <Image source={require('../img/transporto.gif')} style={styles.transporto}/>
                            {/* <Text style={styles.texxt}>Schedule Book</Text> */}
                        </TouchableOpacity>
                    </View>
                    <View style={{margin: wp('5%'), marginTop: wp('15%')}}>
                        <Text style={styles.text1}> Our company</Text>

                        <Text style={styles.text2}>
                            Enguin taxi give s safe and dependable transportation to your business
                            and families needs. We offer an stylish, dependable and, maximum
                            importantly, secure provider for all our clients. Above all, our task is
                            to offer an high-quality limousine provider for our customers and to
                            have an extended listing of happy clients, who again and again use our
                            provider due to the amazing and secure provider we offer.
                        </Text>

                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default Home;

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    section: {
        width: wp("25%"),
        height: wp("25%"),
        backgroundColor: '#13C39C',
        borderRadius: wp("100%"),
        justifyContent: 'center',
        alignItems: 'center'
    },
    book: {
        color: 'grey',
        width: wp("5%"),
        height: hp("3%"),
        marginLeft: wp("2%"),
        marginTop: hp("2%"),
        textAlignVertical: 'center'
    },
    buttonPressed: {
        color: 'blue'
    },
    texxt: {
        fontSize: 14,
        fontWeight: "bold"
    },
    text1:{
        fontSize: 20,
        fontWeight: "bold"
    },
    text2:{
        fontSize: 16,
    },
    transporto:{
        width: wp('10%'),
        height: hp('10%'),
        padding: wp('10%')
    },
})