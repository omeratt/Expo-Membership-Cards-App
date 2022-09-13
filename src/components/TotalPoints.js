import { View, Text, StyleSheet, Animated } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import LottieView from "lottie-react-native";
import useAuth from "../useAuth";

const TotalPoints = () => {
  const animation = React.useRef(null);
  const { isBarcodeScanned, totalPoints } = useAuth();

  const lottieView = () => {
    <LottieView
      ref={animation}
      resizeMode="cover"
      source={require("../../assets/lottie/circle3.json")}
      autoPlay={true}
      loop={true}
    />;
  };

  React.useEffect(() => {
    // if (animation.current) {
    console.log(animation);
    animation.current?.play(0, 122);
    // }
  }, [totalPoints]);

  return (
    <View style={styles.container}>
      <View style={styles.borderContainer}>
        <LottieView
          ref={animation}
          resizeMode="cover"
          source={require("../../assets/lottie/circle3.json")}
          autoPlay={false}
          loop={false}
        />
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          Points:
        </Text>
        <Text style={{ color: "white", fontSize: 18 }}>{totalPoints}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2.2,
    marginTop: 10,
    alignSelf: "center",
    alignItems: "center",
    // justifyContent: "flex-start",
    // backgroundColor: "red",
    // margin: 70,
  },
  borderContainer: {
    // flex: 1,
    height: hp("17%"),
    width: hp("17%"),
    // borderRadius: hp("2%"),
    // borderBottomColor: "white",
    position: "absolute",
    // borderColor: "transparent",
    justifyContent: "center",
    // borderWidth: 1,
    alignItems: "center",
    // backgroundColor: "white",
    // margin: 30,
    // paddingTop: hp("3.5%"),
  },
});

export default TotalPoints;
