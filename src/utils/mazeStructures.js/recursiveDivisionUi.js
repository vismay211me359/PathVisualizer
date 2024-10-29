// import { wallTileStyleBorder,wallTileStyle } from "../../helpers/classNames";
// import { theGridState } from "../../globalVariables.js/gridVariables";


// let wallStyle = wallTileStyleBorder;


// export const recursiveDivisionUi=(wallsArray,speed)=>{
//     if (theGridState.grid.length > 100 || theGridState.grid[0].length > 100) {
//         wallStyle = wallTileStyle;
//     }
//     for (let i = 0; i < wallsArray.length; ++i) {
//         setTimeout(() => {
//             const element = document.getElementById(`${wallsArray[i].row}-${wallsArray[i].col}`);
//             if (element) {
//                 element.className = `${wallStyle}`;
//             }
//         }, (i * speed))
//     }
// }

import { wallTileStyleBorder, wallTileStyle } from "../../helpers/classNames";
import { theGridState } from "../../globalVariables.js/gridVariables";

let wallStyle = wallTileStyleBorder;

export const recursiveDivisionUi = (wallsArray, speed) => {
    if (theGridState.grid.length > 100 || theGridState.grid[0].length > 100) {
        wallStyle = wallTileStyle;
    }

    return new Promise((resolve) => {
        wallsArray.forEach((wall, i) => {
            setTimeout(() => {
                const element = document.getElementById(`${wall.row}-${wall.col}`);
                if (element) {
                    element.className = `${wallStyle}`;
                }

                // Resolve the promise after the last element's timeout is executed
                if (i === wallsArray.length - 1) {
                    resolve();
                }
            }, i * speed);
        });
    });
};


