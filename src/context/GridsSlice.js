import { createSlice } from '@reduxjs/toolkit';
import { createInitialGrid } from '../utils/createInitialGrid';
import { initialEndCell, initialStartCell, initial_Cols, initial_Rows } from '../utils/constants';
import { noMazeFunction } from '../utils/mazeStructures.js/noMaze';
import { randomWallsFunction } from '../utils/mazeStructures.js/randomWalls';


const initialState = {
    grid: createInitialGrid(initialStartCell, initialEndCell, initial_Rows, initial_Cols),
    startCell: initialStartCell,
    endCell: initialEndCell,
};


const gridSlice = createSlice({
    name: "gridslice",
    initialState,
    reducers: {
        setGrid: (state, action) => {
            state.grid = action.payload;
        },
        resetGrid: (state) => {
            let rowsCount = state.grid.length;
            let colsCount = state.grid[0].length;
            state.grid = createInitialGrid(initialStartCell, { row: rowsCount - 1, col: colsCount - 1 }, rowsCount, colsCount);
            state.startCell = initialStartCell;
            state.endCell = {
                row: rowsCount - 1,
                col: colsCount - 1,
            }
        },
        updateStartCell: (state, action) => {
            state.grid[state.startCell.row][state.startCell.col].isStart = false;
            state.grid[state.startCell.row][state.startCell.col].isWall = state.grid[state.startCell.row][state.startCell.col].wallBeforeStartEnd;
            state.startCell.row = action.payload.row;
            state.startCell.col = action.payload.col;
            state.grid[state.startCell.row][state.startCell.col].isStart = true;
            state.grid[state.startCell.row][state.startCell.col].isWall = false;
        },
        updateEndCell: (state, action) => {
            state.grid[state.endCell.row][state.endCell.col].isEnd = false;
            state.grid[state.endCell.row][state.endCell.col].isWall = state.grid[state.endCell.row][state.endCell.col].wallBeforeStartEnd;
            state.endCell.row = action.payload.row;
            state.endCell.col = action.payload.col;
            state.grid[state.endCell.row][state.endCell.col].isEnd = true;
            state.grid[state.endCell.row][state.endCell.col].isWall = false;
        },
        changeSizeOfGrid: (state, action) => {
            let rowsCount = action.payload.rows;
            let colsCount = action.payload.cols;
            state.endCell = {
                row: rowsCount - 1,
                col: colsCount - 1,
            };
            state.startCell = initialStartCell;
            state.grid = createInitialGrid(initialStartCell, { row: rowsCount - 1, col: colsCount - 1 }, rowsCount, colsCount);
        },
        updateCellForWall: (state, action) => {
            state.grid[action.payload.row][action.payload.col].isWall = !(state.grid[action.payload.row][action.payload.col].isWall);
            state.grid[action.payload.row][action.payload.col].wallBeforeStartEnd = !(state.grid[action.payload.row][action.payload.col].wallBeforeStartEnd);
        },
        clearWalls: (state) => {
            state.grid = noMazeFunction(state.grid);
        },
        setMazeStructure: (state, action) => {
            if (action.payload.mazeType === "noMaze") {
                state.grid = noMazeFunction(state.grid);
            }
            else if (action.payload.mazeType === "binaryTree") {
                const { row, cols, stillWalls } = action.payload;
                if (stillWalls) {
                    for (let i = 0; i < cols; ++i) {
                        
                        if (!state.grid[row][i].isStart && !state.grid[row][i].isEnd) {
                            if (row % 2 === 0) {
                                if (!(i % 2 === 0)) {
                                    state.grid[row][i].isWall = true;
                                    state.grid[row][i].wallBeforeStartEnd = true;
                                    state.grid[row][i].cellDesign=true;
                                }
                            }
                            else {
                                state.grid[row][i].isWall = true;
                                state.grid[row][i].wallBeforeStartEnd = true;
                                state.grid[row][i].cellDesign=true;
                            }
                        }
                    }
                }
                else {
                    for (let i = 0; i < cols; ++i) {
                        if (row === (state.grid.length - 1)) {
                            if (i + 1 < cols) {
                                state.grid[row][i + 1].isWall = false;
                                state.grid[row][i + 1].wallBeforeStartEnd = false;
                            }
                        }
                        else if (i === (cols - 1)) {
                            if (row < state.grid.length - 1) {
                                state.grid[row + 1][i].isWall = false;
                                state.grid[row + 1][i].wallBeforeStartEnd = false;
                            }
                        }
                        else {
                            if (row % 2 === 0 && !state.grid[row][i].isWall) {
                                const randomValue = Math.random();
                                if (randomValue < 0.5) {
                                    state.grid[row][i + 1].isWall = false;
                                    state.grid[row][i + 1].wallBeforeStartEnd = false;
                                }
                                else {
                                    state.grid[row + 1][i].isWall = false;
                                    state.grid[row + 1][i].wallBeforeStartEnd = false;
                                }
                            }
                        }
                    }
                }
            }
            else if (action.payload.mazeType === "randomWalls") {
                state.grid = randomWallsFunction(state.grid);
            }
            else {

            }
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
    clearWalls,
    setMazeStructure,
} = gridSlice.actions;


export default gridSlice.reducer;