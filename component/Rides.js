import React from "react"
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context'

const Rides = (props) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={Styles.main}>
                    <View style={Styles.upper_right}>
                    <Text style={{ fontSize: 30, fontWeight: 700, color: "white", marginRight: wp("1%") }}>Smart Safar</Text>
                    <Text style={{ fontSize: 16, fontWeight: 700, color: "white" }}>Safety Sharing Ride</Text>
                    </View>
                    <View style={Styles.m1}>
                        <Text style={{ fontSize: 35, fontWeight: 700 }}>Rides</Text>
                        <Image style={{ marginTop: hp("2%") }} source={require("../img/Car1.png")} />
                    </View>
                    <View style={Styles.under}>

                    </View>
                    <View style={Styles.para}>
                        <Text style={{ fontSize: 16, fontWeight: 700 }}>Need to get a meeting and getting late is not on {"\n"} option? {"\n"} Rely on RIDO to get you from point-to-point on  time.
                            With RIDO, you get to travel faster without any deviations.</Text>
                    </View>
                    <View style={Styles.div}>
                        <View style={Styles.first}>
                            <Image  style={{ width: wp("15%"), height: hp("6%"), marginTop: hp("1%") }} source={require("../img/rides1.png")} />
                            <Text style={{ fontSize: 12, lineHeight: 25, textAlign: "center", color: "white", fontWeight: 700 }}>No Surge Pricing</Text>
                         </View>
                        <View style={Styles.first}>
                            <Image style={{ width: wp("15%"), height: hp("6%"), marginTop: hp("1%") }} source={require("../img/rides2.png")} />
                            <Text style={{ fontSize: 12, lineHeight: 25, textAlign: "center", color: "white", fontWeight: 700 }}>Responsible Drivers</Text>
                         </View>
                        <View style={Styles.first}>
                            <Image  style={{ width: wp("15%"), height: hp("6%"), marginTop: hp("1%") }} source={require("../img/rides3.png")} />
                            <Text style={{ fontSize: 12, lineHeight: 25, textAlign: "center", color: "white", fontWeight: 700 }}>Flat Pricing</Text>
                         </View>

                    </View>

                    <View style={Styles.last}>
                        <Image source={require("../img/rides_last.png")} />

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}
const Styles = StyleSheet.create({
    main: {
        flex: 1,
        height: hp("100%"),
        backgroundColor:"#BDE6D9",
        // color: "red"



    }, upper_right: {

        alignItems: "flex-end",
        marginRight: wp("5%"),

        height: hp("4%")
    },
    m1: {
        top: hp("5%"),
        width: wp("30%"),
        marginLeft: 20,
        justifyContent: "space-between",
        display: "flex",
        flexDirection: 'row',
        alignItems: "center"
    },
    para: {
        marginTop: hp("7%"),
        // marginLeft: wp("3%")
        paddingLeft:wp("4%")
    },
    images: {
        display: "flex",
        width: "auto",
        justifyContent: "space-around",
        flexDirection: "row",
        marginTop: hp("3%")
    },
    last: {
        marginTop: hp("15%"),
        alignItems: "center"
    },
    same: {
        width: wp("40%"),

        height: hp("8%")
    },
    under: {
        top: hp("5%"),
        marginLeft: wp("5%"),
        width: wp("50%"),
        height: hp("1%"),
        backgroundColor: "#13C39C"
    },
    div: {
        top: hp("5%"),
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    first: {
        backgroundColor: "#13C39C",
        alignItems: "center",

        width: wp("30%"),
        height: hp("13%"),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,

    },
})
export default Rides