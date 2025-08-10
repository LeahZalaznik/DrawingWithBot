import { DrawingCommand } from "../Types/DrawingCommand";
import { transformModelShapesToKonvaFormat } from "../Services/drawingService";
import { cleanJsonFromLLM } from "../Utils/CleanJsonFromLLM";

const baseUrl = `https://localhost:7252/api/Prompt`;

export async function generateDrawingCommands(
  prompt: string,
  currentShapes: DrawingCommand[] = [],
  canvasWidth: number ,
  canvasHeight: number
): Promise<DrawingCommand[]> {
  const requestBody = {
    prompt,
    canvas: currentShapes.filter(s => s.type !== 'delete'),
    canvasWidth, 
    canvasHeight 
  };

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`שגיאה מהשרת: ${response.status} - ${errorText}`);
  }

  const raw = await response.json();
  const text = raw.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) throw new Error("לא התקבלה תשובה תקינה מה־LLM");

  const cleaned = cleanJsonFromLLM(text);

  try {
    const commands = JSON.parse(cleaned);
    return transformModelShapesToKonvaFormat(Array.isArray(commands) ? commands : [commands]);
  } catch (err) {
    console.error("שגיאה בפענוח JSON:", cleaned, err);
    throw new Error("פורמט JSON לא תקין או ריק.");
  }
}