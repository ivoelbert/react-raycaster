import { Scene } from './scene';
import { LEVEL1 } from './levels/level1';
import { Camera } from './camera';
import { degToRad } from './utils';
import { Bar } from './bar';

export class Game {
    private scene: Scene;
    private camera: Camera;

    constructor(private internalResolution: number) {
        this.scene = new Scene(LEVEL1);
        const fov = degToRad(75);
        this.camera = new Camera(internalResolution, fov);
    }

    get resolution(): number {
        return this.internalResolution;
    }

    render(): Bar[] {
        this.camera.rotate(0.01);
        return this.camera.render(this.scene);
    }
}
