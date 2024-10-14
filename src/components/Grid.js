import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaChevronUp, FaChevronDown, FaPlay } from 'react-icons/fa';

const Grid = ({ toggleNavbar, isNavbarVisible }) => {
    const grid = useSelector(state => state.pathfinder.grid);
    const x = grid.length;
    const y = grid[0].length;
    const [size, setSize] = useState({ width: '100vw', height: '100vw' });

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

    const navbarHandler=(e)=>{
        e.preventDefault();
        toggleNavbar();
    }

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
                <div className="grid"
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
                                className={`border border-white flex items-center justify-center`}
                                style={{
                                    backgroundColor: cell.isStart ? 'green' :
                                        cell.isEnd ? 'red' :
                                        cell.isWall ? 'gray' : 'transparent',
                                }}
                            >
                                
                            </div>
                        ))
                    ))}
                </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <button
                        className="p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 "
                        title={isNavbarVisible ? 'Click to hide the navbar' : 'Click to show the navbar'} onClick={navbarHandler}
                    >
                        {isNavbarVisible ? <FaChevronUp /> : <FaChevronDown />}
                    </button>

                    <button
                        className="bg-custom-green p-4 rounded-full text-white hover:bg-green-600 transition-all duration-300"
                        onClick={onclickHandler}
                    >
                        <FaPlay />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Grid;

