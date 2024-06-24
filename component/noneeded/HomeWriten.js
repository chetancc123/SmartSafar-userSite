import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions, } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

export default function HomeWriten(props) {
    const [data, setData] = useState([
        {
            paragraphs: ["Introducing doorstep delivery; get car at your home or airport"],
        },
        {
            paragraphs: [
                "Feel the luxury ride with us  ",
            ],
        },
        {
            paragraphs: [
                "We provides you the most affordable and best journey.  ",
            ],
        },
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 5000); // Update every 5 seconds
        return () => clearInterval(interval);
    }, [currentIndex, data.length]);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#4CE5B1', '#63ABF900']}
                style={styles.background}
            />

            {/* <Image
        source={require("../assets/images/appLogo.png")}
        style={styles.logo}
      /> */}

            <Text style={styles.logo}>Smart Safar</Text>
            <Text style={styles.label}>Safety Sharing Ride</Text>


            <View style={styles.paragraphContainer}
            >
                {/* <LinearGradient
        colors={["#63ABF9", "#63ABF900"]}
        style={styles.background}
      /> */}
                <FlatList
                    data={data}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={(e) => {
                        const x = e.nativeEvent.contentOffset.x;
                        setCurrentIndex((x / width).toFixed(0));
                    }}
                    horizontal
                    renderItem={({ item }) => (
                        <View style={styles.paragraphView}>
                            <TouchableOpacity disabled={true} style={styles.paragraphContent}>
                                {item.paragraphs.map((paragraph, index) => (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text key={index}>{paragraph}</Text>
                                    </View>
                                ))}
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

            <View
                style={{
                    flexDirection: "row",
                    width: width,
                    justifyContent: "center",
                    alignItems: "center",
                    //   textAlign:"center"
                }}
            >
                {data.map((item, index) => (
                    <View
                        key={index}
                        style={{
                            width: currentIndex == index ? 10 : 8,
                            height: currentIndex == index ? 10 : 8,
                            borderRadius: currentIndex == index ? 5 : 4,
                            backgroundColor: currentIndex == index ? "#63ABF9" : "gray",
                            marginLeft: 5,
                            //   bottom: -5,
                            marginTop: -165,
                        }}



                    ></View>


                ))}

                {/* <Image
          source={require("../assets/images/Rectangle3.png")}
          style={styles.log}
        /> */}
            </View>

            <Text style={styles.text1}> Our company</Text>


            <Text style={styles.text2}>
                Enguin taxi give s safe and dependable transportation to your business
                and families needs. We offer an stylish, dependable and, maximum
                importantly, secure provider for all our clients. Above all, our task is
                to offer an high-quality limousine provider for our customers and to
                have an extended listing of happy clients, who again and again use our
                provider due to the amazing and secure provider we offer.
            </Text>

            <Image source={require("../img/car.png")} style={styles.car} />

            <Text style={styles.text3}>
                The big majority of our present client-base is from repeat business
                because of the superb offerings we offer and we sit up for serving you.
                Airport Transfer Taxi between India’s all Multinational airports and to
                all over the India Rent a car with a driver daily weekly or monthly .
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button]} onPress={() => props.navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Let's Start{"\n"} Your Journey</Text>
                    <Image
                        source={require("../img/Vector2.png")}
                        style={styles.vector}
                    />
                    <Image
                        source={require("../img/Vector2.png")}
                        style={styles.vector}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
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
        marginRight: wp('69%'),
        marginTop: hp('19%'),
        textAlign: 'right',
        width:wp("50%")

    },

    label: {
        color: 'white',
        marginTop: hp('-1%'),
        width: wp('25%'),
        fontSize: 16,
        marginRight: wp('40%'),
        // textAlign: 'right'
        width:wp("50%")
    },

    paragraphContainer: {
        height: height / +3.5,
        width: width,
        justifyContent: "center",

        textAlign: "center",
        paddingTop: hp('17.5%'),
        bottom: ('10%'),

    },
    paragraphView: {
        width: width - 30,
        height: height / 2.2 + 10,
        justifyContent: "center",
        alignItems: "center",
        left: wp('.05%'),
        marginHorizontal: wp('4.5%'),

    },
    paragraphContent: {
        width: wp('90%'),
        height: hp('45%'),

        backgroundColor: "#13C39C", //'"#63ABF9":"#D9D9D9"',

    },

    text1: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        fontWeight: "bold",

        textDecorationLine: "underline",

        fontSize: 20,

        top: hp('35%'),
    },

    text2: {

        top: hp('1%'),
        textAlign: "center",
        fontSize: 14
    },

    car: {
        width: wp('100%'),
        height: hp('50%'),
        resizeMode: "contain",
        top: hp('-4%'),
    },

    text3: {

        bottom: hp('22%'),
        textAlign: "center",
        fontSize: 14
    },

    button: {
        width: ('85%'),
        height: ('24%'),
        backgroundColor: "#13C39C",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        bottom: ('40%'),
        flexDirection: "row",
    },

    buttonText: {
        color: "white",
        fontSize: hp('2%'),
        textAlign: "center",
        right: ('90%'),
    },

    vector: {
        bottom: ('1%'),
        margin: ('1%'),
        // left: wp('-5%')
    },



});

