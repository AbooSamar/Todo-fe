import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Todoinputs.css";
import {setTask,setImage, setPreview, addTask } from "../redux/taskSlice";

function Todoinputs() {
  const dispatch = useDispatch();
  const {
    task,
    editingTask,
    preview,
  } = useSelector((state) => state.task);
  

  const handleChange = (e) => {
    dispatch(setTask(e.target.value));
  };

  // Handle Image Selection & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setImage(file));
      dispatch(setPreview(URL.createObjectURL(file))) // Show preview before upload
    }
  };

  return (
    <div>
      <div className="inputs">
        <input
         onChange={handleChange}
          value={task}
          className="tasksinput"
          type="text"
          placeholder="Add your tasks here.."
        />
        <input
          className="fileinput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button
          title="Add task"
          onClick={() => dispatch(addTask())}
          style={{ backgroundColor: editingTask ? "green" : "" }}
        >
          {editingTask? "Update Task": "Add Task"}
        </button>
      </div>

      {preview && (
        <div className="preview">
          <p>selected image</p>
          <img src={preview} alt="" />
        </div>
      )}
    </div>
  );
}

export default Todoinputs;
