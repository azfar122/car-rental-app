import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const menu = require('./assets/vehicles/logo.png');
const face = require('./assets/vehicles/face.png');
const magnifying_glass = require('./assets/icons/magnifying-glass.png');
const heartOutline = 'https://cdn-icons-png.flaticon.com/512/833/833470.png';
const heartFilled = 'https://cdn-icons-png.flaticon.com/512/833/833471.png';
const bookmarkIcon = 'https://cdn-icons-png.flaticon.com/512/709/709620.png';

const image_v_1 = require('./assets/vehicles/mehran.png');
const image_v_2 = require('./assets/vehicles/corolla-Photoroom.png');
const image_v_3 = require('./assets/vehicles/fortuner-Photoroom.png');
const image_v_4 = require('./assets/vehicles/markx-Photoroom.png');

import data from './dataset/vehicles.json';

const HomeScreen = ({ navigation, route }) => {
  const [vehicles, setVehicles] = useState(data.vehicles);
  const [filteredVehicles, setFilteredVehicles] = useState(data.vehicles);
  const [savedVehicles, setSavedVehicles] = useState([]);

  useEffect(() => {
    // Update vehicles list if new car is added
    if (route.params?.newCar) {
      setVehicles((prevVehicles) => [...prevVehicles, route.params.newCar]);
      setFilteredVehicles((prevFilteredVehicles) => [...prevFilteredVehicles, route.params.newCar]);
    }
  }, [route.params?.newCar]);

  const getImage = (id) => {
    switch (id) {
      case 1:
        return image_v_1;
      case 2:
        return image_v_2;
      case 3:
        return image_v_3;
      case 4:
        return image_v_4;
      default:
        return null;
    }
  };

  const searchVehicles = (keyword) => {
    const lowercasedKeyword = keyword.toLowerCase();
    const results = vehicles.filter((vehicle) =>
      vehicle.make.toLowerCase().includes(lowercasedKeyword)
    );
    setFilteredVehicles(results);
  };

  const toggleSaveVehicle = (id) => {
    setSavedVehicles((prevSaved) => {
      const isSaved = prevSaved.includes(id);
      if (isSaved) {
        return prevSaved.filter((vehicleId) => vehicleId !== id);
      } else {
        return [...prevSaved, id];
      }
    });
  };

  const handleSavePress = (id) => {
    toggleSaveVehicle(id);

    Alert.alert('Saved!', 'Car has been saved successfully.', [{ text: 'OK' }]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Image
            source={menu}
            resizeMode="contain"
            style={styles.menuIconStyle}
          />
          <Image
            source={face}
            resizeMode="contain"
            style={[styles.faceIconStyle, { borderRadius: 50 }]}
          />
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>Rent a Car</Text>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchPallet}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search a car"
              onChangeText={(text) => searchVehicles(text)}
            />
            <View style={styles.searchIconArea}>
              <Image
                source={magnifying_glass}
                resizeMode="contain"
                style={styles.magnifyingIconStyle}
              />
            </View>
          </View>
        </View>

        <View style={styles.typesSection}>
          <Text style={styles.typesTextActive}>All</Text>
          <Text style={styles.typesText}>Suv</Text>
          <Text style={styles.typesText}>Sedan</Text>
          <Text style={styles.typesText}>Mpv</Text>
          <Text style={styles.typesText}>Hatchback</Text>
        </View>

        <ScrollView style={styles.listSection}>
          <Text style={styles.headText}>Most Rented</Text>
          <View style={styles.elementPallet}>
            {filteredVehicles.map((vehicle) => {
              const isSaved = savedVehicles.includes(vehicle.id);
              return (
                <TouchableOpacity
                  style={styles.element}
                  key={vehicle.id}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('Info', { id: vehicle.id })
                  }
                >
                  <View style={styles.infoArea}>
                    <Text style={styles.infoTitle}>
                      {vehicle.make} {vehicle.model}
                    </Text>
                    <Text style={styles.infoSub}>
                      {vehicle.type}-{vehicle.transmission}
                    </Text>
                    <Text style={styles.infoPrice}>
                      <Text style={styles.infoAmount}>
                        PKR{vehicle.price_per_hour}{' '}
                      </Text>
                      /hour
                    </Text>
                  </View>
                  <View style={styles.imageArea}>
                    <Image
                      source={getImage(vehicle.id)}
                      resizeMode="contain"
                      style={styles.vehicleImage}
                    />
                  </View>
                  {/* <View style={styles.saveIcon}>
                    <TouchableOpacity
                      onPress={() => handleSavePress(vehicle.id)}
                    >
                      <Image
                        source={{
                          uri: isSaved ? heartFilled : heartOutline,
                        }}
                        style={styles.saveIconImage}
                      />
                    </TouchableOpacity>
                  </View> */}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.bottomNavIcon}
          onPress={() => navigation.navigate('Home')}
        >
          <Image
            source={require('./assets/icons/home.png')}
            style={styles.bottomNavIconImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavIcon}
          onPress={() =>
            navigation.navigate('SavedScreen', { savedVehicles: savedVehicles })
          }
        >
          <Image
            source={{ uri: bookmarkIcon }}
            style={styles.bottomNavIconImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavIcon}
          onPress={() => navigation.navigate('Settings')}
        >
          <Image
            source={require('./assets/icons/settings.png')}
            style={styles.bottomNavIconImage}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#C8ACD6',
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flex: 1,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuIconStyle: {
    width: 30,
    height: 30,
  },
  faceIconStyle: {
    width: 40,
    height: 40,
  },
  titleSection: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchSection: {
    paddingBottom: 20,
  },
  searchPallet: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchIconArea: {
    paddingHorizontal: 10,
  },
  magnifyingIconStyle: {
    width: 20,
    height: 20,
  },
  typesSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  typesTextActive: {
    color: 'black',
    fontWeight: 'bold',
  },
  typesText: {
    color: '#696969',
  },
  listSection: {
    flex: 1,
  },
  headText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  elementPallet: {
    flexDirection: 'column',
  },
  element: {
    height: 120,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 15,
    position: 'relative',
  },
  infoArea: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#696969',
  },
  infoPrice: {
    position: 'absolute',
    bottom: 0,
    fontSize: 10,
    color: '#696969',
    fontWeight: 'bold',
  },
  infoAmount: {
    fontSize: 12,
    color: 'black',
    fontWeight: '600',
  },
  imageArea: {
    flex: 1,
  },
  vehicleImage: {
    width: 100,
    height: 100,
  },
  saveIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  saveIconImage: {
    width: 20,
    height: 20,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  bottomNavIcon: {
    alignItems: 'center',
  },
  bottomNavIconImage: {
    width: 24,
    height: 24,
  },
});

export default HomeScreen;
