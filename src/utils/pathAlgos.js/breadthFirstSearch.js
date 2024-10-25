

export const isVisited=(visitedArray,point)=>{
    const ll=visitedArray.length;
    for(let i=0;i<ll;++i){
        if(visitedArray[i].row===point.row  && visitedArray[i].col===point.col){
            return true;
        }
    }
    return false;
}


export const breadthFirstSearch=(grid,startPoint)=>{
    const rows=grid.length;
    const cols=grid[0].length;
    let queue=[];
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

    queue.push(startPoint);
    visited.push(startPoint);

    let traversedNodes=[];


    while(queue.length>0){
        let currentNode=queue.shift();
        traversedNodes.push(currentNode);
        for(let i=0;i<4;++i){
            let x=currentNode.row+xxdirections[i];
            let y=currentNode.col+yydirections[i];
            if(x<rows  && y<cols  && x>=0  && y>=0){
                if(!(grid[x][y].isWall)  && !(isVisited(visited,{row:x,col:y}))){
                    visited.push({row:x,col:y});
                    parentArray[x][y]=currentNode;
                    queue.push({row:x,col:y});
                }
            }
        }
    }

    return {travelledNodes:traversedNodes,parentNodes:parentArray};
}
