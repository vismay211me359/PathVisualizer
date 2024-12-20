import { createSlice } from '@reduxjs/toolkit';


const initialState={
    maze: 'noMaze',
    speed: 30,
    algorithm: 'dijkstra',
};


const settingsSlice=createSlice({
    name:"settings",
    initialState,
    reducers:{
        setMaze: (state, action) => {
            state.maze = action.payload;
        },
        setSpeed: (state, action) => {
            state.speed = action.payload;
        },
        setAlgorithm: (state, action) => {
            state.algorithm = action.payload;
        },
    },
})


export const {
    setMaze,
    setSpeed,
    setAlgorithm,
}=settingsSlice.actions;


export default settingsSlice.reducer;