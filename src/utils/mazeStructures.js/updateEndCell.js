import { wallTileStyleBorder,wallTileStyle } from "../../helpers/classNames";
import { normalTileStyleBorder,normalTileStyle } from "../../helpers/classNames";
import { endTileStyleBorder,endTileStyle } from "../../helpers/classNames";
import { theGridState } from "../../globalVariables.js/gridVariables";
let wallStyle = wallTileStyleBorder;
let normalStyle=normalTileStyleBorder;
let endStyle=endTileStyleBorder;


export const updateEndCellFucntion=(row,col)=>{
    if (theGridState.grid.length > 100 || theGridState.grid[0].length > 100) {
        wallStyle = wallTileStyle;
        normalStyle=normalTileStyle;
        endStyle=endTileStyle;
    }
    theGridState.grid[theGridState.endCell.row][theGridState.endCell.col].isEnd = false;
    theGridState.grid[theGridState.endCell.row][theGridState.endCell.col].isWall = theGridState.grid[theGridState.endCell.row][theGridState.endCell.col].wallBeforeStartEnd;
    if (theGridState.grid[theGridState.endCell.row][theGridState.endCell.col].isWall) {
        const element = document.getElementById(`${theGridState.endCell.row}-${theGridState.endCell.col}`);
        if (element) {
            element.className = `${wallStyle}`;
        }
    }
    else {
        const element = document.getElementById(`${theGridState.endCell.row}-${theGridState.endCell.col}`);
        if (element) {
            element.className = `${normalStyle}`;
        }
    }
    theGridState.endCell.row = row;
    theGridState.endCell.col = col;
    theGridState.grid[theGridState.endCell.row][theGridState.endCell.col].isEnd = true;
    theGridState.grid[theGridState.endCell.row][theGridState.endCell.col].isWall = false;
    const element = document.getElementById(`${theGridState.endCell.row}-${theGridState.endCell.col}`);
    if (element) {
        element.className = `${endStyle}`;
    }
}