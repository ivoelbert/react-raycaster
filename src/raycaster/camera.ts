import { Point } from './point';
import { Bar } from './bar';
import { RayCaster, Intersection } from './raycaster';
import { Scene } from './scene';
import { mapLinear, createArray } from './utils';

export class Camera {
    private pos: Point;
    private angle: number;

    constructor(private resolution: number, private fov: number) {
        this.pos = new Point(0, 0);
        this.angle = 0;
    }

    move(movement: Point): void {
        this.pos.x += movement.x;
        this.pos.y += movement.y;
    }

    rotate(ang: number): void {
        this.angle += ang;
    }

    render(scene: Scene): Bar[] {
        const raycaster = new RayCaster(this.pos);

        const minAng = this.angle - this.fov * 0.5;
        const maxAng = this.angle + this.fov * 0.5;

        return createArray(this.resolution, (idx) => {
            const ang = mapLinear(idx, 0, this.resolution - 1, minAng, maxAng);

            const intersections = scene.traverse((boundary) => {
                return raycaster.castAtAngle(ang, boundary);
            });

            const nonNilIntersections = intersections.filter(
                (intersection) => intersection !== null
            ) as Intersection[];

            if (nonNilIntersections.length === 0) {
                return new Bar(0.5, '#000000');
            }

            const closest = closestIntersection(nonNilIntersections);
            const height = 1 / (closest.distance + 1);

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
