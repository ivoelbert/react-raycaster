import React, { CSSProperties } from 'react';
import { Point } from '../point';

interface BoundaryDivProps {
    position: Point;
    scale: number;
    length: number;
    angle: number;
    color: string;
}

export function BoundaryDiv(props: BoundaryDivProps): JSX.Element {
    const { scale, length, position, angle, color } = props;

    const px = position.x * scale;
    const py = position.y * scale;

    const style: CSSProperties = {
        width: `${length * scale}px`,
        transform: `translate(${px}px, ${py}px) rotate(${angle}rad)`,
        backgroundColor: color,
    };

    return <div className="scene-boundary" style={style} />;
}
