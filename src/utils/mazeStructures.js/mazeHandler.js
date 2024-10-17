import { store } from "../../redux/Store";
import { setMazeStructure } from "../../context/GridsSlice";
import { binaryTreeFunction, binaryTreeWalls } from "./binaryTree";

export const mazeHandlerFunction=async (grid,speed,mazeType)=>{
    if(mazeType==="noMaze"  || mazeType==="randomWalls"){
        store.dispatch(setMazeStructure({mazeType}));
        return true;
    }
    else if(mazeType==="binaryTree"){
        await binaryTreeWalls(grid,speed,mazeType);
        await binaryTreeFunction(grid,speed,mazeType);
        return true;
    }
    else{
        return true;
    }
}