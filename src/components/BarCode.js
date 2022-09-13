import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useRoute } from "@react-navigation/native";
import useAuth from "../useAuth";
// import { white } from "react-native-paper/lib/typescript/styles/colors";

const { width } = Dimensions.get("window");
const qrSize = width * 0.7;
const opacity = "rgba(0, 0, 0, .6)";

const BarCode = (props) => {
  const param = useRoute();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState();
  const { Create, setLoading } = useAuth();
  const navigate = () => {
    props.navigation.pop();
  };
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanner = ({ data }) => {
    setScanData(data);
    try {
      const scannedData = JSON.parse(data);
      if (!scannedData.Company) throw new Error();
      Create(scannedData);
    } catch (e) {
      alert(
        "We are sorry but at the moment the store does not support our app"
      );
      setLoading(false);
    }
    navigate();
  };

  const isDataExist = (data) => {
    const size = props.route.params.barCodeData?.filter((obj) => {
      return obj["Company"] === data["Company"];
    }).length;

    return size > 0;
  };

  if (!hasPermission) {
    return (
      <View>
        <Text>no camera permission</Text>
      </View>
    );
  }

  return (
    <BarCodeScanner
      style={[StyleSheet.absoluteFill, styles.container]}
      onBarCodeScanned={scanData ? undefined : handleBarCodeScanner}
    >
      {/* <Image style={styles.qr} source={require("../assets/img/QR.png")} /> */}

      <View style={styles.layerTop}>
        <Text style={styles.description}>Scan your QR code</Text>
      </View>
      <View style={styles.layerCenter}>
        <View style={styles.layerLeft} />
        <View style={styles.focused} />
        <View style={styles.layerRight} />
      </View>
      <View style={styles.layerBottom}>
        <Text onPress={() => navigate()} style={styles.cancel}>
          Cancel
        </Text>
      </View>
    </BarCodeScanner>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgb(36, 35, 34)",
  },
  layerTop: {
    flex: 1,
    alignItems: "center",

    // justifyContent: "center",
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 5,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  cancel: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default BarCode;
