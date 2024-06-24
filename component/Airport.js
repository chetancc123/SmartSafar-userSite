import React from "react";
import {
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context'

const Airport = (props) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={Styles.main}>
                    <View style={Styles.upper_right}>
                    <Text style={{ fontSize: 30, fontWeight: 700, color: "white", marginRight: wp("1%") }}>Smart Safar</Text>
                    <Text style={{ fontSize: 16, fontWeight: 700, color: "white" }}>Safety Sharing Ride</Text>

                    </View>
                    <View style={Styles.m1}>
                        <Text style={{ fontSize: 35, fontWeight: 700 }}>
                            Airport Service
                        </Text>
                        <Image
                            style={{ marginTop: hp("2%"), marginLeft: wp("2%"), width: wp("5%") }}
                            source={require("../img/airlogo.png")}
                        />
                    </View>
                    <View style={Styles.under}></View>
                    <View style={Styles.para}>
                        <Text style={{ fontSize: 18, fontWeight: 700 }}>
                            Coming back home with presents for the family? {"\n"} Or packed too much
                            for your holiday and don't {"\n"} know where to fit it? Relax, our
                            airport riders love {"\n"} the 2-3X boot space, at no extra cost.
                        </Text>
                    </View>
                    <View style={Styles.div}>
                        <View style={Styles.first}>
                            <Image
                                style={{ width: wp("15%"), height: hp("6%"), marginTop: hp("1%") }}
                                source={require("../img/a1.png")}
                            />
                            <Text
                                style={{
                                    fontSize: 12,
                                    lineHeight: 25,
                                    textAlign: "center",
                                    color: "white",
                                    fontWeight: 700,
                                }}
                            >
                                2X Boot Space
                            </Text>
                            
                        </View>
                        <View style={Styles.first}>
                            <Image
                                style={{ width: wp("15%"), height: hp("6%"), marginTop: hp("1%") }}
                                source={require("../img/a2.png")}
                            />
                            <Text
                                style={{
                                    fontSize: 12,
                                    lineHeight: 25,
                                    textAlign: "center",
                                    color: "white",
                                    fontWeight: 700,
                                }}
                            >
                                On Time Pickup{" "} 
                            </Text>
                            
                        </View>
                        <View style={Styles.first}>
                            <Image
                                style={{ width: wp("15%"), height: hp("6%"), marginTop: hp("1%") }}
                                source={require("../img/a3.png")}
                            />
                            <Text
                                style={{
                                    fontSize: 12,
                                    lineHeight: 25,
                                    textAlign: "center",
                                    color: "white",
                                    fontWeight: 700,
                                }}
                            >
                                Shortened Pickup
                            </Text>
                            
                        </View>
                    </View>

                    <View style={Styles.last}>
                        <Image
                            source={require("../img/alast.png")}
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const Styles = StyleSheet.create({
    main: {
        flex: 1,
        height: hp("100%"),
        backgroundColor: "#BDE6D9",
        // color: "red",
    },
    upper_right: {
        alignItems: "flex-end",
        marginRight: "10%",

        height: hp("5%"),
    },
    m1: {
        top: hp("7%"),
        width: wp("60%"),
        marginLeft: wp("2%"),
        // justifyContent:"space-between",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    para: {
        marginTop: hp("8%"),
        marginLeft: wp("2%"),
    },
    images: {
        display: "flex",
        width: "auto",
        justifyContent: "space-around",
        flexDirection: "row",
        marginTop: hp("5%"),
    },
    last: {
        marginTop: hp("13%"),
        alignItems: "center",
    },
    same: {
        width: wp("100%"),

        height: hp("8%"),
    },
    under: {
        top: hp("6%"),
        marginLeft: wp("2%"),
        width: wp("80%"),
        height: hp("1%"),
        backgroundColor: "#13C39C",
    },
    div: {
        top: hp("6%"),
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    first: {
        backgroundColor: "#13C39C",
        alignItems: "center",

        width: wp("30%"),
        height: hp("12%"),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
});
export default Airport;
