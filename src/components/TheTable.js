import React from 'react'

const TheTable = ({grid,borderVisible,handleMouseDown,handleMouseEnter,handleMouseUp}) => {
    return (
        <>
            {grid.map((row, rowIndex) => (
                row.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`${borderVisible ? 'border-sky-200 border-r border-t' : ''} flex items-center justify-center ${cell.cellDesign ? (cell.isPath ? 'animate-path' : (cell.isTraversed ? 'animate-traversed' : (cell.isWall ? 'animate-wallExpand' : ''))) : ''}`}
                        style={{
                            backgroundColor: cell.isStart ? 'green' :
                                cell.isEnd ? 'red' :
                                    cell.isPath ? '#fde68a' :
                                        cell.isTraversed ? '#22d3ee' :
                                            cell.isWall ? 'white' : 'transparent',
                        }}
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
