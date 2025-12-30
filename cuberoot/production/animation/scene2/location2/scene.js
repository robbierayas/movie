import { BaseScene } from '../../../../../production/animation/BaseScene.js';
import { EdgarOffice } from '../../EdgarOffice.js';
import { sceneConfig } from './sceneConfig.js';

/**
 * Scene 2 - Edgar's Office
 * Marcus and Edgar discuss team transition and upcoming meeting
 */
export class EdgarOfficeScene extends BaseScene {
    constructor() {
        super(sceneConfig);
        this.office = null;
    }

    setupBackground() {
        // Create Edgar's office environment (12x10x10)
        this.office = new EdgarOffice({
            width: 12,
            height: 10,
            depth: 10,
            wallColor: 0x6a5a4a,
            floorColor: 0x4a3a2a
        });
        this.scene.add(this.office.getGroup());

        // Set initial camera position - door view
        this.camera.position.set(4, 4, 2);
        this.camera.lookAt(-2, 1.5, -1);

        // Define camera positions for instant cuts
        this.cameraPositions = {
            wide: {
                pos: { x: 4, y: 4, z: 2 },
                lookAt: { x: -2, y: 1.5, z: -1 }
            },
            edgar: {
                pos: { x: 1, y: 2.5, z: -1 },
                lookAt: { x: -2, y: 1.2, z: -0.5 }
            },
            marcus: {
                pos: { x: -4, y: 2.5, z: -1 },
                lookAt: { x: -1, y: 1.5, z: -1 }
            },
            bothLeaving: {
                pos: { x: -2, y: 3, z: 6 },
                lookAt: { x: -2, y: 1.5, z: 2 }
            }
        };
    }

    // Timeline action methods
    sceneStart() {
        console.log('Scene 2 Edgar\'s Office: Marcus and Edgar enter');
    }

    edgarAsksUpdate() {
        console.log('Edgar: "So give me the full breakdown."');
    }

    marcusExplainsTechnical() {
        console.log('Marcus: "The singularity event we detected last week is expanding..."');
    }

    edgarInterrupts() {
        console.log('Edgar: "Sorry, I should clarify. I meant the team transition."');
    }

    marcusExplainsTeam() {
        console.log('Marcus: "The integration is proceeding. We\'re bringing in Alex and three others..."');
    }

    edgarStands() {
        console.log('Edgar: "I should sit in on that. Good to show leadership support."');
    }
}
