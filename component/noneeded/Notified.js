import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';//install this 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function Notified(props) {
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
                source={require('../img/n1.png')}
                style={styles.location}
            />

            <Text style={styles.text1}>Do you want to get notified ?</Text>

            <Text style={styles.text2}> Then you won’t miss offer, messages and calls From your driver or special offers reminder</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button]} onPress={() => props.navigation.navigate('HomeWriten')}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button1]}
                    onPress={() => props.navigation.navigate('HomeWriten')}
                >
                    <Text style={styles.buttonText1}>Later</Text>
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
        marginTop: hp('5%'),
        width:wp("50%")

    },

    label: {
        color: 'white',
        // marginTop: hp('-1%'),
        width: wp('50%'),

        fontSize: 16,

        marginLeft: wp('72%'),
    },

    location: {
        width: wp('135%'),
        height: hp('38%'),
        resizeMode: 'contain',
        top: hp('10%'),
    },

    text1: {
        top: hp('12%'),
        textAlign: 'center',
        fontSize: hp('2%'),

    },

    text2: {
        top: hp('12%'),
        textAlign: 'center',
        fontSize: hp('2%'),


    },



    button: {

        backgroundColor: '#13C39C',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp('2%'),
        width: wp('90%'),
        height: wp('12%'),
        top: hp('20%'),


    },

    button1: {

        width: wp('90%'),
        height: wp('12%'),
        backgroundColor: '#5A5B5B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp('2%'),
        top: hp('25%'),

    },



    buttonText: {
        color: 'white',
        fontSize: 20,
    },

    buttonText1: {
        color: 'white',
        fontSize: 20,
    },



});


