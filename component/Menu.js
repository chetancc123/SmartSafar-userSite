import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Nav from './Nav';

const Menu = () => {
    const [name, setName] = useState("");
    const [show, setShow] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedname = await AsyncStorage.getItem('name');
                setName(storedname || '');
            } catch (error) {
                console.error('Error retrieving data from AsyncStorage:', error);
            }
        };
        fetchData();
    }, []);

    const display = () => setShow(true);
    const hide = () => setShow(false);
    const navigateToHome = () => { navigation.navigate('Home'); hide(); };
    const navigateToSetPassword = () => { navigation.navigate('ChangePassword'); hide(); };
    const navigateToHistory = () => { navigation.navigate('History'); hide(); };
    const navigateToProfile=()=>{navigation.navigate('Profile'); hide();};
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
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('name');
            await AsyncStorage.removeItem('id');
            navigation.navigate('Login');
            hide();
        } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('An error occurred while logging out');
        }
    };

    return (
        <LinearGradient colors={['#13C39C', '#13C39C']} style={styles.button}>
        <Nav isDisplay={show} isHide={hide} navigateToHome={navigateToHome} navigateToSetPassword={navigateToSetPassword} navigateToHistory={navigateToHistory} handleLogout={handleLogout} navigateToProfile={navigateToProfile} NavigatePrivacy={NavigatePrivacy} NavigateContact={NavigateContact}/>

            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.rido}>Smart Safar</Text>
                    <Text style={styles.text}>Safety Sharing Ride</Text>
                </View>

                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.icon}>
                        <FontAwesome name="bell" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <MaterialCommunityIcons onPress={display} name="menu" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.greetingContainer}>
                <Text style={styles.greeting}>Good Morning,</Text>
                <Text style={styles.userName}>{name}</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp("3%"),
        // paddingVertical: hp("2%"),
    },
    titleContainer: {
        justifyContent: 'center',
    },
    rido: {
        color: 'white',
        fontSize: 25,
        fontWeight: "500",
        textAlign: 'left',
    },
    text: {
        color: '#FFF',
        fontSize: 13,
        fontWeight: "700",
        textAlign: 'left',
    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: wp("3%"),
    },
    button: {
        borderRadius: wp("2%"),
        marginTop: hp("2%"),
        width: wp("90%"),
        alignSelf: "center",
        height: hp("14%"),
        padding: hp("2%"),
        // flex:1,
    },
    greetingContainer: {
        // marginTop: hp("6%"),
        alignItems: 'center',
    },
    greeting: {
        fontSize: 25,
        fontWeight: "500",
        color: '#FFF',
    },
    userName: {
        fontSize: 20,
        fontWeight: "500",
        color: '#FFF',
        textAlign: 'center',
    }
});

export default Menu;
