import { Point } from './point';
import { Bar } from './bar';
import { RayCaster, Intersection } from './raycaster';
import { Scene } from './scene';
import { mapLinear, createArray, isNotNil } from './utils';
import { ProjectionNames, PROJECTIONS_BY_NAME } from './projection';
import { RenderSprite } from './sprites';
import { Angle } from './angle';

export const MIN_FOV = Angle.fromDegrees(50);
export const MAX_FOV = Angle.fromDegrees(120);
export const DEFAULT_FOV = Angle.fromDegrees(90);

export class PlayerInfo {
    constructor(readonly position: Point, readonly angle: Angle) {}
}

export class Camera {
    private pos: Point;
    private angle: Angle;
    private fov: Angle;
    private projection: ProjectionNames;

    constructor() {
        this.pos = new Point(0, 0);
        this.angle = Angle.fromRadians(0);
        this.fov = DEFAULT_FOV;
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

    setFov(newFov: Angle): void {
        this.fov = newFov;
    }

    getFov(): Angle {
        return this.fov;
    }

    move(deltaForwards: number, deltaSideways: number): void {
        const forwardsX = Math.cos(this.angle.radians) * deltaForwards;
        const forwardsY = Math.sin(this.angle.radians) * deltaForwards;
        const sidewaysX = Math.cos(this.angle.radians + Math.PI * 0.5) * deltaSideways;
        const sidewaysY = Math.sin(this.angle.radians + Math.PI * 0.5) * deltaSideways;
        this.pos.x += forwardsX + sidewaysX;
        this.pos.y += forwardsY + sidewaysY;
    }

    rotate(ang: Angle): void {
        this.angle = this.angle.add(ang);
    }

    renderSprites(scene: Scene): RenderSprite[] {
        const raycaster = new RayCaster(this.pos);

        return scene.traverseEntities((entity) => {
            const angle = raycaster.castToEntity(entity);

            const minAngle = this.angle.add(this.fov.multiplyScalar(-0.5));
            const maxAngle = this.angle.add(this.fov.multiplyScalar(0.5));

            const isVisible = angle.isBetween(minAngle, maxAngle);

            return new RenderSprite(isVisible, entity.position);
        });
    }

    renderBoundaries(scene: Scene, resolution: number): Bar[] {
        const raycaster = new RayCaster(this.pos);
        const projection = PROJECTIONS_BY_NAME[this.projection];

        const minAng = -this.fov.radians * 0.5;
        const maxAng = this.fov.radians * 0.5;
        const heightMultiplier = getHeightMultiplier(this.fov);

        return createArray(resolution, (idx) => {
            const ang = mapLinear(idx, 0, resolution - 1, minAng, maxAng);

            const intersections = scene
                .traverseBoundaries((boundary) => {
                    return raycaster.castAtAngle(this.angle.radians + ang, boundary);
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

function getHeightMultiplier(fov: Angle): number {
    return mapLinear(fov.radians, MIN_FOV.radians, MAX_FOV.radians, 2, 1);
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
