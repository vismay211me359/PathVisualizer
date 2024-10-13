import { MAX_COLS, MAX_ROWS } from "./constants";


export function createInitialGrid(startCell, endCell) {
    const rows = MAX_ROWS;
    const cols = MAX_COLS;
    const grid = [];
    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < cols; col++) {
            currentRow.push(createCell(col, row, startCell, endCell));
        }
        grid.push(currentRow);
    }
    return grid;
}

function createCell(col, row, startCell, endCell) {
    if (row === startCell.row && col === startCell.col) {
        return {
            row,
            col,
            isEnd: false,
            isWall: false,
            distance: 0,
            isStart: true,
            isTraversed: false,
            parent: null,
            isPath: false,
        }
    }
    if (row === endCell.row && col === endCell.col) {
        return {
            row,
            col,
            isEnd:true,
            isWall:false,
            distance:Infinity,
            isStart:false,
            isTraversed:false,
            parent:null,
            isPath:false,
        }
    }
    return {
        col,
        row,
        isStart: false,
        isEnd: false,
        isWall: false,
        isPath: false,
        distance: Infinity,
        isTraversed: false,
        parent: null
    };
}