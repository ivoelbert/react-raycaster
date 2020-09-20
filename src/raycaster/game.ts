import { Scene } from './scene';
import { LEVEL1 } from './levels/level1';
import { Camera, PlayerInfo } from './camera';
import { Bar } from './bar';
import { ProjectionNames } from './projection';
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

    get playerInfo(): PlayerInfo {
        return this.camera.getPlayerInfo();
    }

    render(resolution: number): Bar[] {
        this.controls.update();
        return this.camera.render(this.internalScene, resolution);
    }

    setProjection(projection: ProjectionNames): void {
        this.camera.setProjection(projection);
    }

    get projection(): ProjectionNames {
        return this.camera.getProjection();
    }

    setFov(newFov: number): void {
        this.camera.setFov(newFov);
    }

    get fov(): number {
        return this.camera.getFov();
    }
}
