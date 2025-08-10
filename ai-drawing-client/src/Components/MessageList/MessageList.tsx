import { Message } from '../../Types/Message';
import { Box } from '@mui/material';
import './MessageList.css';
import { MessageBubble } from '../MessagBuble/MessageBubble';

type Props = { messages: Message[] };

export const MessageList = ({ messages }: Props) => {
  return (
    <Box className="message-list">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </Box>
  );
};
