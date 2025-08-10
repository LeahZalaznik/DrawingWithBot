import { DrawingCommand } from '../../Types/DrawingCommand';
import { shapeDefinitions } from '../../Config/ShapeDefinition';
type props = { shape: DrawingCommand };
export const ShapeItem = ({shape }:props) => {
  if (shape.type === 'delete') return null;
  const typeKey = shape.type as keyof typeof shapeDefinitions;

  if (!(typeKey in shapeDefinitions)) return null;

  const def = shapeDefinitions[typeKey];
  const Comp = def.Component;
  return <Comp key={shape.id} {...def.props(shape)} draggable />;
};