import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth, { AuthProvider } from "./src/useAuth";
import StackNavigator from "./src/StackNavigator";
import AppLoading from "expo-app-loading";
// import { useFonts } from "expo-font";
import { YellowBox } from "react-native";
import { I18nManager } from "react-native";
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
LogBox.ignoreAllLogs(); //Ignore log notfication by message

const Stack = createNativeStackNavigator();

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);
export default function App() {
  const [fontsLoaded] = useFonts({
    "Helvetica-Bold": require("./assets/fonts/Helvetica-Bold.ttf"),
    "Helvetica-BoldOblique": require("./assets/fonts/Helvetica-BoldOblique.ttf"),
    "SharpSansNo1-Book": require("./assets/fonts/SharpSansNo1-Book.ttf"),
  });
  console.log(fontsLoaded ? "fonts loaded!" : "fonts error!!");
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer screenOptions={{ headerTransparent: true }}>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </NavigationContainer>
    );
  }
}

/*
npm install -g expo-cli
expo init BarcodeApp
cd BarcodeApp
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
*/
