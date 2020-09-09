import { Boundary } from './boundary';
import { Point } from './point';

// Based on https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

// From this point onwards we consider a ray fully parallel to a boundary.
const PARALLEL_EPSILON = 0.0001;

export class RayCaster {
    constructor(private pos: Point) {}

    castAtAngle(angle: number, boundary: Boundary): Intersection | null {
        const dirX = Math.cos(angle);
        const dirY = Math.sin(angle);

        const x1 = boundary.a.x;
        const y1 = boundary.a.y;
        const x2 = boundary.b.x;
        const y2 = boundary.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + dirX;
        const y4 = this.pos.y + dirY;

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (denominator < PARALLEL_EPSILON) {
            return null;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

        if (t > 0 && t < 1 && u > 0) {
            const intersectionX = x1 + t * (x2 - x1);
            const intersectionY = y1 + t * (y2 - y1);
            const intersectionPoint = new Point(intersectionX, intersectionY);
            const distance = this.pos.distanceTo(intersectionPoint);

            return new Intersection(intersectionPoint, boundary, distance);
        } else {
            return null;
        }
    }
}

export class Intersection {
    constructor(readonly point: Point, readonly boundary: Boundary, readonly distance: number) {}
}
