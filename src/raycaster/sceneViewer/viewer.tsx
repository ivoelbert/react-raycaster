import React, { CSSProperties } from 'react';
import { useGame } from '../gameContext';
import { Point } from '../point';
import { degToRad } from '../utils';
import { Vector } from '../vector';

import './viewer.css';

interface SceneViewerProps {
    sceneScale: number;
}

export function SceneViewer(props: SceneViewerProps): JSX.Element {
    const scale = props.sceneScale;

    return (
        <div className="scene-container">
            <Walls scale={scale} />
            <Player scale={scale} />
        </div>
    );
}

interface WallsProps {
    scale: number;
}

function Walls(props: WallsProps): JSX.Element {
    const { scene } = useGame();

    const divs = scene.traverseBoundaries((boundary, idx) => {
        const [length, angle] = Vector.fromBoundary(boundary).toPolar();

        return (
            <BoundaryDiv
                key={idx}
                position={boundary.a}
                scale={props.scale}
                length={length}
                angle={angle}
                color={boundary.color}
            />
        );
    });

    return <>{divs}</>;
}

interface PlayerProps {
    scale: number;
}

const FOV_VIEW_LENGTH = 5;

function Player(props: PlayerProps): JSX.Element {
    const game = useGame();
    const { position, angle } = game.playerInfo;
    const fov = degToRad(game.fov);
    const { scale } = props;

    return (
        <>
            <BoundaryDiv
                position={position}
                scale={scale}
                length={0.1}
                angle={angle + Math.PI * 0.5}
                color="#fafafa"
            />
            <BoundaryDiv
                position={position}
                scale={scale}
                length={0.1}
                angle={angle - Math.PI * 0.5}
                color="#fafafa"
            />
            <BoundaryDiv
                position={position}
                scale={scale}
                length={0.5}
                angle={angle}
                color="#fafafa"
            />
            <BoundaryDiv
                position={position}
                scale={scale}
                length={FOV_VIEW_LENGTH}
                angle={angle + fov * 0.5}
                color="#4f4f4f"
            />
            <BoundaryDiv
                position={position}
                scale={scale}
                length={FOV_VIEW_LENGTH}
                angle={angle - fov * 0.5}
                color="#4f4f4f"
            />
        </>
    );
}

interface BoundaryDivProps {
    position: Point;
    scale: number;
    length: number;
    angle: number;
    color: string;
}

function BoundaryDiv(props: BoundaryDivProps): JSX.Element {
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
