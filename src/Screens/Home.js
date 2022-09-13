import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Animated,
  Picker,
} from "react-native";
import React, { useState } from "react";
import useAuth from "../useAuth";
import {
  ActivityIndicator,
  Colors,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Modal,
  Title,
  TextInput,
} from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CompanyCard from "../components/CompanyCard";
import Background from "../components/Background";
import LottieView from "lottie-react-native";
import DropdownPicker from "../components/DropdownPicker";
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import TotalPoints from "../components/TotalPoints";
// import CARD_HEIGHT from "../components/Card";
const AnimatiedFlatList = Animated.createAnimatedComponent(FlatList);

const Home = ({ navigation }) => {
  const {
    loading,
    logout,
    Read,
    userData,
    isBarcodeScanned,
    setIsBarcodeScanned,
    dataChanged,
    logged,
    transferPointsFromCompany,
    Transfer,
  } = useAuth();
  const [counter, setCounter] = useState(0);
  const animation = React.useRef(null);
  let initialScrollIndex = userData.length;

  const navigate = () => {
    // console.log(auth);
    navigation.navigate("BarCode", {});
  };
  const flatList = React.useRef(null);
  const finishAnim = () => {
    if (!loading) {
      console.log(isBarcodeScanned);
      flatList.current.scrollToEnd();

      if (isBarcodeScanned) {
        animation.current.play(18, 0);
      }
      setIsBarcodeScanned(false);
    }
  };

  React.useEffect(() => Read(), []);

  // React.useEffect(() => {
  //   Read();
  // }, [dataChanged, logged]);

  React.useEffect(() => {
    if (isBarcodeScanned) {
      animation.current.play(0, 18);
      // animation.current.play(18, 0);
      if (userData.length > 0) {
        flatList.current?.scrollToIndex({
          animated: true,
          index: 0,
        });
      }
    }
    // }
    setCounter(counter + 1);
    console.log("counter : " + counter);
  }, [isBarcodeScanned]);

  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });

  const renderItems = () => {
    if (loading)
      return (
        <View style={styles.fetchingDataIndicator}>
          <ActivityIndicator
            style={styles.fetchingDataIndicator}
            animating={true}
            size={"large"}
            color={Colors.red800}
          />
        </View>
      );
    else
      return (
        <AnimatiedFlatList
          ref={flatList}
          contentContainerStyle={{ justifyContent: "center" }}
          bounces={false}
          data={userData}
          onContentSizeChange={() => {
            flatList.current.scrollToEnd();
          }}
          renderItem={({ item, index }) => (
            <CompanyCard data={{ item, index, y, setVisible }} />
          )}
          keyExtractor={(item, index) => index}
          {...{ onScroll }}
          getItemLayout={(data, index) => ({
            length: 288 + 70,
            offset: 288 * index,
            index,
          })}
        />
      );
  };

  const [visible, setVisible] = useState(false);
  const [transferPoints, setTransferPoints] = useState(0);
  const [transferPointsToCompany, setTransferPointsToCompany] = useState();
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const handleTransferChangeText = (val) => {
    if (val > transferPointsFromCompany.Points) {
      alert(
        transferPointsFromCompany.Company +
          " has only " +
          transferPointsFromCompany.Points
      );
      setTransferPoints(transferPointsFromCompany.Points);
    }
    setTransferPoints(val);
  };

  const TransferPointsDialog = () =>
    transferPointsFromCompany &&
    visible && (
      <Provider>
        <Portal>
          <Modal
            style={styles.dialog}
            visible={visible}
            // onDismiss={hideDialog}
            // contentContainerStyle={{ alignSelf: "center" }}
          >
            <View>
              <Paragraph>Transfer to:</Paragraph>
              <DropdownPicker
                data={userData
                  .filter(
                    (obj) => obj.Company != transferPointsFromCompany.Company
                  )
                  .map((obj) => {
                    return (obj = { label: obj.Company, value: obj.Company });
                  })}
                setToCompany={setTransferPointsToCompany}
              />

              <TextInput
                keyboardType="number-pad"
                mode="outlined"
                label="Points"
                placeholder="0"
                onChangeText={handleTransferChangeText}
                right={
                  <TextInput.Affix
                    text={"/" + transferPointsFromCompany.Points}
                  />
                }
              />
              <View style={styles.txtContentContainer}>
                <Button
                  color="#5F9DA5"
                  // mode="contained"
                  mode="outlined"
                  dark={true}
                  onPress={hideDialog}
                >
                  Cancel
                </Button>

                <Button
                  onPress={() => {
                    Transfer(
                      transferPointsToCompany,
                      transferPointsFromCompany,
                      transferPoints
                    );
                    setVisible(false);
                  }}
                >
                  Accept
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </Provider>
    );

  return (
    <Background>
      {/* <TouchableOpacity
        style={{
          width: "100%",
          height: "10%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "tomato",
        }}
        onPress={logout}
      >
        <Text>Logout</Text>
      </TouchableOpacity> */}
      {/* <Button title="Read" onPress={Read} /> */}
      <AppBar
        title="Momentum"
        // subtitle="App"
        centerTitle={true}
        leading={(props) => (
          <IconButton
            icon={(props) => <Icon name="menu" {...props} />}
            {...props}
          />
        )}
        trailing={(props) => (
          <IconButton
            icon={(props) => <Icon name="logout" {...props} />}
            {...props}
            onPress={logout}
          />
        )}
      />
      <View style={styles.cardsContainer}>
        <SafeAreaView style={styles.CardsView}>{renderItems()}</SafeAreaView>
        {TransferPointsDialog()}
      </View>

      <TotalPoints />
      <TouchableOpacity style={styles.plusLottie} onPress={() => navigate()}>
        <LottieView
          // style={{ flex: 1 }}
          resizeMode="cover"
          ref={animation}
          source={require("../../assets/lottie/plus.json")}
          autoPlay={false}
          loop={false}
          speed={0.8}
          onAnimationFinish={finishAnim}
        />
      </TouchableOpacity>
    </Background>
  );
  {
  }
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    flex: 6,
    // justifyContent: "flex-start",
    // backgroundColor: "red",
    // height: "60%",
    // alignItems: "center",
  },
  CardsView: {
    justifyContent: "flex-start",
    // padding: 30,
    flex: 1,
  },
  plusLottie: {
    width: hp("10.5%"),
    height: hp("10.5%"),

    top: -28,
    // position: "absolute",
    alignSelf: "center",
    // alignItems: "center",
    // justifyContent: "center",
    // marginRight: "5%",
  },
  Navbar: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "flex-end",
    height: hp("10%"),
    width: "100%",
    backgroundColor: "black",
    borderBottomLeftRadius: hp("2.5%"),
    borderBottomRightRadius: hp("2.5%"),
    paddingTop: 15,
  },
  PlusButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: "15%",
    height: "100%",
    borderBottomRightRadius: hp("2.5%"),
    fontSize: hp("5%"),
  },
  fetchingDataIndicator: {
    // flex: 1,
    // height: "100%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dialog: {
    // width: widthPercentageToDP("90%"),
    // alignSelf: "center",
    padding: "10%",
    // alignItems: "center",
    backgroundColor: "white",
    // justifyContent: "flex-start",
    justifyContent: "center",
    borderRadius: 30,
    // width: "80%",
    // height: "90%",
  },
  txtContentContainer: {
    height: "50%",
    width: "50%",
  },
  selectBox: {
    height: "15%",
    width: "80%",
    alignItems: "center",
  },
});
