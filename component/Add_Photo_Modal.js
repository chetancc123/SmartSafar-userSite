// import { useEffect, useState } from 'react';
import { useState } from 'react';
import { Modal, View, Text, Image, ImageBackground, TouchableOpacity, Button, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import BackGround from '../Styles/BackGround';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
// import { Camera } from 'expo-camera';

const AddPhoto = ({ isVisible, onClose, onImageSelect }) => {

    const pickFromCamera = async () => {
        // const { status } = await Camera.requestPermissionsAsync();
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        const granted = status === 'granted';
        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.canceled) {
                // onImageSelect(data.uri);  // Pass the selected image URI to the callback
                onImageSelect(data.assets && data.assets.length > 0 ? data.assets[0].uri : null);
            }
            // console.warn(data)

            else {
                Alert.alert("you need to allow to click picture")
                // console.warn("you need to allow to click picture")
            }
        }

    }
    const pickFromGallary = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const granted = status === 'granted';
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            // console.log(data)

            if (!data.canceled) {
                // onImageSelect(data.uri);  // Pass the selected image URI to the callback
                onImageSelect(data.assets && data.assets.length > 0 ? data.assets[0].uri : null);
            }
            else {
                Alert.alert("you need to allow to click picture")
            }
        }

    }


    return (
        <Modal
            style={{ justifyContent: 'center', alignItems: 'center' }}
            transparent={true}
            // visible={show}
            animationType='fade'
            visible={isVisible}
            onRequestClose={onClose}
        >
            <LinearGradient
                colors={['#13C39C', '#13C39C']}
                style={styles.background}>
                <Text style={{ fontSize: 20, fontWeight: '600' }}>Add Photo!</Text>
                <View style={{ justifyContent: 'space-between', marginLeft: '10%', }}>
                    <TouchableOpacity
                        onPress={pickFromCamera}
                        style={styles.Button}>
                            <Image source={require('../img/Instagram.png')} style={{ width: '8%', height: '90%' }}></Image>
                            <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: '5%' }}>Click Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={pickFromGallary} style={styles.Button}>
                            <Image source={require('../img/Picture.png')} style={{ width: '8%', height: '90%' }}></Image>
                            <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: '5%' }}>Choose from Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onClose} style={styles.Button}
                    >
                            <Image source={require('../img/Unavailable.png')} style={{ width: '8%', height: '90%' }}></Image>
                            <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: '5%' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </Modal>
    )
}

const styles = StyleSheet.create({
    background: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
        borderRadius: 10,
        height: '20%',
        width: '50%',
        overflow: 'hidden',
        margin: '50%',
    },
    Button: {
        flexDirection:'row',
        padding: ('5%')
    }
})
export default AddPhoto;