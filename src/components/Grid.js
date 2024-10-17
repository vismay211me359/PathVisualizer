import React, { useState, useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { FaChevronUp, FaChevronDown, FaPlay, FaInfoCircle,FaExchangeAlt } from 'react-icons/fa';
import { SiInstapaper } from 'react-icons/si';
import { initial_Cols, initial_Rows } from '../utils/constants';
import { changeSizeOfGrid,updateCellForWall, updateEndCell, updateStartCell } from '../context/GridsSlice';
import { toast} from 'react-toastify';

const Grid = ({ toggleNavbar, isNavbarVisible }) => {
    const grid = useSelector(state => state.gridslice.grid);
    const isGraphVisualizing=useSelector(state=>state.visualization.isGraphVisualized);
    const x = grid.length;
    const y = grid[0].length;
    const [size, setSize] = useState({ width: '100vw', height: '100vw' });
    const [isMousePressed, setIsMousePressed] = useState(false);
    const [isDraggingStart, setIsDraggingStart] = useState(false); // Is the start cell being dragged?
    const [isDraggingEnd, setIsDraggingEnd] = useState(false); // Is the end cell being dragged?

    const dispatch=useDispatch();

    const [rows, setRows] = useState(initial_Rows);
    const [cols, setCols] = useState(initial_Cols);
    const [showForm, setShowForm] = useState(false);
    const [borderVisible,toggleBorder]=useState(true);

    const handleFormToggle = () => {
        setShowForm(!showForm);
    };

    const resetValues = (e) => {
        e.preventDefault();
        if(rows<=0  || cols<=0){
            setRows(initial_Rows); 
            setCols(initial_Cols);
            handleFormToggle();
            toast.error("Enter valid values",{autoClose:5000});
            return;
        }
        if(rows>100 || cols>100){
            toggleBorder(false);
            toast.warn("Cell Border removed",{autoClose:3000});
        }
        else{
            toggleBorder(true);
        }
        dispatch(changeSizeOfGrid({rows,cols}));
        setRows(initial_Rows); 
        setCols(initial_Cols);
        handleFormToggle();
    };

    useEffect(() => {
        const updateSize = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            if (screenWidth < screenHeight) {
                setSize({
                    width: '100vw',
                    height: '100vw',
                });
            } else {
                setSize({
                    width: '100vh',
                    height: '100vh',
                });
            }
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const onclickHandler = (e) => {
        e.preventDefault();
        console.log(grid.length);
        console.log(grid[0].length);
    }

    const navbarHandler = (e) => {
        e.preventDefault();
        toggleNavbar();
    }


    
    // Function to handle when mouse is pressed down on a cell
    const handleMouseDown = (rowIndex, colIndex) => {
        if(isGraphVisualizing){
            return;
        }
        else{
            if(grid[rowIndex][colIndex].isStart){
                setIsDraggingStart(true);
            }
            else if(grid[rowIndex][colIndex].isEnd){
                setIsDraggingEnd(true);
            }
            else{
                dispatch(updateCellForWall({row:rowIndex,col:colIndex}));
                setIsMousePressed(true);
            }
        }
    };

    // Function to handle when mouse is dragged over a cell
    const handleMouseEnter = (rowIndex, colIndex) => {
        if(isGraphVisualizing){
            return;
        }
        else{
            if(isDraggingStart  && !grid[rowIndex][colIndex].isEnd){
                dispatch(updateStartCell({row:rowIndex,col:colIndex}));
            }
            else if(isDraggingEnd  && !grid[rowIndex][colIndex].isStart){
                dispatch(updateEndCell({row:rowIndex,col:colIndex}));
            }
            else{
                if (!isGraphVisualizing && isMousePressed && !grid[rowIndex][colIndex].isStart && !grid[rowIndex][colIndex].isEnd) {
                    dispatch(updateCellForWall({row:rowIndex,col:colIndex}));
                }
            }
        }
    };

    // Function to handle when mouse button is released
    const handleMouseUp = () => {
        setIsMousePressed(false);
        setIsDraggingEnd(false);
        setIsDraggingStart(false);
    };



    return (
        <div>
            <div
                className="mx-auto grid grid-cols-[19fr_1fr] h-full"
                style={{
                    width: size.width,
                    height: size.height,
                }}
            >
                <div className='pt-10 px-2'>
                    <div className={`grid border-sky-200 border-l border-b ${!borderVisible ? 'border-r border-t' : ''}`}
                        style={{
                            gridTemplateColumns: `repeat(${y}, 1fr)`,
                            gridTemplateRows: `repeat(${x}, 1fr)`,
                            width: '100%',
                            height: '90%',
                        }}>
                        {grid.map((row, rowIndex) => (
                            row.map((cell, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`${borderVisible ? 'border-sky-200 border-r border-t' : ''} flex items-center justify-center ${ cell.cellDesign ? 'animate-wallExpand' : ''}`}
                                    style={{
                                        backgroundColor: cell.isStart ? 'green' :
                                            cell.isEnd ? 'red' :
                                                cell.isWall ? 'white' : 'transparent',
                                    }}
                                    onMouseDown={()=>handleMouseDown(rowIndex,colIndex)}
                                    onMouseEnter={()=>handleMouseEnter(rowIndex,colIndex)}
                                    onMouseUp={handleMouseUp}
                                >

                                </div>
                            ))
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4 relative">
                    <button
                        className="p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 "
                        title={isNavbarVisible ? 'Click to hide the navbar' : 'Click to show the navbar'} onClick={navbarHandler}
                    >
                        {isNavbarVisible ? <FaChevronUp /> : <FaChevronDown />}
                    </button>

                    <button
                        className="bg-custom-green p-4 rounded-full text-white hover:bg-green-600 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-green-300"
                        onClick={onclickHandler} disabled={isGraphVisualizing}
                    >
                        <FaPlay />
                    </button>

                    <button
                        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-blue-400"
                        onClick={handleFormToggle} disabled={isGraphVisualizing}
                    >
                        <SiInstapaper />
                    </button>

                    {showForm && (
                        <div className="absolute left-[-270px] top-0 bg-white border border-gray-300 p-4 rounded-lg shadow-lg w-64 space-y-4">
                            <h3 className="text-lg font-semibold text-gray-700">Grid Settings</h3>

                            {/* Input for Rows */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Rows</label>
                                <input
                                    type="number"
                                    value={rows}
                                    onChange={(e) => setRows(e.target.value)}
                                    placeholder="Enter Rows"
                                    className="w-full p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    title="Enter the number of rows"
                                />
                            </div>

                            {/* Input for Columns */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Columns</label>
                                <input
                                    type="number"
                                    value={cols}
                                    onChange={(e) => setCols(e.target.value)}
                                    placeholder="Enter Columns"
                                    className="w-full p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    title="Enter the number of columns"
                                />
                            </div>

                            {/* Reset Button */}
                            <button
                                className="w-full py-2 bg-custom-green text-white rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
                                onClick={resetValues}
                            >
                                <FaExchangeAlt className="inline mr-2" /> Reset
                            </button>

                            {/* Disclaimer Section */}
                            <div className="text-xs text-gray-500 flex items-center mt-2 flex-col">
                                <div className='flex items-center'><FaInfoCircle className="mr-2 text-blue-500" /><span>Note:</span></div>
                                <span>Enter row and column values greater than 0. For values above 100, borders will be hidden as they overpower cell colors. For optimal visualization, use values under 100.</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Grid;

