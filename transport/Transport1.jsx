import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import TopSection from "./TransportTop";
import Map from "./Map";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function Transport1() {
    const [showPanel, setShowPanel] = useState(false);

    const [homeSender, setHomeType] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderMobile, setSenderMobile] = useState('');
  
    const [location, setLocation] = useState('Current Location');
    const [newLocation, setNewLocation] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const handleChangeLocation = () => {
      // Display modal to enter new location
      setIsModalVisible(true);
    };
  
    const handleConfirmLocation = () => {
      // Update location with the new value
      setLocation(newLocation);
      setIsModalVisible(false); // Close the modal
      setNewLocation(''); // Clear the input field
    };
  
    const handleConfirm = async () => {
      // Save user data to AsyncStorage
      try {
        await AsyncStorage.setItem('homeSender', homeSender);
        await AsyncStorage.setItem('senderName', senderName);
        await AsyncStorage.setItem('senderMobile', senderMobile);
        console.log('User data saved to AsyncStorage');
        // Navigate to the next screen here
        // Example: navigation.navigate('NextScreen');
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    };
  

  return (
    <SafeAreaView style={styles.container}>
      <Map/>
      <View style={styles.topSection}>
        <View style={styles.leftSection}>
          <Image
           source={require("../img/Profile_logo.png")}
            style={styles.profileImage}
          />
        </View>

        {/* Center Section - Greeting Text */}
        <View style={styles.centerSection}>
          <Text style={styles.greetingText}>HELLO !</Text>
          <Text style={styles.nameText}>Chetan</Text>
        </View>

        {/* Right Section - Bell and Settings Icons */}
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.iconContainer}>
          <MaterialCommunityIcons name="bell-badge" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="settings" size={24} color="black" />
          </TouchableOpacity>
        </View>
        </View>

        <View style={styles.container1}>
      {/* Top Row - Location */}
      <View style={styles.locationRow}>
        <View style={styles.locationInfo}>
          <Ionicons name="location-sharp" size={24} color="black" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <TouchableOpacity style={styles.changeButton} onPress={handleChangeLocation}>
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
      </View>
       {/* Modal for Changing Location */}
       <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter new location"
              value={newLocation}
              onChangeText={setNewLocation}
            />
            <TouchableOpacity style={styles.confirmButtonModal} onPress={handleConfirmLocation}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Home or Apartment"
          value={homeSender}
          onChangeText={setHomeType}
        />
        <TextInput
          style={styles.input}
          placeholder="Sender Name"
          value={senderName}
          onChangeText={setSenderName}
        />
        <TextInput
          style={styles.input}
          placeholder="Sender's Mobile Number"
          value={senderMobile}
          onChangeText={setSenderMobile}
          keyboardType="phone-pad"
        />
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
    topSection: {
        position: 'absolute',
        alignSelf:"center",
        flexDirection: "row",
        marginTop:hp("6%"),
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: wp("4%"),
        width:wp("90%"),
        height:hp("12%"),
           backgroundColor: "#13C39C",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 5,
          height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
      },
      leftSection: {
        alignItems: "flex-start",
      },
      profileImage: {
        width: wp("15%"),
        height: wp("15%"),
        borderRadius: wp("5%"),
      },
      centerSection: {
        flex: 2,
        alignItems: "left",
        marginLeft:wp("4%"),
      },
      greetingText: {
        color: "black",
        fontSize: wp("4%"),
        fontWeight: "bold",
      },
      nameText: {
        color: "black",
        fontSize: wp("6%"),
        fontWeight: "bold",
      },
      rightSection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
      },
      iconContainer: {
        marginLeft: wp("4%"),
      },
      bottomSection: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
      },
      bottomButton: {
        borderRadius: 10,
        overflow: 'hidden',
      },
      buttonGradient: {
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 10,
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      container1: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: hp('50%'),
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: wp('5%'),
        paddingTop: hp('2%'),
        paddingBottom: hp('3%'),
        zIndex: 10,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      locationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: hp('2%'),
      },
      locationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      locationText: {
        marginLeft: 5,
        fontSize: 18,
        fontWeight:"bold",
      },
      changeButton: {
        backgroundColor: '#13C39C',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
      },
      changeButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign:"center",
      },
      inputContainer: {
        marginBottom: hp('2%'),
      },
      input: {
        height: hp("7%"),
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: hp("2%"),
        paddingHorizontal: 10,
        fontWeight:"bold",
      },
      confirmButton: {
        backgroundColor: '#13C39C',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
      },
      confirmButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight:"bold",
        textAlign:"center",
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
        width:wp("80%")
      },
      
      confirmButtonModal: {
        backgroundColor: 'green',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        width:wp("60%"),
      },
    
  
});
