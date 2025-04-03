import React from "react";
import "./TodoHeader.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLogin,
} from '../redux/taskSlice'; // Redux actions

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,signOut } from "firebase/auth";
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

function TodoHeader() {
  const dispatch = useDispatch();

  const { taskCount, dayName, date, monthName, suffix, user } = useSelector(
    (state) => state.task
  );

  // Corrected logout function
  const handleLogout = async () => {
    console.log("Logging out..."); // Debug log
    try {
      await signOut(auth); // Firebase sign out
      dispatch(setIsLogin(false)); // Update Redux state
    } catch (err) {
      console.error("Error during logout", err);
    }
  };

  return (
    <div className="headernav">
      <div className="user">
        <div className="img">
          <img src="" alt="img" />
        </div>
        <div>
          <h2 style={{ fontSize: "17px" }}>{user?.displayName}</h2>
          <p style={{ fontSize: "13px" }}>{user?.email}</p>
        </div>
      </div>

      <div className="datetime">
        <h2>
          {dayName},{" "}
          <span>
            {date}
            {suffix}
          </span>
        </h2>
        <p>{monthName}</p>
      </div>

      <h3 className="tasks">
        <span>{taskCount}</span> tasks
      </h3>
      <button onClick={handleLogout} className="logoutbtn">
        Logout
      </button>
    </div>
  );
}

export default TodoHeader;
