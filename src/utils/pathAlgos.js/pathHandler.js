import { store } from "../../redux/Store"
import { breadthFirstSearch } from "./breadthFirstSearch";
import { createPath } from "../../context/GridsSlice";
import { depthFirstSearch } from "./depthFirstSearch";


export const pathHandlerFunction = async (grid, speed, algorithm) => {
    const state = store.getState();
    const startPoint = state.gridslice.startCell;
    const endPoint = state.gridslice.endCell;
    let delay = speed;

    let traversedNodes = [];
    let parentArray = [];

    if (algorithm === 'dijkstra') {

    }
    else if (algorithm === "breadthFirstSearch") {
        const { travelledNodes, parentNodes } = breadthFirstSearch(grid, startPoint);
        traversedNodes=travelledNodes;
        parentArray=parentNodes;
    }
    else if (algorithm === "depthFirstSearch") {
        const { travelledNodes, parentNodes }=depthFirstSearch(grid,startPoint);
        traversedNodes=travelledNodes;
        parentArray=parentNodes;
    }
    else {
        
    }

    let isPath = false;
    for (let i = 0; i < traversedNodes.length; ++i) {
        if (traversedNodes[i].row === endPoint.row && traversedNodes[i].col === endPoint.col) {
            isPath = true;
            break;
        }
        else {
            await new Promise((resolve) => {
                setTimeout(() => {
                    store.dispatch(createPath({ node: traversedNodes[i], isPath: false }));
                    resolve();
                }, delay);
            });
        }
    }


    if (isPath) {
        let pathArray = [];
        let i = endPoint.row;
        let j = endPoint.col;
        while (parentArray[i][j] !== null) {
            pathArray.push(parentArray[i][j]);
            let x = parentArray[i][j].row;
            let y = parentArray[i][j].col;
            i = x;
            j = y;
        }
        pathArray.reverse();
        for (let k = 0; k < pathArray.length; ++k) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    store.dispatch(createPath({ node: pathArray[k], isPath: true }));
                    resolve();
                }, delay);
            });
        }
    }
}


// store.subscribe(() => {
//     const state = store.getState();
//     console.log('State updated:', state);
// });
//This will listen to state changes and call the function whenever the state is updated.