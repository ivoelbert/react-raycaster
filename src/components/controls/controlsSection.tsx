import React from 'react';

import './controlsSection.css';

interface ControlsSectionProps {
    title: string;
    children: React.ReactNode;
}

export function ControlsSection(props: ControlsSectionProps): JSX.Element {
    return (
        <div className="controls-section">
            <h4 className="controls-section-title">{props.title}</h4>
            {props.children}
        </div>
    );
}
