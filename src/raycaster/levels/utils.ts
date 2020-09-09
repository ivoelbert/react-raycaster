import { Point } from '../point';
import { Boundary } from '../boundary';
import { createArray } from '../utils';

export function createPolygon(vertices: Point[], color: string): Boundary[] {
    return createArray(vertices.length, (idx) => {
        return new Boundary(vertices[idx], vertices[(idx + 1) % vertices.length], color);
    });
}

export function createRect(
    center: Point,
    width: number,
    height: number,
    color: string
): Boundary[] {
    const topLeft = new Point(center.x - width / 2, center.y - height / 2);
    const topRight = new Point(center.x + width / 2, center.y - height / 2);
    const bottomRight = new Point(center.x + width / 2, center.y + height / 2);
    const bottomLeft = new Point(center.x - width / 2, center.y + height / 2);

    return createPolygon([topLeft, topRight, bottomRight, bottomLeft], color);
}

export function createRegularPolygon(
    center: Point,
    sides: number,
    radius: number,
    ang: number,
    color: string,
    hollow: boolean = false
): Boundary[] {
    const angStep = (Math.PI * 2) / sides;

    const vertices = createArray(sides, (idx) => {
        const step = hollow ? idx * angStep : -idx * angStep;
        const angle = ang - step;
        const px = radius * Math.cos(angle) + center.x;
        const py = radius * Math.sin(angle) + center.y;

        return new Point(px, py);
    });

    return createPolygon(vertices, color);
}

export function createLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string
): Boundary {
    return new Boundary(new Point(x1, y1), new Point(x2, y2), color);
}
