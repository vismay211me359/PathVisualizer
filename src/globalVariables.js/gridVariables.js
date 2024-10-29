import { createInitialGrid } from "../utils/createInitialGrid"
import { initialEndCell, initialStartCell, initial_Cols, initial_Rows } from '../utils/constants';


export const theGridState={
    grid:createInitialGrid(initialStartCell, initialEndCell, initial_Rows, initial_Cols),
    startCell:initialStartCell,
    endCell:initialEndCell,
    multipleStartCells:[],
    multipleEndCells:[],
    middleMans:[],
}