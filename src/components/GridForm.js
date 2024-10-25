import React from 'react'
import { FaInfoCircle, FaExchangeAlt } from 'react-icons/fa';
import ButtonComponent from './ButtonComponent';

const GridForm = ({ rows, setRows, cols, setCols, resetValues }) => {
    return (
        <div>
            <div className="absolute left-[-270px] top-0 bg-white border border-gray-300 p-4 rounded-lg shadow-lg w-64 space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Grid Settings</h3>

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

                <ButtonComponent
                    theButtonClass="w-full py-2 bg-custom-green text-white rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
                    isDisabled={false}
                    theOnClickHandler={resetValues}
                    theContent={<><FaExchangeAlt className="inline mr-2" /> Reset</>}
                />

                {/* Disclaimer Section */}
                <div className="text-xs text-gray-500 flex items-center mt-2 flex-col">
                    <div className='flex items-center'><FaInfoCircle className="mr-2 text-blue-500" /><span>Note:</span></div>
                    <span>Enter row and column values greater than 0. For values above 100, borders will be hidden as they overpower cell colors. For optimal visualization, use values under 100.</span>
                </div>
            </div>
        </div>
    )
}

export default GridForm;
