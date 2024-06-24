import { useRef, useEffect } from 'react';
import { Image, StyleSheet, Text, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BackGround from '../Styles/BackGround';

const Landing = ({ navigation }) => {

    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animateImage();
    }, []);

    const animateImage = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000, // Adjust the duration as needed
            useNativeDriver: false, // This is required for certain properties, e.g., marginLeft
        }).start();
    };

    const marginLeft = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-200, 200], // Adjust the values based on the distance you want the image to travel
    });


    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');  // Replace 'NextScreen' with the name of your next screen
        }, 2000);  // 2 seconds

        return () => clearTimeout(timer);
    }, [navigation]);
    return (
        // <SafeAreaView>
        <SafeAreaView style={{ flex: 1 }} >
            <LinearGradient
                // Background Linear Gradient
                colors={['#4CE5B1', '#63ABF900']}
                style={BackGround.background}

            >
                <View style={styles.container}>
                    <Text style={styles.rido}>Smart Safar</Text>
                    <Text style={styles.text}>Safety Sharing Ride</Text>
                </View>
                <Animated.Image
                    style={[styles.img, { marginLeft }]}
                    source={require('../img/logo.gif')}
                />
            </LinearGradient>
        </SafeAreaView>
        // </SafeAreaView>
    )
}

export default Landing;

const styles = StyleSheet.create({
    container: {
        marginTop: hp("20%"),
        
        justifyContent:"center",
        width: 128,
        height: 59,
        flexShrink: 0,
        alignItems: 'flex-start',
        
        alignSelf:"center"

    },
    rido: {
        width: wp("60%"),
        height: hp("4%"),
        color: 'white',
        // fontFamily: 'itlaic',
        fontSize: 30,
        fontWeight: "700",
        textAlign: 'left',

    },
    text: {
        width: 150,
        height: 30,
        color: '#FFF',
        // fontFamily: 'itlaic',
        fontSize: 16,
        fontWeight: "700",
        textAlign: 'left',
    },
    img: {
        width: 179,
        height: 149,
        marginRight: 180,
        marginTop: 100,
        transform: [{ rotateY: '-180deg' }],

    }
})