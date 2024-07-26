import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";

const SettingsScreen = ({ navigation, onLogout }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [accountName, setAccountName] = useState("Demo User");

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleLogout = () => {
    onLogout(); // Call the logout function passed from App.js
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Account Name</Text>
          <Text style={styles.accountName}>{accountName}</Text>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Enable Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Change Password</Text>
          <TouchableOpacity onPress={() => alert("Change Password")}>
            <Text style={styles.linkText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Privacy Policy</Text>
          <TouchableOpacity onPress={() => alert("Privacy Policy")}>
            <Text style={styles.linkText}>View</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Terms of Service</Text>
          <TouchableOpacity onPress={() => alert("Terms of Service")}>
            <Text style={styles.linkText}>View</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#C8ACD6",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingText: {
    fontSize: 18,
    fontWeight: "500",
  },
  accountName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#555",
  },
  linkText: {
    fontSize: 18,
    color: "#1E90FF",
  },
  logoutContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#433D8B",
    padding: 10,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default SettingsScreen;
