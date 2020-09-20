import { Point } from './point';
import { Bar } from './bar';
import { RayCaster, Intersection } from './raycaster';
import { Scene } from './scene';
import { mapLinear, createArray, degToRad, isNotNil, radToDeg } from './utils';
import { ProjectionNames, PROJECTIONS_BY_NAME } from './projection';

export const MIN_FOV = 50;
export const MAX_FOV = 120;
export const DEFAULT_FOV = 90;

const RAD_MIN_FOV = degToRad(MIN_FOV);
const RAD_MAX_FOV = degToRad(MAX_FOV);
const RAD_DEFAULT_FOV = degToRad(DEFAULT_FOV);

export class PlayerInfo {
    constructor(readonly position: Point, readonly angle: number) {}
}

export class Camera {
    private pos: Point;
    private angle: number;
    private fov: number;
    private projection: ProjectionNames;

    constructor() {
        this.pos = new Point(0, 0);
        this.angle = 0;
        this.fov = RAD_DEFAULT_FOV;
        this.projection = ProjectionNames.corrected;
    }

    getPlayerInfo(): PlayerInfo {
        return new PlayerInfo(this.pos, this.angle);
    }

    setProjection(projection: ProjectionNames): void {
        this.projection = projection;
    }

    getProjection(): ProjectionNames {
        return this.projection;
    }

    setFov(newFov: number): void {
        this.fov = degToRad(newFov);
    }

    getFov(): number {
        return radToDeg(this.fov);
    }

    move(deltaForwards: number, deltaSideways: number): void {
        const forwardsX = Math.cos(this.angle) * deltaForwards;
        const forwardsY = Math.sin(this.angle) * deltaForwards;
        const sidewaysX = Math.cos(this.angle + Math.PI * 0.5) * deltaSideways;
        const sidewaysY = Math.sin(this.angle + Math.PI * 0.5) * deltaSideways;
        this.pos.x += forwardsX + sidewaysX;
        this.pos.y += forwardsY + sidewaysY;
    }

    rotate(ang: number): void {
        this.angle += ang;
    }

    render(scene: Scene, resolution: number): Bar[] {
        const projection = PROJECTIONS_BY_NAME[this.projection];
        const raycaster = new RayCaster(this.pos);

        const minAng = -this.fov * 0.5;
        const maxAng = this.fov * 0.5;
        const heightMultiplier = getHeightMultiplier(this.fov);

        return createArray(resolution, (idx) => {
            const ang = mapLinear(idx, 0, resolution - 1, minAng, maxAng);

            const intersections = scene
                .traverseBoundaries((boundary) => {
                    return raycaster.castAtAngle(this.angle + ang, boundary);
                })
                .filter(isNotNil);

            if (intersections.length === 0) {
                return new Bar(0, '#000000');
            }

            const closest = closestIntersection(intersections);
            const height = heightMultiplier * projection(closest.distance, ang);

            return new Bar(height, closest.boundary.color);
        });
    }
}

function getHeightMultiplier(fov: number): number {
    return mapLinear(fov, RAD_MIN_FOV, RAD_MAX_FOV, 2, 1);
}

function closestIntersection(intersections: Intersection[]): Intersection {
    return intersections.reduce(
        (closest: Intersection, intersection: Intersection): Intersection => {
            if (intersection.distance < closest.distance) {
                return intersection;
            } else {
                return closest;
            }
        },
        intersections[0]
    );
}
