import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, AntDesign, Fontisto } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from './config';


export default function History_Completed({ route }) {
    const { id } = route.params;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    const FetchData1 = async (id) => {
        setLoading(true);
        const response = await fetch(`http://${url}:8080/user/History/completed/${id}`)
        result = await response.json();
        console.log(result);
        setLoading(false)

        setData(result);
    }


    const fetchData = async () => {
        try {
            const storedId = await AsyncStorage.getItem('id');
            // const storedname = await AsyncStorage.getItem('name');
            console.log('Stored id:', storedId);
            FetchData1(storedId || '');
            // setName(storedname || '');
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View>
            <LinearGradient
                // Background Linear Gradient
                colors={['#4CE5B1', '#63ABF900']}
                style={styles.background}
            />
            {loading ? ( // Conditionally render loader if loading state is true
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#FEC400" />
                </View>
            ) : (
                <View style={{ justifyContent: 'space-between', flexDirection: 'column', }}>
                    {
                        data.length > 0 &&
                        data.map((item, index) => (
                            <View key={index}>
                                <TouchableOpacity style={styles.container5}>
                                    <View style={styles.container6}>
                                        <Text style={styles.text1}>
                                            {item.driverName}
                                        </Text>

                                        <Text style={styles.text2}>
                                            {item.vehicleName}
                                        </Text>
                                    </View>
                                    <Text style={styles.text3}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: hp('100%')
    },
    container1: {
        marginTop: hp('10%'),
        borderWidth: 1,
        width: wp('90%'),
        height: hp('10%'),
        margin: wp('5%'),
        alignItems: 'center',
        backgroundColor: '#FFFBE7',
        borderColor: '#FEC400',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingVertical: hp('1%')
    },
    container5: {
        borderColor: '#FEC400',
        borderWidth: 1,
        width: wp('85%'),
        alignSelf: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: wp('3%'),
        borderRadius: 10,
        margin: wp('2%'),
        paddingVertical: hp('0.5%')
    },
    container6: {
        padding: 5,
    },
    container3: {
        padding: wp('5%'),
        margin: wp('2%'),
        borderRadius: 5,
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 20
    },
    text2: {
        fontWeight: '300',
        fontSize: 20,
    },
    text3: {
        alignSelf: 'center',
        padding: wp('2%'),
        color: 'green',
    },
    backButton: {
        position: 'absolute',
        top: hp('3%'),
        left: wp('3%'),
        padding: wp('2%'),
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})