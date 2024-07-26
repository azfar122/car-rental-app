import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, StyleSheet } from "react-native";
import HomeScreen from "./src/HomeScreen";
import MapScreen from "./src/MapScreen";
import SettingsScreen from "./src/SettingsScreen";
import SavedScreen from "./src/SavedScreen";
import InfoScreen from "./src/InfoScreen";
import Login from "./src/Login";
import SignUp from "./src/SignUp";
import RoleSelectionScreen from "./src/RoleSelectionScreen";
import AddCarScreen from "./src/AddCarScreen";

// Local image imports
const homeIcon_active = require("./src/assets/icons/home-active.png");
const homeIcon = require("./src/assets/icons/home.png");
const compass_active = require("./src/assets/icons/compass-active.png");
const compass = require("./src/assets/icons/compass.png");
const savedIcon_active = require("./src/assets/icons/saved-active.png");
const savedIcon = require("./src/assets/icons/saved.png");
const settingsIcon_active = require("./src/assets/icons/settings-active.png");
const settingsIcon = require("./src/assets/icons/settings.png");

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack({ savedVehicles, toggleSaveVehicle, vehicles }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen">
        {(props) => (
          <HomeScreen {...props} vehicles={vehicles} savedVehicles={savedVehicles} toggleSaveVehicle={toggleSaveVehicle} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Info">
        {(props) => (
          <InfoScreen
            {...props}
            savedVehicles={savedVehicles}
            toggleSaveVehicle={toggleSaveVehicle}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedVehicles, setSavedVehicles] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const toggleSaveVehicle = (vehicle) => {
    setSavedVehicles((prevVehicles) => {
      const isSaved = prevVehicles.some((item) => item.id === vehicle.id);
      if (isSaved) {
        return prevVehicles.filter((item) => item.id !== vehicle.id);
      } else {
        return [...prevVehicles, vehicle];
      }
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
            <Stack.Screen name="AddCar" component={AddCarScreen} />
            <Stack.Screen name="Main">
              {(props) => (
                <MainTabs
                  {...props}
                  savedVehicles={savedVehicles}
                  toggleSaveVehicle={toggleSaveVehicle}
                  onLogout={() => setIsLoggedIn(false)}
                  vehicles={vehicles}
                  setVehicles={setVehicles}
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <Login {...props} onLogin={() => setIsLoggedIn(true)} />
              )}
            </Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabs({ savedVehicles, toggleSaveVehicle, onLogout, vehicles, setVehicles }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? homeIcon_active : homeIcon;
          } else if (route.name === "Map") {
            iconName = focused ? compass_active : compass;
          } else if (route.name === "Saved") {
            iconName = focused ? savedIcon_active : savedIcon;
          } else if (route.name === "Settings") {
            iconName = focused ? settingsIcon_active : settingsIcon;
          }

          return (
            <Image
              source={iconName}
              resizeMode="contain"
              style={styles.footerIcon}
            />
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          padding: 10,
          backgroundColor: "black",
          borderTopStartRadius: 40,
          borderTopEndRadius: 40,
        },
      })}
    >
      <Tab.Screen name="Home">
        {(props) => (
          <HomeStack
            {...props}
            savedVehicles={savedVehicles}
            toggleSaveVehicle={toggleSaveVehicle}
            vehicles={vehicles}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Saved">
        {(props) => <SavedScreen {...props} savedVehicles={savedVehicles} />}
      </Tab.Screen>
      <Tab.Screen name="Settings">
        {(props) => <SettingsScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  footerIcon: {
    width: 25,
  },
});

export default App;
