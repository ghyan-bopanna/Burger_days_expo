import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import DisplayScreen from "./src/screens/DisplayScreen";
import MenuScreen from "./src/screens/MenuScreen";
import CartScreen from "./src/screens/CartScreen";
import OrderConfirm from "./src/screens/OrderConfirm";
import BurgerIcon from "./images/burger.png";
import ProfileIcon from "./images/profileicon.png";
import MenuIcon from "./images/menu.png";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Display" component={DisplayScreen} />
  </Stack.Navigator>
);

const MenuStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Menu" component={MenuScreen} />
    <Stack.Screen name="CartScreen" component={CartScreen} />
    <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "HomeStack") {
              iconName = BurgerIcon;
            }
            if (route.name === "Profile") {
              iconName = ProfileIcon;
            }
            if (route.name === "MenuStack") {
              iconName = MenuIcon;
            }

            // Return icon component with reduced opacity if not focused
            return (
              <Image
                source={iconName}
                style={{
                  width: size,
                  height: size,
                  opacity: focused ? 1 : 0.5,
                }}
              />
            );
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "black" },
        })}
      >
        <Tab.Screen name="HomeStack" component={HomeStack} />
        <Tab.Screen name="MenuStack" component={MenuStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
