// import { View, Text, Linking } from "react-native";
import { React, useState } from "react";
import { StyleSheet, View, Animated, Dimensions } from "react-native";
// import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Card, { CARD_HEIGHT as DEFAULT_CARD_HEIGHT } from "./Card";

export const MARGIN = 24;
const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN * 2;
const { height: wHeight } = Dimensions.get("window");
const { width } = Dimensions.get("window");

const height = wHeight - 64;
// export const HEIGHT =
const CompanyCard = ({ data }) => {
  const { item, index, y, setVisible, setTransferPointsFromToCompany } = data;
  // console.log(CARD_HEIGHT);

  const [itemHeight, setItemHeight] = useState(0);
  // console.log(itemHeight);

  const position = Animated.subtract(index * itemHeight, y);
  const isDisappearing = -itemHeight;
  const isTop = 0;
  const isBottom = height - itemHeight;
  const isAppearing = height;
  const inputRange = [index - 1, index, index + 1];
  let translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, index * itemHeight],
        outputRange: [0, -index * itemHeight],
        extrapolateRight: "clamp",
      })
    ),

    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, itemHeight / 4],
      extrapolate: "clamp",
    })
  );
  // const scale = position.interpolate({
  //   inputRange: [isDisappearing, isTop, isBottom, isAppearing],
  //   outputRange: [0.5, 1, 1, 0.5],
  //   extrapolateRight: "clamp",
  // });
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: "clamp",
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });
  return (
    <Animated.View
      style={[
        styles.cardContainer,
        { opacity, transform: [{ translateY }, { scale }] },
      ]}
      key={index}
    >
      <Card
        data={{
          item,
          setItemHeight,
          setVisible,
        }}
      />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    // marginVertical: 16,
    // alignSelf: "center",
    // width: widthPercentageToDP("87%"),
    // marginRight: 20,
    // height: "50%",
    marginVertical: MARGIN,
    // margin: "10%",
    alignSelf: "center",
  },
});
export default CompanyCard;
