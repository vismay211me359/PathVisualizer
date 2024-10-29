import { theGridState } from "../../globalVariables.js/gridVariables";

import { normalTileStyleBorder, normalTileStyle } from "../../helpers/classNames";
let normalStyle = normalTileStyleBorder;



export const noMazeFunction = () => {
    if (theGridState.grid.length > 100 || theGridState.grid[0].length > 100) {
        normalStyle = normalTileStyle;
    }
    let rowsCount = theGridState.grid.length;
    let colsCount = theGridState.grid[0].length;
    for (let i = 0; i < rowsCount; ++i) {
        for (let j = 0; j < colsCount; ++j) {
            theGridState.grid[i][j].isWall = false;
            theGridState.grid[i][j].wallBeforeStartEnd = false;
            if (!theGridState.grid[i][j].isStart && !theGridState.grid[i][j].isEnd) {
                const element = document.getElementById(`${i}-${j}`);
                if (element) {
                    element.className = `${normalStyle}`;
                }
            }
        }
    }
}