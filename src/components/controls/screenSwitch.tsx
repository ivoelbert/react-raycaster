import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ControlsSection } from './controlsSection';
import { faGhost, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';

interface ScreenSwitchProps {
    isInGame: boolean;
    toggleScreen(): void;
}

export function ScreenSwitch(props: ScreenSwitchProps): JSX.Element {
    const icon = props.isInGame ? faGhost : faGlobeAmericas;

    return (
        <ControlsSection title="screen">
            <button className="control-toggle" onClick={props.toggleScreen}>
                <FontAwesomeIcon icon={icon} />
            </button>
        </ControlsSection>
    );
}
