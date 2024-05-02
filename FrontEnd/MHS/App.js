import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import ModestGallery from "./ModestGallery";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import LoginScreen from "./LoginScreen";
import SearchScreen from "./SearchScreen";
import Logout from "./Logout";
import SignUpScreen from "./SignUpScreen";
import { View, Text, Alert } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Category from "./Category";
import SubCategory from "./SubCategory";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigation() {
  const navigation = useNavigation();
  // const [Logo, setLogo] = useState(false)

  return (
    <Tab.Navigator
      initialRouteName={"Homescreen"}
      screenOptions={({ route, component }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Modest Hijab Store") {
            iconName = "home";
          } else if (
            route.name === "Profile" ||
            route.component == "SignUpScreen"
          ) {
            iconName = "person";
          } else if (route.name === "Cart") {
            iconName = "cart";
          } else if (route.name == "login") {
            iconName = "person-add";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          display: "flex",
          // backgroundColor:'#6C0022'
        },
        tabBarActiveTintColor: "#FB6D6C",
      })}
    >
      <Tab.Screen
        name="Modest Hijab Store"
        component={StackNavigation}
        options={{
          headerStyle: {
            // backgroundColor:'#f4e9dc'
          },
          headerTintColor: "#666F80",
          headerShown: true,
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 20 }}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#FB6D6C"
                style={{ marginRight: 10 }}
                onPress={() => Alert.alert(" No notification")}
              />
              <AntDesign
                name="hearto"
                size={24}
                color="#FB6D6C"
                onPress={() => navigation.navigate("Wishlist")}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen name="Profile" component={LoginScreen} />
      {/* {Logo ? (
        <Tab.Screen name="Profile">
          {(props) => <LoginScreen {...props} setLogo={setLogo} />}
        </Tab.Screen>

      ) : <Tab.Screen name="login" options={{ headerShown: false }}>
        {(props) =><LoginScreen {...props} setLogo={setLogo}  />}
      </Tab.Screen>} */}

      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
}

function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Homescreen"
        component={ModestGallery}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product"
        component={ProductDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubCategory"
        component={SubCategory}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App(navigation) {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}
