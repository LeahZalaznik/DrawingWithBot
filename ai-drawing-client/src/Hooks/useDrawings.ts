import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserDrawings, saveDrawing } from '../api/drawingApi';
import { Drawing } from '../Types/Drawing';
import { addDrawing, selectCurrentDrawing, selectDrawings, selectSelectedIndex, setDrawings, setSelectedIndex, updateCurrentCommands, updateCurrentMessages } from '../Redux/DrawingSlice';

export const useDrawings = (userId: string) => {
  const dispatch = useDispatch();
  const drawings = useSelector(selectDrawings);
  const selectedIndex = useSelector(selectSelectedIndex);
  const currentDrawing = useSelector(selectCurrentDrawing);


  useEffect(() => {
    if (!drawings.length) {
      loadUserDrawings(userId).then((loadedDrawings) => {
        dispatch(setDrawings(loadedDrawings));
      });
    }
  }, [userId, drawings.length, dispatch]);

  const handleNewDrawing = (clear: ()=>void) => {
    const newDrawing: Drawing = {
      id: crypto.randomUUID(),
      userEmail: userId,
      prompt: '',
      title: `ציור חדש ${drawings.length + 1}`,
      commands: [],
      messages: []
    };

    dispatch(addDrawing(newDrawing));
    clear();
  };

  const handleSave = async () => {
    if (!currentDrawing) return;
    const saved = await saveDrawing(currentDrawing);
    if (saved) {
      // כאן לא חייבים לעדכן כי currentDrawing כבר ב־Redux
    }
  };

  const handleSelectDrawing = (index: number) => {
    dispatch(setSelectedIndex(index));
  };

  const updateCurrentDrawing = (commands: any[], messages?: any[]) => {
    if (!currentDrawing) return;
    dispatch(
      updateCurrentCommands(commands ?? currentDrawing.commands)
    )
       dispatch(
      updateCurrentMessages(messages ?? currentDrawing.messages)
    );
  };

  return {
    drawings,
    selectedIndex,
    currentDrawing,
    handleNewDrawing,
    handleSave,
    handleSelectDrawing,
    updateCurrentDrawing
  };
};
