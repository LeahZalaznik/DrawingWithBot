import { useState } from 'react';
import { Main } from '../Main/Main';
import { Login } from '../Login/Login';

export const MainApp = () => {
  const [userId, setUserId] = useState<string | null>(null);

  if (!userId) {
    return <Login onLogin={(id) => setUserId(id)} />;
  }

  return <Main userId={userId} />;
};
