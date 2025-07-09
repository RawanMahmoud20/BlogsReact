import { createSlice } from "@reduxjs/toolkit";
let initialState= {task:[] ,filteredTask:[]};
let taskSlice = createSlice({
name:"task-Slice",
initialState:initialState,
reducers:{
    setTask(state,action){
        state.task=action.payload;
        state.filteredTask = action.payload;
    },
    addNewTask(state,action){
        state.task.push(action.payload);
    },
    updateTaskStatus(state,action){},
    filterTasks(state,action){},
},
});
export const taskReducer= taskSlice.reducer;
export const  tasksAction = taskSlice.actions;