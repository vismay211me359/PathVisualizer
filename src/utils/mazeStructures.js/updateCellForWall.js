import { wallTileStyleBorder,normalTileStyleBorder,normalTileStyle,wallTileStyle } from "../../helpers/classNames";
import { theGridState } from "../../globalVariables.js/gridVariables";
let wallStyle = wallTileStyleBorder;
let normalStyle=normalTileStyleBorder;


export const updateCellForWall = (row, col) => {
    if (theGridState.grid.length > 100 || theGridState.grid[0].length > 100) {
        wallStyle = wallTileStyle;
        normalStyle=normalTileStyle;
    }
    theGridState.grid[row][col].isWall = !(theGridState.grid[row][col].isWall);
    theGridState.grid[row][col].wallBeforeStartEnd = !(theGridState.grid[row][col].wallBeforeStartEnd);
    const element = document.getElementById(`${row}-${col}`);
    if (element) {
        if(theGridState.grid[row][col].isWall){
            element.className = `${wallStyle}`;
        }
        else{
            element.className = `${normalStyle}`;
        }
    }
}