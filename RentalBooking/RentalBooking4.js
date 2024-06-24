import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet, TouchableOpacity, Text, Button, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Menu from '../component/Menu';

const RentalBooking4 = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedPickupTime, setSelectedPickupTime] = useState('');
    const [selectedPickupDate, setSelectedPickupDate] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        if (mode === 'time') {
            setSelectedPickupTime(currentDate.toLocaleTimeString());
        } else {
            setSelectedPickupDate(currentDate.toDateString());
        }
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const handleAddressSelection = (address) => {
        setSelectedAddress(address);
    };

    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');

    const handleSourceChange = (text) => {
        setSource(text);
    };

    const handleDestinationChange = (text) => {
        setDestination(text);
    };

    const handleBookNow = () => {
        navigation.navigate('Rental3'
            // , {
            //   source,
            //   destination,
            //   selectedPickupDate,
            //   selectedPickupTime,
            // }
        );
    };


    return (
        <View style={styles.container}>
            {/* Background Gradient */}
            <LinearGradient colors={['#4CE5B1', '#63ABF900']} style={styles.background}>
                {/* Top Section */}
               <Menu/>


                {/* Middle Section */}
                <View style={styles.middlesection}>
                    <Text style={styles.middleText}>Select Address</Text>
                    <View style={styles.box}>
                        <Entypo style={styles.icon} name="location-pin" size={28} color="#198756" />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter PickUp Location"
                            value={source}
                            onChangeText={handleSourceChange}
                        />
                    </View>
                    <View style={styles.box}>
                        <Entypo style={styles.icon} name="location-pin" size={28} color="#198756" />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Stop"
                            value={destination}
                            onChangeText={handleDestinationChange}
                        />
                    </View>
                    <Text style={styles.middleText}>Select Pickup Time</Text>
                    <View style={styles.dateTimeContainer}>
                        <View style={styles.datePicker}>
                            <Button onPress={showDatepicker} title="Select Date" />
                            {selectedPickupDate !== '' && <Text style={styles.picked}>Selected Date is: {selectedPickupDate}</Text>}
                        </View>
                        <View style={styles.datePicker}>
                            <Button onPress={showTimepicker} title="Select Time" style={styles.button1} />
                            {selectedPickupTime !== '' && <Text style={styles.picked}>Selected Time is: {selectedPickupTime}</Text>}
                        </View>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={false}
                                display="spinner"
                                onChange={onChange}
                            />
                        )}
                    </View>
                </View>
                {/* Bottom Button */}
                <View style={styles.bottombutton}>
                    <TouchableOpacity style={styles.button} onPress={handleBookNow}>
                        <Text style={styles.buttonText}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    topSection: {
        borderBottomLeftRadius: wp('10%'),
        borderBottomRightRadius: wp('10%'),
    },
    gradient: {
        borderBottomLeftRadius: wp('10%'),
        borderBottomRightRadius: wp('10%'),
        height: hp('25%'),
    },
    iconrow: {
        flexDirection: 'row',
        marginTop: hp('5%'),
    },
    logo: {
        marginLeft: wp('4%'),
    },
    rido: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    tag: {
        color: 'white',
        fontSize: 12,
    },
    iconContainer2: {
        padding: wp('2%'),
        marginLeft: wp('50%'),
        flexDirection: 'row',
        right: wp('5%'),
    },
    bellicon: {
        paddingHorizontal: wp('3%'),
    },
    cogicon: {
        paddingHorizontal: wp('3%'),
    },
    greet: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('1%'),
    },
    text1: {
        color: 'white',
        fontSize: wp('5%'),
        fontWeight: 'bold',
    },
    text2: {
        color: 'white',
        fontSize: wp('6%'),
        fontWeight: 'bold',
    },
    middlesection: {
        alignItems: 'center',
        marginTop: hp('2%'),
        width: wp('95%'),
        height: hp('65%'),
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 10,
    },
    middleText: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        marginTop: hp('2%'),
        textAlign: 'center',
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#198756',
        width: '90%',
        padding: hp('2%'),
        marginVertical: hp('2%'),
        borderRadius: 5,
        justifyContent: 'flex-start',
    },
    icon: {
        marginRight: wp('4%'),
    },
    input: {
        flex: 1,
        fontSize: wp('5%'),
        fontWeight: 'bold'
    },
    text: {
        fontSize: 18,
    },
    dateTimeContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop: hp('3%'),
    },
    datePicker: {
        marginVertical: hp('2%'),
    },
    button1: {
        backgroundColor: "#13C39C",
    },
    picked: {
        marginTop: hp('2%'),
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
    bottombutton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: hp("3%"),
    },
    button: {
        width: '90%',
        backgroundColor: '#13C39C',
        paddingVertical: hp('2%'),
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: "center",
    },
    buttonText: {
        color: 'gold',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default RentalBooking4;