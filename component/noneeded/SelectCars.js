import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ImageBackground, FlatList, Dimensions, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import BackGround from '../Styles/BackGround';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
// import Offer from '../component/Modal';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const { height, width } = Dimensions.get("window");

export default function SelectCars(props) {

    const [data, setData] = useState([
        {
            modal: ["Luxury"],
            charges: ["55/km + taxes"],
            image: require("../img/Luxury.png"),
            Price: ["550 Rs."],
        },
        {
            modal: ["Sedan"],
            charges: ["55/km + taxes"],
            image: require("../img/Sedan.png"),
            Price: ["385 Rs."],
        },
        {
            modal: ["MiniCab"],
            charges: ["55/km + taxes"],
            image: require("../img/MiniCab1.png"),
            Price: ["280 Rs."],
        },
        {
            modal: ["Auto"],
            charges: ["55/km + taxes"],
            image: require("../img/Auto.png"),
            Price: ["210 Rs."],
        },
        {
            modal: ["E-Bike"],
            charges: ["55/km + taxes"],
            image: require("../img/EvBike.png"),
            Price: ["185 Rs."],
        },
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 100); // Update every 5 seconds
        return () => clearInterval(interval);
    }, [currentIndex, data.length]);

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
            <View style={{ flex: 1, }}>
                <ImageBackground source={require('../img/Rectangle288.png')}
                    style={BackGround.background} >

                    <View style={{ flex: 1, alignItems: 'center' }}>

                        <View  >
                            <LinearGradient
                                colors={['#8E288E', '#402775']}
                                style={styles.box1}
                            >
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ marginLeft: 0 }}>
                                        <Text style={styles.rido}>Rido</Text>
                                        <Text style={styles.text}>Safety Sharing Ride</Text>
                                    </View>
                                    <View style={{ height: 20, marginTop: 20, marginLeft: 10 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 500, color: '#FFFFFF' }}>Good Morning,</Text>
                                        <Text style={{ fontSize: 16, fontWeight: 500, textAlign: 'center', color: '#FFFFFF' }}>ISHAN!</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <View style={{ marginLeft: 30 }}>
                                            <FontAwesome name="bell" size={25} color="#fff" />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>

                                        <View style={{ marginLeft: 20, marginRight: 0 }}>
                                            <MaterialCommunityIcons
                                                // onPress={openDrawer}
                                                name="menu" size={30} color="#fff" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: 18 }}>
                                </View>
                                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                    <KeyboardAvoidingView
                                        style={{ flex: 1 }}
                                        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
                                    > */}
                                <View style={styles.box2}>
                                    <View style={{ flexDirection: 'row', marginTop: 7, height: 36, marginLeft: 40 }}>
                                        <Image
                                            source={require('../img/CurrentLocation.png')}
                                            style={{ height: '40%', width: '12%', marginTop: 8, marginLeft: -40, marginRight: 10 }}
                                        />
                                        <TextInput
                                            style={{ borderRadius: 10, width: 172, height: 36, borderWidth: 1, padding: 8 }}
                                            onChangeText={(value) => setText1(value)}
                                            value={text1}
                                            placeholder='Enter Current Location'
                                        >
                                        </TextInput>
                                        <TouchableOpacity
                                            onPress={handlePress}
                                        >
                                            <FontAwesome name="bookmark"
                                                style={[styles.book, isPressed && styles.buttonPressed]}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ height: '20%', width: '8%', marginTop: 10 }}>
                                        <TouchableOpacity
                                            onPress={swapText}>
                                            <Image
                                                source={require('../img/SwapText.png')}
                                                style={{ height: '100%', width: '100%', }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: -2, height: 36, marginLeft: 40 }}>
                                        <Image
                                            source={require('../img/Designation.png')}
                                            style={{ height: '50%', width: '10%', marginTop: 18, marginLeft: -16, marginRight: -10 }}
                                        />
                                        <TextInput
                                            style={{ borderRadius: 10, width: 172, height: 36, borderWidth: 1, marginTop: 10, marginLeft: 20, marginRight: 38, padding: 8 }}
                                            onChangeText={(value) => setText2(value)}
                                            value={text2}
                                            placeholder='Enter Destination'
                                        />
                                    </View>
                                </View>
                                {/* </KeyboardAvoidingView>
                                </TouchableWithoutFeedback> */}
                            </LinearGradient>
                        </View >
                        <View style={styles.carouselContainer}>

                            <FlatList
                                data={data}
                                horizontal
                                // pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                onScroll={(e) => {
                                    const x = e.nativeEvent.contentOffset.x;
                                    setCurrentIndex(Math.round(x / width));
                                }}
                                renderItem={({ item }) => (
                                    <View style={{ display: 'flex', backgroundColor: '#3D1946', marginRight: 10, marginLeft: 30, height: '60%', width: 150, alignItems: 'center', marginTop: '50%', borderRadius: 15 }}>
                                        <TouchableOpacity>

                                            <View style={{ flex: 1, width: '80%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: 15 }}>

                                                {item.modal.map((modal, index) => (
                                                    <Text style={{ width: 100, color: "yellow", fontSize: 25, textDecorationLine: "underline" }} key={index} >{modal} </Text>
                                                ))}

                                                {item.charges.map((charges, index) => (
                                                    <Text style={{ width: 100, color: "white", fontSize: 10, }} key={index}>{charges}</Text>
                                                ))}
                                            </View>

                                            <View style={{ flex: 1, width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={item.image} style={styles.carouselImage} />
                                            </View>

                                            <View style={{ flex: 1, width: '80%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: 27 }}>
                                                {item.Price.map((Price, index) => (
                                                    <Text style={{ width: 100, color: "yellow", marginBottom: 10, fontSize: 22 }} key={index}>{Price}</Text>
                                                ))}
                                            </View>


                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </View>

                    </View>

                    <View style={{ width: '100%', height: '11%', justifyContent: 'flex-end', justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ width: '100%', height: '50%', backgroundColor: '#8E288E', shadowColor: '#D3E5FF', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, marginBottom: -25 }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: "white" }}>Payment mode:</Text>
                                <TouchableOpacity>
                                    <Text style={{ color: "yellow" }}> Wallet</Text>
                                </TouchableOpacity>

                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: "white" }}>Passenger:</Text>
                                <TouchableOpacity>
                                    <Text style={{ color: "yellow", fontSize: 12, }}> 1 Passenger</Text>
                                </TouchableOpacity>

                            </View>


                        </View>
                    </View>

                    <View style={{ width: '100%', height: '11%', justifyContent: 'flex-end', justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ width: '100%', height: '70%', backgroundColor: '#8E288E', borderRadius: 10, shadowColor: '#D3E5FF', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10, marginBottom: -25 }}>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('DeriverConnect')}>
                                <Text style={{ color: "yellow", fontSize: 25, }}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View >
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({

    rido: {
        width: 96,
        height: 35,
        color: 'white',
        // fontFamily: 'itlaic',
        fontSize: 30,
        fontWeight: "600",
        textAlign: 'left',

    },
    text: {
        width: 92,
        height: 20,
        color: '#FFF',
        // fontFamily: 'itlaic',
        fontSize: 10,
        fontWeight: "700",
        textAlign: 'left',
    },
    box1: {
        // backgroundColor: '#8E288E',
        // flexDirection: 'row',
        marginTop: 1,
        width: 340,
        height: 150,
        borderRadius: 15,
        alignItems: 'center',
    },
    // linearGradient: {
    //     flex: 1,
    //     borderRadius: 20, 
    //   },
    box2: {
        backgroundColor: '#FFFFFF',
        width: 256,
        height: 130,
        borderRadius: 25,
        flexShrink: 0,
        marginTop: 30,
        alignItems: 'center',

    },
    book: {
        color: 'grey',
        width: 22,
        height: 30,
        marginLeft: 8,
        marginTop: 5,
        textAlignVertical: 'center'
    },

    carouselContainer: {
        height: height / 2.5,
        width: width,
        justifyContent: "center",
        textAlign: "center",
        marginTop: '48%',
        // overflow: "hidden",
    },

    carouselItem: {
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",

        // position: "relative",
    },

    carouselImage: {
        alignContent: 'center',

        width: 100,
        height: 50,
        // position: "absolute",
        // top: 0,
        // left: 0,
        // justifyContent: 'center',
        //  alignItems: 'center',
    },
    // paragraphContent: {
    //     width: '100%',
    //     height: '100%',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: "#3D1946",
    // },
    //   pagination: {
    //     flexDirection: "row",
    //     width: width,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     marginTop: -165,
    //   },

    buttonPressed: {
        color: 'blue'
    }
})