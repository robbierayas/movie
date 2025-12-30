import { BaseScene } from '../../../../../production/animation/BaseScene.js';
import { Hallway } from '../../../production/animation/Hallway.js';
import { sceneConfig } from './sceneConfig.js';

export class Act1Scene4Hallway extends BaseScene {
    constructor() {
        super(sceneConfig);

        // CRITICAL: Pause scene by default for mark setting
        this.paused = true;
    }

    setupBackground() {
        // Build hallway environment
        this.hallway = new Hallway({
            width: 3,
            depth: 20,
            height: 10,
            hasDoorNorth: true,
            hasDoorSouth: true
        });
        this.scene.add(this.hallway.getGroup());

        // CRITICAL: Add grid for positioning
        const gridHelper = new THREE.GridHelper(50, 50);
        this.scene.add(gridHelper);

        // CRITICAL: Add axes for orientation
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);

        console.log('[SETUP] Hallway environment created with grid and axes');
    }

    // Placeholder timeline action methods
    sceneStart() {
        console.log('[ACTION] Scene starting - Alex and Lea exit conference room');
    }

    walkingToCoffee() {
        console.log('[ACTION] Walking to coffee area');
    }

    alexAsksAboutEmployees() {
        console.log('[ACTION] Alex asks about employees');
    }

    leaExplainsShift() {
        console.log('[ACTION] Lea explains the shift in company priorities');
    }

    alexCalmsLea() {
        console.log('[ACTION] Alex tries to calm and understand');
    }
}
