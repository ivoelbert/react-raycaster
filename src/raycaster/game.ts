import { Scene } from './scene';
import { LEVEL1 } from './levels/level1';
import { Camera, PlayerInfo } from './camera';
import { ProjectionNames } from './projection';
import { Controls } from './controls';
import { Angle } from './angle';
import { Bar } from './bar';
import { RenderSprite } from './sprites';

export type FrameCallback = (game: Game) => void;
export type CleanupFrameCallback = () => void;

export class Game {
    private internalScene: Scene;
    private camera: Camera;
    private internalControls: Controls;
    private frameCallbacks: Set<FrameCallback>;

    constructor() {
        this.internalScene = new Scene(LEVEL1);
        this.camera = new Camera();
        this.internalControls = new Controls(this.camera);
        this.frameCallbacks = new Set();

        this.loop();
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

    renderBoundaries(resolution: number): Bar[] {
        return this.camera.renderBoundaries(this.internalScene, resolution);
    }

    renderSprites(): RenderSprite[] {
        return this.camera.renderSprites(this.internalScene);
    }

    setProjection(projection: ProjectionNames): void {
        this.camera.setProjection(projection);
    }

    get projection(): ProjectionNames {
        return this.camera.getProjection();
    }

    setFov(newFov: Angle): void {
        this.camera.setFov(newFov);
    }

    get fov(): Angle {
        return this.camera.getFov();
    }

    private loop() {
        this.controls.update();

        this.frameCallbacks.forEach((callback) => {
            callback(this);
        });

        requestAnimationFrame(() => this.loop());
    }

    addFrameCallback(callback: FrameCallback): CleanupFrameCallback {
        this.frameCallbacks.add(callback);

        return () => this.frameCallbacks.delete(callback);
    }
}
