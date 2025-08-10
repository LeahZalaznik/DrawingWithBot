import { Box, Paper } from '@mui/material';
import { DrawingControls } from '../DrawingControl/DrawingControls';
import { ChatWindow } from '../Chat/Chat';
import Canvas from '../Canvas/Canvas';
import { useSelector } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
import './Main.css';
import { selectCurrentDrawing, setDrawings } from '../../Redux/DrawingSlice';
import { loadUserDrawings } from '../../api/drawingApi';
import { useDrawingHistory } from '../../Hooks/useHistory';

type Props = { userId: string };

export const Main = ({ userId }: Props) => {

  useEffect(() => {
    const fetchDrawings = async () => {
      try {
        const data = await loadUserDrawings(userId);
        setDrawings(data.length ? data : []);
      } catch (err) {
        alert("שגיאה בטעינת ציורים קיימים: ");
      }
    };
    fetchDrawings();
  }, [userId]);
  const drawing = useSelector(selectCurrentDrawing);
  
  useEffect(() => {
    if (drawing?.commands?.length) {
      push(drawing.commands);
    }
  }, [drawing]);
  const { current, push, undo, redo, clear } = useDrawingHistory()

  const [canvasDimensions, setCanvasDimensions] = useState({ width: 800, height: 600 });

  const handleCanvasResize = useCallback((width: number, height: number) => {
    setCanvasDimensions({ width, height });
  }, []);

  return (
    <Box className="main-container">
      <DrawingControls undo={undo} redo={redo} clear={clear} userId={userId} />
      <Paper className="main-paper">
        <Box className="chat-box">
          <ChatWindow current={current} push={push} canvasDimensions={canvasDimensions} />
        </Box>
        <Box className="canvas-box">
          <Canvas shapes={current} onDimensionsChange={handleCanvasResize} />
        </Box>
      </Paper>
    </Box>
  );
};
