import { wallTileStyleBorder,wallTileStyle,normalTileStyle,normalTileStyleBorder } from "../../helpers/classNames";
import { theGridState } from "../../globalVariables.js/gridVariables";

let wallStyle = wallTileStyleBorder;
let normalStyle=normalTileStyleBorder;


export const randomWallsFunction = () => {
    if (theGridState.grid.length > 100 || theGridState.grid[0].length > 100) {
        wallStyle = wallTileStyle;
        normalStyle=normalTileStyle;
    }
    let rowsCount = theGridState.grid.length;
    let colsCount = theGridState.grid[0].length;
    for (let i = 0; i < rowsCount; ++i) {
        for (let j = 0; j < colsCount; ++j) {
            if ((theGridState.grid[i][j].isEnd) || (theGridState.grid[i][j].isStart)) {
                theGridState.grid[i][j].isWall = false;
                theGridState.grid[i][j].wallBeforeStartEnd = false;
                continue;
            }
            else {
                const randomValue = Math.random() < 0.7 ? 0 : 1;
                if (randomValue === 1) {
                    theGridState.grid[i][j].isWall = true;
                    theGridState.grid[i][j].wallBeforeStartEnd = true;
                    const element = document.getElementById(`${i}-${j}`);
                    if (element) {
                        element.className = `${wallStyle}`;
                    }
                }
                else {
                    theGridState.grid[i][j].isWall = false;
                    theGridState.grid[i][j].wallBeforeStartEnd = false;
                    const element = document.getElementById(`${i}-${j}`);
                    if (element) {
                        element.className = `${normalStyle}`;
                    }
                }
            }
        }
    }
}