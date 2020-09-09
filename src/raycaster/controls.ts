import { Camera } from './camera';
import { isNil } from './utils';
import { Vector } from './vector';

export enum Movements {
    up = 'up',
    down = 'down',
    left = 'left',
    right = 'right',
    rotateL = 'rotateL',
    rotateR = 'rotateR',
}

export type MoveState = Record<Movements, number>;

const IDLE_MOVE_STATE: MoveState = {
    [Movements.up]: 0,
    [Movements.down]: 0,
    [Movements.left]: 0,
    [Movements.right]: 0,
    [Movements.rotateL]: 0,
    [Movements.rotateR]: 0,
};

type KeyMapping = Record<string, Movements>;
const KEY_MAPPING: KeyMapping = {
    KeyW: Movements.up,
    KeyS: Movements.down,
    KeyA: Movements.left,
    KeyD: Movements.right,
    ArrowLeft: Movements.rotateL,
    ArrowRight: Movements.rotateR,
};

export class Controls {
    private movementSpeed: number;
    private rotateSpeed: number;
    private moveState: MoveState;
    constructor(private camera: Camera) {
        this.movementSpeed = 0.05;
        this.rotateSpeed = 0.025;
        this.moveState = IDLE_MOVE_STATE;
    }

    onKeyDown(key: string) {
        const movement = KEY_MAPPING[key];
        if (isNil(movement)) {
            return;
        }
        this.moveState[movement] = 1;
    }

    onKeyUp(key: string) {
        const movement = KEY_MAPPING[key];
        if (isNil(movement)) {
            return;
        }
        this.moveState[movement] = 0;
    }

    private getMovementVector(): Vector {
        const x = this.moveState[Movements.up] - this.moveState[Movements.down];
        const y = this.moveState[Movements.right] - this.moveState[Movements.left];
        return new Vector(x, y).clampLength(1);
    }

    private getRotation(): number {
        return this.moveState[Movements.rotateR] - this.moveState[Movements.rotateL];
    }

    update(): void {
        const movement = this.getMovementVector();
        const forwardsMovement = movement.x * this.movementSpeed;
        const sidewaysMovement = movement.y * this.movementSpeed;
        const rotation = this.getRotation() * this.rotateSpeed;

        this.camera.move(forwardsMovement, sidewaysMovement);
        this.camera.rotate(rotation);
    }
}
