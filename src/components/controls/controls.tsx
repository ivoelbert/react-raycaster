import React from 'react';
import { ProjectionControls } from './projectionControls';
import { FovControls } from './fovControls';
import { ScreenSwitch } from './screenSwitch';
import { ResolutionControls } from './resolutionControls';

import './controls.css';
import { SceneScaleControls } from './sceneScaleControls';

interface ControlsProps {
    isInGame: boolean;
    resolution: number;
    sceneScale: number;
    toggleScreen(): void;
    setResolution: React.Dispatch<React.SetStateAction<number>>;
    setSceneScale: React.Dispatch<React.SetStateAction<number>>;
}

export function Controls(props: ControlsProps): JSX.Element {
    return (
        <div className="controls-container">
            <ScreenSwitch isInGame={props.isInGame} toggleScreen={props.toggleScreen} />
            <EitherGameOrViewerControls
                isInGame={props.isInGame}
                resolution={props.resolution}
                setResolution={props.setResolution}
                sceneScale={props.sceneScale}
                setSceneScale={props.setSceneScale}
            />
        </div>
    );
}

interface EitherGameOrViewerControlsProps {
    isInGame: boolean;
    resolution: number;
    sceneScale: number;
    setResolution: React.Dispatch<React.SetStateAction<number>>;
    setSceneScale: React.Dispatch<React.SetStateAction<number>>;
}

function EitherGameOrViewerControls(props: EitherGameOrViewerControlsProps): JSX.Element {
    if (props.isInGame) {
        return <GameControls resolution={props.resolution} setResolution={props.setResolution} />;
    } else {
        return <ViewerControls sceneScale={props.sceneScale} setSceneScale={props.setSceneScale} />;
    }
}

interface GameControlsProps {
    resolution: number;
    setResolution: React.Dispatch<React.SetStateAction<number>>;
}

function GameControls(props: GameControlsProps): JSX.Element {
    return (
        <>
            <ProjectionControls />
            <FovControls />
            <ResolutionControls resolution={props.resolution} setResolution={props.setResolution} />
        </>
    );
}

interface ViewerControlsProps {
    sceneScale: number;
    setSceneScale: React.Dispatch<React.SetStateAction<number>>;
}

function ViewerControls(props: ViewerControlsProps): JSX.Element {
    return (
        <>
            <SceneScaleControls sceneScale={props.sceneScale} setSceneScale={props.setSceneScale} />
        </>
    );
}
