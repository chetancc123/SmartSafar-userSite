import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Modal, Button, Alert, ActivityIndicator, ImageBackground, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import BackGround from '../Styles/BackGround';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import AddPhoto from './Add_Photo_Modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from './config';


const Profile = ({ navigation }) => {

    const [userData, setUserData] = useState(null);
    const [id, setId] = useState("");
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [isOTPSent2, setIsOTPSent2] = useState(false);
    const [email, setEmail] = useState("");
    const [phoneNo, setphonenumber] = useState("");
    const [emailOtp, setEmailOTP] = useState("");
    const [noOtp, setNoOTP] = useState("");
    const [loading, setLoading] = useState(true);
    const countryCode = '+91';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedId = await AsyncStorage.getItem('id');
                console.log('Stored id:', storedId);
                setId(storedId || '');
            } catch (error) {
                console.error('Error retrieving data from AsyncStorage:', error);
            }
        };
        fetchData();
    }, []);

    const VerifyNumber = async () => {
        const fullPhoneNumber = `${countryCode}${phoneNo}`;
        console.log(fullPhoneNumber)
        const response = await fetch(`http://${url}:8080/user/update-phoneNumberSendOtp/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNo: fullPhoneNumber })
        });
        if (response.ok) {
            Alert.alert("OTP sent");
            setIsOTPSent(true)
        } else {
            Alert.alert("Error");
        }
    }

    const VerifySMSOTP = async () => {
        console.log(id);
        const fullPhoneNumber = `${countryCode}${phoneNo}`;
        console.log(fullPhoneNumber);

        try {
            const response = await fetch(`http://${url}:8080/user/update-verify-phoneno/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPhoneNo: fullPhoneNumber, updateOtp: noOtp })
            });

            if (response.ok) {
                Alert.alert("SMS OTP verified successfully");
                setIsOTPSent(false);
            } else {
                Alert.alert("Invalid SMS OTP");
            }
        } catch (error) {
            console.error('Error verifying SMS OTP:', error);
            Alert.alert("An error occurred while verifying SMS OTP");
        }
    };
    const VerifyEmail = async () => {
        const response = await fetch(`http://${url}:8080/user/update-emailSendOtp/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        });
        if (response.ok) {
            Alert.alert("OTP sent");
            setIsOTPSent2(true)
        } else {
            Alert.alert("Error");
        }
    }
    const VerifyEmailOTP = async () => {
        try {
            const response = await fetch(`http://${url}:8080/user/update-verify-email/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newEmail: email, updateOtp: emailOtp })
            });

            if (response.ok) {
                Alert.alert("SMS OTP verified successfully");
                setIsOTPSent2(false)
            } else {
                Alert.alert("Invalid SMS OTP");
            }
        } catch (error) {
            console.error('Error verifying SMS OTP:', error);
            Alert.alert("An error occurred while verifying SMS OTP");
        }
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [gender, setgender] = useState(userData ? userData.gender : "");
    const [gender, setgender] = useState("");
    const [profileimage, setimage] = useState("");
    const [name, setName] = useState("");
    const [alternativeNo, setAlternativeNo] = useState("");

    const [profile, setProfile] = useState({
        "name": "",
        "alternativeNo": "",
        "gender": "",
        "dob": "",
    });

    const handleImageSelection = (imageUri) => {
        setimage(imageUri);
        setIsModalVisible(false);
        console.log(imageUri);
    };

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleRadioChange = (value) => {
        handleChange('gender', value);
        setgender(value);
        setIsRadioChecked(true);
    };

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [inputValue, setInputValue] = useState('');
    const [isRadioChecked, setIsRadioChecked] = useState(false);

    const showDatepicker = () => {
        if (!isRadioChecked) {
            setShowDatePicker(true);
        }
    };

    const toggleDatePicker = () => {
        setShowDatePicker(prevState => !prevState); // Toggle the state
    };

    const onDateChange = (event, selected) => {
        const currentDate = selected || selectedDate;
        setShowDatePicker(Platform.OS === 'ios');
        setSelectedDate(currentDate);
        const formattedDob = currentDate.toISOString().split('T')[0];
        setProfile(prevState => ({ ...prevState, dob: formattedDob }));
        setInputValue(formattedDob);
    };

    useEffect(() => {
        if (isRadioChecked) {
            setShowDatePicker(false); // Close the calendar if the radio button is checked
        }
    }, [isRadioChecked]);

    // Function to handle opening the calendar
    const openCalendar = () => {
        // if (!isRadioChecked) {
        //     toggleDatePicker(); // Toggle the state to open/close the calendar
        // }
        setShowDatePicker(true);
    };

    useEffect(() => {
    }, [profile.DobN]);

    const handleSaveButtonPress = async () => {
        try {
            const formData = new FormData();

            const userUpdateRequestDto = {
                name: name !== "" ? name : userData.name,
                alternativeNo: alternativeNo !== "" ? alternativeNo : userData.alternativeNo,
                phoneNo: phoneNo !== "" ? phoneNo : userData.phoneNo,
                email: email !== "" ? email : userData.email,
                gender: gender !== "" ? gender : userData.gender,
                dob: profile.dob !== "" ? profile.dob : userData.dob,
                // profileImage: profileimage ? profileimage : userData.imageProfileLink
            };

            formData.append("UserUpdateRequestDto", JSON.stringify(userUpdateRequestDto));

            if (profileimage) {
                // if (profileimage && profileimage !== userData.imageProfileLink) {
                let fileUri = profileimage;
                let fileName = fileUri.split('/').pop();
                let fileType = 'image/jpeg';

                formData.append('profileimage', {
                    uri: fileUri,
                    name: fileName,
                    type: fileType,
                });
            } else {
                // If no new image is selected, append the image received from the backend
                // profileimage = userData.imageProfileLink;
                formData.append('profileimage', userData.imageProfileLink);
            }

            const response = await fetch(`http://${url}:8080/user/editprofile/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                const data = await response.text();
                alert('Profile updated successfully!');
                fetchUserData();
            } else {
                console.error('Failed to save data:', response.status, response.statusText);
                const responseData = await response.text();
                console.error('Response data:', responseData);
                alert('Failed to update profile. Please try again.');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleChange = (key, value) => {
        if (key === 'gender') {
            setProfile(prevState => ({ ...prevState, [key]: value }));
        } else {
            setProfile(prevState => ({ ...prevState, [key]: value }));
        }
    };

    useEffect(() => {
        if (id) {
            fetchUserData();
        }
    }, [id]);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://${url}:8080/user/userDetails/${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setUserData(data);
                setgender(data.gender);
                const dobDate = data.dob.slice(0, 10);
                setInputValue(dobDate);
                setLoading(false);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AddPhoto isVisible={isModalVisible} onClose={closeModal} onImageSelect={handleImageSelection} />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null} keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}>

                <LinearGradient colors={["#4CE5B1", "#63ABF900"]} style={styles.background}>
                    {loading ? (
                        <ActivityIndicator size='large' color='#0000ff' />
                    ) : userData ? (
                        <View style={{ flex: 1 }}>
                            <View style={{ backgroundColor: '#008080',borderBottomRightRadius: 40, borderBottomLeftRadius: 40, justifyContent: 'center', alignItems: 'center', padding: wp('5%') }}>
                                <Text style={{ fontWeight: '700', fontSize: 15, color: 'white' }}>Edit Profile</Text>
                            </View>
                            <View style={{ flex: .4, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: '30%', borderRadius: 180, alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                                    {userData.imageProfileLink ? (
                                        <ImageBackground
                                            source={{ uri: userData.imageProfileLink }}
                                            style={{ width: hp('10%'),  margin: 2, borderRadius: wp('100%'), overflow: 'hidden', height: hp('10%') }}
                                        />
                                    ) : (
                                        <View style={{ width: 100, height: 100, backgroundColor: 'lightgray', borderRadius: 180, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>No Image</Text>
                                        </View>
                                    )}
                                    <View style={{ flex: 0.1, alignItems: 'flex-end', justifyContent: 'flex-end', }}>
                                        <TouchableOpacity onPress={openModal}>
                                            <Image source={require('../img/edit_icon.png')} style={{ width: 25, height: 25, marginLeft: 50 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: '80%', flex: 1, }}>
                                    <Text style={styles.text}> Name*</Text>
                                    <TextInput style={styles.textInput} placeholder='name' defaultValue={userData.name} onChangeText={(text) => setName(text)} />
                                    <Text style={styles.text}>Phone Number</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput style={styles.textInput2} placeholder="phone number" defaultValue={userData.phoneNo} onChangeText={(text) => setphonenumber(text)} />
                                        <TouchableOpacity style={styles.button} onPress={VerifyNumber} >
                                            <Text style={styles.buttonText}>Send</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {isOTPSent && (
                                        <View style={{ flexDirection: "row" }} >
                                            <TextInput style={styles.textInput2} placeholder="Enter OTP" placeholderTextColor="#00000080" onChangeText={(text) => setNoOTP(text)} />
                                            <TouchableOpacity style={styles.button} onPress={VerifySMSOTP}>
                                                <Text style={styles.buttonText}>Verify OTP</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    <Text style={styles.text}>Alternate Number</Text>
                                    <TextInput style={styles.textInput} placeholder='Alternate Number' defaultValue={userData.alternativeNo} onChangeText={(text) => setAlternativeNo(text)} />
                                    <Text style={styles.text}>Email ID</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput style={styles.textInput2} placeholder="Email ID" defaultValue={userData.email} onChangeText={(text) => setEmail(text)} />
                                        <TouchableOpacity style={styles.button} onPress={VerifyEmail} >
                                            <Text style={styles.buttonText}>Send</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {isOTPSent2 && (
                                        <View style={{ flexDirection: "row" }} >
                                            <TextInput style={styles.textInput2} placeholder="Enter OTP" placeholderTextColor="#00000080" onChangeText={(text) => setEmailOTP(text)} />
                                            <TouchableOpacity style={styles.button} onPress={VerifyEmailOTP}>
                                                <Text style={styles.buttonText}>Verify OTP</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    <Text style={styles.text}>Gender</Text>
                                    <View style={{ justifyContent: 'space-between', display: 'flex' }}>
                                        <RadioButton.Group
                                            onValueChange={handleRadioChange}
                                            value={gender}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <RadioButton value="male" />
                                                    <Text>Male</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <RadioButton value="female" />
                                                    <Text>Female</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <RadioButton value="other" />
                                                    <Text>Other</Text>
                                                </View>
                                            </View>
                                        </RadioButton.Group>
                                    </View>
                                    <Text style={styles.text}>Date of Birth</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        {showDatePicker && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={selectedDate}
                                                mode="date"
                                                is24Hour={true}
                                                display="default"
                                                onChange={onDateChange}
                                            />
                                        )}
                                        <TextInput style={[styles.textInput, { width: '100%', backgroundColor: 'white', color: 'black' }]}
                                            placeholder='YYYY-MM-DD'
                                            value={inputValue}
                                            editable={false} />
                                        <View>
                                            <TouchableOpacity onPress={openCalendar}>
                                                <Image source={require('../img/calander.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    {/* <Text style={styles.text}>What out for exciting offers on your birthday. </Text>
                                    <Text style={styles.text}>Women’s Day, Father’s Day and other special days</Text> */}
                                    <TouchableOpacity style={styles.button2} onPress={handleSaveButtonPress}>
                                        <Text style={styles.buttonText}>save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ) : null}
                </LinearGradient>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Profile;

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 6,
    },
    textInput: {
        fontSize: 20,
        backgroundColor: "white",
        color: "black",
        marginBottom: 8,
        width: wp('80%'),
        padding: wp('2%'),
        borderRadius:10
    },
    textInput2: {
        fontSize: 15,
        backgroundColor: "white",
        color: "black",
        marginBottom: 8,
        width: wp('55%'),
        padding: wp('1%'),
        borderRadius:10
    },
    button: {
        backgroundColor: "#13C39C",
        paddingVertical: 4,
        paddingHorizontal: 2,
        borderRadius: 10,
        width: wp("20%"),
        marginBottom: 8,
        justifyContent: "center",
        marginLeft: 9,
    },
    button2: {
        backgroundColor: "#13C39C",
        paddingVertical: wp('3%'),
        paddingHorizontal: 4,
        borderRadius: 10,
        width: wp("80%"),
        // marginBottom: 8,
        marginTop: 10,
        justifyContent: "center",
        alignSelf: 'center',
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
});
