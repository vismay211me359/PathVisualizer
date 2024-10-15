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
            const { row, col } = action.payload;
            const previousRow = state.startCell.row;
            const previousCol = state.startCell.col;
            state.grid[previousRow][previousCol] = {
                row: previousRow,
                col: previousCol,
                isStart: false,
                isEnd: false,
                isWall: false,
                isPath: false,
                distance: Infinity,
                isTraversed: false,
                parent: null
            }
            state.grid[row][col] = {
                row,
                col,
                isEnd: false,
                isWall: false,
                distance: 0,
                isStart: true,
                isTraversed: false,
                parent: null,
                isPath: false,
            }
        },
        updateEndCell: (state, action) => {
            const {row,col}=action.payload;
            const previousRow=state.endCell.row;
            const previousCol=state.endCell.col;
            state.grid[previousRow][previousCol] = {
                row: previousRow,
                col: previousCol,
                isStart: false,
                isEnd: false,
                isWall: false,
                isPath: false,
                distance: Infinity,
                isTraversed: false,
                parent: null
            }
            state.grid[row][col]={
                row,
                col,
                isEnd:true,
                isWall:false,
                distance:Infinity,
                isStart:false,
                isTraversed:false,
                parent:null,
                isPath:false,
            }
        },
        changeSizeOfGrid:(state,action)=>{
            let rowsCount=action.payload.rows;
            let colsCount=action.payload.cols;
            state.grid=createInitialGrid(initialStartCell,{row:rowsCount-1,col:colsCount-1},rowsCount,colsCount);
        },
    },
})


export const {
    setGrid,
    resetGrid,
    updateStartCell,
    updateEndCell,
    changeSizeOfGrid,
}=gridSlice.actions;


export default gridSlice.reducer;