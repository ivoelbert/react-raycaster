import { Point } from './point';
import guard from '../sprites/guard.png';

export enum Sprites {
    guard = 'guard',
}

const SPRITES: Record<Sprites, string> = {
    [Sprites.guard]: guard,
};

export class SpriteEntity {
    readonly spriteSrc: string;

    constructor(sprite: Sprites, private internalPosition: Point) {
        this.spriteSrc = SPRITES[sprite];
    }

    get position(): Point {
        return this.internalPosition;
    }
}

/**
 * dx: [0, 1], screen x coordinate (size independent)
 */
export class RenderSprite {
    constructor(
        readonly dx: number | null,
        readonly height: number,
        readonly entity: SpriteEntity
    ) {}
}
