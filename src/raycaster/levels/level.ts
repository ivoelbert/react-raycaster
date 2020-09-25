import { Boundary } from '../boundary';
import { SpriteEntity } from '../sprites';

export class Level {
    constructor(readonly boundaries: Boundary[], readonly entities: SpriteEntity[]) {}
}
