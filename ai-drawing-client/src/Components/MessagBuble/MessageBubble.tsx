import { Box, Typography, Paper } from '@mui/material';
import { Message } from '../../Types/Message';
import './MessageBubble.css';

type Props = { message: Message };

export const MessageBubble = ({ message }: Props) => {
  const isUser = message.sender === 'user';
  const paperClass = isUser ? 'message-paper user' : 'message-paper bot';

  return (
    <Box display="flex" justifyContent={isUser ? 'flex-end' : 'flex-start'} mb={1}>
      <Paper elevation={1} className={paperClass}>
        <Typography variant="body1">{message.text}</Typography>
        {message.imageUrl && (
          <Box mt={1}>
            <img src={message.imageUrl} alt="Generated" className="message-image" />
          </Box>
        )}
      </Paper>
    </Box>
  );
};
