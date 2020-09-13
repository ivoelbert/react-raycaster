import React, { ChangeEvent } from 'react';
import { ControlsSection } from './controlsSection';

export const MIN_SCENE_SCALE = 5;
export const MAX_SCENE_SCALE = 50;
export const DEFAULT_SCENE_SCALE = 20;

interface SceneScaleControlsProps {
    sceneScale: number;
    setSceneScale: React.Dispatch<React.SetStateAction<number>>;
}

export function SceneScaleControls(props: SceneScaleControlsProps): JSX.Element {
    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newValue = Number(e.target.value);
        props.setSceneScale(newValue);
    };

    return (
        <ControlsSection title="Scale">
            <div className="slider-container">
                <input
                    type="range"
                    min={String(MIN_SCENE_SCALE)}
                    max={String(MAX_SCENE_SCALE)}
                    value={props.sceneScale}
                    onChange={onChange}
                />
            </div>
        </ControlsSection>
    );
}
