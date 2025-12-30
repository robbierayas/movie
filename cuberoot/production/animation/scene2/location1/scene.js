import { BaseScene } from '../../../../../production/animation/BaseScene.js';
import { Hallway } from '../../Hallway.js';
import { sceneConfig } from './sceneConfig.js';
import * as THREE from 'three';

/**
 * Scene 2 - Hallway (Outside Edgar's Office)
 * Marcus waits in hallway, watches corporate video, Edgar greets him
 */
export class HallwayScene extends BaseScene {
    constructor() {
        super(sceneConfig);
        this.hallway = null;
    }

    setupBackground() {
        // Create hallway environment (3x10x20)
        this.hallway = new Hallway({
            width: 3,
            height: 10,
            depth: 20,
            wallColor: 0x707070,
            floorColor: 0x505050,
            hasDoorNorth: true,
            hasDoorSouth: false
        });
        this.scene.add(this.hallway.getGroup());

        // Add wall-mounted screen (simple emissive box)
        const screenMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a4a6a,
            roughness: 0.3,
            emissive: 0x1a3a5a,
            emissiveIntensity: 0.5
        });

        const screen = new THREE.Mesh(
            new THREE.BoxGeometry(1.5, 1, 0.1),
            screenMaterial
        );
        screen.position.set(-1.4, 3, -8);
        screen.castShadow = true;
        this.scene.add(screen);

        // Set initial camera position - wide shot from southeast, elevated
        this.camera.position.set(5, 5, 0);
        this.camera.lookAt(0, 2, -5);

        // Define camera positions for instant cuts
        this.cameraPositions = {
            wide: {
                pos: { x: 5, y: 5, z: 0 },
                lookAt: { x: 0, y: 2, z: -5 }
            },
            marcus: {
                pos: { x: 3, y: 3, z: -5 },
                lookAt: { x: 0, y: 1.5, z: -5 }
            },
            screen: {
                pos: { x: 0, y: 4, z: -3 },
                lookAt: { x: 0, y: 3, z: -8 }
            },
            door: {
                pos: { x: 0, y: 3, z: -4 },
                lookAt: { x: 0, y: 2, z: -9 }
            }
        };
    }

    // Timeline action methods
    sceneStart() {
        console.log('Scene 2 Hallway: Marcus waits outside Edgar\'s office');
    }

    marcusReacts() {
        console.log('Marcus: (under breath) "Humane."');
    }

    doorOpens() {
        console.log('Edgar\'s office door opens');
    }

    edgarGreets() {
        console.log('Edgar: "Marcus! Perfect timing. Come on in."');
    }
}
