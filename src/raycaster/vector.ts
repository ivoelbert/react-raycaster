export class Vector {
    constructor(readonly x: number, readonly y: number) {}

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
}
