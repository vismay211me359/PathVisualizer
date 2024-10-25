
import { isVisited } from "./breadthFirstSearch";

export const depthFirstSearch=(grid,startPoint)=>{
    const rows=grid.length;
    const cols=grid[0].length;
    let visited=[];
    let parentArray=[];
    for (let i = 0; i < rows; i++) {
        parentArray[i] = [];
        for (let j = 0; j < cols; j++) {
            parentArray[i][j] = null;
        }
    }
    let xxdirections=[-1,1,0,0];
    let yydirections=[0,0,-1,1];

    let traversedNodes=[];

    (function dfs(node) {
        traversedNodes.push(node);
        visited.push(node);
        for(let i=0;i<4;++i){
            let x=node.row+xxdirections[i];
            let y=node.col+yydirections[i];
            if(x<rows && y<cols  && x>=0  && y>=0){
                if(!(grid[x][y].isWall)  && !(isVisited(visited,{row:x,col:y}))){
                    parentArray[x][y]=node;
                    dfs({row:x,col:y});
                }
            }
        }
    })(startPoint);


    return {travelledNodes:traversedNodes,parentNodes:parentArray};
}