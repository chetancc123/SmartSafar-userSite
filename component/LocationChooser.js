// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function LocationChooser(props) {

    // const handlePress = () => {
    //     // Handle button press
    //     console.log('Custom Button Pressed');
    // };
    return (
        <View style={styles.mainContainer}>
            <LinearGradient colors={['#13C39C','#4CE5B1']} style={styles.homeTop}>
                <View style={styles.menuBar}>
                    <View>
                        <Text style={{ fontSize: 22, color: 'white',marginLeft:wp("5%"), }}>Smart Safar</Text>
                        <Text style={{ fontSize: 14, color: 'white',marginLeft:wp("5%"), }}>Safty sharing Ride</Text>
                    </View>

                    <View style={styles.menuBar}>
                        <Octicons name="bell-fill" size={24} color="white" style={styles.icon} />
                        <Entypo name="menu" size={30} color="white" style={styles.icon} />
                    </View>

                </View>
                <View style={styles.homeTopContent}>
                    <Text style={styles.homeTopContentText}>Good Morning </Text>
                    <Text style={styles.homeTopContentTextName} > ISANI</Text>
                </View>
            </LinearGradient>
            {/* <StatusBar style="auto" /> */}

            <View style={styles.selectAddress}>
                <View style={styles.line} />
                <Text style={{ fontSize: 20, fontWeight:"bold" }}>Select Address</Text>
                <View style={styles.inputContainer}>
                    <SimpleLineIcons name="location-pin" size={24} color="black" style={styles.icon} />
                    <TextInput style={styles.input}
                        placeholder="Telibandha Square, Raipur" />
                </View>
                <View style={styles.inputContainer}>
                    <SimpleLineIcons name="location-pin" size={24} color="black" style={styles.icon} />
                    <TextInput style={styles.input}
                        placeholder="Bhilai Power House" />

                </View>


                <View style={styles.searchReasults}>
                    <Text>Recent places</Text>
                    <View style={styles.results}>
                        <View style={styles.addressResult}>
                            <View styel={styles.locSug}>

                                <View style={styles.doFlex}>
                                    <View style={styles.doFlex}>
                                        <Ionicons name="location" size={24} color="black" />
                                        <Text style={{ fontWeight: 'bold' }}>Office</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: 'bold' }}>1.2km</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={styles.locDes}>
                                <Text style={{ color: 'gray' }}>0001, RWI, 3rd, floor, magneto mall, Raipur, 98700 </Text>
                            </View>


                        </View>
                        <View style={styles.addressResult}>
                            <View styel={styles.locSug}>

                                <View style={styles.doFlex}>
                                    <View style={styles.doFlex}>
                                        <Ionicons name="location" size={24} color="black" />
                                        <Text style={{ fontWeight: 'bold' }}>Shopping mall</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: 'bold' }}>3.0km</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={styles.locDes}>
                                <Text style={{ color: 'gray' }}>0001, RWI, 3rd, floor, magneto mall, Raipur, 98700 </Text>
                            </View>


                        </View>
                        <View style={styles.addressResult}>
                            <View styel={styles.locSug}>

                                <View style={styles.doFlex}>
                                    <View style={styles.doFlex}>
                                        <Ionicons name="location" size={24} color="black" />
                                        <Text style={{ fontWeight: 'bold' }}>Shopping center</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: 'bold' }}>4.9km</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={styles.locDes}>
                                <Text style={{ color: 'gray' }}>0001, RWI, 3rd, floor, magneto mall, Raipur, 98700 </Text>
                            </View>


                        </View>
                        <View style={styles.addressResult}>
                            <View styel={styles.locSug}>

                                <View style={styles.doFlex}>
                                    <View style={styles.doFlex}>
                                        <Ionicons name="location" size={24} color="black" />
                                        <Text style={{ fontWeight: 'bold' }}>Coffee Shop</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: 'bold' }}>1.1km</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={styles.locDes}>
                                <Text style={{ color: 'gray' }}>0001, RWI, 3rd, floor, magneto mall, Raipur, 98700 </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('SelectCars')}>
                <View style={styles.bookButton}>
                    <Text style={styles.buttonText}>Book Now</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: hp("5%"),
    },
    homeTop: {
        width: wp("95%"),
        height:hp("22%") ,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 20,
        padding:wp("2%"),
        marginBottom:hp("2%"),
    },
    menuBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
        alignItems: 'center',

    },
    icon: {
        marginRight:wp("3%"),
    },
    homeTopContent: {
        marginTop:hp("4%"),
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    },
    homeTopContentText: {
        color: 'white',
        fontSize: 18,
    },
    homeTopContentTextName: {
        color: 'white',
        fontSize: 18,
    },
    selectAddress: {
        borderRadius:hp("2%"),
        marginTop:hp("1%"),
        backgroundColor: 'white',
        width:wp("95%"),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'gray'

    },
    line: {
        height: hp(".6%"),
        backgroundColor: 'lightgray',
        width:wp("55%"),
        marginVertical: hp("1%"),
        borderRadius: 50,

    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: hp("2%"),
        marginHorizontal: hp("2%"),
        marginTop: hp("2%"),
        width: wp("85%"),
    },
    input: {

        height: hp("6%"),
        width: hp("80%"),
        fontSize: 16,

    },
    searchReasults: {
        marginTop:hp("3%"),
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    },
    results: {
        marginTop: hp("2%"),
        width: wp("85%"),
    },

    addressResult: {
        width: '100%',
        marginBottom:hp("2%"),

    },
    locSug: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: wp("90%"),
    },
    doFlex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    locDes: {
        paddingLeft: wp("8%"),
    },
    bookButton: {
        width: wp("80%"),
        marginTop:hp("2%"),
        borderRadius:wp("2%"),
        height:hp("6%"),
        backgroundColor: '#13C39C',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',


    },
    
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },

});
