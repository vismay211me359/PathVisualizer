import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';


const LargeNav = () => {

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

    const algorithmsOptions =[
        { label: 'Dijkstra', value: 'dijkstra' },
        { label: 'Breadth First Search', value: 'breadthFirstSearch' },
        { label: 'Depth First Search', value: 'depthFirstSearch' },
    ];

    const [selectedMaze, setSelectedMaze] = useState(mazeOptions[0].value);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithmsOptions[0].value);
    const [selectedSpeed, setSelectedSpeed] = useState(speedOptions[0].value);

    const onclickHandler=(e)=>{
        console.log(selectedMaze);
        console.log(selectedAlgorithm);
        console.log(selectedSpeed);
    }



    return (
        <nav className="p-4 flex items-center justify-between text-white">
            <h1 className="text-2xl font-bold">Pathfinding Visualizer</h1>

            <div className="flex items-center space-x-4">

                <div>
                    <label className="text-sm block">Maze</label>
                    <select
                        value={selectedMaze}
                        onChange={(e) => {setSelectedMaze(e.target.value)}}
                        className="bg-maze-background text-white px-4 py-2 rounded hover:bg-gray-800 transition-all duration-300"
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
                        value={selectedAlgorithm}
                        onChange={(e) => setSelectedAlgorithm(e.target.value)}
                        className="bg-maze-background text-white px-4 py-2 rounded hover:bg-gray-800 transition-all duration-300"
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
                        value={selectedSpeed}
                        onChange={(e) => setSelectedSpeed(e.target.value)}
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
            <div className="flex items-center space-x-4">
                <button className="bg-maze-background px-4 py-2 rounded text-white hover:bg-gray-800 transition-all duration-300">
                    Clear Board
                </button>
                <button className="bg-maze-background px-4 py-2 rounded text-white hover:bg-gray-800 transition-all duration-300">
                    Clear Walls
                </button>
                <button className="bg-maze-background px-4 py-2 rounded text-white hover:bg-gray-800 transition-all duration-300">
                    Clear Paths
                </button>

                {/* Play Button */}
                <button className="bg-custom-green p-4 rounded-full text-white hover:bg-green-600 transition-all duration-300" onClick={onclickHandler}>
                    <FaPlay />
                </button>
            </div>
        </nav>
    )
}

export default LargeNav
