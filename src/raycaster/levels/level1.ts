import { Boundary } from '../boundary';
import { Point } from '../point';
import { createGuard, createRect, createRegularPolygon } from './utils';
import { ANGLES } from '../utils';
import { SpriteEntity } from '../sprites';
import { Level } from './level';

const OUTER_COLOR = '#0040a6';
const OUTER_SHAPE = createRegularPolygon(new Point(0, 0), 6, 10, 0, OUTER_COLOR);

const RED = '#f22f1d';
const RED_SQUARE = createRect(new Point(3, -3), 3, 3, RED);

const GREEN = '#28ed2c';
const GREEN_SQUARE = createRect(new Point(-3, 3), 3, 3, GREEN);

const PURPLE = '#9428ed';
const PURPLE_TRIANGLE = createRegularPolygon(new Point(-3, -3), 6, 2, ANGLES.up, PURPLE);

const YELLOW = '#f0df29';
const YELLOW_HEX = createRegularPolygon(new Point(3, 3), 6, 2, ANGLES.up, YELLOW);

const BOUNDARIES: Boundary[] = [
    ...OUTER_SHAPE,
    ...RED_SQUARE,
    ...GREEN_SQUARE,
    ...PURPLE_TRIANGLE,
    ...YELLOW_HEX,
];

const ENTITIES: SpriteEntity[] = [
    createGuard(3, 0),
    createGuard(-3, 0),
    createGuard(0, 3),
    createGuard(0, -3),
];

export const LEVEL1 = new Level(BOUNDARIES, ENTITIES);
