import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rows:39,
    cols:49,
};


const gridSlice = createSlice({
    name: "gridslice",
    initialState,
    reducers: {
        setRowsCols:(state,action)=>{
            state.rows=action.payload.rows;
            state.cols=action.payload.cols;
        }
    },
});


export const {
    setRowsCols,
} = gridSlice.actions;


export default gridSlice.reducer;