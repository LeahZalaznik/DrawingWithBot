export type DrawingCommand = {
  id: string;
  type:
    | 'circle'
    | 'rect'
    | 'line'
    | 'ellipse'
    | 'arc'
    | 'regularPolygon'
    | 'star'
    | 'text'
    | 'delete';
  x?: number;
  y?: number;
  radius?: number;
  radiusX?: number;
  radiusY?: number;
  innerRadius?: number;
  outerRadius?: number;
  angle?: number;
  rotation?: number;
  width?: number;
  height?: number;
  sides?: number;
  numPoints?: number;
  text?: string;
  fontSize?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  name?: string;
};
