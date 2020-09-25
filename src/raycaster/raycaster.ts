import { Boundary } from './boundary';
import { Point } from './point';
import { SpriteEntity } from './sprites';
import { Vector } from './vector';
import { Angle } from './angle';

// Based on https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

// From this point onwards we consider a ray fully parallel to a boundary.
const PARALLEL_EPSILON = 0.0001;

// A ray should be infinite, but this code checks for segments intersection
// So the ray will be just a really long segment.
const RAY_LENGTH = 1000;

export class RayCaster {
    constructor(private pos: Point) {}

    castAtAngle(angle: number, boundary: Boundary): Intersection | null {
        const dirX = Math.cos(angle) * RAY_LENGTH;
        const dirY = Math.sin(angle) * RAY_LENGTH;

        const x1 = boundary.a.x;
        const y1 = boundary.a.y;
        const x2 = boundary.b.x;
        const y2 = boundary.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + dirX;
        const y4 = this.pos.y + dirY;

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (Math.abs(denominator) < PARALLEL_EPSILON) {
            return null;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

        if (0 <= t && t <= 1 && 0 <= u && u <= 1) {
            const intersectionX = x1 + t * (x2 - x1);
            const intersectionY = y1 + t * (y2 - y1);
            const intersectionPoint = new Point(intersectionX, intersectionY);
            const distance = this.pos.distanceTo(intersectionPoint);

            return new Intersection(intersectionPoint, boundary, distance);
        } else {
            return null;
        }
    }

    // Returns the angle to the sprite. Visible if this is in the FOV.
    castToEntity(entity: SpriteEntity): Angle {
        const lineOfSight = Vector.fromPoints(this.pos, entity.position);
        return lineOfSight.angle();
    }
}

export class Intersection {
    constructor(readonly point: Point, readonly boundary: Boundary, readonly distance: number) {}
}
