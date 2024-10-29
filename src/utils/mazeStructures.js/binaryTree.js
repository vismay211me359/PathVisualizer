import { theGridState } from "../../globalVariables.js/gridVariables";
let wallsArray=[];

export const binaryTreeWalls = () => {
    const rows = theGridState.grid.length;
    const cols = theGridState.grid[0].length;
    for (let j = 0; j < rows; ++j) {
        for (let i = 0; i < cols; ++i) {

            if (!theGridState.grid[j][i].isStart && !theGridState.grid[j][i].isEnd) {
                if (j % 2 === 0) {
                    if (!(i % 2 === 0)) {
                        theGridState.grid[j][i].isWall = true;
                        theGridState.grid[j][i].wallBeforeStartEnd = true;
                        wallsArray.push({row:j,col:i});
                    }
                }
                else {
                    theGridState.grid[j][i].isWall = true;
                    theGridState.grid[j][i].wallBeforeStartEnd = true;
                    wallsArray.push({row:j,col:i});
                }
            }
        }

    }
    const returnWallArray=wallsArray;
    wallsArray=[];
    return returnWallArray;
}

let theNoWallArray=[];

export const binaryTreeFunction = () => {
    const rows = theGridState.grid.length;
    const cols = theGridState.grid[0].length;
    for (let j = 0; j < rows; ++j) {
        for (let i = 0; i < cols; ++i) {
            if (j === (theGridState.grid.length - 1)) {
                if (i + 1 < cols) {
                    theGridState.grid[j][i + 1].isWall = false;
                    theGridState.grid[j][i + 1].wallBeforeStartEnd = false;
                    if(!theGridState.grid[j][i + 1].isStart  &&  !theGridState.grid[j][i + 1].isEnd){
                        theNoWallArray.push({row:j,col:i+1});
                    }
                }
            }
            else if (i === (cols - 1)) {
                if (j < theGridState.grid.length - 1) {
                    theGridState.grid[j + 1][i].isWall = false;
                    theGridState.grid[j + 1][i].wallBeforeStartEnd = false;
                    if(!theGridState.grid[j+1][i].isStart  &&  !theGridState.grid[j+1][i].isEnd){
                        theNoWallArray.push({row:j+1,col:i});
                    }
                }
            }
            else {
                if (j % 2 === 0 && !theGridState.grid[j][i].isWall) {
                    const randomValue = Math.random();
                    if (randomValue < 0.5) {
                        theGridState.grid[j][i + 1].isWall = false;
                        theGridState.grid[j][i + 1].wallBeforeStartEnd = false;
                        if(!theGridState.grid[j][i + 1].isStart  &&  !theGridState.grid[j][i + 1].isEnd){
                            theNoWallArray.push({row:j,col:i+1});
                        }
                    }
                    else {
                        theGridState.grid[j + 1][i].isWall = false;
                        theGridState.grid[j + 1][i].wallBeforeStartEnd = false;
                        if(!theGridState.grid[j+1][i].isStart  &&  !theGridState.grid[j+1][i].isEnd){
                            theNoWallArray.push({row:j+1,col:i});
                        }
                    }
                }
            }
        }
    }
    const returnNoWallArray=theNoWallArray;
    theNoWallArray=[];
    return returnNoWallArray;
}