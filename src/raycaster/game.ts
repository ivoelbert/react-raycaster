import { Scene } from './scene';
import { LEVEL1 } from './levels/level1';
import { Camera } from './camera';
import { Bar } from './bar';
import { Projection } from './projection';
import { Controls } from './controls';

export class Game {
    private internalScene: Scene;
    private camera: Camera;
    private internalControls: Controls;

    constructor() {
        this.internalScene = new Scene(LEVEL1);
        this.camera = new Camera();
        this.internalControls = new Controls(this.camera);
    }

    get controls(): Controls {
        return this.internalControls;
    }

    get scene(): Scene {
        return this.internalScene;
    }

    render(resolution: number): Bar[] {
        this.controls.update();
        return this.camera.render(this.internalScene, resolution);
    }

    setProjection(projection: Projection): void {
        this.camera.setProjection(projection);
    }

    setFov(newFov: number): void {
        this.camera.setFov(newFov);
    }
}
