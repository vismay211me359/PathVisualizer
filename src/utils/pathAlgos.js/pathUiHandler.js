// import { pathTileStyleBorder,pathTileStyle, traversedTileStyleBorder,traversedTileStyle } from "../../helpers/classNames";
// import { theGridState } from "../../globalVariables.js/gridVariables";

// let pathStyle=pathTileStyleBorder;
// let traversedStyle=traversedTileStyleBorder;

// export const pathUiHandler = (traversedNodes, endPoint, parentArray, speed) => {
//     if (theGridState.grid.length > 100 || theGridState.grid[0].length > 100) {
//         pathStyle=pathTileStyle;
//         traversedStyle=traversedTileStyle;
//     }
//     let isPath = false;
//     let count=0;
//     for (let i = 1; i < traversedNodes.length; ++i) {
//         count++;
//         if(traversedNodes[i].row === endPoint.row && traversedNodes[i].col === endPoint.col){
//             isPath=true;
//             break;
//         }
//         setTimeout(() => {
//                 const element = document.getElementById(`${traversedNodes[i].row}-${traversedNodes[i].col}`);
//                 if (element) {
//                     element.className = `${traversedStyle}`;
//                 }
//         }, (i * speed))
//     }

//     setTimeout(() => {
//         if (isPath) {
//             let pathArray = [];
//             let i = endPoint.row;
//             let j = endPoint.col;
//             while (parentArray[i][j] !== null) {
//                 pathArray.push(parentArray[i][j]);
//                 let x = parentArray[i][j].row;
//                 let y = parentArray[i][j].col;
//                 i = x;
//                 j = y;
//             }
//             if(parentArray[i][j]===null){
//                 pathArray.pop();
//             }
//             pathArray.reverse();
//             for (let k = 0; k < pathArray.length; ++k) {
//                 setTimeout(() => {
//                     const element = document.getElementById(`${pathArray[k].row}-${pathArray[k].col}`);
//                     if (element) {
//                         element.className = `${pathStyle}`;
//                     }
//                 }, (k * speed))
//             }
//         }
//     }, (count * speed));

// }



import { pathTileStyleBorder, pathTileStyle, traversedTileStyleBorder, traversedTileStyle } from "../../helpers/classNames";
import { theGridState } from "../../globalVariables.js/gridVariables";

let pathStyle = pathTileStyleBorder;
let traversedStyle = traversedTileStyleBorder;


export const pathUiHandler = (traversedNodes, endPoint, parentArray, speed) => {
    return new Promise((resolve) => {
        let pathFound = false;
        if (theGridState.grid.length > 100 || theGridState.grid[0].length > 100) {
            pathStyle = pathTileStyle;
            traversedStyle = traversedTileStyle;
        }

        traversedNodes.forEach((element, i) => {
            if (i > 0) {

                setTimeout(() => {
                    if (pathFound) {
                        return;
                    }
                    if (element.row === endPoint.row && element.col === endPoint.col) {
                        pathFound = true;
                        setTimeout(() => {
                            let pathArray = [];
                            let m = endPoint.row;
                            let n = endPoint.col;
                            while (parentArray[m][n] !== null) {
                                pathArray.push(parentArray[m][n]);
                                let x = parentArray[m][n].row;
                                let y = parentArray[m][n].col;
                                m = x;
                                n = y;
                            }
                            if (parentArray[m][n] === null) {
                                pathArray.pop();
                            }
                            pathArray.reverse();
                            pathArray.forEach((pathCell, k) => {
                                setTimeout(() => {
                                    const htmlElement = document.getElementById(`${pathCell.row}-${pathCell.col}`);
                                    if (htmlElement) {
                                        htmlElement.className = `${pathStyle}`;
                                    }
                                    if (k === pathArray.length - 1) {
                                        resolve();
                                    }
                                }, k * speed)
                            })
                        }, speed);
                    }
                    else {
                        const htmlElement = document.getElementById(`${element.row}-${element.col}`);
                        if (htmlElement) {
                            htmlElement.className = `${traversedStyle}`;
                        }
                    }
                }, i * speed);
            }
        });

    })

}

