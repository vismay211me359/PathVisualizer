import { store } from "../../redux/Store";
import { setMazeStructure } from "../../context/GridsSlice";
export const recursiveDivisionFucntion=async(grid,speed,mazeType)=>{
    const rows=grid.length;
    const cols=grid[0].length;
    await recursiveFunction(0,rows-1,0,cols-1,speed,mazeType);
}

const recursiveFunction=async(startRow,endRow,startCol,endCol,speed,mazeType)=>{
    if((endRow-startRow+1)<=2  || (endCol-startCol+1)<=2){
        return;
    }
    let delay=speed*10;
    const horizontal = (endRow - startRow + 1) > (endCol - startCol + 1);
    if (horizontal) {
        const randomValue = Math.floor(Math.random() * (endRow - startRow - 1)) + startRow + 1;
        
        await new Promise((resolve) => {
            setTimeout(() => {
                store.dispatch(setMazeStructure({ 
                    mazeType, 
                    recursive: { horizontal: true, line: randomValue, size: { start: startCol, end: endCol } } 
                }));
                resolve();
            }, delay);
        });
        await recursiveFunction(startRow, randomValue - 1, startCol, endCol, speed, mazeType);
        await recursiveFunction(randomValue + 1, endRow, startCol, endCol, speed, mazeType);
    }
    else {
        const randomValue = Math.floor(Math.random() * (endCol - startCol - 1)) + startCol + 1;
        
        await new Promise((resolve) => {
            setTimeout(() => {
                store.dispatch(setMazeStructure({ 
                    mazeType, 
                    recursive: { horizontal: false, line: randomValue, size: { start: startRow, end: endRow } } 
                }));
                resolve();
            }, delay);
        });

        await recursiveFunction(startRow, endRow, startCol, randomValue - 1, speed, mazeType);
        await recursiveFunction(startRow, endRow, randomValue + 1, endCol, speed, mazeType);
    }
}