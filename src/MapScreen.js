import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const rentalCars = [
  {
    id: 1,
    title: 'Car 1',
    description: 'Sedan - Automatic',
    latitude: 24.8607,
    longitude: 67.0011, // Karachi
  },
  {
    id: 2,
    title: 'Car 2',
    description: 'SUV - Manual',
    latitude: 31.5497,
    longitude: 74.3436, // Lahore
  },
  {
    id: 3,
    title: 'Car 3',
    description: 'Hatchback - Automatic',
    latitude: 33.6844,
    longitude: 73.0479, // Islamabad
  },
  // Add more car locations as needed
];

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 30.3753, // Center of Pakistan
          longitude: 69.3451,
          latitudeDelta: 10.0,
          longitudeDelta: 10.0,
        }}
      >
        {rentalCars.map(car => (
          <Marker
            key={car.id}
            coordinate={{
              latitude: car.latitude,
              longitude: car.longitude,
            }}
            title={car.title}
            description={car.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
