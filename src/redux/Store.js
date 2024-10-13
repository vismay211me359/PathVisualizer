import { configureStore } from '@reduxjs/toolkit';
import pathfinderReducer from "../context/PathfinderSlice"

export const store = configureStore({
  reducer: {
    pathfinder: pathfinderReducer,
  },
});