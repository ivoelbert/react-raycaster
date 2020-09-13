import React from 'react';
import { GameComponent } from '../raycaster/renderer';
import { SceneViewer } from '../raycaster/sceneViewer/viewer';

import './screen.css';

interface ScreenProps {
    resolution: number;
    sceneScale: number;
    isInGame: boolean;
}

export function Screen(props: ScreenProps): JSX.Element {
    if (props.isInGame) {
        return (
            <div className="screen">
                <GameComponent resolution={props.resolution} />
            </div>
        );
    } else {
        return (
            <div className="screen">
                <SceneViewer sceneScale={props.sceneScale} />
            </div>
        );
    }
}
