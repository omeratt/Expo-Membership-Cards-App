import AnimatedSplash from "react-native-animated-splash-screen";

import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import useAuth from "./useAuth";
// import * as Progress from "react-native-progress";
// import FastImage from "expo-react-native-fast-image";
// import FastImage1 from "react-native-fast-image";
export default function Loading() {
  const { loading } = useAuth();
  // const logo = require("../assets/MomentLogo.png");
  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={loading}
      // logoImage={require("../assets/MomentLogo.png")}
      logoImage={{
        uri: "https://media.giphy.com/media/LTwJiEgTRUqxndgdCq/giphy.gif",
      }}
      // backgroundColor={"#1a1940"}
      backgroundColor={"#161535"}
      // logoHeight={150}
      // logoWidth={150}
      logoHeight={500}
      logoWidth={450}
      // marginVertical={30}
    >
      {/* //   <ActivityIndicator
    //     size="large"
    //     // marginVertical={30}
    //     color="red"
    //     style={styles.load}
    //   /> */}
    </AnimatedSplash>
  );
}

const styles = StyleSheet.create({
  load: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "stretch",
    // alignContent: "center",
    // marginTop: "50",
  },
  container: {
    width: "50%",
    resizeMode: "contain",
    alignItems: "center",
    height: "50%",
  },
});
