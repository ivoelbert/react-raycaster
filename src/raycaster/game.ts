import { Scene } from './scene';
import { LEVEL1 } from './levels/level1';
import { Camera } from './camera';
import { Bar } from './bar';
import { Projection } from './projection';
import { Controls } from './controls';

export class Game {
    private scene: Scene;
    private camera: Camera;
    private internalControls: Controls;

    constructor() {
        this.scene = new Scene(LEVEL1);
        this.camera = new Camera();
        this.internalControls = new Controls(this.camera);
    }

    get controls(): Controls {
        return this.internalControls;
    }

    render(resolution: number): Bar[] {
        this.controls.update();
        return this.camera.render(this.scene, resolution);
    }

    setProjection(projection: Projection): void {
        this.camera.setProjection(projection);
    }

    setFov(newFov: number): void {
        this.camera.setFov(newFov);
    }
}
