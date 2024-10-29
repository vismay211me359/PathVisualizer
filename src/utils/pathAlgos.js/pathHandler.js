import { breadthFirstSearch } from "./breadthFirstSearch";
import { depthFirstSearch } from "./depthFirstSearch";
import { pathStateHandler } from "./pathStateHandler";
import { pathUiHandler } from "./pathUiHandler";
import { theGridState } from "../../globalVariables.js/gridVariables";


export const pathHandlerFunction = async(speed, algorithm) => {
    const startPoint = theGridState.startCell;
    const endPoint = theGridState.endCell;
    const grid = theGridState.grid;

    let traversedNodes = [];
    let parentArray = [];

    if (algorithm === 'dijkstra') {
        
    }
    else if (algorithm === "breadthFirstSearch") {
        const { travelledNodes, parentNodes } = breadthFirstSearch(grid, startPoint);
        traversedNodes = travelledNodes;
        parentArray = parentNodes;
    }
    else if (algorithm === "depthFirstSearch") {
        const { travelledNodes, parentNodes } = depthFirstSearch(grid, startPoint);
        traversedNodes = travelledNodes;
        parentArray = parentNodes;
    }
    else {

    }

    pathStateHandler(grid,endPoint,traversedNodes,parentArray)
    await pathUiHandler(traversedNodes,endPoint,parentArray,speed);
    traversedNodes=[];
    parentArray=[];
    return;
}