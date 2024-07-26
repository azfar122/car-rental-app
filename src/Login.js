// Login.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

export default function Login({ navigation, onLogin }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    // You might want to add real authentication logic here
    Alert.alert('Successfully logged in!');
    onLogin(); // Call the callback function to update the logged-in state
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#C8ACD6' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('./assets/vehicles/logo.png')}
            style={styles.headerImg}
            alt="Logo"
          />
          <Text style={styles.title}>Sign in to your account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              style={styles.inputControl}
              placeholder="azfar.bilal777@gmail.com"
              placeholderTextColor="#6b7280"
              value={form.email}
              onChangeText={(email) => setForm({ ...form, email })}
            />
          </View>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            secureTextEntry
            style={styles.inputControl}
            placeholder="********"
            placeholderTextColor="#6b7280"
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
          />
        </View>

        <View style={styles.formAction}>
          <TouchableOpacity onPress={handleLogin}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Sign in</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ marginTop: 'auto' }}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.formFooter}>
            Don't have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#C8ACD6',
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    height: 80,
    width: 230,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1e1e1e',
    marginBottom: 6,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  form: {
    marginBottom: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  btn: {
    backgroundColor: '#433D8B',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#433D8B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
