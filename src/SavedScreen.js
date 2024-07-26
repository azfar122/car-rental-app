import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';


const image_v_1 = require("./assets/vehicles/mehran.png");
const image_v_2 = require("./assets/vehicles/corolla-Photoroom.png");
const image_v_3 = require("./assets/vehicles/fortuner-Photoroom.png");
const image_v_4 = require("./assets/vehicles/markx-Photoroom.png");


const getImage = (id) => {
  if (id === 1) return image_v_1;
  if (id === 2) return image_v_2;
  if (id === 3) return image_v_3;
  if (id === 4) return image_v_4;
  return null; 
};

const SavedScreen = ({ savedVehicles }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FAVOURITES</Text>
      {savedVehicles.length === 0 ? (
        <Text style={styles.emptyText}>No saved vehicles.</Text>
      ) : (
        <FlatList
          data={savedVehicles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.vehicleItem}>
              <Image source={getImage(item.id)} style={styles.vehicleImage} />
              <View style={styles.vehicleDetails}>
                <Text style={styles.vehicleName}>{item.make} {item.model}</Text>
                <Text style={styles.vehicleType}>Type: {item.type}</Text>
                <Text style={styles.vehicleTransmission}>Transmission: {item.transmission}</Text>
                <Text style={styles.vehiclePrice}>Price per hour: PKR{item.price_per_hour}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#C8ACD6',
  },
  text: {
    padding: 5,
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  vehicleItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  vehicleImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  vehicleDetails: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vehicleType: {
    fontSize: 14,
    color: 'gray',
  },
  vehicleTransmission: {
    fontSize: 14,
    color: 'gray',
  },
  vehiclePrice: {
    fontSize: 14,
    color: 'gray',
  },
});

export default SavedScreen;
