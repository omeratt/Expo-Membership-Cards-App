import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ValidErrors({ error }) {
  return (
    <View>
      <Text style={styles.errors}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errors: {
    fontSize: 12,
    color: "red",
    marginTop: 3,
    fontWeight: "bold",
  },
});
