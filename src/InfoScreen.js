import React, { useState, useEffect } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import data from "./dataset/vehicles.json";

const back = require("./assets/icons/left-arrow.png");
const dots = require("./assets/icons/dots.png");

const image_v_1 = require("./assets/vehicles/mehran.png");
const image_v_2 = require("./assets/vehicles/corolla-Photoroom.png");
const image_v_3 = require("./assets/vehicles/fortuner-Photoroom.png");
const image_v_4 = require("./assets/vehicles/markx-Photoroom.png");

const InfoScreen = ({ route, navigation, savedVehicles, toggleSaveVehicle }) => {
  const vehicle = data.vehicles.filter(
    (element) => element.id == route.params.id
  )[0];
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    time: new Date(),
    duration: 1, 
  });

  const [totalAmount, setTotalAmount] = useState(vehicle.price_per_hour); 
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false); 
  const [isSaved, setIsSaved] = useState(
    savedVehicles.some((item) => item.id === vehicle.id)
  );
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolderName: "",
    expirationDate: "",
    cvv: "",
  });

  useEffect(() => {
    calculateDuration();
  }, [bookingDetails.startDate, bookingDetails.endDate, bookingDetails.time]);

  useEffect(() => {
    updateTotalAmount();
  }, [bookingDetails.duration]);

  const calculateDuration = () => {
    const { startDate, endDate, time } = bookingDetails;
    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59);

    const startDateTime = new Date(startDate);
    startDateTime.setHours(time.getHours(), time.getMinutes(), time.getSeconds());

    if (startDateTime > endOfDay) {
      setBookingDetails(prev => ({ ...prev, duration: 0 }));
      return;
    }

    const durationInMs = endOfDay - startDateTime;
    const durationInHours = Math.max(Math.ceil(durationInMs / (1000 * 60 * 60)), 1); 
    setBookingDetails(prev => ({ ...prev, duration: durationInHours }));
  };

  const updateTotalAmount = () => {
    const amount = vehicle.price_per_hour * bookingDetails.duration;
    setTotalAmount(amount);
  };

  const handleBooking = () => {
   
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
   
    console.log("Card Details:", cardDetails);
    setShowPaymentModal(false);
    alert('Payment Successful!');
  };

  const handleCardInputChange = (field, value) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const getImage = (id) => {
    if (id == 1) return image_v_1;
    if (id == 2) return image_v_2;
    if (id == 3) return image_v_3;
    if (id == 4) return image_v_4;
  };

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || bookingDetails.startDate;
    setShowStartDatePicker(false);
    setBookingDetails(prev => ({ ...prev, startDate: currentDate }));
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || bookingDetails.endDate;
    setShowEndDatePicker(false);
    setBookingDetails(prev => ({ ...prev, endDate: currentDate }));
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || bookingDetails.time;
    setShowTimePicker(false);
    setBookingDetails(prev => ({ ...prev, time: currentTime }));
  };
  const handleMenuToggle = () => {
    setShowOptionsMenu(!showOptionsMenu);
  };

  const handleSaveToggle = () => {
    toggleSaveVehicle(vehicle);
    const message = isSaved ? "This vehicle has been unsaved." : "This vehicle has been saved.";
    Alert.alert("Save Status", message);
    setIsSaved(!isSaved);
    setShowOptionsMenu(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.headerSection}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.9}
            >
              <Image
                source={back}
                resizeMode="contain"
                style={styles.menuIconStyle}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{vehicle.model}</Text>
            <TouchableOpacity onPress={handleMenuToggle}>
            <Image source={dots} style={styles.dotsIcon} />
            </TouchableOpacity>
            
          </View>

          <View style={styles.imageSection}>
            <Image
              source={getImage(vehicle.id)}
              resizeMode="contain"
              style={styles.vehicleImage}
            />
          </View>

          <View style={styles.headSection}>
            <View style={styles.topTextArea}>
              <Text style={styles.makemodelText}>
                {vehicle.make} {vehicle.model}
              </Text>
              <Text style={styles.price}>
                <Text style={styles.amount}>PKR{vehicle.price_per_hour}</Text>{" "}
                /hour
              </Text>
            </View>
            <Text style={styles.typetranText}>
              {vehicle.type}-{vehicle.transmission}
            </Text>
          </View>

          <Text style={styles.descriptionText}>{vehicle.description}</Text>
          <Text style={styles.propertiesText}>Properties</Text>

          <View style={styles.propertiesArea}>
            <View style={styles.level}>
              <Text style={styles.propertyText}>
                Motor power:
                <Text style={styles.valueText}>
                  {" "}
                  {vehicle.properties.motor_power_hp} hp
                </Text>
              </Text>
              <Text style={styles.propertyText}>
                Engine capacity:
                <Text style={styles.valueText}>
                  {" "}
                  {vehicle.properties.engine_capacity_cc} cc
                </Text>
              </Text>
            </View>
            <View style={styles.level}>
              <Text style={styles.propertyText}>
                Fuel:
                <Text style={styles.valueText}>
                  {" "}
                  {vehicle.properties.fuel_type}
                </Text>
              </Text>

              <Text style={styles.propertyText}>
                Traction:
                <Text style={styles.valueText}>
                  {" "}
                  {vehicle.properties.traction}
                </Text>
              </Text>
            </View>
          </View>

          <Text style={styles.bookingTitle}>Booking Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={bookingDetails.name}
            onChangeText={(text) =>
              setBookingDetails({ ...bookingDetails, name: text })
            }
          />
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            style={styles.input}
          >
            <Text>Start Date: {bookingDetails.startDate.toDateString()}</Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={bookingDetails.startDate}
              mode="date"
              display="default"
              onChange={onStartDateChange}
            />
          )}

          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            style={styles.input}
          >
            <Text>End Date: {bookingDetails.endDate.toDateString()}</Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={bookingDetails.endDate}
              mode="date"
              display="default"
              onChange={onEndDateChange}
            />
          )}

          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            style={styles.input}
          >
            <Text>Start Time: {bookingDetails.time.toTimeString().substring(0, 5)}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={bookingDetails.time}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Duration (hours)"
            keyboardType="numeric"
            value={bookingDetails.duration.toString()}
            onChangeText={(text) =>
              setBookingDetails({
                ...bookingDetails,
                duration: parseInt(text) >= 1 ? parseInt(text) : 1,
              })
            }
            editable={false}
          />

          <TouchableOpacity style={styles.rentButton} onPress={handleBooking}>
            <Text style={styles.rentButtonText}>Rent a Car</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {showOptionsMenu && (
            <View style={styles.menuOptions}>
              <TouchableOpacity onPress={handleSaveToggle}>
                <Text style={styles.menuText}>{isSaved ? "Unsave" : "Save"}</Text>
              </TouchableOpacity>
            </View>
          )}

      {/* Payment Modal */}
      <Modal
        visible={showPaymentModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Payment Details</Text>

            <Text style={styles.modalLabel}>Card Number</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="1234 5678 9123 4567"
              keyboardType="numeric"
              onChangeText={(text) => handleCardInputChange("cardNumber", text)}
              value={cardDetails.cardNumber}
            />

            <Text style={styles.modalLabel}>Card Holder Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="John Doe"
              onChangeText={(text) => handleCardInputChange("cardHolderName", text)}
              value={cardDetails.cardHolderName}
            />

            <Text style={styles.modalLabel}>Expiration Date (MM/YY)</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="MM/YY"
              onChangeText={(text) => handleCardInputChange("expirationDate", text)}
              value={cardDetails.expirationDate}
            />

            <Text style={styles.modalLabel}>CVV</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="123"
              keyboardType="numeric"
              onChangeText={(text) => handleCardInputChange("cvv", text)}
              value={cardDetails.cvv}
            />

            <Text style={styles.modalLabel}>Total Amount</Text>
            <Text style={styles.modalInput}>PKR {totalAmount}</Text>

            <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
              <Text style={styles.paymentButtonText}>Submit Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowPaymentModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50, 
  },
  container: {
    flex: 1,
    paddingRight: 35,
    paddingLeft: 35,
  },
  headerSection: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dotsIcon: {
    width: 25,
    height: 25,
  },
  menuIconStyle: {
    width: 25,
  },
  HeaderText: {
    fontSize: 20,
    marginLeft: 5,
    fontWeight: "500",
  },
  faceIconStyle: {
    width: 30,
  },
  imageSection: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  vehicleImage: {
    width: 300,
    height: 300,
  },
  menuOptions: {
    position: 'absolute',
    top: 70, 
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 10, 
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  headSection: {},
  topTextArea: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  makemodelText: {
    fontSize: 20,
    fontWeight: "500",
  },
  price: {
    fontWeight: "400",
  },
  amount: {
    fontWeight: "bold",
  },
  typetranText: {
    marginTop: 1,
    color: "#696969",
    fontWeight: "600",
    fontSize: 12,
  },
  descriptionText: {
    marginTop: 30,
    fontSize: 14,
    letterSpacing: 0.1,
    lineHeight: 18,
    color: "#696969",
    fontWeight: "500",
  },
  propertiesText: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "500",
  },
  propertiesArea: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  level: {
    marginRight: 30,
  },
  propertyText: {
    fontSize: 12,
    color: "#696969",
  },
  valueText: {
    fontSize: 12,
    color: "black",
  },
  bookingTitle: {
    marginTop: 30,
    fontSize: 19,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  rentButton: {
    marginTop: 20,
    height: 40,
    alignSelf: "center",
    width: 250,
    backgroundColor: "black",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  rentButtonText: {
    color: "white",
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  menuOptions: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  paymentButton: {
    marginTop: 20,
    height: 40,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "black",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentButtonText: {
    color: "white",
    fontWeight: "500",
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "black",
    fontWeight: "500",
  },
});
