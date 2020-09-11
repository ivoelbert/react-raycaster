import React, { ChangeEvent, useState } from 'react';
import { DEFAULT_FOV, MAX_FOV, MIN_FOV } from '../../raycaster/camera';
import { useGame } from '../../raycaster/gameContext';
import { ControlsSection } from './controlsSection';

export function FovControls(): JSX.Element {
    const [value, setValue] = useState<number>(DEFAULT_FOV);
    const game = useGame();

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newValue = Number(e.target.value);
        setValue(newValue);
        game.setFov(newValue);
    };

    return (
        <ControlsSection title="FOV">
            <div className="fov-slider-container">
                <input
                    type="range"
                    min={String(MIN_FOV)}
                    max={String(MAX_FOV)}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </ControlsSection>
    );
}
