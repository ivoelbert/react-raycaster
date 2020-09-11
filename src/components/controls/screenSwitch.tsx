import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties } from 'react';
import { ControlsSection } from './controlsSection';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

interface ScreenSwitchProps {
    isScreenOn: boolean;
    toggleScreen(): void;
}

export function ScreenSwitch(props: ScreenSwitchProps): JSX.Element {
    return (
        <ControlsSection title="screen">
            <button className="control-toggle" onClick={props.toggleScreen}>
                <ScreenSwitchIcon isScreenOn={props.isScreenOn} />
            </button>
        </ControlsSection>
    );
}

interface ScreenSwitchIconProps {
    isScreenOn: boolean;
}

function ScreenSwitchIcon(props: ScreenSwitchIconProps): JSX.Element {
    const style: CSSProperties = {
        color: props.isScreenOn ? '#2b2b2b' : '#afafaf',
    };

    return <FontAwesomeIcon style={style} icon={faPowerOff} />;
}
