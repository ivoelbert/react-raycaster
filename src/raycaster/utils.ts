export function mapLinear(x: number, a1: number, a2: number, b1: number, b2: number): number {
    return b1 + ((x - a1) * (b2 - b1)) / (a2 - a1);
}

export function constrain(value: number, min: number = 0, max: number = 1): number {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
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

const DEG_TO_RAD_RATIO = Math.PI / 180;
export function degToRad(angle: number): number {
    return angle * DEG_TO_RAD_RATIO;
}

export function radToDeg(angle: number): number {
    return angle / DEG_TO_RAD_RATIO;
}

export type nil = null | undefined;

export function isNil<T>(value: T | nil): value is nil {
    return value === null || value === undefined;
}

export function isNotNil<T>(value: T | nil): value is T {
    return value !== null && value !== undefined;
}

export function assertExists<T>(value: T | nil): asserts value is T {
    if (isNil(value)) {
        throw new Error('Unexpected nil value');
    }
}

export function assertUnreachable(msg: string, value: never): never {
    throw new Error(`${msg} ${value}`);
}

export function assertCondition(condition: boolean): asserts condition is true {
    if (!condition) {
        throw new Error('Unexpected false condition');
    }
}
