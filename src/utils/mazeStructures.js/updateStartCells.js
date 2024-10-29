import { wallTileStyleBorder,wallTileStyle } from "../../helpers/classNames";
import { normalTileStyleBorder,normalTileStyle } from "../../helpers/classNames";
import { startTileStyleBorder,startTileStyle } from "../../helpers/classNames";
import { theGridState } from "../../globalVariables.js/gridVariables";
let wallStyle = wallTileStyleBorder;
let normalStyle=normalTileStyleBorder;
let startStyle=startTileStyleBorder;





export const updateStartCell = (row, col) => {
    if (theGridState.grid.length > 100 || theGridState.grid[0].length > 100) {
        wallStyle = wallTileStyle;
        normalStyle=normalTileStyle;
        startStyle=startTileStyle;
    }
    theGridState.grid[theGridState.startCell.row][theGridState.startCell.col].isStart = false;
    theGridState.grid[theGridState.startCell.row][theGridState.startCell.col].isWall = theGridState.grid[theGridState.startCell.row][theGridState.startCell.col].wallBeforeStartEnd;
    if (theGridState.grid[theGridState.startCell.row][theGridState.startCell.col].isWall) {
        const element = document.getElementById(`${theGridState.startCell.row}-${theGridState.startCell.col}`);
        if (element) {
            element.className = `${wallStyle}`;
        }
    }
    else {
        const element = document.getElementById(`${theGridState.startCell.row}-${theGridState.startCell.col}`);
        if (element) {
            element.className = `${normalStyle}`;
        }
    }
    theGridState.startCell.row = row;
    theGridState.startCell.col = col;
    theGridState.grid[theGridState.startCell.row][theGridState.startCell.col].isStart = true;
    theGridState.grid[theGridState.startCell.row][theGridState.startCell.col].isWall = false;
    const element = document.getElementById(`${theGridState.startCell.row}-${theGridState.startCell.col}`);
    if (element) {
        element.className = `${startStyle}`;
    }

}