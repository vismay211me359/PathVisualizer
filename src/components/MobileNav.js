import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setAlgorithm, setSpeed, setMaze } from '../context/PathfinderSlice';

const MobileNav = () => {

    const dispatch = useDispatch();
    const maze = useSelector(state => state.pathfinder.maze);
    const speed = useSelector(state => state.pathfinder.speed);
    const algorithm = useSelector(state => state.pathfinder.algorithm);


    const mazeOptions = [
        { label: 'Binary Tree', value: 'binaryTree' },
        { label: 'No Maze', value: 'noMaze' },
        { label: 'Recursive Division', value: 'recursiveDivision' },
    ];

    const speedOptions = [
        { label: 'Fast', value: 'fast' },
        { label: 'Medium', value: 'medium' },
        { label: 'Slow', value: 'slow' },
    ];

    const algorithmsOptions = [
        { label: 'Dijkstra', value: 'dijkstra' },
        { label: 'Breadth First Search', value: 'breadthFirstSearch' },
        { label: 'Depth First Search', value: 'depthFirstSearch' },
    ];


    const onclickHandler = (e) => {
        console.log(maze);
        console.log(algorithm);
        console.log(speed);
    }


    return (
        <nav className="text-white flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Pathfinding Visualizer</h1>

            <div className="flex flex-col space-y-2 w-full">
                <div className="flex flex-col">
                    <label className="text-sm block">Maze</label>
                    <select
                        value={maze}
                        onChange={(e) => { dispatch(setMaze(e.target.value)) }}
                        className="bg-maze-background text-white px-4 py-2 rounded hover:bg-gray-800 transition-all duration-300"
                    >
                        {mazeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm block">Algorithms</label>
                    <select
                        value={algorithm}
                        onChange={(e) => { dispatch(setAlgorithm(e.target.value)) }}
                        className="bg-maze-background text-white px-4 py-2 rounded hover:bg-gray-800 transition-all duration-300"
                    >
                        {algorithmsOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm block">Speed</label>
                    <select
                        value={speed}
                        onChange={(e) => { dispatch(setSpeed(e.target.value)) }}
                        className="bg-maze-background text-white px-4 py-2 rounded hover:bg-gray-800 transition-all duration-300"
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
            <div className="flex flex-wrap justify-between items-center mt-4 w-full">
                <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
                    <button className="bg-maze-background px-4 py-2 rounded text-white hover:bg-gray-800 transition-all duration-300">
                        Clear Board
                    </button>
                    <button className="bg-maze-background px-4 py-2 rounded text-white hover:bg-gray-800 transition-all duration-300">
                        Clear Walls
                    </button>
                </div>

                <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2 mt-2 md:mt-0">
                    <button className="bg-maze-background px-4 py-2 rounded text-white hover:bg-gray-800 transition-all duration-300">
                        Clear Paths
                    </button>
                    <div className='flex items-center justify-center'>
                    <button className="bg-custom-green p-3 rounded-full text-white hover:bg-green-600 transition-all duration-300" onClick={onclickHandler}>
                        <FaPlay />
                    </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MobileNav
