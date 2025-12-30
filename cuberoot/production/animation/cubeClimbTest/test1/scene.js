import { BaseScene } from '../../../../../production/animation/BaseScene.js';
import { CubeRoom } from '../../Cube.js';
import { sceneConfig } from './sceneConfig.js';
import * as THREE from 'three';

/**
 * Test Scene - Chen Climbing Through Two Cubes
 * Demonstrates climbing and crawling actions
 */
export class CubeClimbTestScene extends BaseScene {
    constructor() {
        super(sceneConfig);
    }

    setupBackground() {
        console.log('[SETUP] Starting setupBackground()');
        // Create two cube rooms side by side
        // Cube 1: centered at origin
        this.cube1 = new CubeRoom({
            size: 10,
            wallOpacity: 0.95,  // Nearly opaque so you can't see through walls
            wallColor: 0x4488ff,
            floorColor: 0x404060,
            doors: {
                north: false,
                south: false,
                east: true,   // Door on east wall connecting to cube 2
                west: false,
                up: false,
                down: false
            }
        });

        // Position cube 1 at origin
        this.cube1.getGroup().position.set(0, 0, 0);
        this.scene.add(this.cube1.getGroup());
        console.log('[SETUP] Cube 1 created:', this.cube1);

        // Cube 2: adjacent to cube 1 on the east side
        // Center at x=10 so cubes touch (cube 1 east wall at x=5, cube 2 west wall at x=5)
        this.cube2 = new CubeRoom({
            size: 10,
            wallOpacity: 0.95,  // Nearly opaque so you can't see through walls
            wallColor: 0xff8844,
            floorColor: 0x604040,
            doors: {
                north: false,
                south: false,
                east: false,
                west: true,   // Door on west wall connecting to cube 1
                up: false,
                down: false
            }
        });

        // Position cube 2 adjacent to cube 1
        this.cube2.getGroup().position.set(10, 0, 0);
        this.scene.add(this.cube2.getGroup());
        console.log('[SETUP] Cube 2 created:', this.cube2);

        // Add grid helper for reference (optional)
        const gridHelper = new THREE.GridHelper(30, 30, 0x444444, 0x222222);
        gridHelper.position.y = -5;
        this.scene.add(gridHelper);

        // Add axes helper for reference (optional)
        const axesHelper = new THREE.AxesHelper(5);
        axesHelper.position.set(0, -4.9, 0);
        this.scene.add(axesHelper);
    }

    // Timeline action methods (called by BaseScene timeline system)
    sceneStart() {
        console.log('=== Cube Climb Test Scene ===');
        console.log('Chen will walk to the door, climb up, crawl through, climb down, and walk away.');
    }

    openDoorCube1() {
        console.log('[ACTION] Door opening in Cube 1 (east door)');
        console.log('[DEBUG] this:', this);
        console.log('[DEBUG] this.constructor.name:', this.constructor.name);
        console.log('[DEBUG] this.cube1:', this.cube1);
        console.log('[DEBUG] this.cube2:', this.cube2);

        if (!this.cube1 || !this.cube2) {
            console.error('[ERROR] Cubes not initialized!');
            console.error('[ERROR] Available properties:', Object.keys(this));
            return;
        }

        this.cube1.setDoorOpen('east', true, 800);
        // Also open the connecting door on cube 2
        this.cube2.setDoorOpen('west', true, 800);
    }

    logClimbing() {
        console.log('[ACTION] Chen climbing up ladder rungs to door level');
    }

    logCrawling() {
        console.log('[ACTION] Chen crawling through door opening');
    }

    logClimbingDown() {
        console.log('[ACTION] Chen climbing down ladder rungs on other side');
    }

    logWalkingAway() {
        console.log('[ACTION] Chen walking away into cube 2');
    }

    closeDoorCube1() {
        console.log('[ACTION] Doors closing in both cubes');

        if (!this.cube1 || !this.cube2) {
            console.error('[ERROR] Cubes not initialized!');
            return;
        }

        this.cube1.setDoorOpen('east', false, 800);
        this.cube2.setDoorOpen('west', false, 800);
    }
}
