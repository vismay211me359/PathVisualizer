

export const randomWallsFunction = (grid) => {
    let rowsCount = grid.length;
    let colsCount = grid[0].length;
    for (let i = 0; i < rowsCount; ++i) {
        for (let j = 0; j < colsCount; ++j) {
            if ((grid[i][j].isEnd) || (grid[i][j].isStart)) {
                grid[i][j].isWall = false;
                grid[i][j].wallBeforeStartEnd = false;
                continue;
            }
            else {
                const randomValue = Math.random() < 0.7 ? 0 : 1;
                if (randomValue === 1) {
                    grid[i][j].isWall=true;
                    grid[i][j].wallBeforeStartEnd=true;
                }
                else {
                    grid[i][j].isWall = false;
                    grid[i][j].wallBeforeStartEnd = false;
                }
            }
        }
    }
    return grid;
}