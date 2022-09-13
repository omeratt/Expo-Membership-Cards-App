import { View, Text } from "react-native";
import React from "react";
import SignIn from "./Screens/SignIn";
import SignUp from "./Screens/SignUp";
import Home from "./Screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "./useAuth";
import BarCode from "./components/BarCode";
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();
  //   const user = false;
  return (
    <Stack.Navigator screenOptions={{ headerTransparent: false }}>
      {!user ? (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BarCode"
            component={BarCode}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
