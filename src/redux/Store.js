import { configureStore } from '@reduxjs/toolkit';
import gridsReducer from "../context/GridsSlice"
import settingsReducer from "../context/SettingsSlice";
import visualizeReducer from "../context/VisualizeSlice";

export const store = configureStore({
  reducer: {
    settings:settingsReducer,
    gridslice:gridsReducer,
    visualization:visualizeReducer,
  },
});