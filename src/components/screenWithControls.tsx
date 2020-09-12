import React, { useState } from 'react';
import { Screen } from './screen';
import { Controls } from './controls/controls';
import { GameComponent } from '../raycaster/renderer';
import { DEFAULT_RESOLUTION } from './controls/resolutionControls';

import './screenWithControls.css';

export function ScreenWithControls(): JSX.Element {
    const [isScreenOn, setIsScreenOn] = useState<boolean>(true);
    const [resolution, setResolution] = useState<number>(DEFAULT_RESOLUTION);

    const toggleScreen = () => {
        setIsScreenOn((isOn) => !isOn);
    };

    return (
        <div className="screen-frame">
            <Screen isOn={isScreenOn}>
                <GameComponent resolution={resolution} />
            </Screen>
            <Controls
                isScreenOn={isScreenOn}
                toggleScreen={toggleScreen}
                resolution={resolution}
                setResolution={setResolution}
            />
        </div>
    );
}
