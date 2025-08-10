import { useState } from 'react';
import { Paper, TextField, Button, Typography } from '@mui/material';
import { loginOrRegister } from '../../api/userApi';

type LoginProps ={
  onLogin: (userId: string) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const trimmed = input.trim();
    if (!trimmed) {
      alert('נא להזין מזהה משתמש');
      return;
    }

    setLoading(true);

    try {
      const userId = await loginOrRegister(trimmed);
      onLogin(userId);
    } catch (error: any) {
      alert('שגיאה: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, m: 'auto', maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        התחברות או רישום
      </Typography>
      <TextField
        fullWidth
        label="מזהה משתמש"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'טוען...' : 'התחבר / הירשם'}
      </Button>
    </Paper>
  );
};
