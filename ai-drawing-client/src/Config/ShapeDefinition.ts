import { Rect, Circle, Line, Star, RegularPolygon, Arc, Ellipse, Text } from 'react-konva';
import { DrawingCommand } from '../Types/DrawingCommand';

type ShapeType = DrawingCommand['type'];

type ShapeDefinition = {
  Component: React.ComponentType<any>;
  defaults: Partial<DrawingCommand>;
  props: (shape: DrawingCommand) => Record<string, any>;
};

function cleanValue<T>(value: T | null | undefined, defaultValue: T): T {
  return value == null ? defaultValue : value;
}

export const shapeDefinitions: Record<ShapeType, ShapeDefinition> = {
  rect: {
    Component: Rect,
    defaults: { x: 0, y: 0, fill: 'black' },
    props: (shape) => ({
      x: cleanValue(shape.x, 0),
      y: cleanValue(shape.y, 0),
      width: cleanValue(shape.width, 0),
      height: cleanValue(shape.height, 0),
      fill: cleanValue(shape.fill, 'black'),
      name: shape.name,
    }),
  },
  circle: {
    Component: Circle,
    defaults: { x: 0, y: 0, fill: 'black' },
    props: (shape) => ({
      x: cleanValue(shape.x, 0),
      y: cleanValue(shape.y, 0),
      radius: cleanValue(shape.radius, 0),
      fill: cleanValue(shape.fill, 'black'),
      name: shape.name,
    }),
  },
  line: {
    Component: Line,
    defaults: { stroke: 'black', strokeWidth: 2 },
    props: (shape) => ({
      points: [
        cleanValue(shape.x1, 0),
        cleanValue(shape.y1, 0),
        cleanValue(shape.x2, 0),
        cleanValue(shape.y2, 0),
      ],
      stroke: cleanValue(shape.stroke, 'black'),
      strokeWidth: cleanValue(shape.strokeWidth, 2),
      name: shape.name,
    }),
  },
  ellipse: {
    Component: Ellipse,
    defaults: { x: 0, y: 0, fill: 'black' },
    props: (shape) => ({
      x: cleanValue(shape.x, 0),
      y: cleanValue(shape.y, 0),
      radiusX: cleanValue(shape.radiusX, 0),
      radiusY: cleanValue(shape.radiusY, 0),
      fill: cleanValue(shape.fill, 'black'),
      name: shape.name,
    }),
  },
  arc: {
    Component: Arc,
    defaults: { x: 0, y: 0, fill: 'black', rotation: 0 },
    props: (shape) => ({
      x: shape.x ?? 0,
      y: shape.y ?? 0,
      innerRadius: shape.innerRadius ?? 0,
      outerRadius: shape.outerRadius ?? 0,
      angle: shape.angle ?? 0,
      rotation: shape.rotation ?? 0,
      fill: shape.fill ?? 'black',
      stroke: shape.stroke ?? 'black',
      strokeWidth: shape.strokeWidth ?? 1,
      name: shape.name,
    }),
  },

  regularPolygon: {
    Component: RegularPolygon,
    defaults: { x: 0, y: 0, fill: 'black' },
    props: (shape) => ({
      x: cleanValue(shape.x, 0),
      y: cleanValue(shape.y, 0),
      sides: cleanValue(shape.sides, 3),
      radius: cleanValue(shape.radius, 0),
      fill: cleanValue(shape.fill, 'black'),
      name: shape.name,
    }),
  },
  star: {
    Component: Star,
    defaults: { x: 0, y: 0, fill: 'black' },
    props: (shape) => ({
      x: cleanValue(shape.x, 0),
      y: cleanValue(shape.y, 0),
      numPoints: cleanValue(shape.numPoints, 5),
      innerRadius: cleanValue(shape.innerRadius, 0),
      outerRadius: cleanValue(shape.outerRadius, 0),
      fill: cleanValue(shape.fill, 'black'),
      name: shape.name,
    }),
  },
  text: {
    Component: Text,
    defaults: { x: 0, y: 0, fill: 'black', fontSize: 20 },
    props: (shape) => ({
      x: cleanValue(shape.x, 0),
      y: cleanValue(shape.y, 0),
      text: cleanValue(shape.text, ''),
      fontSize: cleanValue(shape.fontSize, 20),
      fill: cleanValue(shape.fill, 'black'),
      name: shape.name,
    }),
  },
  delete: {
    Component: () => null,
    defaults: {},
    props: () => ({}),
  },
};

