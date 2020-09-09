export function mapLinear(x: number, a1: number, a2: number, b1: number, b2: number): number {
    return b1 + ((x - a1) * (b2 - b1)) / (a2 - a1);
}

export type TabulateFunction<T> = (idx: number) => T;
export function createArray<T>(count: number, mapFn: TabulateFunction<T>): T[] {
    const arr: T[] = [];
    for (let i = 0; i < count; i++) {
        arr.push(mapFn(i));
    }

    return arr;
}

export const ANGLES = {
    up: -Math.PI / 2,
    right: 0,
    down: Math.PI / 2,
    left: Math.PI,
};

const DEG_TO_RAD_RATIO = 0.01745329251;
export function degToRad(angle: number): number {
    return angle * DEG_TO_RAD_RATIO;
}

export type nil = null | undefined;

export function isNil<T>(value: T | nil): value is nil {
    return value === null || value === undefined;
}

export function assertExists<T>(value: T | nil): asserts value is T {
    if (isNil(value)) {
        throw new Error('Unexpected nil value');
    }
}