import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import {normalTileStyle, normalTileStyleBorder, startTileStyle, startTileStyleBorder, endTileStyle, endTileStyleBorder } from '../helpers/classNames';

const TheTable = ({ handleMouseDown, handleMouseEnter, handleMouseUp }) => {
    const rows = useSelector((state) => state.gridslice.rows);
    const cols = useSelector((state) => state.gridslice.cols);
    useEffect(() => {
        const addInitialStyles = () => {
            let normalStyle = normalTileStyleBorder;
            let startStyle = startTileStyleBorder;
            let endStyle = endTileStyleBorder;

            if (rows > 100 || cols > 100) {
                normalStyle = normalTileStyle;
                startStyle = startTileStyle;
                endStyle = endTileStyle;
            }
            for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
                for (let colIndex = 0; colIndex < cols; colIndex++) {
                    const cell = document.getElementById(`${rowIndex}-${colIndex}`);
                    if (cell) {
                        if(rowIndex===0 && colIndex===0){
                            cell.className=startStyle;
                        }
                        else if(rowIndex===rows-1  && colIndex===cols-1){
                            cell.className=endStyle;
                        }
                        else{
                            cell.className=normalStyle;
                        }
                    }
                }
            }
        };

        addInitialStyles();
    }, [rows,cols]);


    return (
        <>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                Array.from({ length: cols }).map((_, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        id={`${rowIndex}-${colIndex}`}
                        onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                        onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                        onMouseUp={handleMouseUp}
                    >

                    </div>
                ))
            ))}
        </>
    )
}

export default TheTable;
