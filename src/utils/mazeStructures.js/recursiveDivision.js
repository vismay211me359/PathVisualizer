import { theGridState } from "../../globalVariables.js/gridVariables";

let wallsArray=[];

export const recursiveDivisionFucntion=()=>{
    const rows=theGridState.grid.length;
    const cols=theGridState.grid[0].length;
    recursiveFunction(0,rows-1,0,cols-1);
    const returnArray=wallsArray;
    wallsArray=[];
    return returnArray;
}


const recursiveFunction=(startRow,endRow,startCol,endCol)=>{
    if((endRow-startRow+1)<=2  || (endCol-startCol+1)<=2){
        return;
    }
    const horizontal = (endRow - startRow + 1) > (endCol - startCol + 1);
    if (horizontal) {
        let randomValue = Math.floor(Math.random() * (endRow - startRow - 1)) + startRow + 1;
        let firstRandomValue=Math.floor(Math.random() * (endCol - startCol + 1)) + startCol;
        let secondRandomValue=firstRandomValue;

        if((startCol!==0  || endCol!==(theGridState.grid[0].length-1))){
            if(startCol!==0  && endCol!==(theGridState.grid[0].length-1)){
                if(!theGridState.grid[randomValue][startCol-1].isWall){
                    firstRandomValue=startCol;
                }
                if(!theGridState.grid[randomValue][endCol+1].isWall){
                    secondRandomValue=endCol;
                }
            }
            else if(startCol!==0){
                if(!theGridState.grid[randomValue][startCol-1].isWall){
                    firstRandomValue=startCol;
                }
            }
            else{
                if(!theGridState.grid[randomValue][endCol+1].isWall){
                    firstRandomValue=endCol;
                }
            }
        }
        for(let i=startCol;i<=endCol;++i){
            if(i===firstRandomValue || theGridState.grid[randomValue][i].isStart  || theGridState.grid[randomValue][i].isEnd  || i===secondRandomValue){
                continue;
            }
            theGridState.grid[randomValue][i].isWall=true;
            theGridState.grid[randomValue][i].wallBeforeStartEnd=true;
            if(!theGridState.grid[randomValue][i].isStart  && !theGridState.grid[randomValue][i].isEnd){
                wallsArray.push({row:randomValue,col:i});
            }
        }

        recursiveFunction(startRow, randomValue - 1, startCol, endCol);
        recursiveFunction(randomValue + 1, endRow, startCol, endCol);
    }
    else {
        let randomValue = Math.floor(Math.random() * (endCol - startCol - 1)) + startCol + 1;
        let firstRandomValue=Math.floor(Math.random() * (endRow - startRow + 1)) + startRow;
        let secondRandomValue=firstRandomValue;

        if((startRow!==0  || endRow!==(theGridState.grid.length-1))){
            if(startRow!==0  && endRow!==(theGridState.grid.length-1)){
                if(!theGridState.grid[startRow-1][randomValue].isWall){
                    firstRandomValue=startRow;
                }
                if(!theGridState.grid[endRow+1][randomValue].isWall){
                    secondRandomValue=endRow;
                }
            }
            else if(startRow!==0){
                if(!theGridState.grid[startRow-1][randomValue].isWall){
                    firstRandomValue=startRow;
                }
            }
            else{
                if(!theGridState.grid[endRow+1][randomValue].isWall){
                    firstRandomValue=endRow;
                }
            }
        }
        for(let i=startRow;i<=endRow;++i){
            if(i===firstRandomValue  || theGridState.grid[i][randomValue].isStart  || theGridState.grid[i][randomValue].isEnd  || i===secondRandomValue){
                continue;
            }
            theGridState.grid[i][randomValue].isWall=true;
            theGridState.grid[i][randomValue].wallBeforeStartEnd=true;
            if(!theGridState.grid[i][randomValue].isStart  && !theGridState.grid[i][randomValue].isEnd){
                wallsArray.push({row:i,col:randomValue});
            }
        }

        recursiveFunction(startRow, endRow, startCol, randomValue - 1);
        recursiveFunction(startRow, endRow, randomValue + 1, endCol);
    }
}