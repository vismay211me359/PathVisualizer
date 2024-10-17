import { store } from "../../redux/Store";
import { setMazeStructure } from "../../context/GridsSlice";
export const binaryTreeWalls = async (grid, speed, mazeType) => {
    const rows = grid.length;
    const cols = grid[0].length;
    let delay = speed * 10;
    for (let i = 0; i < rows; ++i) {
        await new Promise((resolve) => {
            setTimeout(() => {
                store.dispatch(setMazeStructure({ mazeType, row: i, cols: cols, stillWalls: true }));
                resolve();
            }, delay);
        });
    }
}

export const binaryTreeFunction = async (grid, speed, mazeType) => {
    const rows = grid.length;
    const cols = grid[0].length;
    let delay = speed * 10;
    for (let i = 0; i < rows; ++i) {
        await new Promise((resolve) => {
            setTimeout(() => {
                store.dispatch(setMazeStructure({ mazeType, row: i, cols: cols, stillWalls: false }));
                resolve();
            }, delay)
        })
    }
}


