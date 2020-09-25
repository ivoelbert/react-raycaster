import React from 'react';
import { useGame } from '../gameContext';
import { Vector } from '../vector';
import { BoundaryDiv } from './boundaryDiv';

interface WallsProps {
    scale: number;
}

export function Walls(props: WallsProps): JSX.Element {
    const { scene } = useGame();

    const divs = scene.traverseBoundaries((boundary, idx) => {
        const [length, angle] = Vector.fromBoundary(boundary).toPolar();

        return (
            <BoundaryDiv
                key={idx}
                position={boundary.a}
                scale={props.scale}
                length={length}
                angle={angle.radians}
                color={boundary.color}
            />
        );
    });

    return <>{divs}</>;
}
