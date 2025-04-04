import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
const initialState = {
  user: null,
  isLogin: false,
  task: "",
  todoList: [],
  taskCount: 0,
  checkedTasks: {},
  editingTask: null,
  image: null,
  preview: "",
  dayName: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    new Date()
  ),
  date: new Date().getDate(), //11th
  formatedDate: new Intl.DateTimeFormat("en-IN").format(new Date()), //2/3/2025
  monthName: new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    new Date()
  ),
  // time: new Intl.DateTimeFormat("en-IN", {
  //   hour: "numeric",
  //   minute: "numeric",
  //   hour12: true,
  //   timeZone: 'Asia/Kolkata'
  // }).format(new Date()),

  suffix: (() => {
    const date = new Date().getDate();
    if (date === 1 || date === 21 || date === 31) return "st";
    if (date === 2 || date === 22) return "nd";
    if (date === 3 || date === 23) return "rd";
    return "th";
  })(),
};

// Create Slice
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setTask: (state, action) => {
      state.task = action.payload;
    },
    toggleCheckedTask: (state, action) => {
      const taskId = action.payload;
      state.checkedTasks[taskId] = !state.checkedTasks[taskId];
    },
    setEditingTask: (state, action) => {
      state.editingTask = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setPreview: (state, action) => {
      state.preview = action.payload;
    },
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    setTaskCount: (state, action) => {
      state.taskCount = action.payload;
    },
  },
});

//addtask
export const addTask = () => async (dispatch, getState) => {
  const { task, time, editingTask, image, formatedDate, user } =
    getState().task;

  try {
    let uploadedImageUrl = image ? await dispatch(uploadImage()) : null;

    if (editingTask) {
      // Update existing task
      await axios.put(
        `https://sam-todo-be.onrender.com/v1/updateTask/${editingTask._id}`,
        {
          task: task,

          time: new Intl.DateTimeFormat("en-IN", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            timeZone: "Asia/Kolkata",
          })
            .format(new Date())
            .toString(),

          date: formatedDate,
          imageUrl: uploadedImageUrl || editingTask.imageUrl, // Use new image or keep old one
        }
      );
      dispatch(setEditingTask(null)); // Clear editing state
    } else {
      // Add new task
      await axios.post("https://sam-todo-be.onrender.com/v1/postTasks", {
        task: task,
        name: user.displayName,
        email: user.email,

        time: new Intl.DateTimeFormat("en-IN", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
          .format(new Date())
          .toString(),

        date: formatedDate.toString(),
        imageUrl: uploadedImageUrl,
        newUser: false,
        isLogin: true,
      });
    }
    dispatch(setTask("")); // Clear task input
    dispatch(setImage(null)); // Clear image state
    dispatch(setPreview("")); // Clear image preview
    dispatch(fetchData()); // Fetch updated data
  } catch (err) {
    console.log("Error adding task :", err); // Log errors
  }
};

//upload img
export const uploadImage = () => async (dispatch, getState) => {
  const { image } = getState().task;
  if (!image) return null;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "new_preset"); // Use new preset if needed
  formData.append("tags", "task"); // Helps process faster

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dqa7f16hs/image/upload",
      { method: "POST", body: formData }
    );

    const data = await response.json();
    console.log("✅ Cloudinary Response:", data);

    if (data.secure_url) {
      console.log("🎉 Image uploaded:", data.secure_url);
      return data.secure_url;
    } else {
      console.error("❌ Upload failed:", data);
      return null;
    }
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    return null;
  }
};

// Fetch Tasks from Firestore (memoized to prevent unnecessary re-fetching)
export const fetchData = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://sam-todo-be.onrender.com/v1/getTasks"
    );
    dispatch(setTodoList(response.data));
    dispatch(setTaskCount(response.data.length));
  } catch (err) {
    console.log("Error fetching tasks:", err);
  }
};

//deleting task
export const deleteTask = (task_id) => async (dispatch) => {
  try {
    await axios.delete(
      `https://sam-todo-be.onrender.com/v1/deleteTask/${task_id}`
    );
    dispatch(fetchData()); // Re-fetch the user list after deletion
  } catch (err) {
    console.log("Error in deleting task", err);
  }
};

// Export Actions
export const {
  setTask,
  toggleCheckedTask,
  setEditingTask,
  setImage,
  setPreview,
  setTodoList,
  setTaskCount,
  setUser,
  setIsLogin,
} = taskSlice.actions;
export default taskSlice.reducer;
