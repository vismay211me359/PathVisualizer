import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { useDispatch,useSelector} from 'react-redux';
import { setAlgorithm,setMaze,setSpeed } from '../context/SettingsSlice';

import { resetGridFunction } from '../utils/mazeStructures.js/resetGrid';
import { clearPathFucntion } from '../utils/mazeStructures.js/clearPath';
import { noMazeFunction } from '../utils/mazeStructures.js/noMaze';


import { mazeHandlerFunction } from '../utils/mazeStructures.js/mazeHandler';

import { toggleGraphVisualization,togglePathVisualization } from '../context/VisualizeSlice';

import { pathHandlerFunction } from '../utils/pathAlgos.js/pathHandler';

import { mazeOptions,algorithmsOptions,speedOptions } from '../helpers/theVariables';
import { onclickHandler,clearBoardHandler,clearWallsHandler,clearPathHandler } from '../helpers/onClickhandlers';
import { selectMazeonchange,selectAlgorithmonchange,selectSpeedonchange } from '../helpers/onChangehandlers';
import { largerNavSelectClass,largerNavOnClickFirst,largerNavOnClickSecond } from '../helpers/classNames';
import SelectComponent from './SelectComponent';
import ButtonComponent from './ButtonComponent';

const LargeNav = () => {

    const dispatch=useDispatch();
    const maze=useSelector(state=>state.settings.maze);
    const speed=useSelector(state=>state.settings.speed);
    const algorithm=useSelector(state=>state.settings.algorithm);
    const isGraphVisualizing=useSelector(state=>state.visualization.isGraphVisualized);
    const isPathVisualizing=useSelector(state=>state.visualization.isPathVisualized);


    return (
        <nav className="p-4 flex items-center justify-between text-white">
            <h1 className="text-2xl font-bold">Pathfinding Visualizer</h1>

            <div className="flex items-center space-x-4">
                <SelectComponent labelName="Maze" selectValue={maze} onChangehandler={(e)=>{selectMazeonchange(e,dispatch,toggleGraphVisualization,setMaze,mazeHandlerFunction,speed)}}  theClassName={largerNavSelectClass} isDisabled={isGraphVisualizing || isPathVisualizing} theShowCaseValues={mazeOptions}/>

                <SelectComponent labelName="Algorithms" selectValue={algorithm} onChangehandler={(e)=>{selectAlgorithmonchange(e,dispatch,setAlgorithm)}}  theClassName={largerNavSelectClass} isDisabled={isGraphVisualizing || isPathVisualizing} theShowCaseValues={algorithmsOptions}/>

                <SelectComponent labelName="Spped" selectValue={speed} onChangehandler={(e)=>{selectSpeedonchange(e,dispatch,setSpeed)}}  theClassName={largerNavSelectClass} isDisabled={isGraphVisualizing || isPathVisualizing} theShowCaseValues={speedOptions}/>
            </div>

            {/* Buttons Section */}
            <div className="flex items-center space-x-4">

                <ButtonComponent theButtonClass={largerNavOnClickFirst} isDisabled={isGraphVisualizing} theOnClickHandler={(e)=>{clearBoardHandler(e,dispatch,resetGridFunction,togglePathVisualization)}} theContent={"Clear Board"}/>

                <ButtonComponent theButtonClass={largerNavOnClickFirst} isDisabled={isGraphVisualizing} theOnClickHandler={(e)=>{clearWallsHandler(e,noMazeFunction)}} theContent={"Clear Walls"}/>

                <ButtonComponent theButtonClass={largerNavOnClickFirst} isDisabled={isGraphVisualizing} theOnClickHandler={(e)=>{clearPathHandler(e,dispatch,clearPathFucntion,togglePathVisualization)}} theContent={"Clear Paths"}/>

                <ButtonComponent theButtonClass={largerNavOnClickSecond} isDisabled={isGraphVisualizing || isPathVisualizing} theOnClickHandler={(e)=>{onclickHandler(e,toggleGraphVisualization,togglePathVisualization,pathHandlerFunction,dispatch,speed,algorithm)}} theContent={<FaPlay />}/>
            </div>
        </nav>
    )
}

export default LargeNav
