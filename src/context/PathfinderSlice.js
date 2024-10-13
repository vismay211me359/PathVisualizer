import { createSlice } from '@reduxjs/toolkit';
import { createInitialGrid } from '../utils/createInitialGrid';
import { initialEndCell, initialStartCell } from '../utils/constants';

const initialState = {
    maze: 'binaryTree',
    speed: 'fast',
    algorithm: 'dijkstra',
    grid: createInitialGrid(initialStartCell, initialEndCell),
    isGraphVisualized: true,
    startCell: initialStartCell,
    endCell: initialEndCell,
};

const pathfinderSlice = createSlice({
    name: 'pathfinder',
    initialState,
    reducers: {
        setMaze: (state, action) => {
            state.maze = action.payload;
        },
        setSpeed: (state, action) => {
            state.speed = action.payload;
        },
        setAlgorithm: (state, action) => {
            state.algorithm = action.payload;
        },
        setGrid: (state, action) => {
            state.grid = action.payload;
        },
        toggleGraphVisualization: (state, action) => {
            state.isGraphVisualized = action.payload;
        },
        resetGrid: (state) => {
            state.grid = initialState.grid;
        },
        updateCell: (state, action) => {
            const { row, col, updatedCell } = action.payload;
            state.grid[row][col] = { ...state.grid[row][col], ...updatedCell };
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
        }
    },
})


export const {
    setMaze,
    setSpeed,
    setAlgorithm,
    setGrid,
    toggleGraphVisualization,
    resetGrid,
    updateCell,
    updateStartCell,
    updateEndCell
} = pathfinderSlice.actions;

export default pathfinderSlice.reducer;