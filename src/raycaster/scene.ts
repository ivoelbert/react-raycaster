import { Boundary } from './boundary';

export type TraverseFunction<T> = (boundary: Boundary) => T;
export class Scene {
    constructor(private boundaries: Boundary[]) {}

    traverse<T>(callback: TraverseFunction<T>): T[] {
        return this.boundaries.map(callback);
    }
}
