import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

type Props = { onSend: (text: string) => void; disabled?: boolean };

export const MessageInput=({ onSend, disabled }: Props)=> {
  const [text, setText] = useState('');

  const send = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <Box display="flex" p={2} borderTop="1px solid #ccc">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="כתוב בקשה לציור..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && send()}
        disabled={disabled}
      />
      <IconButton color='success' onClick={send} disabled={disabled}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}
