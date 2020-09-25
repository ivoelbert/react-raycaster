import React, { useRef } from 'react';
import { useFrame } from '../gameContext';
import { checkExists } from '../utils';

interface PlayerProps {
    scale: number;
}

const FOV_LENGTH = 5;
const PLAYER_SIZE = 0.5;

export function Player(props: PlayerProps): JSX.Element {
    const { scale } = props;

    const playerRef = useRef<HTMLDivElement | null>(null);
    const fovLeftRef = useRef<HTMLDivElement | null>(null);
    const fovRightRef = useRef<HTMLDivElement | null>(null);

    useFrame((game) => {
        const player = checkExists(playerRef.current);
        const fovLeft = checkExists(fovLeftRef.current);
        const fovRight = checkExists(fovRightRef.current);

        const { fov, playerInfo } = game;
        const { position, angle } = playerInfo;
        const size = PLAYER_SIZE * scale;
        const fovx = position.x * scale;
        const fovy = position.y * scale;
        const px = fovx - size / 2;
        const py = fovy - size / 2;

        player.style.width = `${size}px`;
        player.style.height = `${size}px`;
        player.style.transform = `translate(${px}px, ${py}px)`;

        const leftAngle = angle.add(fov.multiplyScalar(0.5)).radians;
        fovLeft.style.width = `${FOV_LENGTH * scale}px`;
        fovLeft.style.transform = `translate(${fovx}px, ${fovy}px) rotate(${leftAngle}rad)`;
        fovLeft.style.backgroundColor = '#4f4f4f';

        const rightAngle = angle.add(fov.multiplyScalar(-0.5)).radians;
        fovRight.style.width = `${FOV_LENGTH * scale}px`;
        fovRight.style.transform = `translate(${fovx}px, ${fovy}px) rotate(${rightAngle}rad)`;
        fovRight.style.backgroundColor = '#4f4f4f';
    });

    return (
        <>
            <div ref={playerRef} className="player" />
            <div ref={fovLeftRef} className="scene-boundary" />
            <div ref={fovRightRef} className="scene-boundary" />
        </>
    );
}
