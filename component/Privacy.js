import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CheckBox } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

const Privacy = (props) => {
    const [checked, setChecked] = useState(false);

    const handleCheckBoxToggle = () => {
        setChecked(!checked);
    };

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={Styles.main}>
                <View style={Styles.first}>
                    {/* <Image style={Styles.logo} source={require("../img/Group36695.png")} /> */}
                    <Text style={Styles.title}>Accept Rido's Terms &{'\n'} Review Privacy Notice</Text>
                </View>
                <View style={Styles.content}>
                    <Text style={Styles.description}>
                        By selecting "I Agree" below, I have reviewed and agree to the{'\n'}
                        Terms of Use and acknowledge the Privacy Notice. I am at 
                        least 18 years of age.
                    </Text>
                    <Image style={Styles.image} source={require("../img/t&c.png")} />
                </View>
                <View style={Styles.agreement}>
                    <Text style={Styles.agreeText}>I Agree</Text>
                    <CheckBox
                        checked={checked}
                        onPress={handleCheckBoxToggle}
                    />
                </View>
                <View style={Styles.buttons}>
                    
                    <TouchableOpacity onPress={() => props.navigation.navigate('EnableLocation')} style={Styles.button}>
                        <Text style={Styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        height: hp("100%"),
        backgroundColor: "#BDE6D9",
        padding: 20,
    },
    first: {
        flexDirection: "row",
        marginTop: hp("8%"),
        justifyContent: "space-around",
        alignItems: "center",
    },
    logo: {
        width: 70,
        height: 100,
    },
    title: {
        fontSize: 30,
        padding: 10,
        textAlign: "center",
    },
    content: {
        alignItems: "center",
        marginTop: hp("1%"),
    },
    description: {
        fontSize: 15,
        letterSpacing: 0.50,
        textAlign: "center",
        marginBottom: 20,
    },
    image: {
        width: wp("50%"),
        height: undefined,
        aspectRatio: 1,
        alignSelf:"center"
    },
    agreement: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: hp("2%"),
    },
    agreeText: {
        fontSize: 20,
        textDecorationLine: "underline",
        
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("2%"),
    },
    button: {
        backgroundColor: "#13C39C",
        width: wp("50%"),
        height: hp("7%"),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        // marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 20,
        color: "white",
    },
});

export default Privacy;
