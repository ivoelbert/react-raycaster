import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ProjectionNames } from '../../raycaster/projection';
import { assertUnreachable } from '../../raycaster/utils';
import { ControlsSection } from './controlsSection';
import { faCubes, faFish } from '@fortawesome/free-solid-svg-icons';
import { useGame } from '../../raycaster/gameContext';

export function ProjectionControls(): JSX.Element {
    return (
        <ControlsSection title="projection">
            <ProjectionToggleButton />
        </ControlsSection>
    );
}

function ProjectionToggleButton(): JSX.Element {
    const game = useGame();
    const [projection, setProjection] = useState<ProjectionNames>(game.projection);

    const toggleProjection = () => {
        if (projection === ProjectionNames.corrected) {
            setProjection(ProjectionNames.fisheye);
            game.setProjection(ProjectionNames.fisheye);
        } else {
            setProjection(ProjectionNames.corrected);
            game.setProjection(ProjectionNames.corrected);
        }
    };

    return (
        <div className="control-toggle-container">
            <button className="control-toggle" onClick={toggleProjection}>
                <ProjectionIcon projection={projection} />
            </button>
        </div>
    );
}

interface ProjectionIconProps {
    projection: ProjectionNames;
}

function ProjectionIcon(props: ProjectionIconProps): JSX.Element {
    switch (props.projection) {
        case ProjectionNames.fisheye:
            return <FontAwesomeIcon icon={faFish} />;

        case ProjectionNames.corrected:
            return <FontAwesomeIcon icon={faCubes} />;

        default:
            assertUnreachable('Invalid projection', props.projection);
    }
}
