import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import schema from "../Schemes/UserScheme";
import ValidErrors from "../ValidErrors";
import { auth, signInWithEmailAndPassword } from "../../Firebase/firebase";
import useAuth from "../useAuth";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { SocialIcon } from "react-native-elements";
import Loading from "../Loading";
import { heightPercentageToDP } from "react-native-responsive-screen";
const SignIn = ({ navigation }) => {
  const {
    signInWithGoogle,
    loading,
    Googleloading,
    setLoading,
    setLogged,
    Read,
  } = useAuth();
  const [error, setError] = useState(" ");
  const [isError, setIsError] = useState(false);
  // const signInWithGoogle = () => {
  //   console.log("asd");
  // };
  const navigate = () => {
    // console.log(auth);
    navigation.navigate("SignUp");
  };

  const HandleSignIn = (value) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, value.email, value.password)
      .then((res) => {
        console.log(`${value.email} is connected succsessfully!`);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        switch (err.code) {
          case "auth/user-not-found":
            setError("Email or Password Incorrect!");
            setLoading(false);
            break;
          case "auth/wrong-password":
            setError("Password Incorrect!");
            setLoading(false);
            break;
        }
      })
      .finally(() => {
        console.log("asdasdasdasdsadasdad");
        setLogged(true);
      });
  };

  return (
    <>
      {!loading ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
          style={styles.mainView}
        >
          <StatusBar />
          <LinearGradient
            colors={["#5a36db", "#3a288e", "rgb(36, 35, 34)"]}
            style={styles.linearGradient}
            locations={[0.1, 0.3, 1]}
          >
            <View style={styles.TopView}>
              <Image
                style={styles.tinyLogo}
                source={require("../../assets/MomentLogo.png")}
              />
            </View>
          </LinearGradient>

          <View style={styles.BottomView}>
            <Text style={styles.textStyle}>Welcome Back !</Text>
            <Formik
              initialValues={{ email: "", password: "" }}
              validateOnMount={true}
              onSubmit={HandleSignIn}
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
                  {isError && <ValidErrors error={error} />}
                  <TextInput
                    name="email"
                    placeholder="Email Address*"
                    style={styles.TextInput}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                    placeholderTextColor={"white"}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errors}>{errors.email}</Text>
                  )}
                  <TextInput
                    name="password"
                    placeholder="Password*"
                    style={styles.TextInput}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    placeholderTextColor={"white"}
                    secureTextEntry
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errors}>{errors.password}</Text>
                  )}
                  <TouchableOpacity
                    style={styles.Button}
                    onPress={handleSubmit}
                  >
                    <LinearGradient
                      colors={["#845EEE", "#6F45FB", "#7045FD"]}
                      start={[0.1, 0.1]}
                      end={[1, 0.3]}
                      style={styles.GradBtn}
                      locations={[0.1, 0.5, 1]}
                    >
                      <Text style={styles.btnText}>Sign in</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <View style={styles.DownButtonsView}>
              <TouchableOpacity style={styles.SignUpBtn} onPress={navigate}>
                <LinearGradient
                  colors={["#6646DC", "#3E2A97", "#6646DC"]}
                  start={[0, 0.1]}
                  end={[0.5, 1]}
                  style={styles.GradBtn}
                  locations={[1, 0.9, 1]}
                >
                  <Text style={styles.SignUpText}>Sign up</Text>
                </LinearGradient>
              </TouchableOpacity>
              <SocialIcon
                style={styles.SignUpBtn}
                type="google"
                button
                onPress={signInWithGoogle}
                loading={Googleloading}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <Loading />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    // marginTop: 35,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(36, 35, 34)",

    fontFamily: "Helvetica-BoldOblique",
  },
  linearGradient: {
    flex: 1.3,
    // height: heightPercentageToDP("18%"),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "transparent",
  },

  TopView: {
    // flex: 3,
    width: "100%",
    height: "100%",
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "white",
  },
  DownButtonsView: {
    // flex: 3,
    width: "70%",
    // height: "41%",
    height: heightPercentageToDP("22%"),
    // marginTop: 10,
    // flex: 1,
    // display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // alignContent: "center",
    // marginBottom: 75,
    justifyContent: "center",
    // backgroundColor: "white",
  },
  BottomView: {
    flex: 5,
    width: "100%",
    // height: "80%",
    backgroundColor: "rgb(36, 35, 34)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    alignContent: "center",
    fontFamily: "Helvetica-BoldOblique",
  },
  tinyLogo: {
    // flex: 5,
    width: "50%",
    resizeMode: "contain",
    alignItems: "center",
    height: "50%",
    // marginTop: 100,
  },

  textStyle: {
    color: "white",
    fontSize: 30,
    fontFamily: "Helvetica-BoldOblique",
    fontWeight: "bold",
    marginTop: 35,
    justifyContent: "center",
    // borderRadius: 30,
    alignContent: "center",

    // display: "flex",
  },
  TextInput: {
    // flex: 1,
    width: "76%",
    backgroundColor: "rgb(36, 35, 34)",

    borderColor: "white",
    borderRadius: 30,
    // borderWidth: 0.3,
    borderBottomWidth: 0.3,
    height: "12%",
    paddingHorizontal: 10,
    marginTop: 25,
    color: "white",
    textAlign: "center",
    fontFamily: "SharpSansNo1-Book",
    fontSize: 15,
  },
  FormView: {
    // flex: 5,
    width: "100%",
    height: "60%",
    // minHeight: 85,
    // display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
    // marginTop: 10,
    // fontFamily: "Helvetica-BoldOblique",
    // backgroundColor: "white",
  },
  Button: {
    // display: "flex",
    // height: "14%",
    height: heightPercentageToDP("6%"),
    // flex: 2,
    width: "42%",
    color: "white",
    // backgroundColor: "rgb(58,40,142)",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    fontFamily: "Helvetica-BoldOblique",
  },
  GradBtn: {
    // flex: 1,
    // display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  btnText: {
    color: "white",
    // fontWeight: "bold",
    fontFamily: "Helvetica-BoldOblique",
    fontSize: RFPercentage(2),
    // fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  SignUpBtn: {
    // flex: 1,
    height: "35%",
    width: "49%",
    color: "white",
    // marginTop: 70,
    borderRadius: 30,
  },
  SignUpText: {
    color: "white",
    fontFamily: "Helvetica-BoldOblique",
    // fontSize: 18,
    fontSize: RFPercentage(2.5),
    alignItems: "center",
    justifyContent: "center",
  },
  errors: {
    fontSize: 12,
    color: "red",
    marginTop: 3,
    fontWeight: "bold",
  },
});

export default SignIn;
