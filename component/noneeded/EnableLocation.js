import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';//install this 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function EnableLocation(props) {
    return (

        <View style={styles.container} >
            <LinearGradient
                // Background Linear Gradient
                colors={['#4CE5B1', '#63ABF900']}
                style={styles.background}
            />

            <Text style={styles.logo}>Smart Safar</Text>
            <Text style={styles.label}>Safety Sharing Ride</Text>


            <Image
                source={require('../img/location.png')}
                style={styles.location}
            />

            <Text style={styles.text1}>Turn your location on </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Notified')}>
                    <Text style={styles.buttonText}>Enable location service</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button1]}
                    onPress={() => props.navigation.navigate('Notified')}
                >
                    <Text style={styles.buttonText1}>Skip</Text>
                </TouchableOpacity>
            </View>




        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',

    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: hp('100%'),
    },

    logo: {
        color: 'white',
        fontSize: 30,
        fontWeight: '700',
        marginLeft: wp('65%'),
        marginTop: hp('13%'),
        width:wp("50%")

    },

    label: {
        color: 'white',
        marginTop: hp('-1%'),
        width: wp('25%'),
        fontSize: 16,
        marginLeft: wp('72%'),
        width:wp("50%")
    },


    location: {
        width: wp('90%'),
        marginTop: hp('-35%'),
        resizeMode: 'contain',

    },

    text1: {
        top: hp("12%"),
        textAlign: 'center',
        fontSize: 20,

    },



    button: {
        width: wp('90%'),
        height: wp('12%'),
        backgroundColor: '#13C39C',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp('2%'),

        bottom: hp('35%')


    },

    button1: {

        height: 45,
        backgroundColor: '#5A5B5B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        bottom: hp('30%'),
    },




    buttonText: {
        color: 'white',
        fontSize: hp('2%'),


    },

    buttonText1: {
        color: 'white',
        fontSize: hp('2%')

    },



});


