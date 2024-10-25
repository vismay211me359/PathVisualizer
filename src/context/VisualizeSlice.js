import { createSlice } from '@reduxjs/toolkit';


const initialState={
    isGraphVisualized: false,
    isPathVisualized: false,
};


const visualizeSlice=createSlice({
    name:"visualize",
    initialState,
    reducers:{
        toggleGraphVisualization: (state, action) => {
            state.isGraphVisualized = action.payload;
        },
        togglePathVisualization: (state,action)=>{
            state.isPathVisualized=action.payload;
        },
    },
})


export const {
    toggleGraphVisualization,
    togglePathVisualization,
}=visualizeSlice.actions;


export default visualizeSlice.reducer;