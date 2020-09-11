import React, { ChangeEvent, useState } from 'react';
import { useGame } from '../../raycaster/gameContext';
import { ControlsSection } from './controlsSection';

export function FovControls(): JSX.Element {
    const [value, setValue] = useState<number>(75);
    const game = useGame();

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newValue = Number(e.target.value);
        setValue(newValue);
        game.setFov(newValue);
    };

    return (
        <ControlsSection title="FOV">
            <div className="fov-slider-container">
                <input type="range" min="50" max="100" value={value} onChange={onChange} />
            </div>
        </ControlsSection>
    );
}
