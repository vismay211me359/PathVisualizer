import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { useDispatch,useSelector} from 'react-redux';
import { setAlgorithm,setMaze,setSpeed } from '../context/SettingsSlice';
import { resetGrid,clearWalls} from '../context/GridsSlice';
import { mazeHandlerFunction } from '../utils/mazeStructures.js/mazeHandler';
import { toast } from 'react-toastify';
import { toggleGraphVisualization } from '../context/VisualizeSlice';

const LargeNav = () => {

    const dispatch=useDispatch();
    const maze=useSelector(state=>state.settings.maze);
    const speed=useSelector(state=>state.settings.speed);
    const algorithm=useSelector(state=>state.settings.algorithm);
    const isGraphVisualizing=useSelector(state=>state.visualization.isGraphVisualized);
    const grid=useSelector(state=>state.gridslice.grid);

    const mazeOptions = [
        { label: 'Binary Tree', value: 'binaryTree' },
        { label: 'No Maze', value: 'noMaze' },
        { label: 'Recursive Division', value: 'recursiveDivision' },
        { label: 'Random Walls', value: 'randomWalls' },
    ];

    const speedOptions = [
        { label: 'Fast', value: 0.5 },
        { label: 'Medium', value: 3.5 },
        { label: 'Slow', value: 6 },
        { label: 'Full Speed', value: 0 },
    ];

    const algorithmsOptions =[
        { label: 'Dijkstra', value: 'dijkstra' },
        { label: 'Breadth First Search', value: 'breadthFirstSearch' },
        { label: 'Depth First Search', value: 'depthFirstSearch' },
    ];

    const onclickHandler=(e)=>{
        console.log(maze);
        console.log(speed);
        console.log(algorithm);
    }


    const clearBoardHandler=(e)=>{
        e.preventDefault();
        dispatch(resetGrid());
    }

    const clearWallsHandler=(e)=>{
        e.preventDefault();
        dispatch(clearWalls());
    }


    return (
        <nav className="p-4 flex items-center justify-between text-white">
            <h1 className="text-2xl font-bold">Pathfinding Visualizer</h1>

            <div className="flex items-center space-x-4">

                <div>
                    <label className="text-sm block">Maze</label>
                    <select
                        value={maze}
                        onChange={async(e) => {
                            dispatch(toggleGraphVisualization(true));
                            dispatch(setMaze(e.target.value))
                            try{
                                await mazeHandlerFunction(grid,speed,e.target.value);
                                dispatch(toggleGraphVisualization(false));
                            }catch(err){
                                toast.error("Error!, Reload...",{autoClose:5000});
                            }
                        }}
                        className="bg-maze-background text-white px-4 py-2 rounded hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={isGraphVisualizing}
                    >
                        {mazeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-sm block">Algorithms</label>
                    <select
                        value={algorithm}
                        onChange={(e) => {dispatch(setAlgorithm(e.target.value))}}
                        className="bg-maze-background text-white px-4 py-2 rounded hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={isGraphVisualizing}
                    >
                        {algorithmsOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-sm block">Speed</label>
                    <select
                        value={speed}
                        onChange={(e) => {dispatch(setSpeed(e.target.value))}}
                        className="bg-maze-background text-white px-4 py-2 rounded hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={isGraphVisualizing}
                    >
                        {speedOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Buttons Section */}
            <div className="flex items-center space-x-4">
                <button className="bg-maze-background px-4 py-2 rounded text-white hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={isGraphVisualizing} onClick={clearBoardHandler}>
                    Clear Board
                </button>
                <button className="bg-maze-background px-4 py-2 rounded text-white hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={isGraphVisualizing} onClick={clearWallsHandler}>
                    Clear Walls
                </button>
                <button className="bg-maze-background px-4 py-2 rounded text-white hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={isGraphVisualizing}>
                    Clear Paths
                </button>

                {/* Play Button */}
                <button className="bg-custom-green p-4 rounded-full text-white hover:bg-green-600 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-green-300" onClick={onclickHandler} disabled={isGraphVisualizing}>
                    <FaPlay />
                </button>
            </div>
        </nav>
    )
}

export default LargeNav
