import { StyleSheet, Image, View, Text, TouchableOpacity, TextInput, Alert, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function SignUpScreen() {
  const navigation = useNavigation();
  //state management for password and email
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Sign Up', 'Sign up successful!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      } catch (error) {
        let msg = 'An unexpected error occurred';
        if (error instanceof Error) {
          console.log('error', error.message);
          msg = error.message;
          if (msg.includes('auth/email-already-in-use')) msg = 'Email already in use';
          if (msg.includes('auth/invalid-email')) msg = 'Please use a valid email';
        }
        Alert.alert('Sign Up', msg);
      }
    } else {
      Alert.alert('Sign Up', 'Please fill in all fields');
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: '#FFFFF' }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/login.jpeg')}
            style={styles.signupImage} />
        </View>
      </SafeAreaView>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={username}
            autoCapitalize='none'
            onChangeText={value => setUsername(value)}
            placeholder='Enter Name'
          />
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={value => setEmail(value)}
            autoCapitalize='none'
            placeholder='Enter Email'
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            secureTextEntry
            value={password}
            onChangeText={value => setPassword(value)}
            placeholder='Enter Password'
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={()=>submit()}
          >
            <Text style={styles.submitButtonText}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.orText}>
          Or
        </Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../assets/images/google.png')}
              style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../assets/images/apple.jpeg')}
              style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../assets/images/fb.png')}
              style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.loginPromptContainer}>
          <Text style={styles.loginPromptText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLinkText}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
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
    height:100
  },
  signupImage: {
    width: 155,
    height: 100,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingTop: 32,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },

  label: {
    color: '#4A4A4A',
    marginLeft: 16,
    marginBottom: 8,
  },
  form:{
    padding:16
  },
  input: {
    padding: 16,
    backgroundColor: '#E0E0E0',
    color: '#4A4A4A',
    borderRadius: 16,
    marginBottom: 12,
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
    padding:48
  },
  iconButton: {
    padding: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
  },
  icon: {
    width: 30,
    height: 30,
  },
  loginPromptContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  loginPromptText: {
    color: '#9E9E9E',
    fontWeight: '600',
  },
  loginLinkText: {
    fontWeight: '600',
    color: '#FFEB3B',
  },

});