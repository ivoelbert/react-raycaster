import React from 'react';
import { Screen } from './screen';
import { Controls } from './controls/controls';

import './screenWithControls.css';

interface ScreenWithControlsProps {
    children: React.ReactNode;
}

export function ScreenWithControls(props: ScreenWithControlsProps): JSX.Element {
    return (
        <div className="screen-frame">
            <Screen>{props.children}</Screen>
            <Controls />
        </div>
    );
}
