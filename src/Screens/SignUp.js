import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  // Button,
  Image,
  TextInput,
  TouchableOpacity,
  // ScrollView,
  // Alert,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
// import SignUp from "./SignUp";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
// import Icon as FIcon from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";
import schema from "../Schemes/UserScheme";
import { auth, createUserWithEmailAndPassword } from "../../Firebase/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import ValidErrors from "../ValidErrors";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState(" ");
  const [password, setpassword] = useState(" ");
  const [isSignedIn, setisSignedIn] = useState(false);
  const [error, setError] = useState(" ");
  const [isError, setIsError] = useState(false);

  const navigate = () => {
    navigation.pop();
  };

  const handleSubmit1 = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        // setisSignedIn(true);
        // console.log("first");
        // navigate();
      })
      .catch((err) => {
        setIsError(true);
        switch (err.code) {
          case "auth/email-already-exists":
            setError("email already in use!");
            break;
          case "auth/email-already-in-use":
            setError("email already in use!");
            break;
          case "auth/invalid-email":
            setError("invalid email!");
            break;
        }
      });
  };

  return (
    <LinearGradient
      colors={["#5a36db", "#3a288e", "rgb(36, 35, 34)"]}
      style={styles.linearGradient}
      locations={[0, 0.1, 1]}
    >
      <StatusBar />
      <View style={styles.mainView}>
        <View style={styles.TopView}>
          <Icon
            name="angle-left"
            size={32}
            color={"white"}
            style={styles.backIcon}
            onPress={navigate}
          />
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/MomentLogo.png")}
          />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
          style={styles.BottomView}
        >
          <Text style={styles.textStyle}>Join Us Now !</Text>
          <Formik
            initialValues={{ email: "", password: "", confirmpassword: "" }}
            validateOnMount={true}
            onSubmit={handleSubmit1}
            validationSchema={schema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <View style={styles.FormView}>
                {/* <TextInput
                  name="fullName"
                  onChangeText={handleChange("fullName")}
                  value={values.fullName}
                  onBlur={handleBlur("fullName")}
                  placeholder="Full Name*"
                  placeholderTextColor={"white"}
                  style={styles.TextInput}
                />
                {errors.fullName && touched.fullName && (
                  <Text style={styles.errors}>{errors.fullName}</Text>
                )} */}
                <TextInput
                  name="email"
                  placeholder="Email Address*"
                  style={styles.TextInput}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                  placeholderTextColor={"white"}
                  // textContentType="emailAddress"
                />
                {errors.email && touched.email && (
                  <Text style={styles.errors}>{errors.email}</Text>
                )}
                {isError && <ValidErrors error={error} />}
                <TextInput
                  name="password"
                  placeholder="Password*"
                  style={styles.TextInput}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                  placeholderTextColor={"white"}
                  // textContentType="password"
                />
                {errors.password && touched.password && (
                  <Text style={styles.errors}>{errors.password}</Text>
                )}
                <TextInput
                  name="confirmpassword"
                  placeholder="confirm Password*"
                  style={styles.TextInput}
                  onChangeText={handleChange("confirmpassword")}
                  onBlur={handleBlur("confirmpassword")}
                  value={values.confirmpassword}
                  secureTextEntry
                  placeholderTextColor={"white"}
                  // textContentType="password"
                />
                {errors.confirmpassword && (
                  <Text style={styles.errors}>{errors.confirmpassword}</Text>
                )}
                <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
                  <LinearGradient
                    colors={["#7045FD", "#6F45FB", "#845EEE"]}
                    start={[0.1, 0.1]}
                    end={[1, 0.3]}
                    style={styles.GradBtn}
                    locations={[0.1, 0.5, 1]}
                  >
                    <Text style={styles.btnText}>Sign Up !</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: 35,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgb(36, 35, 34)",
    fontFamily: "Helvetica-BoldOblique",
  },
  linearGradient: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "transparent",
  },
  GradBtn: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  TopView: {
    width: "100%",
    height: "15%",
    flex: 1,
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    // alignContent: "center",
  },
  backIcon: {
    alignSelf: "flex-start",
    // height: "10%",
    // marginRight: 32,
    // marginTop: 5,
    marginLeft: widthPercentageToDP("2%"),
    // marginLeft: "auto",
  },
  tinyLogo: {
    alignSelf: "center",
    // justifyContent: "flex-start",
    // marginLeft: "auto",
    // marginBottom: 50,
    // marginRight: widthPercentageToDP("22%"),
    width: "50%",
    resizeMode: "contain",
    height: "100%",
    // marginTop: 60,
    // marginBottom: 65,
    // marginLeft: 65,
  },
  BottomView: {
    flex: 8,
    alignItems: "center",
    width: "100%",
    height: "85%",
    // backgroundColor: "rgb(36, 35, 34)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    // paddingBottom: 50,
  },

  textStyle: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 35,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    display: "flex",
  },
  TextInput: {
    width: "76%",
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    borderBottomWidth: 0.3,
    height: "12%",
    borderRadius: 30,
    paddingHorizontal: 10,
    marginTop: 28,
    color: "white",
    // flex: 1,
    // flexDirection: "row",
  },
  FormView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  Button: {
    height: "12%",
    width: "42%",
    color: "white",
    // backgroundColor: "rgb(58,40,142)",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  // SignUpBtn: {
  //   height: 52,
  //   width: "80%",
  //   color: "white",
  //   backgroundColor: "cyan",
  //   marginTop: 20,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 30,
  // },
  // SignInText: {
  //   color: "rgb(36, 35, 34)",
  //   fontWeight: "bold",
  // },

  errors: {
    fontSize: 12,
    color: "red",
    marginTop: 3,
    fontWeight: "bold",
  },
});

export default SignUp;
