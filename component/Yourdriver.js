import { React, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Image, Tonc, TouchableOpacity, Modal, ScrollView, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { BottomSheet } from 'react-native-elements';
import Menu from './Menu';
import Cancelbtn from './Cancelbtn';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Yourdriver = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const delayToShowModal = setTimeout(() => {
            setShow(true);
        }, 1000);

        return () => {
            clearTimeout(delayToShowModal);
        };
    }, []);

    const closeModal = () => {
        setShow(false);
    };
    return (
        <SafeAreaView>

            <Menu />
            <Modal
                transparent={true}
                visible={show}
                animationType='slide'

            >
                <View style={styles.Parent}>
                    <View style={{ backgroundColor: '#13C39C',  top: hp("3%"), height: hp("0.4%"), width: wp("50%"), alignSelf: 'center' }}>
                    </View>
                    <Text style={{ color: 'grey', top: hp("5%"), left: 10 }} > Your driver is coming in 3:35</Text>
                    <View style={styles.driverprofile}>
                        <View style={styles.profilepic}>
                            <Image style={styles.img} source={require('../img/driving_man.png')}>

                            </Image>
                        </View>
                        <View style={styles.name}>
                            <Text style={{ top: hp("3%"), left: 10, fontSize: 15 }}>Ishan</Text>
                            <AntDesign style={{ top: 10, left: 64 }} name="star" size={15} color="yellow" />
                            <Entypo style={{ top: 10 }} name="location-pin" size={15} color="blue" />
                            <Text style={{ top: 0, left: 15, bottom: 13, fontSize: 8 }}>800m (5mins away)</Text>
                            <Text style={{ top: 0, left: 15, bottom: 13, fontSize: 8 }}>4.9 (531 reviews)</Text>
                        </View>
                        <View style={styles.drivercar}>
                            <Image style={styles.img1} source={require('../img/MiniCab.png')}>

                            </Image>
                        </View>

                    </View>
                    <View style={styles.paymentmethod}>
                        <Text>
                            Payment Method
                        </Text>
                        <Text style={styles.amount}>200Rs</Text>
                    </View >
                    {/*  Payment List  */}
                    <View style={{ top: 10 }}>
                        <TouchableOpacity>
                            <View style={styles.paylist}>
                                <Image style={styles.walletimg} source={require('../img/Payment.png')} />
                                <View style={{ left: 10 }}>
                                    <Text>My Rido Wallet </Text>
                                    <Text style={{ color: 'grey' }}>349 .00 </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.paylist}>

                                <Image style={styles.phonepayimg} source={require('../img/phoneppay.png')} />

                                <View style={{ left: 10 }}>
                                    <Text>Phone Pay</Text>

                                </View>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={styles.paylist}>
                                <Image style={styles.phonepayimg} source={require('../img/Googlepay.png')} />
                                <View style={{ left: 10 }}>
                                    <Text>Google Pay </Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.paylist}>
                                <Image style={styles.visaimg} source={require('../img/Paymentvisa.png')} />
                                <View style={{ left: 10 }}>
                                    <Text>**** **** **** 8970</Text>
                                    <Text style={{ color: 'grey' }}>Expires: 12/26</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.paylist}>
                                <Image style={styles.phonepayimg} source={require('../img/indiarupiee.png')} />
                                <View style={{ left: 10 }}>
                                    <Text>Add money via other UPI/Card/Wallet </Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
            <Cancelbtn />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({


    Parent: {
        backgroundColor: 'white',
        marginTop: 180,
        height: 440,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        top: 48
    },
    driverprofile: {
        flexDirection: 'row'
    },
    profilepic: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderColor: 'transparent',
        top: 40,
    },
    img: {
        height: 70,
        width: 70,
        borderRadius: 50,


    },
    img1: {
        height: 44,
        width: 80,

    },
    name: {
        top: 30,
        right: 20
    },
    drivercar: {
        height: 100,
        width: 150,
        border: 50,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderColor: 'transparent',
        top: 40,
        left: 50

    },
    paymentmethod: {
        flexDirection: 'row',
        top: 25,
        left: 20,
        color: 'grey',
        fontSize: 15
    },
    paylist: {
        flexDirection: 'row',
        top: 20,
        borderColor: 'yellow',
        borderWidth: 2,
        paddingLeft: 15,
        paddingBottom: 3,
        paddingTop: 3,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 2,
        backgroundColor: 'lightyellow',
    },
    amount: {
        left: 150,
        fontSize: 22,
        color: 'red'
    },
    phonepayimg: {
        height: 40,
        width: 40,
        borderRadius: 50
    },
    visaimg: {
        height: 40,
        width: 40,

    },
    button1: {
        left: 40,
        top: 1,
        width: 103,
        backgroundColor: "red",
        borderRadius: 7,
        elevation: 5,
        height: 35
    },
})

export default Yourdriver;
