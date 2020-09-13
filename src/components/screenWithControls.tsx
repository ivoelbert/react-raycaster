import React, { useState } from 'react';
import { Screen } from './screen';
import { Controls } from './controls/controls';
import { DEFAULT_RESOLUTION } from './controls/resolutionControls';
import { DEFAULT_SCENE_SCALE } from './controls/sceneScaleControls';

import './screenWithControls.css';

export function ScreenWithControls(): JSX.Element {
    const [isInGame, setIsInGame] = useState<boolean>(true);
    const [resolution, setResolution] = useState<number>(DEFAULT_RESOLUTION);
    const [sceneScale, setSceneScale] = useState<number>(DEFAULT_SCENE_SCALE);

    const toggleScreen = () => {
        setIsInGame((inGame) => !inGame);
    };

    return (
        <div className="screen-frame">
            <Screen isInGame={isInGame} resolution={resolution} sceneScale={sceneScale} />
            <Controls
                isInGame={isInGame}
                toggleScreen={toggleScreen}
                resolution={resolution}
                setResolution={setResolution}
                sceneScale={sceneScale}
                setSceneScale={setSceneScale}
            />
        </div>
    );
}
