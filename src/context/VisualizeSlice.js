import { createSlice } from '@reduxjs/toolkit';


const initialState={
    isGraphVisualized: true,
};


const visualizeSlice=createSlice({
    name:"visualize",
    initialState,
    reducers:{
        toggleGraphVisualization: (state, action) => {
            state.isGraphVisualized = action.payload;
        },
    },
})


export const {
    toggleGraphVisualization,
}=visualizeSlice.actions;


export default visualizeSlice.reducer;