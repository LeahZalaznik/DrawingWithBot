import { useState, useRef, useEffect } from 'react';
import { DrawingCommand } from '../Types/DrawingCommand';
import { useSelector } from 'react-redux';
import { selectCurrentDrawing, selectSelectedIndex } from '../Redux/DrawingSlice';

export const useDrawingHistory = (
) => {
  const [history, setHistory] = useState<DrawingCommand[][]>([]);
  const [future, setFuture] = useState<DrawingCommand[][]>([]);
  const drawing = useSelector(selectCurrentDrawing)
  const index = useSelector(selectSelectedIndex)
  const [current, setCurrent] = useState<DrawingCommand[]>(drawing?.commands);
  const currentRef = useRef<DrawingCommand[]>(drawing?.commands);
  useEffect(() => {
    currentRef.current = current;
    setHistory([])
    setFuture([])
    setCurrent(drawing?.commands)
  }, [index]);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);


  const push = (commands: DrawingCommand[]) => {
    if (JSON.stringify(commands) !== JSON.stringify(currentRef.current)) {
      setHistory(prev => [...prev, currentRef.current]);
      setFuture([]);
      currentRef.current = commands;
      setCurrent(commands);
    }
  };
  const undo = () => {
    if (!history.length) return;
    const previous = history[history.length - 1];
    setFuture(prev => [currentRef.current, ...prev]);
    setHistory(prev => prev.slice(0, -1));
    currentRef.current = previous;
    setCurrent(previous);
  };

  const redo = () => {
    if (!future.length) return;
    const next = future[0];
    setHistory(prev => [...prev, currentRef.current]);
    setFuture(prev => prev.slice(1));
    currentRef.current = next;
    setCurrent(next);
  };


  const clear = () => {
      setHistory(prev => [...prev, currentRef.current]);
      setFuture([]);
    setCurrent([]);
  };

  return { current, undo, redo, push, clear };
};
