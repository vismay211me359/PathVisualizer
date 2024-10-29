import { toast } from "react-toastify";
import { theGridState } from "../globalVariables.js/gridVariables";

export const onclickHandler = async (e, toggleGraphVisualization, togglePathVisualization, pathHandlerFunction, dispatch, speed, algorithm) => {
    dispatch(toggleGraphVisualization(true));
    dispatch(togglePathVisualization(true));
    try {
        await pathHandlerFunction(speed, algorithm);
        dispatch(toggleGraphVisualization(false));
    } catch (err) {
        toast.error("Error!, Reload...", { autoClose: 5000 });
        console.log(err);
    }
}


export const clearBoardHandler = (e, dispatch, resetGrid, togglePathVisualization) => {
    e.preventDefault();
    resetGrid();
    dispatch(togglePathVisualization(false));
}

export const clearWallsHandler = (e, clearWalls) => {
    e.preventDefault();
    clearWalls();
}

export const clearPathHandler = (e, dispatch, clearPath, togglePathVisualization) => {
    e.preventDefault();
    clearPath();
    dispatch(togglePathVisualization(false));
}






export const handleFormToggle = (setShowForm, showForm) => {
    setShowForm(!showForm);
};

export const resetValues = (e, rows, cols, setRows, setCols, initial_Rows, initial_Cols, toggleBorder, dispatch, changeSizeOfGrid, toggleGraphVisualization, togglePathVisualization, setShowForm, showForm) => {
    e.preventDefault();
    if (rows <= 0 || cols <= 0) {
        setRows(initial_Rows);
        setCols(initial_Cols);
        handleFormToggle(setShowForm, showForm);
        toast.error("Enter valid values", { autoClose: 5000 });
        return;
    }
    if (rows > 100 || cols > 100) {
        toggleBorder(false);
        toast.warn("Cell Border removed", { autoClose: 3000 });
    }
    else {
        toggleBorder(true);
    }
    changeSizeOfGrid(rows, cols);
    setRows(initial_Rows);
    setCols(initial_Cols);
    handleFormToggle(setShowForm, showForm);
    dispatch(toggleGraphVisualization(false));
    dispatch(togglePathVisualization(false));
};

export const navbarHandler = (e, toggleNavbar) => {
    e.preventDefault();
    toggleNavbar();
}

// Function to handle when mouse is pressed down on a cell
export const handleMouseDown = (rowIndex, colIndex, isGraphVisualizing, isPathVisualizing, setIsDraggingStart, setIsDraggingEnd, updateCellForWall, setIsMousePressed) => {
    if (isGraphVisualizing || isPathVisualizing) {
        return;
    }
    else {
        if (theGridState.grid[rowIndex][colIndex].isStart) {
            setIsDraggingStart(true);
        }
        else if (theGridState.grid[rowIndex][colIndex].isEnd) {
            setIsDraggingEnd(true);
        }
        else {
            updateCellForWall(rowIndex, colIndex);
            setIsMousePressed(true);
        }
    }
};

// Function to handle when mouse is dragged over a cell
export const handleMouseEnter = (rowIndex, colIndex, isGraphVisualizing, isPathVisualizing, isDraggingStart, updateStartCell, isDraggingEnd, updateEndCell, isMousePressed, updateCellForWall) => {
    if (isGraphVisualizing || isPathVisualizing) {
        return;
    }
    else {
        if (isDraggingStart && !theGridState.grid[rowIndex][colIndex].isEnd) {
            updateStartCell(rowIndex, colIndex);
        }
        else if (isDraggingEnd && !theGridState.grid[rowIndex][colIndex].isStart) {
            updateEndCell(rowIndex, colIndex);
        }
        else {
            if (!isGraphVisualizing && isMousePressed && !theGridState.grid[rowIndex][colIndex].isStart && !theGridState.grid[rowIndex][colIndex].isEnd) {
                updateCellForWall(rowIndex, colIndex);
            }
        }
    }
};

// Function to handle when mouse button is released
export const handleMouseUp = (setIsMousePressed, setIsDraggingEnd, setIsDraggingStart) => {
    setIsMousePressed(false);
    setIsDraggingEnd(false);
    setIsDraggingStart(false);
};