import { mapLinear } from './utils';

/**
 * Projections take a distance to a wall, the angle from the POV, and return the height of the associated bar
 */
export type Projection = (distance: number, angle: number) => number;

export const FISHEYE_PROJECTION: Projection = (distance, angle) => {
    const inverseDistance = 1 / (distance + 1);
    const mappedHeight = mapLinear(inverseDistance, 0, 1, 0, 1000);
    return mappedHeight;
};

export const CORRECTED_PROJECTION: Projection = (distance, angle) => {
    return 1 / (distance + 1);
};
