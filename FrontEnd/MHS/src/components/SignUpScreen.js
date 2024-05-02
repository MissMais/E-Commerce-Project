import { StyleSheet, Keyboard, Alert, Platform } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from 'axios';
import Input from "./Input";
import Button from "./Button";
import { ScrollView } from "react-native";
import { Text, View } from "react-native";
import axios from "axios";

export default function SignUpScreen({ navigation }) {
  const [errors, seterror] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputs, setinputs] = useState({
    Email: "",
    first_name: "",
    last_name: "",
    Contact: "",
    password: "",
    username: "",
    // Confirm_password:'',
    // Address:"",
  });

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem("userData", JSON.stringify(inputs));
        navigation.navigate("login");
        Alert.alert("Registered successfully", inputs.username);
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 2000);
  };

  const validation = () => {
    console.log(inputs);

    axios
      .post("http://192.168.73.137:8000/customer/", inputs)
      .then((response) => {
        console.log(response.data);
        // navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.username) {
      HandleError("Please input Username", "username");
      valid = false;
    } else if (inputs.username.length < 4) {
      HandleError("Username is too short", "username");
      valid = false;
    }

    if (!inputs.Email) {
      HandleError("Please input email", "Email");
      valid = false;
    } else if (!inputs.Email.match(/\S+@\S+\.\S+/)) {
      HandleError("Please input a valid email", "Email");
      valid = false;
    }

    if (!inputs.first_name) {
      HandleError("Please input firstname", "first_name");
      valid = false;
    } else if (inputs.first_name.length < 3) {
      HandleError("minimum name length of 3", "first_name");
      valid = false;
    }
    if (!inputs.last_name) {
      HandleError("Please input lastname", "last_name");
      valid = false;
    } else if (inputs.last_name.length < 3) {
      HandleError("minimum name length of 3", "last_name");
      valid = false;
    }

    if (!inputs.Contact) {
      HandleError("Please input phone number", "Contact");
      valid = false;
    } else if (inputs.Contact.length != 10) {
      HandleError("Please input 10 digit number", "Contact");
      valid = false;
    }

    if (!inputs.password) {
      HandleError("Please input password", "password");
      valid = false;
    } else if (inputs.password.length < 5) {
      HandleError("Minimum password length of 5", "password");
      valid = false;
    }
    // if (inputs.Address.length<12) {
    //     HandleError('Address is too short', 'Address');
    //     valid = false;
    // }
    // if (inputs.Confirm_password!=inputs.password) {
    //     HandleError('Password is not matched', 'Confirm_password');
    //     valid = false;
    // }

    if (valid) {
      register();
    }
  };
  const handleonchange = (text, input) => {
    setinputs((prevState) => ({ ...prevState, [input]: text }));
  };
  console.log(inputs);

  const HandleError = (error, input) => {
    seterror((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <View>
      <Loader visible={loading} />
      <ScrollView>
        <Text style={styles.text}>Sign Up</Text>
        <Text style={styles.text2}>Enter your Details to Register</Text>

        <View style={styles.form}>
          <Input
            onChangeText={(text) => handleonchange(text, "username")}
            onFocus={() => HandleError(null, "username")}
            iconName="account-reactivate"
            label="Username"
            placeholder="Enter Username"
            error={errors.username}
          />
          <Input
            onChangeText={(text) => handleonchange(text, "first_name")}
            onFocus={() => HandleError(null, "first_name")}
            iconName="account-outline"
            label="First Name"
            placeholder="Enter your first Name"
            error={errors.first_name}
          />
          <Input
            onChangeText={(text) => handleonchange(text, "last_name")}
            onFocus={() => HandleError(null, "last_name")}
            iconName="account-outline"
            label="last Name"
            placeholder="Enter your Last Name"
            error={errors.last_name}
          />
          <Input
            onChangeText={(text) => handleonchange(text, "Email")}
            onFocus={() => HandleError(null, "Email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your Email address"
            error={errors.Email}
          />
          <Input
            onChangeText={(text) => handleonchange(text, "Contact")}
            onFocus={() => HandleError(null, "Contact")}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.Contact}
            keyboardType="numeric"
          />
          <Input
            onChangeText={(text) => handleonchange(text, "password")}
            onFocus={() => HandleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          {/* <Input
                    onChangeText={text => handleonchange(text, 'Confirm_password')}
                    onFocus={() => HandleError(null, 'Confirm_password')}
                    iconName="lock-outline"
                    label="Confirm password"
                    placeholder="Enter your Confirm password"
                    error={errors.Confirm_password}
                    password                
                /> */}
          {/* <Input
                onChangeText={text => handleonchange(text, 'Address')}
                onFocus={() => HandleError(null, 'Address')}
                iconName="bank"
                label="Address"
                placeholder="Enter your Address"
                error={errors. Address}               
            />        */}

          <Button onPress={validation} register="Register" />
          <View
            style={{
              flexDirection: "row",
              marginBottom: 50,
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.nav}>Already have an account ?</Text>
            <Text
              style={{
                color: "#FB6D6C",
                fontWeight: "bold",
                marginVertical: 8,
                textAlign: "center",
                fontSize: 16,
              }}
              onPress={() => navigation.navigate("login")}
            >
              login
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const isIOS = Platform.OS === "ios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isIOS ? "#f7f7f5" : "#f7f7f5",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  text: {
    // color: '#6C0022',
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 20,
    textAlign: "center",
    marginBottom: 15,
  },
  text2: {
    // color: '#6C0022',
    fontSize: 18,
    // marginVertical: 10,
    // marginHorizontal: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  form: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
  },
  nav: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 7,
    marginVertical: 8,
  },
});
