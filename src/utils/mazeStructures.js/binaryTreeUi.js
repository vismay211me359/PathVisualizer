// import { theGridState } from "../../globalVariables.js/gridVariables";
// import { normalTileStyleBorder, normalTileStyle, wallTileStyle, wallTileStyleBorder } from "../../helpers/classNames";

// let wallStyle = wallTileStyleBorder;
// let normalStyle = normalTileStyleBorder;

// export const binaryTreeForUi = (wallsArray, theNoWallArray, speed) => {

//     if (theGridState.grid.length > 100 || theGridState.grid[0].length > 100) {
//         wallStyle = wallTileStyle;
//         normalStyle = normalTileStyle;
//     }
//     for (let i = 0; i < wallsArray.length; ++i) {
//         setTimeout(() => {
//             const element = document.getElementById(`${wallsArray[i].row}-${wallsArray[i].col}`);
//             if (element) {
//                 element.className = `${wallStyle}`;
//             }
//         }, (i * speed))
//     }

//     setTimeout(() => {
//         for (let i = 0; i < theNoWallArray.length; ++i) {
//             setTimeout(() => {
//                 const element = document.getElementById(`${theNoWallArray[i].row}-${theNoWallArray[i].col}`);
//                 if (element) {
//                     element.className = `${normalStyle}`;
//                 }
//             }, (i * speed))
//         }
//     }, wallsArray.length * speed)
// }


import { theGridState } from "../../globalVariables.js/gridVariables";
import { normalTileStyleBorder, normalTileStyle, wallTileStyle, wallTileStyleBorder } from "../../helpers/classNames";

let wallStyle = wallTileStyleBorder;
let normalStyle = normalTileStyleBorder;

export const binaryTreeForUi = (wallsArray, theNoWallArray, speed) => {
    return new Promise((resolve) => {
        if (theGridState.grid.length > 100 || theGridState.grid[0].length > 100) {
            wallStyle = wallTileStyle;
            normalStyle = normalTileStyle;
        }

        // Loop to set wall elements
        wallsArray.forEach((wall, i) => {
            setTimeout(() => {
                const element = document.getElementById(`${wall.row}-${wall.col}`);
                if (element) {
                    element.className = `${wallStyle}`;
                }
                // If last timeout for wallsArray, proceed to next set of animations
                if (i === wallsArray.length - 1) {
                    setTimeout(() => {
                        // Loop to set no-wall elements
                        theNoWallArray.forEach((noWall, j) => {
                            setTimeout(() => {
                                const element = document.getElementById(`${noWall.row}-${noWall.col}`);
                                if (element) {
                                    element.className = `${normalStyle}`;
                                }
                                // Resolve the promise once the last animation is done
                                if (j === theNoWallArray.length - 1) {
                                    resolve();
                                }
                            }, j * speed);
                        });
                    }, speed);
                }
            }, i * speed);
        });
    });
};
