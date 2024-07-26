// src/AddCarScreen.js
import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import data from './dataset/vehicles.json';

const AddCarScreen = ({ navigation }) => {
  const [carDetails, setCarDetails] = useState({
    id: data.vehicles.length + 1,
    make: '',
    model: '',
    type: '',
    transmission: '',
    price_per_hour: '',
    description: '',
    properties: {
      motor_power_hp: '',
      fuel_type: '',
      engine_capacity_cc: '',
      traction: '',
    },
  });

  const handleAddCar = () => {
    data.vehicles.push(carDetails);
    Alert.alert('Car Added', 'The new car has been added successfully.', [
      { text: 'OK', onPress: () => navigation.navigate('Main') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Make"
          value={carDetails.make}
          onChangeText={(make) => setCarDetails({ ...carDetails, make })}
        />
        <TextInput
          style={styles.input}
          placeholder="Model"
          value={carDetails.model}
          onChangeText={(model) => setCarDetails({ ...carDetails, model })}
        />
        <TextInput
          style={styles.input}
          placeholder="Type"
          value={carDetails.type}
          onChangeText={(type) => setCarDetails({ ...carDetails, type })}
        />
        <TextInput
          style={styles.input}
          placeholder="Transmission"
          value={carDetails.transmission}
          onChangeText={(transmission) =>
            setCarDetails({ ...carDetails, transmission })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Price per Hour"
          keyboardType="numeric"
          value={carDetails.price_per_hour}
          onChangeText={(price_per_hour) =>
            setCarDetails({ ...carDetails, price_per_hour })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={carDetails.description}
          onChangeText={(description) =>
            setCarDetails({ ...carDetails, description })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Motor Power (HP)"
          keyboardType="numeric"
          value={carDetails.properties.motor_power_hp}
          onChangeText={(motor_power_hp) =>
            setCarDetails({
              ...carDetails,
              properties: { ...carDetails.properties, motor_power_hp },
            })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Fuel Type"
          value={carDetails.properties.fuel_type}
          onChangeText={(fuel_type) =>
            setCarDetails({
              ...carDetails,
              properties: { ...carDetails.properties, fuel_type },
            })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Engine Capacity (CC)"
          keyboardType="numeric"
          value={carDetails.properties.engine_capacity_cc}
          onChangeText={(engine_capacity_cc) =>
            setCarDetails({
              ...carDetails,
              properties: { ...carDetails.properties, engine_capacity_cc },
            })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Traction"
          value={carDetails.properties.traction}
          onChangeText={(traction) =>
            setCarDetails({
              ...carDetails,
              properties: { ...carDetails.properties, traction },
            })
          }
        />
        <TouchableOpacity style={styles.button} onPress={handleAddCar}>
          <Text style={styles.buttonText}>Add Car</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C8ACD6',
  },
  form: {
    width: '90%',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#433D8B',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AddCarScreen;