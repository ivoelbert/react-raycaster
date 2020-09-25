import { Boundary } from './boundary';
import { Level } from './levels/level';
import { SpriteEntity } from './sprites';

export type TraverseFunction<Obj, Result> = (obj: Obj, idx: number) => Result;

export class Scene {
    constructor(readonly level: Level) {}

    traverseBoundaries<T>(callback: TraverseFunction<Boundary, T>): T[] {
        return this.level.boundaries.map(callback);
    }

    traverseEntities<T>(callback: TraverseFunction<SpriteEntity, T>): T[] {
        return this.level.entities.map(callback);
    }
}
