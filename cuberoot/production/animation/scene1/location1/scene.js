import { BaseScene } from '../../../../../production/animation/BaseScene.js';
import { Lobby } from '../../Lobby.js';
import { sceneConfig } from './sceneConfig.js';

/**
 * Scene 1 - Lobby
 * Alex arrives at INZO facility, walks through lobby past timeline wall
 */
export class LobbyScene extends BaseScene {
    constructor() {
        super(sceneConfig);
        this.lobby = null;
    }

    setupBackground() {
        // Create lobby environment (10x15x10)
        this.lobby = new Lobby({
            width: 10,
            height: 15,
            depth: 10,
            wallColor: 0xa0a0a0,
            floorColor: 0x606060
        });
        this.scene.add(this.lobby.getGroup());

        // Set initial camera position - wide shot from southeast, elevated
        this.camera.position.set(3.5, 7, 2);
        this.camera.lookAt(0, 2, -2);

        // Define camera positions
        this.cameraPositions = {
            wide: {
                pos: { x: 3.5, y: 7, z: 2 },
                lookAt: { x: 0, y: 2, z: -2 }
            },
            followAlex: {
                pos: { x: -1, y: 4, z: -1 },
                lookAt: { x: -3, y: 1.5, z: -4.2 }
            },
            softak: {
                pos: { x: -3, y: 2.5, z: -1 },
                lookAt: { x: -3, y: 1.5, z: -4.5 }
            },
            entrance: {
                pos: { x: 2, y: 3, z: 1 },
                lookAt: { x: 4, y: 1.5, z: 0 }
            }
        };
    }

    // Camera control methods - instant cuts
    cameraWide() {
        console.log('[CAMERA] Cut to: Wide shot');
        this.cutToPosition('wide');
    }

    cameraFollowAlex() {
        console.log('[CAMERA] Cut to: Following Alex');
        this.cutToPosition('followAlex');
    }

    cameraToSoftak() {
        console.log('[CAMERA] Cut to: SOF-TAK milestone');
        this.cutToPosition('softak');
    }

    cameraToDesk() {
        console.log('[CAMERA] Cut to: Reception desk');
        this.cutToPosition('desk');
    }

    // Timeline action methods
    sceneStart() {
        console.log('Scene 1 Lobby: Alex arrives at INZO facility');
    }

    cameraFollowAlex() {
        console.log('Camera: Following Alex to timeline wall');
        this.animateCamera(
            this.cameraPositions.followAlex.pos,
            this.cameraPositions.followAlex.lookAt,
            2000
        );
    }

    focusOnTimeline() {
        console.log('Camera: Focusing on SOF-TAK milestone');
        this.animateCamera(
            this.cameraPositions.softak.pos,
            this.cameraPositions.softak.lookAt,
            1500
        );
    }

    animateCamera(targetPos, lookAtPos, duration) {
        const startPos = { ...this.camera.position };
        this.cameraAnimation = {
            startPos,
            targetPos,
            lookAtPos,
            startTime: this.currentTime,
            duration
        };
    }

    updateCameraAnimation() {
        if (!this.cameraAnimation) return;

        const elapsed = this.currentTime - this.cameraAnimation.startTime;
        const progress = Math.min(elapsed / this.cameraAnimation.duration, 1);

        // Ease in-out
        const easeProgress = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        // Interpolate position
        this.camera.position.x = this.cameraAnimation.startPos.x +
            (this.cameraAnimation.targetPos.x - this.cameraAnimation.startPos.x) * easeProgress;
        this.camera.position.y = this.cameraAnimation.startPos.y +
            (this.cameraAnimation.targetPos.y - this.cameraAnimation.startPos.y) * easeProgress;
        this.camera.position.z = this.cameraAnimation.startPos.z +
            (this.cameraAnimation.targetPos.z - this.cameraAnimation.startPos.z) * easeProgress;

        this.camera.lookAt(
            this.cameraAnimation.lookAtPos.x,
            this.cameraAnimation.lookAtPos.y,
            this.cameraAnimation.lookAtPos.z
        );

        if (progress >= 1) {
            this.cameraAnimation = null;
        }
    }
}
