export class Point {
    constructor(public x: number, public y: number) {}

    distanceTo(point: Point): number {
        return Math.sqrt(
            (point.x - this.x) * (point.x - this.x) + (point.y - this.y) * (point.y - this.y)
        );
    }
}
