import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet, TouchableOpacity, Text, Button, TextInput, Platform, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../component/Menu';
import Map from "../transport/Map";
import { url } from '../component/config';


const RentalBooking1 = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [selectedPickupTime, setSelectedPickupTime] = useState(null);
    const [selectedPickupDate, setSelectedPickupDate] = useState(null);
    const [showDestinationInput, setShowDestinationInput] = useState(false);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');

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

    const toggleDestinationInput = () => {
        setShowDestinationInput(!showDestinationInput);
    };

    const handleSourceChange = (text) => {
        setSource(text);
    };

    const handleDestinationChange = (text) => {
        setDestination(text);
    };

    const handleBookNow = async () => {
        console.log("Selected Pickup Date:", selectedPickupDate);
        console.log("Selected Pickup Time (before conversion):", selectedPickupTime);
        if (selectedPickupDate && selectedPickupTime && source.trim() !== '') {
            const timeComponents = selectedPickupTime.split(':');
            const hour = parseInt(timeComponents[0]);
            const minute = parseInt(timeComponents[1]);
            let adjustedHour = hour;
            if (selectedPickupTime.includes("PM") && hour !== 12) {
                adjustedHour += 12;
            } else if (selectedPickupTime.includes("AM") && hour === 12) {
                adjustedHour = 0;
            }
            const selectedDateTime = new Date(selectedPickupDate);
            selectedDateTime.setHours(adjustedHour, minute, 0, 0);
            const timezoneOffset = selectedDateTime.getTimezoneOffset();
            selectedDateTime.setTime(selectedDateTime.getTime() - timezoneOffset * 60000);
            const isoDateTime = selectedDateTime.toISOString();
            console.log("Formatted DateTime:", isoDateTime);
            await AsyncStorage.setItem('DateTime', isoDateTime);
            await AsyncStorage.setItem('PickUpLocation', source);
            navigation.navigate('RentalBooking2');
        } else {
            Alert.alert("Please select PickUp Location and date and time.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedname = await AsyncStorage.getItem('name');
                setName(storedname || '');
            } catch (error) {
                console.error('Error retrieving data from AsyncStorage:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#4CE5B1', '#63ABF900']} style={styles.background}>
                <Map />
                <Menu />
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
                    <TouchableOpacity
                        style={styles.addStopButton}
                        onPress={toggleDestinationInput}
                    >
                        <Entypo
                            style={styles.icon}
                            name={showDestinationInput ? 'minus' : 'plus'}
                            size={28}
                            color="#198756"
                        />
                        <Text style={{ fontWeight: "bold", color: "grey" }}>Add Stop</Text>
                    </TouchableOpacity>

                    {showDestinationInput && (
                        <View style={styles.box}>
                            <Entypo style={styles.icon} name="location-pin" size={28} color="#198756" />
                            <TextInput
                                style={styles.input}
                                placeholder="Add a Stop"
                                value={destination}
                                onChangeText={handleDestinationChange}
                            />
                        </View>
                    )}

                    <Text style={styles.middleText}>Select Pickup Time</Text>
                    <View style={styles.dateTimeContainer}>
                        <View style={styles.datePicker}>
                            <Button onPress={showTimepicker} title="Select Time" style={styles.button1} />
                            {selectedPickupTime && (
                                <Text style={styles.picked}>{selectedPickupTime.toString()}</Text>
                            )}
                        </View>
                        <View style={styles.datePicker}>
                            <Button onPress={showDatepicker} title="Select Date" />
                            {selectedPickupDate && (
                                <Text style={styles.picked}>{selectedPickupDate.toString()}</Text>
                            )}
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
                    <TouchableOpacity style={styles.button} onPress={handleBookNow}>
                        <Text style={styles.buttonText}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    middlesection: {
        alignItems: 'center',
        marginTop: hp('38%'),
        width: wp('100%'),
        backgroundColor: 'white',
        borderRadius: 10,
        paddingBottom: hp('2%'),
    },
    middleText: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        marginTop: hp('1%'),
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
    },
    icon: {
        marginRight: wp('4%'),
    },
    input: {
        flex: 1,
        fontSize: wp('5%'),
        fontWeight: 'bold'
    },
    addStopButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp('2%'),
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: hp('2%'),
        width: '100%',
    },
    button1: {
        backgroundColor: "#198756",
    },
    picked: {
        marginTop: hp('2%'),
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
    button: {
        width: wp('90%'),
        backgroundColor: '#13C39C',
        paddingVertical: hp('2%'),
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: "center",
        margin: wp('2%'),
        marginVertical: hp('1%'),
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default RentalBooking1;
