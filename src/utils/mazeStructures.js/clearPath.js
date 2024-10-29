
import { normalTileStyleBorder, normalTileStyle, wallTileStyle, wallTileStyleBorder, startTileStyle, startTileStyleBorder, endTileStyle, endTileStyleBorder } from "../../helpers/classNames";

import { theGridState } from "../../globalVariables.js/gridVariables";

let normalStyle = normalTileStyleBorder;
let wallStyle = wallTileStyleBorder;
let startStyle = startTileStyleBorder;
let endStyle = endTileStyleBorder;



export const clearPathFucntion = () => {

    if (theGridState.grid.length > 100 || theGridState.grid[0].length > 100) {
        wallStyle = wallTileStyle;
        normalStyle = normalTileStyle;
        startStyle = startTileStyle;
        endStyle = endTileStyle;
    }
    const rows = theGridState.grid.length;
    const cols = theGridState.grid[0].length;
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            if (theGridState.grid[i][j].isStart) {
                theGridState.grid[i][j].distance = 0;
                theGridState.grid[i][j].isTraversed = false;
                theGridState.grid[i][j].isWall = false;
                theGridState.grid[i][j].wallBeforeStartEnd = false;
                theGridState.grid[i][j].parent = null;
                theGridState.grid[i][j].isPath = false;
                const element = document.getElementById(`${i}-${j}`);
                if (element) {
                    element.className = `${startStyle}`;
                }
            }
            else if (theGridState.grid[i][j].isEnd) {
                theGridState.grid[i][j].distance = Infinity;
                theGridState.grid[i][j].isTraversed = false;
                theGridState.grid[i][j].isWall = false;
                theGridState.grid[i][j].wallBeforeStartEnd = false;
                theGridState.grid[i][j].parent = null;
                theGridState.grid[i][j].isPath = false;
                const element = document.getElementById(`${i}-${j}`);
                if (element) {
                    element.className = `${endStyle}`;
                }
            }
            else {
                theGridState.grid[i][j].distance = Infinity;
                theGridState.grid[i][j].isTraversed = false;
                theGridState.grid[i][j].parent = null;
                theGridState.grid[i][j].isPath = false;
                const element = document.getElementById(`${i}-${j}`);
                if (element) {
                    if (theGridState.grid[i][j].isWall || theGridState.grid[i][j].wallBeforeStartEnd) {
                        element.className = `${wallStyle}`
                    }
                    else {
                        element.className = `${normalStyle}`;
                    }
                }
            }
        }
    }
}