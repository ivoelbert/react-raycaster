import { Boundary } from '../boundary';
import { Point } from '../point';
import { createRect, createRegularPolygon } from './utils';
import { ANGLES } from '../utils';

const OUTER_COLOR = '#0040a6';
const OUTER_SHAPE = createRegularPolygon(new Point(0, 0), 6, 15, 0, OUTER_COLOR, true);

const RED = '#f22f1d';
const RED_SQUARE = createRect(new Point(5, -5), 5, 5, RED);

const GREEN = '#28ed2c';
const GREEN_SQUARE = createRect(new Point(-5, 5), 5, 5, GREEN);

const PURPLE = '#9428ed';
const PURPLE_TRIANGLE = createRegularPolygon(new Point(-5, -5), 3, 2.5, ANGLES.up, PURPLE);

const YELLOW = '#f0df29';
const YELLOW_HEX = createRegularPolygon(new Point(5, 5), 6, 2.5, ANGLES.up, YELLOW);

export const LEVEL1: Boundary[] = [
    ...OUTER_SHAPE,
    ...RED_SQUARE,
    ...GREEN_SQUARE,
    ...PURPLE_TRIANGLE,
    ...YELLOW_HEX,
];

console.log(JSON.stringify(LEVEL1));
