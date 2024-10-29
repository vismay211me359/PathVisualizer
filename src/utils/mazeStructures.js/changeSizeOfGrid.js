import { createInitialGrid } from "../createInitialGrid"
import { initialStartCell } from "../constants";
import { store } from "../../redux/Store";

import { setRowsCols } from "../../context/GridsSlice";
import { theGridState } from "../../globalVariables.js/gridVariables";

export const changeSizeOfGrid = async (rowsCount, colsCount) => {
    const endCell = {
        row: rowsCount - 1,
        col: colsCount - 1,
    };
    const startCell = initialStartCell;
    const grid = createInitialGrid(initialStartCell, { row: rowsCount - 1, col: colsCount - 1 }, rowsCount, colsCount);
    // theGridState.grid = grid;
    theGridState.grid.splice(0, theGridState.grid.length, ...grid); // Replace array content
    theGridState.endCell = endCell;
    theGridState.startCell = startCell;
    store.dispatch(setRowsCols({ rows: rowsCount, cols: colsCount }));
}