import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup,signOut } from "firebase/auth";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLBzUdyLkYX5NN91QIO3td8xsy1TczFN8",
  authDomain: "todolist-89f01.firebaseapp.com",
  projectId: "todolist-89f01",
  storageBucket: "todolist-89f01.firebasestorage.app",
  messagingSenderId: "942726177685",
  appId: "1:942726177685:web:6d2c6817dc54caa6568c9c",
  measurementId: "G-GRJF5LBJXD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

import { setUser, setIsLogin } from "../redux/taskSlice"; // Redux actions
// import axios from "axios";

const FirebaseLogin = () => {
  const dispatch = useDispatch();

  //sign IN
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
      dispatch(setUser(userData));
      dispatch(setIsLogin(true));
    } catch (err) {
      console.error("Error in sign in", err);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "60%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "6%",
      }}
    >
      <div
        style={{
          width: "26%",
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#5d5e5e",
          border: "1px solid grey",
          borderRadius: "10px",
          padding: "0 .4vw",
        }}
      >
        <h2 style={{ fontSize: "2.4vw", color: "white", fontWeight: "600" }}>
          Your Todolist Project
        </h2>

        <button
          onClick={handleSignIn}
          style={{
            padding: "4px 8px",
            color: "gray",
            cursor: "pointer",
            borderRadius: "30px",
            fontSize: "1vw",
            height: "5vh",
            border: "1.5px solid #606060",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            width: "17vw",
            fontWeight: "600",
            whiteSpace: "none",
            marginBottom: "30px",
          }}
        >
          <FcGoogle style={{ width: "1.5vw", height: "1.5vw" }} />
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default FirebaseLogin;
