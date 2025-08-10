import { shapeDefinitions } from "../Config/ShapeDefinition";
import { DrawingCommand } from "../Types/DrawingCommand";

export function transformModelShapesToKonvaFormat(modelShapes: any[]): DrawingCommand[] {
  if (!Array.isArray(modelShapes)) return [];

  return modelShapes
    .map(shape => {
      if (shape.type === 'delete') return { id: shape.id, type: 'delete' };
      const key = shape.type as keyof typeof shapeDefinitions;
      const def = shapeDefinitions[key];
      if (!def) return null;

      return {
        id: shape.id,
        type: shape.type,
        ...def.defaults,
        ...shape
      };
    })
    .filter(Boolean) as DrawingCommand[];
}
