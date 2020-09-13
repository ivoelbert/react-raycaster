import React, { CSSProperties } from 'react';
import { useGame } from '../gameContext';
import { Vector } from '../vector';

import './viewer.css';

interface SceneViewerProps {
    sceneScale: number;
}

export function SceneViewer(props: SceneViewerProps): JSX.Element {
    const { scene } = useGame();
    const scale = props.sceneScale;

    const divs = scene.traverse((boundary) => {
        const [length, angle] = Vector.fromBoundary(boundary).toPolar();
        const px = boundary.a.x * scale;
        const py = boundary.a.y * scale;

        const style: CSSProperties = {
            width: `${length * scale}px`,
            transform: `translate(${px}px, ${py}px) rotate(${angle}rad)`,
            backgroundColor: boundary.color,
        };

        return <div className="scene-boundary" style={style} />;
    });

    return <div className="scene-container">{divs}</div>;
}
