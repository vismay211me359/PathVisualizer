import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setAlgorithm, setMaze, setSpeed } from '../context/SettingsSlice';

import { resetGridFunction } from '../utils/mazeStructures.js/resetGrid';
import { clearPathFucntion } from '../utils/mazeStructures.js/clearPath';
import { noMazeFunction } from '../utils/mazeStructures.js/noMaze';



import { mazeHandlerFunction } from '../utils/mazeStructures.js/mazeHandler';
import { toggleGraphVisualization, togglePathVisualization } from '../context/VisualizeSlice';
import { pathHandlerFunction } from '../utils/pathAlgos.js/pathHandler';
import { mazeOptions, algorithmsOptions, speedOptions } from '../helpers/theVariables';
import { onclickHandler, clearBoardHandler, clearWallsHandler, clearPathHandler } from '../helpers/onClickhandlers';
import SelectComponent from './SelectComponent';
import { mobileNavSelectClass, mobileNavOnClickfirst, mobileNavOnClickSecond } from '../helpers/classNames';
import { selectMazeonchange, selectAlgorithmonchange, selectSpeedonchange } from '../helpers/onChangehandlers';
import ButtonComponent from './ButtonComponent';

const MobileNav = () => {

    const dispatch = useDispatch();
    const maze = useSelector(state => state.settings.maze);
    const speed = useSelector(state => state.settings.speed);
    const algorithm = useSelector(state => state.settings.algorithm);
    const isGraphVisualizing = useSelector(state => state.visualization.isGraphVisualized);
    const isPathVisualizing = useSelector(state => state.visualization.isPathVisualized);


    return (
        <nav className="text-white flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Pathfinding Visualizer</h1>

            <div className="flex flex-col space-y-2 w-full">
                <div className="flex flex-col">
                    <SelectComponent labelName="Maze" selectValue={maze} onChangehandler={(e) => { selectMazeonchange(e, dispatch, toggleGraphVisualization, setMaze, mazeHandlerFunction, speed) }} theClassName={mobileNavSelectClass} isDisabled={isGraphVisualizing || isPathVisualizing} theShowCaseValues={mazeOptions} />
                </div>

                <div className="flex flex-col">
                    <SelectComponent labelName="Algorithms" selectValue={algorithm} onChangehandler={(e) => { selectAlgorithmonchange(e, dispatch, setAlgorithm) }} theClassName={mobileNavSelectClass} isDisabled={isGraphVisualizing || isPathVisualizing} theShowCaseValues={algorithmsOptions} />
                </div>

                <div className="flex flex-col">
                    <SelectComponent labelName="Spped" selectValue={speed} onChangehandler={(e) => { selectSpeedonchange(e, dispatch, setSpeed) }} theClassName={mobileNavSelectClass} isDisabled={isGraphVisualizing || isPathVisualizing} theShowCaseValues={speedOptions} />
                </div>
            </div>

            {/* Buttons Section */}
            <div className="flex flex-wrap justify-between items-center mt-4 w-full">
                <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">

                    <ButtonComponent theButtonClass={mobileNavOnClickfirst} isDisabled={isGraphVisualizing} theOnClickHandler={(e) => { clearBoardHandler(e, dispatch,resetGridFunction, togglePathVisualization) }} theContent={"Clear Board"} />

                    <ButtonComponent theButtonClass={mobileNavOnClickfirst} isDisabled={isGraphVisualizing} theOnClickHandler={(e) => { clearWallsHandler(e, noMazeFunction) }} theContent={"Clear Walls"} />
                </div>

                <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2 mt-2 md:mt-0">
                    <ButtonComponent theButtonClass={mobileNavOnClickfirst} isDisabled={isGraphVisualizing} theOnClickHandler={(e) => { clearPathHandler(e,dispatch, clearPathFucntion, togglePathVisualization) }} theContent={"Clear Paths"} />
                    <div className='flex items-center justify-center'>
                        <ButtonComponent theButtonClass={mobileNavOnClickSecond} isDisabled={isGraphVisualizing || isPathVisualizing} theOnClickHandler={(e) => { onclickHandler(e, toggleGraphVisualization, togglePathVisualization, pathHandlerFunction, dispatch, speed, algorithm) }} theContent={<FaPlay />} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MobileNav
