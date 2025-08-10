import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Drawing } from '../Types/Drawing';
import { RootState } from './Store';

interface DrawingsState {
  drawings: Drawing[];
  selectedIndex: number;
}

const initialState: DrawingsState = {
  drawings: [],
  selectedIndex: 0,
};

const drawingsSlice = createSlice({
  name: 'drawings',
  initialState,
  reducers: {
    setDrawings(state, action: PayloadAction<Drawing[]>) {
      state.drawings = action.payload;
    },
    setSelectedIndex(state, action: PayloadAction<number>) {
      state.selectedIndex = action.payload;
    },
    addDrawing(state, action: PayloadAction<Drawing>) {
      state.drawings.push(action.payload);
      state.selectedIndex = state.drawings.length - 1;
      
    },
    updateCurrentDrawing(state, action: PayloadAction<Drawing>) {
      state.drawings[state.selectedIndex] = action.payload;
    },
    updateCurrentCommands(state, action: PayloadAction<Drawing['commands']>) {
      if (state.drawings[state.selectedIndex]) {
        state.drawings[state.selectedIndex].commands = action.payload;
      }
    },
    updateCurrentMessages(state, action: PayloadAction<Drawing['messages']>) {
      state.drawings[state.selectedIndex].messages = action.payload;
    },
  },
});

export const {
  setDrawings,
  setSelectedIndex,
  addDrawing,
  updateCurrentDrawing,
  updateCurrentCommands,
  updateCurrentMessages,
} = drawingsSlice.actions;

export default drawingsSlice.reducer;

export const selectDrawings = (state: RootState) => state.drawings.drawings;

export const selectSelectedIndex = (state: RootState) => state.drawings.selectedIndex;
export const selectCurrentDrawing = (state: RootState) =>
  state.drawings.drawings[state.drawings.selectedIndex];
export const selectCurrentCommands = (state: RootState) =>
  state.drawings.drawings[state.drawings.selectedIndex]?.commands || [];
export const selectCurrentMessages = (state: RootState) =>
  state.drawings.drawings[state.drawings.selectedIndex]?.messages || [];
