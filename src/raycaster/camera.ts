import { Point } from './point';
import { Bar } from './bar';
import { RayCaster, Intersection } from './raycaster';
import { Scene } from './scene';
import { mapLinear, createArray, degToRad } from './utils';
import { Projection } from './projection';

export class Camera {
    private pos: Point;
    private angle: number;

    constructor(private resolution: number, private fov: number, private projection: Projection) {
        this.pos = new Point(0, 0);
        this.angle = 0;
    }

    setProjection(projection: Projection): void {
        this.projection = projection;
    }

    setFov(newFov: number): void {
        this.fov = newFov;
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

    render(scene: Scene): Bar[] {
        const raycaster = new RayCaster(this.pos);

        const minAng = -this.fov * 0.5;
        const maxAng = this.fov * 0.5;
        const heightMultiplier = mapLinear(this.fov, degToRad(50), degToRad(100), 2, 1);

        return createArray(this.resolution, (idx) => {
            const ang = mapLinear(idx, 0, this.resolution - 1, minAng, maxAng);

            const intersections = scene.traverse((boundary) => {
                return raycaster.castAtAngle(this.angle + ang, boundary);
            });

            const nonNilIntersections = intersections.filter(
                (intersection) => intersection !== null
            ) as Intersection[];

            if (nonNilIntersections.length === 0) {
                return new Bar(0.5, '#000000');
            }

            const closest = closestIntersection(nonNilIntersections);
            const height = heightMultiplier * this.projection(closest.distance, ang);

            return new Bar(height, closest.boundary.color);
        });
    }
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
