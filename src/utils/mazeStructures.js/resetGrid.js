import { initialStartCell } from "../constants";
import { theGridState } from "../../globalVariables.js/gridVariables";
import { normalTileStyleBorder, normalTileStyle, wallTileStyle, wallTileStyleBorder, startTileStyle, startTileStyleBorder, endTileStyle, endTileStyleBorder } from "../../helpers/classNames";

import { createInitialGrid } from "../createInitialGrid";

let normalStyle = normalTileStyleBorder;
let wallStyle = wallTileStyleBorder;
let startStyle = startTileStyleBorder;
let endStyle = endTileStyleBorder;

export const resetGridFunction = () => {
    if (theGridState.grid.length > 100 || theGridState.grid[0].length > 100) {
        wallStyle = wallTileStyle;
        normalStyle = normalTileStyle;
        startStyle = startTileStyle;
        endStyle = endTileStyle;
    }
    const grid = createInitialGrid(initialStartCell, { row: theGridState.grid.length - 1, col: theGridState.grid[0].length - 1 }, theGridState.grid.length, theGridState.grid[0].length);
    const startCell = initialStartCell;
    const endCell = {
        row: theGridState.grid.length - 1,
        col: theGridState.grid[0].length - 1,
    }
    theGridState.grid.splice(0, theGridState.grid.length, ...grid);
    theGridState.startCell = startCell;
    theGridState.endCell = endCell;
    for (let i = 0; i < grid.length; ++i) {
        for (let j = 0; j < grid[0].length; ++j) {
            const element = document.getElementById(`${i}-${j}`);
            if (element) {
                if (grid[i][j].isStart) {
                    element.className = `${startStyle}`;
                }
                else if (grid[i][j].isEnd) {
                    element.className = `${endStyle}`;
                }
                else if (grid[i][j].isWall) {
                    element.className = `${wallStyle}`;
                }
                else {
                    element.className = `${normalStyle}`;
                }
            }
        }
    }
}