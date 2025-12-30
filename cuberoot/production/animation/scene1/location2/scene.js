import { BaseScene } from '../../../../../production/animation/BaseScene.js';
import { FoodScienceLab } from '../../FoodScienceLab.js';
import { sceneConfig } from './sceneConfig.js';

/**
 * Scene 1 - Food Science Lab
 * Alex enters lab, works with Morris on sof-tak, the sneeze incident occurs
 */
export class FoodScienceLabScene extends BaseScene {
    constructor() {
        super(sceneConfig);
        this.lab = null;
    }

    setupBackground() {
        // Create food science lab environment
        this.lab = new FoodScienceLab({
            wallColor: 0xd0d0d0,
            floorColor: 0xa0a0a0
        });
        this.scene.add(this.lab.getGroup());

        // Set initial camera position - wide shot from south
        this.camera.position.set(0, 6, 5);
        this.camera.lookAt(0, 2, 0);

        // Define camera positions
        this.cameraPositions = {
            wide: {
                pos: { x: 0, y: 6, z: 5 },
                lookAt: { x: 0, y: 2, z: 0 }
            },
            alex: {
                pos: { x: 5.5, y: 3.5, z: 0 },
                lookAt: { x: 3.5, y: 1.5, z: -3 }
            },
            morris: {
                pos: { x: -5.5, y: 3.5, z: 0 },
                lookAt: { x: -3.5, y: 1.5, z: -3 }
            },
            bothScientists: {
                pos: { x: 0, y: 5, z: 2 },
                lookAt: { x: 0, y: 1.5, z: -3 }
            },
            entrance: {
                pos: { x: 3, y: 3, z: 2 },
                lookAt: { x: 6, y: 1.5, z: 0 }
            }
        };
    }

    // Camera control methods - instant cuts
    cameraWide() {
        console.log('[CAMERA] Cut to: Wide shot');
        this.cutToPosition('wide');
    }

    cameraToAlex() {
        console.log('[CAMERA] Cut to: Alex');
        this.cutToPosition('alex');
    }

    cameraToMorris() {
        console.log('[CAMERA] Cut to: Morris');
        this.cutToPosition('morris');
    }

    cameraToBothScientists() {
        console.log('[CAMERA] Cut to: Both scientists');
        this.cutToPosition('bothScientists');
    }

    // Timeline action methods
    sceneStart() {
        console.log('Scene 1 Food Science Lab: Lab work begins');
    }

    cameraToAlex() {
        console.log('Camera: Focus on Alex at her station');
        this.animateCamera(
            this.cameraPositions.alex.pos,
            this.cameraPositions.alex.lookAt,
            2000
        );
    }

    alexGreetsMorris() {
        console.log('Alex: "Morning, Morris."');
    }

    alexWorksSoftak() {
        console.log('Alex begins working on sof-tak sample');
        this.animateCamera(
            this.cameraPositions.bothScientists.pos,
            this.cameraPositions.bothScientists.lookAt,
            2000
        );
    }

    morrisSneeze() {
        console.log('Morris: *ACHOO!* sneezes toward the plate');
        this.animateCamera(
            this.cameraPositions.morris.pos,
            this.cameraPositions.morris.lookAt,
            1000
        );
    }

    alexAppliesGrowDrop() {
        console.log('Alex carefully applies grow drop to plate');
        this.animateCamera(
            this.cameraPositions.alex.pos,
            this.cameraPositions.alex.lookAt,
            1500
        );
    }

    softakExpands() {
        console.log('Sof-tak suddenly expands back to full size!');
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
