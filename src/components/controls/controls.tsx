import React from 'react';
import { ProjectionControls } from './projectionControls';
import { FovControls } from './fovControls';
import { ScreenSwitch } from './screenSwitch';

import './controls.css';
import { ResolutionControls } from './resolutionControls';

interface ControlsProps {
    isScreenOn: boolean;
    resolution: number;
    toggleScreen(): void;
    setResolution: React.Dispatch<React.SetStateAction<number>>;
}

export function Controls(props: ControlsProps): JSX.Element {
    return (
        <div className="controls-container">
            <ScreenSwitch isScreenOn={props.isScreenOn} toggleScreen={props.toggleScreen} />
            <ProjectionControls />
            <FovControls />
            <ResolutionControls resolution={props.resolution} setResolution={props.setResolution} />
        </div>
    );
}
