import { degToRad, radToDeg } from './utils';

export const TAU = 2 * Math.PI;
export const HALF_TAU = Math.PI;
export const QUART_TAU = Math.PI * 0.5;

/**
 * Handles angles.
 * Always reduced to [0, 2*PI).
 */
export class Angle {
    private constructor(private valueInRadians: number) {}

    static fromRadians(radians: number): Angle {
        if (radians > 0) {
            const overRotations = Math.floor(radians / TAU);
            return new Angle(radians - overRotations * TAU);
        }

        if (radians < 0) {
            const overRotations = Math.ceil(-radians / TAU);
            return new Angle(radians + overRotations * TAU);
        }

        return new Angle(0);
    }

    static fromDegrees(deg: number): Angle {
        return Angle.fromRadians(degToRad(deg));
    }

    get radians(): number {
        return this.valueInRadians;
    }

    get degrees(): number {
        return radToDeg(this.valueInRadians);
    }

    add(angle: Angle): Angle {
        return Angle.fromRadians(this.valueInRadians + angle.radians);
    }

    multiplyScalar(n: number): Angle {
        return Angle.fromRadians(this.valueInRadians * n);
    }

    // Clockwise, is this angle between ang1 and ang2?
    isBetween(ang1: Angle, ang2: Angle): boolean {
        const factor = this.lerpFactor(ang1, ang2);

        return 0 < factor && factor < 1;
    }

    // Clockwise, what's the interpolation factor of this angle between ang1 and ang2?
    lerpFactor(ang1: Angle, ang2: Angle): number {
        const rad1 = ang1.radians;
        const radValue =
            this.valueInRadians < rad1 ? this.valueInRadians + TAU : this.valueInRadians;
        const rad2 = ang2.radians < rad1 ? ang2.radians + TAU : ang2.radians;

        return (radValue - rad1) / (rad2 - rad1);
    }
}
