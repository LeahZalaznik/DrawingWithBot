import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import { DrawingCommand } from '../../Types/DrawingCommand';
import './Canvas.css';
import { ShapeItem } from '../ShapeItem/ShapeItem';
import { useSelector } from 'react-redux';
import { selectCurrentCommands } from '../../Redux/DrawingSlice';

type Props = {
  onDimensionsChange?: (width: number, height: number) => void;
  shapes: DrawingCommand[];
};

export const Canvas = ({ onDimensionsChange, shapes }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth;
        const newHeight = containerRef.current.offsetHeight;

        if (newWidth !== dimensions.width || newHeight !== dimensions.height) {
          setDimensions({
            width: newWidth,
            height: newHeight,
          });

          if (onDimensionsChange) {
            onDimensionsChange(newWidth, newHeight);
          }
        }
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [dimensions, onDimensionsChange]);


  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        className="canvas-stage"
      >
        <Layer>
          {shapes?.map((shape: any) => (
            <ShapeItem key={shape.id} shape={shape} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;