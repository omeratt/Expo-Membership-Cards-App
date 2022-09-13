import React, { useState, useMemo } from "react";
import { logInAsync } from "expo-google-app-auth";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import {
  auth,
  db,
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
} from "../Firebase/firebase";
import { createContext, useContext, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
const AuthContext = createContext({});

const config = {
  androidClientId:
    "49149816867-l2jrqmc8nojv209lgft0r8006p5l9rnd.apps.googleusercontent.com",
  iosClientId:
    "49149816867-a1h90lek49qepil3qeloumeacm30ofck.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

// export default signInWithGoogle;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Googleloading, setGoogleloading] = useState(false);
  const [error, setError] = useState("");
  const [dataChanged, setDataChanged] = useState(false);
  const [logged, setLogged] = useState(false);
  const [transferPointsFromCompany, setTransferPointsFromCompany] =
    useState(null);
  const [userData, setuserData] = useState([]);
  const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("user setttt");
          setUser(user);
          // Read();
        } else {
          setUser(null);
        }
      }),
    []
  );

  const Update2 = (Company, newPoints, currentPoints) => {
    const myDoc = doc(db, "users", user.uid, "companies", Company);
    const updatedPoints = Number(newPoints) + Number(currentPoints);
    updateDoc(myDoc, { Points: updatedPoints })
      .then(() => {
        userData.forEach((object) => {
          if (object.Company === Company) {
            object.Points = updatedPoints;
            return;
          }
        });
        setuserData(userData);
      })
      .catch((err) => {
        console.log("err in update " + err);
      })
      .finally(() => {
        updateTotalPoints();
        setLoading(false);
        setDataChanged(true);
        setIsBarcodeScanned(true);
      });
  };

  const Create = (data) => {
    setLoading(true);
    let obj = {
      Company: data.Company,
      Points: parseInt(data.Points),
      Logo: data.Logo,
    };
    //check if data exist and updates points
    // else created new one in DB
    const checkData = isExist(obj);
    if (checkData.Company !== undefined) {
      Update2(obj.Company, obj.Points, checkData.Points);
      return;
    }

    const myDoc = doc(db, "users", user.uid, "companies", data.Company);
    setDoc(myDoc, obj)
      .then(() => {
        userData.push(obj);
        setDataChanged(true);
        setuserData(userData);
      })
      .catch(() => {
        alert("Error!!");
      })
      .finally(() => {
        updateTotalPoints();
        setIsBarcodeScanned(true);
        setLoading(false);
      });
  };

  const isExist = (object) => {
    const { Company } = object;
    let newObj = {};
    userData.forEach((obj) => {
      if (obj.Company === Company) {
        newObj = obj;
        return;
      }
    });
    return newObj;
  };

  const Read = () => {
    // setuserData(null);
    while (userData.length > 0) userData.pop();

    // setuserData(userData);
    // console.log(loading);

    // if (!loading) setLoading(true);
    setLoading(true);
    const collect = collection(db, "users", user.uid, "companies");
    getDocs(collect)
      .then((doc) => {
        doc.docs.map((doc) => {
          userData.push(doc.data());
          // setuserData(userData);
        });
        // userData.forEach((data) => console.log(data));
      })
      .catch(() => {
        console.log("ERRORRR READING DATA!");
      })
      .finally(() => {
        setuserData(userData);
        // console.log(userData.length);
        // setDataChanged(false);
        updateTotalPoints();
        setLoading(false);
        setLogged(false);
      });
  };

  const getCompany = (company) => {
    let Company = {};
    userData.forEach((obj) => {
      if (obj.Company === company) {
        Company = obj;
        return;
      }
    });
    return Company;
  };

  const updateTotalPoints = (data = userData) => {
    console.log("\n\n\nupdated\n\n\n");
    setTotalPoints(0);
    data.forEach((element) => {
      setTotalPoints((prev) => (prev += element.Points));
    });
  };

  const Transfer = async (ToCompany, FromCompany, Points) => {
    setLoading(true);
    const toCompany = getCompany(ToCompany);
    console.log(toCompany);
    const Doc1 = doc(db, "users", user.uid, "companies", toCompany.Company);
    const Doc2 = doc(db, "users", user.uid, "companies", FromCompany.Company);
    const toCompanyUpdatedPoints = Number(Points) + toCompany.Points;
    const fromCompanyUpdatedPoints = FromCompany.Points - Number(Points);
    await updateDoc(Doc1, { Points: toCompanyUpdatedPoints });
    await updateDoc(Doc2, { Points: fromCompanyUpdatedPoints });
    userData.forEach((object) => {
      if (object.Company === toCompany.Company)
        object.Points = toCompanyUpdatedPoints;

      if (object.Company === FromCompany.Company)
        object.Points = fromCompanyUpdatedPoints;
    });
    setuserData(userData);
    setDataChanged(true);
    setLoading(false);
    setIsBarcodeScanned(true);
  };

  const Delete = (Company) => {
    setLoading(true);
    deleteDoc(doc(db, "users", user.uid, "companies", Company))
      .then(() => {
        const filteredUserData = userData.filter(
          (obj) => obj.Company != Company
        );
        setuserData(filteredUserData);
        console.log("deleted" + Company + "\n");
        console.log(filteredUserData);
        updateTotalPoints(filteredUserData);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setDataChanged(true);
        setIsBarcodeScanned(true);
        setLoading(false);
      });
  };

  const logout = () => {
    console.log("first");
    setLoading(true);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const signInWithGoogle = async () => {
    // setLoading(true);
    setGoogleloading(true);
    await logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type === "success") {
          setGoogleloading(false);
          setLoading(true);
          const { idToken, accessToken } = logInResult;
          const credantial = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credantial);
          console.log("Heidad!");
        } else return Promise.reject();
      })
      .catch((err) => {
        setError(err);
        alert(err);
      })
      .finally(() => {
        setLoading(false);
        setLogged(true);
      });
  };

  const memoValue = useMemo(
    () => ({
      user,
      loading,
      error,
      Googleloading,
      signInWithGoogle,
      logout,
      Create,
      Read,
      Delete,
      userData,
      setIsBarcodeScanned,
      isBarcodeScanned,
      dataChanged,
      setDataChanged,
      setLogged,
      setLoading,
      setTransferPointsFromCompany,
      transferPointsFromCompany,
      Transfer,
      totalPoints,
    }),
    [
      user,
      loading,
      error,
      Googleloading,
      isBarcodeScanned,
      userData,
      dataChanged,
      logged,
      transferPointsFromCompany,
    ]
  );

  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
