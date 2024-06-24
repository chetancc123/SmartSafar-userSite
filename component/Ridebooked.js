import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import Popup2 from './modal3';
// import Popup from './Modal2';
import Popup3 from './Modal4';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Ridebooked({ navigation }) {
    // const navigation = useNavigation();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false); // Hide the component
            navigation.navigate('DeriverConnect'); // Navigate to the next screen
        }, 3000); // 3 seconds

        // Clear the timer on component unmount to avoid memory leaks
        return () => clearTimeout(timer);
    }, []);
    return (

        <View style={styles.container} >
            <LinearGradient
                // Background Linear Gradient
                colors={['#4CE5B1', '#63ABF900']}
                style={styles.background}
            />

            <View style={styles.navigation1}>
                <View style={styles.icon}>
                    <Ionicons name="chevron-back" size={20} color="black" />
                    <Text style={styles.bold}>Back</Text>
                </View>
                <Popup3 />
                {/* <Popup /> */}
                <View style={styles.heder1}>
                    <Text style={styles.bold}>Request for rent</Text>
                </View>

                <View style={styles.logo}>
                    <Text style={styles.login1}>Smart Safar</Text>
                    <Text style={styles.label1}>Safety Sharing Ride</Text>
                </View>
            </View>
            <View style={styles.container1} >
                <Text style={styles.bold}>Thank You</Text>
                <Text>Your booking has been placed sent to</Text>
                <Text> Mr. John</Text>
                <View style={{ marginTop: 60 }}>
                    <Image source={require('../img/jyu.png')} />
                </View>
                <StatusBar style="auto" />
            </View>
        </View>


    );
}

const styles = StyleSheet.create({
    navigation1: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-around',
        // textAlign: 'center',
        alignItems: 'center',
        marginTop: 55
    },

    icon: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-around',
        // textAlign: 'center',
        alignItems: 'center',
        fontWeight: 'bold'

    },

    login1: {
        color: 'white',
        // fontFamily: "Roboto-Black",
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '900',
        // marginLeft: 250,
        // marginTop: 35,

    },
    label1: {
        color: 'white',
        // marginTop: 7,
        // width: 87,
        // fontFamily: "Roboto-Black",
        fontSize: 14,
        fontStyle: 'normal',
        top: -3
        // fontWeight: '400',
        // marginLeft: 252,
    },

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 600,
    },
    login: {
        color: 'white',
        // fontFamily: "Roboto-Black",
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: '700',
        marginLeft: 250,
        marginTop: 35,
    },
    label: {
        color: 'white',
        marginTop: -7,
        width: 87,
        // fontFamily: "Roboto-Black",
        fontSize: 7,
        fontStyle: 'normal',
        fontWeight: '400',
        marginLeft: 252,
    },
    container1: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 260,
    },

    bold: {
        fontWeight: 'bold',
    }
});