
import { theGridState } from "../../globalVariables.js/gridVariables";


export const pathStateHandler=(grid,endPoint,traversedNodes,parentArray)=>{
    let isPath = false;

    for (let i = 1; i < traversedNodes.length; ++i) {
        if (traversedNodes[i].row === endPoint.row && traversedNodes[i].col === endPoint.col) {
            isPath = true;
            break;
        }
        else {
            grid[traversedNodes[i].row][traversedNodes[i].col].isTraversed = true;
        }
    }


    if (isPath) {
        let pathArray = [];
        let i = endPoint.row;
        let j = endPoint.col;
        while (parentArray[i][j] !== null) {
            pathArray.push(parentArray[i][j]);
            let x = parentArray[i][j].row;
            let y = parentArray[i][j].col;
            i = x;
            j = y;
        }
        pathArray.reverse();
        for (let k = 0; k < pathArray.length; ++k) {
            grid[pathArray[k].row][pathArray[k].col].isPath = true;
            grid[pathArray[k].row][pathArray[k].col].isTraversed = false;
        }
    }

    theGridState.grid=grid;

}
