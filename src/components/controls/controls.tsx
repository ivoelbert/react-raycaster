import React from 'react';
import { ProjectionControls } from './projectionControls';
import { FovControls } from './fovControls';

import './controls.css';

export function Controls(): JSX.Element {
    return (
        <div className="controls-container">
            <ProjectionControls />
            <FovControls />
        </div>
    );
}
