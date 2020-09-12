import React, { ChangeEvent } from 'react';
import { ControlsSection } from './controlsSection';

export const DEFAULT_RESOLUTION = 320;
export const MIN_RESOLUTION = 98;
export const MAX_RESOLUTION = 490;

interface ResolutionControlsProps {
    resolution: number;
    setResolution: React.Dispatch<React.SetStateAction<number>>;
}

export function ResolutionControls(props: ResolutionControlsProps): JSX.Element {
    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newValue = Number(e.target.value);
        props.setResolution(newValue);
    };

    return (
        <ControlsSection title="Resolution">
            <div className="slider-container">
                <input
                    type="range"
                    min={String(MIN_RESOLUTION)}
                    max={String(MAX_RESOLUTION)}
                    value={props.resolution}
                    onChange={onChange}
                />
            </div>
        </ControlsSection>
    );
}
