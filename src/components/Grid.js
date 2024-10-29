import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaChevronUp, FaChevronDown, FaPlay } from 'react-icons/fa';
import { SiInstapaper } from 'react-icons/si';
import { initial_Cols, initial_Rows } from '../utils/constants';

import { changeSizeOfGrid } from '../utils/mazeStructures.js/changeSizeOfGrid';
import { updateCellForWall } from '../utils/mazeStructures.js/updateCellForWall';
import { updateEndCellFucntion } from '../utils/mazeStructures.js/updateEndCell';
import { updateStartCell } from '../utils/mazeStructures.js/updateStartCells';


import { toggleGraphVisualization, togglePathVisualization } from '../context/VisualizeSlice';
import { pathHandlerFunction } from '../utils/pathAlgos.js/pathHandler';
import { handleFormToggle, resetValues, navbarHandler, handleMouseDown, handleMouseEnter, handleMouseUp, onclickHandler } from '../helpers/onClickhandlers';
import TheTable from './TheTable';
import GridForm from './GridForm';
import ButtonComponent from './ButtonComponent';

const Grid = ({ toggleNavbar, isNavbarVisible }) => {
    const isGraphVisualizing = useSelector(state => state.visualization.isGraphVisualized);
    const isPathVisualizing = useSelector(state => state.visualization.isPathVisualized);
    const x = useSelector(state=>state.gridslice.rows);
    const y = useSelector(state=>state.gridslice.cols);
    const [size, setSize] = useState({ width: '100vw', height: '100vw' });
    const [isMousePressed, setIsMousePressed] = useState(false);
    const [isDraggingStart, setIsDraggingStart] = useState(false); // Is the start cell being dragged?
    const [isDraggingEnd, setIsDraggingEnd] = useState(false); // Is the end cell being dragged?
    const speed = useSelector(state => state.settings.speed);
    const algorithm = useSelector(state => state.settings.algorithm);

    const dispatch = useDispatch();

    const [rows, setRows] = useState(initial_Rows);
    const [cols, setCols] = useState(initial_Cols);
    const [showForm, setShowForm] = useState(false);
    const [borderVisible, toggleBorder] = useState(true);


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
                        <TheTable
                            handleMouseDown={(rowIndex, colIndex) => { handleMouseDown(rowIndex, colIndex, isGraphVisualizing, isPathVisualizing, setIsDraggingStart, setIsDraggingEnd, updateCellForWall, setIsMousePressed) }}
                            handleMouseEnter={(rowIndex, colIndex) => { handleMouseEnter(rowIndex, colIndex, isGraphVisualizing, isPathVisualizing, isDraggingStart, updateStartCell, isDraggingEnd, updateEndCellFucntion, isMousePressed, updateCellForWall) }}
                            handleMouseUp={() => { handleMouseUp(setIsMousePressed, setIsDraggingEnd, setIsDraggingStart) }}
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4 relative">
                    <ButtonComponent
                        theButtonClass="p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 "
                        isDisabled={false}
                        theOnClickHandler={(e) => { navbarHandler(e, toggleNavbar) }}
                        theContent={isNavbarVisible ? <FaChevronUp /> : <FaChevronDown />}
                        theTitle={isNavbarVisible ? 'Click to hide the navbar' : 'Click to show the navbar'}
                    />
                    <ButtonComponent
                        theButtonClass="bg-custom-green p-4 rounded-full text-white hover:bg-green-600 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-green-300"
                        isDisabled={isGraphVisualizing || isPathVisualizing}
                        theOnClickHandler={(e) => { onclickHandler(e, toggleGraphVisualization, togglePathVisualization, pathHandlerFunction, dispatch, speed, algorithm) }}
                        theContent={<FaPlay />}
                    />
                    <ButtonComponent
                        theButtonClass="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-blue-400"
                        isDisabled={isGraphVisualizing}
                        theOnClickHandler={() => { handleFormToggle(setShowForm, showForm) }}
                        theContent={<SiInstapaper />}
                    />

                    {showForm && (
                        <GridForm
                            rows={rows}
                            cols={cols}
                            setRows={setRows}
                            setCols={setCols}
                            resetValues={(e) => { resetValues(e, rows, cols, setRows, setCols, initial_Rows, initial_Cols, toggleBorder, dispatch, changeSizeOfGrid, toggleGraphVisualization, togglePathVisualization, setShowForm, showForm) }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Grid;

