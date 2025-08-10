import { configureStore } from '@reduxjs/toolkit';
import drawingReducer from './DrawingSlice';

export const store = configureStore({
  reducer: {
    drawings: drawingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
