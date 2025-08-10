import { DrawingCommand } from "./DrawingCommand";
import { Message } from "./Message";

export type Drawing = {
  id:string
  userEmail: string,
  title: string,
  prompt: string,
  commands: DrawingCommand[];
  messages:Message[]
};
