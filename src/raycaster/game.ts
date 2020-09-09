import { Scene } from './scene';
import { LEVEL1 } from './levels/level1';
import { Camera } from './camera';
import { degToRad } from './utils';
import { Bar } from './bar';
import { FISHEYE_PROJECTION } from './projection';
import { Controls } from './controls';

export class Game {
    private scene: Scene;
    private camera: Camera;
    private internalControls: Controls;

    constructor(private internalResolution: number) {
        this.scene = new Scene(LEVEL1);
        const fov = degToRad(75);
        this.camera = new Camera(internalResolution, fov, FISHEYE_PROJECTION);
        this.internalControls = new Controls(this.camera);
    }

    get controls(): Controls {
        return this.internalControls;
    }

    get resolution(): number {
        return this.internalResolution;
    }

    render(): Bar[] {
        this.controls.update();
        return this.camera.render(this.scene);
    }
}
