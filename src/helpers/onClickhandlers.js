import { toast } from "react-toastify";

export const onclickHandler=async(e,toggleGraphVisualization,togglePathVisualization,pathHandlerFunction,dispatch,grid,speed,algorithm)=>{
    dispatch(toggleGraphVisualization(true));
    dispatch(togglePathVisualization(true));
    try{
        await pathHandlerFunction(grid,speed,algorithm);
        dispatch(toggleGraphVisualization(false));
    }catch(err){
        toast.error("Error!, Reload...",{autoClose:5000});
        console.log(err);
    }
}


export const clearBoardHandler=(e,dispatch,resetGrid,togglePathVisualization)=>{
    e.preventDefault();
    dispatch(resetGrid());
    dispatch(togglePathVisualization(false));
}

export const clearWallsHandler=(e,dispatch,clearWalls)=>{
    e.preventDefault();
    dispatch(clearWalls());
}

export const clearPathHandler=(e,dispatch,clearPath,togglePathVisualization)=>{
    e.preventDefault();
    dispatch(clearPath());
    dispatch(togglePathVisualization(false));
}






export const handleFormToggle = (setShowForm,showForm) => {
    setShowForm(!showForm);
};

export const resetValues = (e,rows,cols,setRows,setCols,initial_Rows,initial_Cols,toggleBorder,dispatch,changeSizeOfGrid,toggleGraphVisualization,togglePathVisualization,setShowForm,showForm) => {
    e.preventDefault();
    if(rows<=0  || cols<=0){
        setRows(initial_Rows); 
        setCols(initial_Cols);
        handleFormToggle(setShowForm,showForm);
        toast.error("Enter valid values",{autoClose:5000});
        return;
    }
    if(rows>100 || cols>100){
        toggleBorder(false);
        toast.warn("Cell Border removed",{autoClose:3000});
    }
    else{
        toggleBorder(true);
    }
    dispatch(changeSizeOfGrid({rows,cols}));
    setRows(initial_Rows); 
    setCols(initial_Cols);
    handleFormToggle(setShowForm,showForm);
    dispatch(toggleGraphVisualization(false));
    dispatch(togglePathVisualization(false));
};

export const navbarHandler = (e,toggleNavbar) => {
    e.preventDefault();
    toggleNavbar();
}

// Function to handle when mouse is pressed down on a cell
export const handleMouseDown = (rowIndex, colIndex,isGraphVisualizing,isPathVisualizing,grid,setIsDraggingStart,setIsDraggingEnd,dispatch,updateCellForWall,setIsMousePressed) => {
    if(isGraphVisualizing || isPathVisualizing){
        return;
    }
    else{
        if(grid[rowIndex][colIndex].isStart){
            setIsDraggingStart(true);
        }
        else if(grid[rowIndex][colIndex].isEnd){
            setIsDraggingEnd(true);
        }
        else{
            dispatch(updateCellForWall({row:rowIndex,col:colIndex}));
            setIsMousePressed(true);
        }
    }
};

// Function to handle when mouse is dragged over a cell
export const handleMouseEnter = (rowIndex, colIndex,isGraphVisualizing,isPathVisualizing,isDraggingStart,grid,dispatch,updateStartCell,isDraggingEnd,updateEndCell,isMousePressed,updateCellForWall) => {
    if(isGraphVisualizing || isPathVisualizing){
        return;
    }
    else{
        if(isDraggingStart  && !grid[rowIndex][colIndex].isEnd){
            dispatch(updateStartCell({row:rowIndex,col:colIndex}));
        }
        else if(isDraggingEnd  && !grid[rowIndex][colIndex].isStart){
            dispatch(updateEndCell({row:rowIndex,col:colIndex}));
        }
        else{
            if (!isGraphVisualizing && isMousePressed && !grid[rowIndex][colIndex].isStart && !grid[rowIndex][colIndex].isEnd) {
                dispatch(updateCellForWall({row:rowIndex,col:colIndex}));
            }
        }
    }
};

// Function to handle when mouse button is released
export const handleMouseUp = (setIsMousePressed,setIsDraggingEnd,setIsDraggingStart) => {
    setIsMousePressed(false);
    setIsDraggingEnd(false);
    setIsDraggingStart(false);
};