import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Map = () => {
    const mapRef = useRef(null);
    const [region, setRegion] = useState({
        latitude: 21.2410042,
        longitude: 81.6429559,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    return (
        // <View style={styles.container}>
        <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={region}
            onRegionChangeComplete={setRegion}
            resizeMode="cover"
        >
            <Marker
                coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                title="Marker Title"
                description="Marker Description"
            />
        </MapView>
        // </View>
    );
};

const styles = StyleSheet.create({
    
    map: {
        // width: wp('100%'),
        // height: hp('100%'),
        // flex: 1,
        ...StyleSheet.absoluteFillObject,
        
    },
});

export default Map;