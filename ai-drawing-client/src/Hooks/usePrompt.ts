import { useCallback } from 'react';
import { Message } from '../Types/Message';
import { DrawingCommand } from '../Types/DrawingCommand';
import { generateDrawingCommands } from '../api/promptApi';

type UsePromptHandlerProps = {
  drawingId: string;
  currentCommands: DrawingCommand[];
  currentMessages: Message[];
  canvasWidth: number;
  canvasHeight: number;
  messageIdCounter: number;
  updateCurrentDrawing: (commands: DrawingCommand[], messages?: Message[]) => void;
  pushHistory: (commands: DrawingCommand[]) => void;
  setMessageIdCounter: React.Dispatch<React.SetStateAction<number>>;
};

export const usePromptHandler = ({
  drawingId,
  currentCommands,
  currentMessages,
  canvasWidth,
  canvasHeight,
  messageIdCounter,
  updateCurrentDrawing,
  pushHistory,
  setMessageIdCounter,
}: UsePromptHandlerProps) => {
  const handleSend = useCallback(
    async (text: string) => {
      const newUserMsg: Message = { id: messageIdCounter, text, sender: 'user', drawingId };
      const newMessages = [...currentMessages, newUserMsg];
      updateCurrentDrawing(currentCommands, newMessages);
      setMessageIdCounter(prev => prev + 1);

      try {
        const commandsFromModel = await generateDrawingCommands(
          text,
          currentCommands,
          canvasWidth,
          canvasHeight
        );

        const updatedCommands = [...currentCommands];

        commandsFromModel?.forEach(cmd => {
          const index = updatedCommands.findIndex(c => c.id === cmd.id);
          if (cmd.type === 'delete') {
            if (index !== -1) updatedCommands.splice(index, 1);
          } else {
            if (index !== -1) updatedCommands[index] = { ...updatedCommands[index], ...cmd };
            else updatedCommands.push(cmd);
          }
        });

        const aiMsg: Message = {
          id: messageIdCounter + 1,
          text: 'הציור עודכן בהצלחה.',
          sender: 'ai',
          drawingId,
        };

        setMessageIdCounter(prev => prev + 1);
        pushHistory(updatedCommands);
        updateCurrentDrawing(updatedCommands, [...newMessages, aiMsg]);

      } catch (err) {
        const errorMsg: Message = {
          id: messageIdCounter + 1,
          text: `שגיאה ביצירת ציור: ${err instanceof Error ? err.message : String(err)}.`,
          sender: 'ai',
          drawingId,
        };
        setMessageIdCounter(prev => prev + 1);
        updateCurrentDrawing(currentCommands, [...newMessages, errorMsg]);
      }
    },
    [
      drawingId,
      currentCommands,
      currentMessages,
      canvasWidth,
      canvasHeight,
      messageIdCounter,
      updateCurrentDrawing,
      pushHistory,
      setMessageIdCounter,
    ]
  );

  return { handleSend };
};
