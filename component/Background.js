import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function Background() {

    return (

        <LinearGradient
            // Background Linear Gradient
            colors={['#4CE5B1', '#63ABF900']}
            style={styles.background}>
            <View style={{}}>
                <Text style={styles.login}>Smart Safar</Text>
                <Text style={styles.label}>Safety Sharing Ride</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    login: {
        color: 'white',
        fontFamily: 'Inter-Black',
        fontSize: responsiveFontSize(4),
        fontStyle: 'normal',
        fontWeight: '700',
        marginLeft: wp("45%"),
        marginTop: hp("10%"),
    },
    label: {
        color: 'white',
        // marginTop: -7,
        width: wp("40%"),
        fontFamily: 'Inter-Black',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        marginLeft: wp("50%"),
    },
});