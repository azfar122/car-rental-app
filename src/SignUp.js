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

export default function SignUp({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignUp = () => {
    if (form.password !== form.confirmPassword) {
      Alert.alert('Passwords do not match!');
      return;
    }
    // Add your sign-up logic here
    Alert.alert('Account created successfully!');
    navigation.navigate('Login'); // Navigate to Login screen upon successful sign-up
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
          <Text style={styles.title}>Create an account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              style={styles.inputControl}
              placeholder="anyone@example.com"
              placeholderTextColor="#6b7280"
              value={form.email}
              onChangeText={(email) => setForm({ ...form, email })}
            />
          </View>
          <View style={styles.input}>
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
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              secureTextEntry
              style={styles.inputControl}
              placeholder="********"
              placeholderTextColor="#6b7280"
              value={form.confirmPassword}
              onChangeText={(confirmPassword) => setForm({ ...form, confirmPassword })}
            />
          </View>
        </View>

        <View style={styles.formAction}>
          <TouchableOpacity onPress={handleSignUp}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Sign up</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ marginTop: 'auto' }}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.formFooter}>
            Already have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign in</Text>
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
