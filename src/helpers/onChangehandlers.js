import { toast } from "react-toastify";

export const selectMazeonchange=async(e,dispatch,toggleGraphVisualization,setMaze,mazeHandlerFunction,speed)=>{
    dispatch(toggleGraphVisualization(true));
    dispatch(setMaze(e.target.value))
    try{
        await mazeHandlerFunction(speed,e.target.value);
        dispatch(toggleGraphVisualization(false));
    }catch(err){
        toast.error("Error!, Reload...",{autoClose:5000});
        console.log(err);
    }
}

export const selectAlgorithmonchange=async(e,dispatch,setAlgorithm)=>{
    dispatch(setAlgorithm(e.target.value))
}

export const selectSpeedonchange=async(e,dispatch,setSpeed)=>{
    dispatch(setSpeed(e.target.value))
}