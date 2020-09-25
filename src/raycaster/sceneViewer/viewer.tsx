import React from 'react';
import { Sprites } from './sprites';
import { Walls } from './wall';
import { Player } from './player';

import './viewer.css';

interface SceneViewerProps {
    sceneScale: number;
}

export function SceneViewer(props: SceneViewerProps): JSX.Element {
    const scale = props.sceneScale;

    return (
        <div className="scene-container">
            <Walls scale={scale} />
            <Sprites scale={scale} />
            <Player scale={scale} />
        </div>
    );
}
