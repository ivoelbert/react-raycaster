import React from 'react';
import { ProjectionControls } from './projectionControls';
import { FovControls } from './fovControls';
import { ScreenSwitch } from './screenSwitch';

import './controls.css';

interface ControlsProps {
    isScreenOn: boolean;
    toggleScreen(): void;
}

export function Controls(props: ControlsProps): JSX.Element {
    return (
        <div className="controls-container">
            <ScreenSwitch isScreenOn={props.isScreenOn} toggleScreen={props.toggleScreen} />
            <ProjectionControls />
            <FovControls />
        </div>
    );
}
