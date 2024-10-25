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
                const {horizontal,line,size}=action.payload.recursive;
                const {start,end}=size;
                let randomValue=Math.floor(Math.random() * (end - start + 1)) + start;
                let secondRandomValue=randomValue;
                if(horizontal){
                    if((start!==0  || end!==(state.grid[0].length-1))){
                        if(start!==0  && end!==(state.grid[0].length-1)){
                            if(!state.grid[line][start-1].isWall){
                                randomValue=start;
                            }
                            if(!state.grid[line][end+1].isWall){
                                secondRandomValue=end;
                            }
                        }
                        else if(start!==0){
                            if(!state.grid[line][start-1].isWall){
                                randomValue=start;
                            }
                        }
                        else{
                            if(!state.grid[line][end+1].isWall){
                                randomValue=end;
                            }
                        }
                    }
                    for(let i=start;i<=end;++i){
                        if(i===randomValue || state.grid[line][i].isStart  || state.grid[line][i].isEnd  || i===secondRandomValue){
                            continue;
                        }
                        state.grid[line][i].isWall=true;
                        state.grid[line][i].wallBeforeStartEnd=true;
                        state.grid[line][i].cellDesign=true;
                    }
                }
                else{
                    if((start!==0  || end!==(state.grid.length-1))){
                        if(start!==0  && end!==(state.grid.length-1)){
                            if(!state.grid[start-1][line].isWall){
                                randomValue=start;
                            }
                            if(!state.grid[end+1][line].isWall){
                                secondRandomValue=end;
                            }
                        }
                        else if(start!==0){
                            if(!state.grid[start-1][line].isWall){
                                randomValue=start;
                            }
                        }
                        else{
                            if(!state.grid[end+1][line].isWall){
                                randomValue=end;
                            }
                        }
                    }
                    for(let i=start;i<=end;++i){
                        if(i===randomValue  || state.grid[i][line].isStart  || state.grid[i][line].isEnd  || i===secondRandomValue){
                            continue;
                        }
                        state.grid[i][line].isWall=true;
                        state.grid[i][line].wallBeforeStartEnd=true;
                        state.grid[i][line].cellDesign=true;
                    }
                }
            }
        },
        createPath:(state,action)=>{
            const {node,isPath}=action.payload;
            if(isPath){
                state.grid[node.row][node.col].isPath=true;
                state.grid[node.row][node.col].cellDesign=true;
                state.grid[node.row][node.col].isTraversed=false;
            }
            else{
                state.grid[node.row][node.col].isTraversed=true;
                state.grid[node.row][node.col].cellDesign=true;
            }
        },
        clearPath:(state,action)=>{
            const rows=state.grid.length;
            const cols=state.grid[0].length;
            for(let i=0;i<rows;++i){
                for(let j=0;j<cols;++j){
                    if(state.grid[i][j].isStart){
                        state.grid[i][j].distance=0;
                        state.grid[i][j].isTraversed=false;
                        state.grid[i][j].isWall=false;
                        state.grid[i][j].wallBeforeStartEnd=false;
                        state.grid[i][j].cellDesign=true;
                        state.grid[i][j].parent=null;
                        state.grid[i][j].isPath=false;
                    }
                    else if(state.grid[i][j].isEnd){
                        state.grid[i][j].distance=Infinity;
                        state.grid[i][j].isTraversed=false;
                        state.grid[i][j].isWall=false;
                        state.grid[i][j].wallBeforeStartEnd=false;
                        state.grid[i][j].cellDesign=true;
                        state.grid[i][j].parent=null;
                        state.grid[i][j].isPath=false;
                    }
                    else{
                        state.grid[i][j].distance=Infinity;
                        state.grid[i][j].isTraversed=false;
                        state.grid[i][j].cellDesign=true;
                        state.grid[i][j].parent=null;
                        state.grid[i][j].isPath=false;
                    }
                }
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
    createPath,
    clearPath
} = gridSlice.actions;


export default gridSlice.reducer;