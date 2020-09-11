import React, { useState } from 'react';
import { Screen } from './screen';
import { Controls } from './controls/controls';

import './screenWithControls.css';

interface ScreenWithControlsProps {
    children: React.ReactNode;
}

export function ScreenWithControls(props: ScreenWithControlsProps): JSX.Element {
    const [isScreenOn, setIsScreenOn] = useState<boolean>(true);

    const toggleScreen = () => {
        setIsScreenOn((isOn) => !isOn);
    };

    return (
        <div className="screen-frame">
            <Screen isOn={isScreenOn}>{props.children}</Screen>
            <Controls isScreenOn={isScreenOn} toggleScreen={toggleScreen} />
        </div>
    );
}
