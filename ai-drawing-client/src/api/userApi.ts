import { Drawing } from "../Types/Drawing";

var UserUrl = `https://localhost:7252/api/User`; 

export const loginOrRegister = async (userId: string): Promise<string> => {
  const response = await fetch(`${UserUrl}/LoginOrRegister`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userId),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'שגיאה בהתחברות או ברישום');
  }

  return response.text(); 
};


