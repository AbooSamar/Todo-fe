import React, { useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md"; // Icons
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import {
  fetchData,
  deleteTask,
  setTask,
  toggleCheckedTask,
  setEditingTask
} from '../redux/taskSlice'; // Redux actions
import "./TodoTasks.css"; // CSS file

function TodoTasks() {
  const dispatch = useDispatch();
  const {
    todoList,
    checkedTasks,
  } = useSelector((state) => state.task);
  

  useEffect(() => {
  
    dispatch(fetchData()); 
    
  }, [dispatch]);


  const handleCheckBox = (taskId) => {
    dispatch(toggleCheckedTask(taskId));
  };

  //editing task
  const editTask = (items) => {
      dispatch(setEditingTask(items));
      dispatch(setTask(items.task));
  };

  return (
    <div className="showtasks">
      {todoList.map((items, index) => (
        <div key={index} className="task">
          {/* Checkbox */}
          <input
            className="checkbox"
            type="checkbox"
            // checked={checkedTasks[items.id] || false}
            onChange={() => handleCheckBox(items._id)}
          />

          {/* Task Text and Image */}
          <div className="texttask">
            <p
              style={{
                textDecoration: checkedTasks[items._id]
                  ? "1.8px green line-through"
                  : "none",
              }}
            >
              {items.task}
            </p>
            {/* Display Image from Cloudinary */}
            {items.imageUrl && (
              <img
                src={items.imageUrl}
                alt=""
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "3px",
                }}
              />
            )}
          </div>

          {/* Task Actions (Edit, Delete, Time, and User) */}
          <div className="taskright">
            <div className="taskedit">
              {/* Edit Button */}
              <MdEdit
                className="editbtn"
                onClick={() => editTask(items)}
                title="Edit"
                style={{ flexShrink: 0 }}
              />

              {/* Delete Button */}
              <MdDelete
                className="delbtn"
                onClick={() =>
                  dispatch(deleteTask(items._id))
                }
                title="Delete"
                style={{ flexShrink: 0 , marginRight:"5px"}}
              />

              {/* Task Time and Date */}
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  opacity: "0.7",
                  flexShrink: 0,
                }}
              >
                {items.time}
                <br />
                {items.date}
              </p>
            </div>

            {/* Task User */}
            {/* <p style={{ opacity: "0.7", fontSize:"11px" }}>
              <span style={{ opacity: "0.6" , fontSize:"11px"}}>by:</span>@{items.name}
            </p> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoTasks;