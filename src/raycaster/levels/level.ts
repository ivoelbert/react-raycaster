import { Boundary } from '../boundary';
import { SpriteEntity } from '../spriteEntity';

export class Level {
    constructor(readonly boundaries: Boundary[], readonly entities: SpriteEntity[]) {}
}
