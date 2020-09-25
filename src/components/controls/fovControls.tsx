import React, { ChangeEvent, useState } from 'react';
import { Angle } from '../../raycaster/angle';
import { MAX_FOV, MIN_FOV } from '../../raycaster/camera';
import { useGame } from '../../raycaster/gameContext';
import { ControlsSection } from './controlsSection';

export function FovControls(): JSX.Element {
    const game = useGame();
    const [value, setValue] = useState<number>(game.fov.degrees);

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newValue = Number(e.target.value);
        setValue(newValue);
        game.setFov(Angle.fromDegrees(newValue));
    };

    return (
        <ControlsSection title="FOV">
            <div className="slider-container">
                <input
                    type="range"
                    min={String(MIN_FOV.degrees)}
                    max={String(MAX_FOV.degrees)}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </ControlsSection>
    );
}
