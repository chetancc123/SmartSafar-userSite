import React, { useEffect, useState } from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Nav = ({ isDisplay, isHide, navigateToHome, navigateToSetPassword, navigateToHistory, handleLogout, navigateToProfile, NavigatePrivacy, NavigateContact }) => {
    // const [name, setName] = useState('');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const storedname = await AsyncStorage.getItem('name');
    //             console.log('Stored username:', storedname);
    //             setName(storedname || '');
    //         } catch (error) {
    //             console.error('Error retrieving data from AsyncStorage:', error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    return (
        <Modal
            visible={isDisplay}
            transparent={true}
            onRequestClose={isHide}
            animationIn="slideInRight"
            animationOut="slideOutRight"
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <LinearGradient
                        colors={['#4CE5B1', '#63ABF900']}
                        style={styles.gradient}
                    >
                        <View style={styles.container}>
                            <View style={styles.headerContainer}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.ridoText}>Smart Safar</Text>
                                    <Text style={styles.safetyText}>Safety Sharing Ride</Text>
                                </View>
                                <TouchableOpacity style={styles.backButton} onPress={isHide}>
                                    <Ionicons name="chevron-back" size={20} color="white" />
                                    <Text style={styles.bold}>Back</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.menuItem}>
                                <TouchableOpacity style={styles.menuOption} onPress={navigateToHome}>
                                    <FontAwesome name="home" size={20} color="white" style={styles.icon} />
                                    <Text style={styles.menuItemText}>Home</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuOption} onPress={navigateToProfile}>
                                    <Ionicons name="person" size={20} color="white" />
                                    <Text style={styles.menuItemText}>Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuOption} onPress={navigateToSetPassword}>
                                    <FontAwesome name="key" size={20} color="white" style={styles.icon} />
                                    <Text style={styles.menuItemText}>Change Password</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuOption} onPress={navigateToHistory}>
                                    <FontAwesome name="history" size={20} color="white" style={styles.icon} />
                                    <Text style={styles.menuItemText}>History</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuOption} onPress={NavigatePrivacy}>
                                    <FontAwesome name="info-circle" size={20} color="white" style={styles.icon} />
                                    <Text style={styles.menuItemText}>Privacy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuOption} onPress={handleLogout}>
                                    <FontAwesome name="sign-out" size={20} color="white" style={styles.icon} />
                                    <Text style={styles.menuItemText}>Log Out</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuOption} onPress={NavigateContact}>
                                    <FontAwesome name="question" size={20} color="white" style={styles.icon} />
                                    <Text style={styles.menuItemText}>Help & Support</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        backgroundColor: "rgba(128, 128, 128, 0.5)",
        flex: 1,
        justifyContent: "center",
    },
    modalContent: {
        width: "70%",
        marginLeft: "30%",
        flex: 1,
        justifyContent: "center",
    },
    gradient: {
        height: "100%",
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
    },
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: wp('5%'),
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: wp('5%')
    },
    titleContainer: {
        flexDirection: 'column',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ridoText: {
        color: 'white',
        fontSize: wp('5%'), // Responsive font size
        fontWeight: 'bold',
    },
    safetyText: {
        color: 'white',
        fontSize: wp('3.5%'), // Responsive font size
        fontWeight: 'bold',
    },
    bold: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: wp('4%'), // Responsive font size
    },
    menuItem: {
        marginTop: hp("5%"),
        marginLeft: wp("4%"),
    },
    menuOption: {
        flexDirection: 'row',
        paddingVertical: 20,
        alignItems: "center",
    },
    icon: {
        marginRight: wp("2%"),
    },
    menuItemText: {
        color: "white",
        fontSize: 18,
    },
});

export default Nav;
