import { View, Text, TouchableOpacity, Image, TextInput, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Sign In', 'Sign in successful!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'), // Change 'Home' to your desired screen
          },
        ]);
      } catch (err) {
        if (err instanceof Error) {
          console.log('got error: ', err.message);
          let msg = err.message;
          if (msg.includes('invalid-login-credentials')) msg = "Invalid credentials";
          if (msg.includes('auth/invalid-email')) msg = "Invalid email";
          Alert.alert('Sign In', msg);
        } else {
          console.log('An unexpected error occurred', err);
          Alert.alert('Sign In', 'An unexpected error occurred. Please try again.');
        }
      }
    } else {
      Alert.alert('Sign In', 'Please fill in all fields');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFF' }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/login.jpeg')} style={styles.loginImage} />
        </View>
      </SafeAreaView>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={value => setEmail(value)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="password"
            value={password}
            onChangeText={value => setPassword(value)}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.orText}>Or</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../assets/images/google.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../assets/images/apple.jpeg')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../assets/images/fb.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.signupPromptContainer}>
          <Text style={styles.signupPromptText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLinkText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  backButton: {
    backgroundColor: '#FFCACC',
    padding: 8,
    borderRadius: 12,
    marginLeft: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginImage: {
    width: 200,
    height: 200,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingTop: 32,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  form: {
    padding: 16,
  },
  label: {
    color: '#4A4A4A',
    marginLeft: 16,
    marginBottom: 8,
  },
  input: {
    padding: 16,
    backgroundColor: '#E0E0E0',
    color: '#4A4A4A',
    borderRadius: 16,
    marginBottom: 12,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  forgotPasswordText: {
    color: '#4A4A4A',
  },
  submitButton: {
    paddingVertical: 12,
    backgroundColor: '#FFCACC',
    borderRadius: 16,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4A4A4A',
  },
  orText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4A4A4A',
    paddingVertical: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    marginHorizontal: 12,
  },
  icon: {
    width: 40,
    height: 40,
  },
  signupPromptContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  signupPromptText: {
    color: '#9E9E9E',
    fontWeight: '600',
  },
  signupLinkText: {
    fontWeight: '600',
    color: '#FFEB3B',
  },
});
