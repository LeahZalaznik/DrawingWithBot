import { Typography, Paper, Box } from '@mui/material';
import { MessageList } from '../MessageList/MessageList';
import { MessageInput } from '../MessageInput/MessageInput';
import { usePromptHandler } from '../../Hooks/usePrompt';
import { useDispatch, useSelector } from 'react-redux';
import { useDrawingHistory } from '../../Hooks/useHistory';
import './Chat.css';
import { Drawing } from '../../Types/Drawing';
import { DrawingCommand } from '../../Types/DrawingCommand';
import { selectCurrentCommands, selectCurrentDrawing, selectCurrentMessages, updateCurrentCommands, updateCurrentMessages } from '../../Redux/DrawingSlice';
import { Message } from '../../Types/Message';
import { useState } from 'react';

type Props = {
  canvasDimensions: { width: number, height: number },
  current:DrawingCommand[]
  push: (commands: DrawingCommand[]) => void
};

export const ChatWindow = ({ canvasDimensions, push ,current}: Props) => {
  const currentDrawing = useSelector(selectCurrentDrawing);
  const currentMessages = useSelector(selectCurrentMessages);

  const dispatch = useDispatch();
  const [messageIdCounter, setMessageIdCounter] = useState(1);

  const updateCurrentDrawing = (commands: DrawingCommand[], messages?: Message[]) => {
    if (!currentDrawing) return;
    dispatch(updateCurrentCommands(commands ?? currentDrawing.commands));
    dispatch(updateCurrentMessages(messages ?? currentDrawing.messages));
  };

  const { handleSend } = usePromptHandler({
    drawingId: currentDrawing?.id || '',
    currentCommands:current,
    currentMessages,
    canvasWidth: canvasDimensions.width,
    canvasHeight: canvasDimensions.height,
    updateCurrentDrawing,
    pushHistory: push,
    messageIdCounter,
    setMessageIdCounter,
  });

  return (
    <Paper className="chat-window">
      <Typography variant="h6" className="chat-header">💬 הצ'אט שלך עם הבוט</Typography>
      <Box className="chat-messages">
        <MessageList messages={currentMessages} />
      </Box>
      <MessageInput onSend={handleSend} disabled={false} />
    </Paper>
  );
};
