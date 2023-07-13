import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { styles } from './MapScreenStyles';

const MapScreen = () => {
  const {
    params: {
      params: { geoLocation },
    },
  } = useRoute();
  const [photoLocation, setPhotoLocation] = useState(
    geoLocation ? geoLocation : null
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setPhotoLocation(coords);
    })();
  }, []);

  return (
    <View style={styles.containerFullView}>
      <MapView
        style={styles.mapStyles}
        region={{
          ...photoLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {photoLocation && (
          <Marker
            title="Локація фотографії"
            coordinate={photoLocation}
            description="Локація"
          />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;
