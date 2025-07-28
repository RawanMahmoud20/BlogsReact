import { createSlice } from "@reduxjs/toolkit";
let initialState = { task: [], filteredTask: [] };
let taskSlice = createSlice({
  name: "task-Slice",
  initialState: initialState,
  reducers: {
    setTask(state, action) {
      state.task = action.payload;
      state.filteredTask = action.payload;
    },
    addNewTask(state, action) {
      state.task.push(action.payload);
      state.filteredTask = state.task;
    },
    updateTaskStatus(state, action) {},
    filterTasksByStatus(state, action) {
      if (action.payload == "All") {
        state.filteredTask = state.task;
      }
      if (action.payload !== "All") {
        state.filteredTask = state.task.filter(
          (element) => element.status == action.payload
        );
      }
    },
    filteredTasksByName(state, action) {
      if (action.payload == "") {
        state.filteredTask = state.task;
      } else {
        state.filteredTask = state.task.filter(
          // (element) => element.name == action.payload
          (element) => element.name.includes(action.payload)
        );
      }
    },
    DeleteTaskById(state, action) {
      const idToDelete = action.payload;
      state.task = state.task.filter((task) => task.id !== idToDelete);
      state.filteredTask = state.filteredTask.filter(
        (task) => task.id !== idToDelete
      );
    },

    // EditPhotoById(state, action) {
    //   const { id, newImage } = action.payload;

    //   // نحدث task مباشرة باستخدام map
    //   state.task = state.task.map((task) =>
    //     task.id === id ? { ...task, image: newImage } : task
    //   );

    //   // نحدث filteredTask بنفس الطريقة لضمان تزامنه مع task
    //   state.filteredTask = state.filteredTask.map((task) =>
    //     task.id === id ? { ...task, image: newImage } : task
    //   );
    // },
    // EditPhotoById(state, action) {
    //   const { id, newImage } = action.payload;
    //   const taskIndex = state.task.findIndex((t) => t.id === id);
    //   if (taskIndex !== -1) {
    //     state.task[taskIndex].image = newImage;
    //   }

    //   // لو في filteredTask أيضاً:
    //   const filteredIndex = state.filteredTask.findIndex((t) => t.id === id);
    //   if (filteredIndex !== -1) {
    //     state.filteredTask[filteredIndex].image = newImage;
    //   }
    // }
    EditPhotoById(state, action) {
      const { id, newImage } = action.payload;
      // تنظيف URL من أي معلمات مكررة
      const cleanUrl = newImage.split("?")[0];
      const updatedImage = `${cleanUrl}?v=${Date.now()}`;
      return {
        ...state, // Copy all existing state properties
        task: state.task.map((task) =>
          task.id === id ? { ...task, image: updatedImage } : task
        ),
        filteredTask: state.filteredTask.map((task) =>
          task.id === id ? { ...task, image: updatedImage } : task
        ),
      };
    },
  },
});
export const taskReducer = taskSlice.reducer;
export const tasksAction = taskSlice.actions;
