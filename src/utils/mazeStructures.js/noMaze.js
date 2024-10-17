

export const noMazeFunction=(grid)=>{
    let rowsCount=grid.length;
    let colsCount=grid[0].length;
    for(let i=0;i<rowsCount;++i){
        for(let j=0;j<colsCount;++j){
            grid[i][j].isWall=false;
            grid[i][j].wallBeforeStartEnd=false;
            grid[i][j].cellDesign=false;
        }
    }
    return grid;
}