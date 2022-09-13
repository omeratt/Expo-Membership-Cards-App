import { StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Background = ({ children }) => {
  return (
    <LinearGradient
      colors={["#5a36db", "#3a288e", "rgb(36, 35, 34)"]}
      style={styles.linearGradient}
      locations={[0, 0.1, 1]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    // width: "100%",
    // height: "100%",
    // paddingLeft: 15,
    // paddingRight: 15,
    // backgroundColor: "transparent",
  },
});
export default Background;
