import React, { useState } from 'react';
import { View, Text, SafeAreaView, Keyboard, Alert, StyleSheet, Platform } from 'react-native';
import Button from './Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from './Input';
import Logout from './Logout';
const isIOS = Platform.OS === 'ios';



export default function LoginScreen({ navigation, setLogo }) {
  const [inputs, setInputs] = useState({ password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [Profile, setProfile] = useState(true)

  const validate = async () => {

    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.username) {
      handleError('Please input username', 'username');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (
          inputs.password == userData.password &&
          inputs.username == userData.username
        ) {
          // navigation.navigate('Logout');
          setProfile(false)
          setLogo(true);
          Alert.alert('login succussfully')
          AsyncStorage.setItem(
            'userData',
            JSON.stringify({ ...userData, loggedIn: true }),
          );

        } else {
          Alert.alert('Error', 'Invalid Details');
        }
      } else {
        Alert.alert('Error', 'User does not exist');
      }
    }, 1000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  if (Profile) {

    return (
      <SafeAreaView style={styles.container}>
        <Loader visible={loading} />
        <View style={styles.content}>
          <Text style={styles.login}>Log In</Text>
          <Text style={styles.logintext}>Enter Your Details to Login</Text>
          <View style={styles.form}>
            <Input
              onChangeText={text => handleOnchange(text, 'username')}
              onFocus={() => handleError(null, 'username')}
              iconName="account-outline"
              label="Username"
              placeholder="Enter your username"
              error={errors.username}
            />

            <Input
              onChangeText={text => handleOnchange(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              iconName="lock-outline"
              label="Password"
              placeholder="Enter your password"
              error={errors.password}
              password
            />
            <Button title="Log In" register='login' onPress={validate} />
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <Text onPress={() => navigation.navigate('signUp')} style={styles.signupLink}>Register</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>

    );
  } else {
    return (
      <View>
        <Logout setProfile={setProfile} username={inputs.username} setLoading={setLoading} loading={loading} setLogo={setLogo} />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isIOS ? '#f7f7f5' : '#f7f7f5',
  },
  content: {
    paddingHorizontal: 20,
    width: '100%',
  },
  titles: {
    color: '#333',
    fontSize: 32,
    marginBottom: 10,
  },
  subtitle: {
    color: '#666',
    fontSize: 16,
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    color: 'black',
    marginRight: 5,
    fontWeight: 'bold'
  },
  signupLink: {
    color: '#FB6D6C',
    fontWeight: 'bold',
  },
  logintext: {
    // margin:20,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 20,
    // color: "#6C0022"
  },
  login: {
    marginBottom: 25,
    fontSize: 40,
    textAlign: 'center',
    // color: '#6C0022'
  }
});