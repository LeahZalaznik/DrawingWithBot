import { Drawing } from "../Types/Drawing";
var UrlDrawing = `https://localhost:7252/api/Drawing`;

export const  saveDrawing= async(shapes: Drawing)=> {
    console.log(shapes);
    
  const response = await fetch(`${UrlDrawing}/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shapes),
  });

  if (!response.ok) throw new Error("שגיאה בשמירה");

  const result = await response.json();
  return result.id;
}
export const loadUserDrawings = async (userId: string): Promise<Drawing[]> => {
  const response = await fetch(`${UrlDrawing}/user/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) throw new Error("שגיאה בטעינת ציורים");

  const data = await response.json();
  console.log(data);
  
  return data;
};
export const loadDrawingById= async (id: string): Promise<Drawing>=> {
  const response = await fetch(`${UrlDrawing}/${id}`);
  if (!response.ok) throw new Error("לא נמצא ציור");

  const data = await response.json();
  console.log(data);
  
  return {
    id:data.id,
    userEmail: data.email,
    title: data.title || `ציור נטען`,
    prompt: data.prompt,
    commands: data.commands || [],
    messages:data.messages||[]
  };
}
