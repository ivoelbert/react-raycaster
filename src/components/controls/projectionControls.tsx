import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { CORRECTED_PROJECTION, FISHEYE_PROJECTION, Projection } from '../../raycaster/projection';
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

enum ProjectionNames {
    fisheye = 'fisheye',
    corrected = 'corrected',
}

type ProjectionByName = Record<ProjectionNames, Projection>;

const PROJECTIONS_BY_NAME: ProjectionByName = {
    [ProjectionNames.fisheye]: FISHEYE_PROJECTION,
    [ProjectionNames.corrected]: CORRECTED_PROJECTION,
};

function ProjectionToggleButton(): JSX.Element {
    const [projection, setProjection] = useState<ProjectionNames>(ProjectionNames.corrected);
    const game = useGame();

    const toggleProjection = () => {
        if (projection === ProjectionNames.corrected) {
            setProjection(ProjectionNames.fisheye);
            game.setProjection(PROJECTIONS_BY_NAME[ProjectionNames.fisheye]);
        } else {
            setProjection(ProjectionNames.corrected);
            game.setProjection(PROJECTIONS_BY_NAME[ProjectionNames.corrected]);
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
