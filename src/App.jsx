import React from "react";
import "./App.css";
import TodoHeader from "./components/TodoHeader";
import Todoinputs from "./components/Todoinputs";
import TodoTasks from "./components/TodoTasks";
import { useSelector } from "react-redux";
import FirebaseLogin from "./components/FirebaseLogin";

function App() {
  const { isLogin } = useSelector((state) => state.task);

  return (
    <div className="main app">
      {isLogin ? (
        <div className="container">
          <TodoHeader />
          <Todoinputs />
          <TodoTasks />
        </div>
      ) : (
        <FirebaseLogin />
      )}
    </div>
  );
}

export default App;
