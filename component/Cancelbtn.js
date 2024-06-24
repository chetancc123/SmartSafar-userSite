import React from 'react';
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Text } from 'react-native';

const Cancelbtn = () => {
    return (
        <SafeAreaView>
            <View
                style={{
                    width: "100%",
                    height: "40%",
                    justifyContent: "flex-end",
                    justifyContent: "center",
                    alignItems: "center",
                    top: 555
                }}
            >
                <View
                    style={{
                        width: "100%",
                        height: "90%",
                        backgroundColor: "#8E288E",
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        shadowColor: "#D3E5FF",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingLeft: 10,
                        paddingRight: 10,
                        bottom: -15,
                    }}
                >
                    <TouchableOpacity style={[styles.button1]}>
                        <Text style={{ width: 95, textAlign: "center", justifyContent: 'center', alignItems: 'center', padding: 7, color: 'white' }}>Cancel Ride </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.img1}>
                            <Image
                                source={require("../img/message-1.png")}></Image>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity

                    >
                        <View style={styles.img2}>
                            <Image
                                // style={{ justifyContent: 'center', alignItems: 'center', left: 7, top: 4, right: 7, height: 30 }}
                                source={require("../img/Call.png")}
                            ></Image>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    button1: {
        left: 60,
        top: 5,
        backgroundColor: "red",
        borderRadius: 7,
        elevation: 5,
        height: 35
    },
    img1: {
        height: 40,
        width: 40,
        top: 5,
        borderRadius: 50,
        backgroundColor: 'white',
        left: 3,
        bottom: 4,
        borderColor: 'yellow',
        borderWidth: 2
    },
    img2: {
        height: 40,
        width: 40,
        top: 5,
        borderRadius: 50,
        backgroundColor: 'white',
        right: 60,
        bottom: 4,
        borderColor: 'yellow',
        borderWidth: 2
    }
})

export default Cancelbtn;