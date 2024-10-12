import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';

const MobileNav = () => {
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

    const [selectedMaze, setSelectedMaze] = useState(mazeOptions[0].value);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithmsOptions[0].value);
    const [selectedSpeed, setSelectedSpeed] = useState(speedOptions[0].value);

    const onclickHandler = (e) => {
        console.log(selectedMaze);
        console.log(selectedAlgorithm);
        console.log(selectedSpeed);
    }


    return (
        <nav className="text-white flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Pathfinding Visualizer</h1>

            <div className="flex flex-col space-y-2 w-full">
                <div className="flex flex-col">
                    <label className="text-sm block">Maze</label>
                    <select
                        value={selectedMaze}
                        onChange={(e) => setSelectedMaze(e.target.value)}
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

                <div className="flex flex-col">
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
            <div className="flex justify-between items-center mt-4 w-full">
                <button className="bg-maze-background px-4 py-2 rounded text-white hover:bg-gray-800 transition-all duration-300">
                    Clear Board
                </button>
                <button className="bg-maze-background px-4 py-2 rounded text-white hover:bg-gray-800 transition-all duration-300">
                    Clear Walls
                </button>
                <button className="bg-maze-background px-4 py-2 rounded text-white hover:bg-gray-800 transition-all duration-300">
                    Clear Paths
                </button>
                <button className="bg-custom-green p-3 rounded-full text-white hover:bg-green-600 transition-all duration-300" onClick={onclickHandler}>
                    <FaPlay />
                </button>
            </div>
        </nav>
    )
}

export default MobileNav
