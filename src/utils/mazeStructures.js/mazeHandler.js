import { binaryTreeFunction, binaryTreeWalls } from "./binaryTree";
import { binaryTreeForUi } from "./binaryTreeUi";
import { noMazeFunction } from "./noMaze";
import { randomWallsFunction } from "./randomWalls";
import { recursiveDivisionFucntion } from "./recursiveDivision";
import { recursiveDivisionUi } from "./recursiveDivisionUi";


export const mazeHandlerFunction= async(speed,mazeType)=>{
    if(mazeType==="noMaze"){
       noMazeFunction();
    }
    else if(mazeType==="randomWalls"){
        randomWallsFunction();
    }
    else if(mazeType==="binaryTree"){
        const wallsArray=binaryTreeWalls();
        const theNoWallArray=binaryTreeFunction();
        await binaryTreeForUi(wallsArray,theNoWallArray,speed);
    }
    else{
        const wallsArray=recursiveDivisionFucntion();
        await recursiveDivisionUi(wallsArray,speed);
    }
}