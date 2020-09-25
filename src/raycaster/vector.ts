import { Angle } from './angle';
import { Boundary } from './boundary';
import { Point } from './point';
import { assertCondition } from './utils';

const EPSILON_ZERO_VECTOR = 0.00001;

export class Vector {
    constructor(readonly x: number, readonly y: number) {}

    static fromBoundary(boundary: Boundary): Vector {
        return new Vector(boundary.b.x - boundary.a.x, boundary.b.y - boundary.a.y);
    }

    static fromPoints(a: Point, b: Point): Vector {
        return new Vector(b.x - a.x, b.y - a.y);
    }

    add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    clampLength(max: number): Vector {
        const length = this.length();
        if (length < max) {
            return new Vector(this.x, this.y);
        } else {
            return new Vector((max * this.x) / length, (max * this.y) / length);
        }
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    angle(): Angle {
        return Angle.fromRadians(Math.atan2(this.y, this.x));
    }

    // Returns the polar coordinates for a vector [length, angle]
    toPolar(): [number, Angle] {
        const length = this.length();
        assertCondition(length > EPSILON_ZERO_VECTOR);
        const angle = this.angle();
        return [length, angle];
    }
}
