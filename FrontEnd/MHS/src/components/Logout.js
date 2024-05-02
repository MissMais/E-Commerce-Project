import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const isIOS = Platform.OS === "ios";
export default function Logout({
  setProfile,
  username,
  setLoading,
  loading,
  setLogo,
}) {
  const filteredUsername = username
    .replace(/\p{Emoji}/gu, "")
    .replace(/[^A-Za-z]/g, "");
  const firstLetter = filteredUsername.charAt(0).toUpperCase();
  const func = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setProfile(true);
      setLogo(false);
    }, 1000);
    // setLogo(true)
  };
  return (
    <View style={{ backgroundColor: "#f7f7f5" }}>
      <Loader visible={loading} />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <View style={styles.container}>
          <Text style={{ color: "#fff", fontSize: 45, fontWeight: "bold" }}>
            {firstLetter}
          </Text>
        </View>
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#6C0022" }}>
          {username}
        </Text>
      </View>
      <View style={styles.box}>
        <View style={styles.boxelement}>
          <Icon style={styles.icon} name="bag-checked" />
          <TouchableOpacity>
            <Text>Order</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxelement}>
          <Icon style={styles.icon} name="qrcode-scan" />
          <TouchableOpacity>
            <Text>Payment</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxelement}>
          <Icon style={styles.icon} name="star-cog-outline" />

          <TouchableOpacity>
            <Text>Setting</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxelement}>
          <Icon style={styles.icon} name="police-badge-outline" />

          <TouchableOpacity>
            <Text>Legal Policies</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxelement}>
          <Icon style={styles.icon} name="phone-message-outline" />
          <TouchableOpacity>
            <Text>Help Center</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxelement}>
          <Icon style={styles.icon} name="star-check-outline" />
          <TouchableOpacity>
            <Text>Rate Modest Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={func}>
          <Text style={styles.button}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
    borderRadius: 150,
    backgroundColor: "#6C0022",
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },

  box: {
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
    marginHorizontal: 30,
    marginTop: 50,
  },
  button: {
    height: "30%",
    width: "40%",
    borderRadius: 20,
    backgroundColor: "#6C0022",
    color: "#fff",
    textAlignVertical: "center",
    textAlign: "center",
    marginHorizontal: "30%",
    marginVertical: "5%",
  },
  boxelement: {
    flex: 1,
    flexDirection: "row",
  },
  icon: {
    fontSize: 20,
    marginHorizontal: 5,
    color: "#6C0022",
  },
});
