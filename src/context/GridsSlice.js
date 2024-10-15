import { createSlice } from '@reduxjs/toolkit';
import { createInitialGrid } from '../utils/createInitialGrid';
import { initialEndCell, initialStartCell,initial_Cols,initial_Rows } from '../utils/constants';


const initialState={
    grid: createInitialGrid(initialStartCell, initialEndCell,initial_Rows,initial_Cols),
    startCell: initialStartCell,
    endCell: initialEndCell,
};


const gridSlice=createSlice({
    name:"gridslice",
    initialState,
    reducers:{
        setGrid: (state, action) => {
            state.grid = action.payload;
        },
        resetGrid: (state) => {
            state.grid = initialState.grid;
        },
        updateStartCell: (state, action) => {
            state.grid[state.startCell.row][state.startCell.col].isStart=false;
            state.grid[state.startCell.row][state.startCell.col].isWall=state.grid[state.startCell.row][state.startCell.col].wallBeforeStartEnd;
            state.startCell.row=action.payload.row;
            state.startCell.col=action.payload.col;
            state.grid[state.startCell.row][state.startCell.col].isStart=true;
            state.grid[state.startCell.row][state.startCell.col].isWall=false;
        },
        updateEndCell: (state, action) => {
            state.grid[state.endCell.row][state.endCell.col].isEnd=false;
            state.grid[state.endCell.row][state.endCell.col].isWall=state.grid[state.endCell.row][state.endCell.col].wallBeforeStartEnd;
            state.endCell.row=action.payload.row;
            state.endCell.col=action.payload.col;
            state.grid[state.endCell.row][state.endCell.col].isEnd=true;
            state.grid[state.endCell.row][state.endCell.col].isWall=false;
        },
        changeSizeOfGrid:(state,action)=>{
            let rowsCount=action.payload.rows;
            let colsCount=action.payload.cols;
            state.grid=createInitialGrid(initialStartCell,{row:rowsCount-1,col:colsCount-1},rowsCount,colsCount);
        },
        updateCellForWall:(state,action)=>{
            state.grid[action.payload.row][action.payload.col].isWall=!(state.grid[action.payload.row][action.payload.col].isWall);
            state.grid[action.payload.row][action.payload.col].wallBeforeStartEnd=!(state.grid[action.payload.row][action.payload.col].wallBeforeStartEnd);    
        }
    },
})


export const {
    setGrid,
    resetGrid,
    updateStartCell,
    updateEndCell,
    changeSizeOfGrid,
    updateCellForWall,
}=gridSlice.actions;


export default gridSlice.reducer;