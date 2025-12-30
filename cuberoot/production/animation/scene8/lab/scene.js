import { BaseScene } from '../../../../../production/animation/BaseScene.js';
import { Lab } from '../../Lab.js';
import { sceneConfig } from './sceneConfig.js';
import * as THREE from 'three';

/**
 * Act 1 Scene 8 - The Lost Person Incident
 * Marcus, Edgar, Alex, and Lea return from the briefing room.
 * The team confronts them about the "WE'RE ALL DYING" message.
 * Marcus and Lea reveal the truth about Barry and Josh trapped in n=0.333.
 */
export class Scene8Lab extends BaseScene {
    constructor() {
        super(sceneConfig);
    }

    setupBackground() {
        console.log('[SETUP] Starting setupBackground() for Scene 8 Lab');

        // Build lab environment
        this.lab = new Lab({
            width: 30,
            height: 12,
            depth: 25
        });
        this.scene.add(this.lab.getGroup());
        console.log('[SETUP] Lab environment created');

        // Add chalkboard and whiteboard on west wall (side by side)
        this.createChalkboard();
        this.createWhiteboard();
        console.log('[SETUP] Chalkboard and whiteboard added');

        // Note: Barry's desk at position (-6, 0.75, 3.5)
        // The transmitter (n=0 device) is at position (0, 0, 12)
        // Door entrance at (-7, 0, -11)
    }

    createChalkboard() {
        const chalkboardGroup = new THREE.Group();

        // Chalkboard frame
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a2510,
            roughness: 0.7
        });

        const frame = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 2.2, 4.2),
            frameMaterial
        );
        frame.position.set(-14.9, 2, -5);
        frame.castShadow = true;
        chalkboardGroup.add(frame);

        // Chalkboard surface (dark green)
        const boardMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a3a2a,
            roughness: 0.9
        });

        const board = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 2, 4),
            boardMaterial
        );
        board.position.set(-14.85, 2, -5);
        chalkboardGroup.add(board);

        // Chalk tray
        const tray = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 0.1, 4),
            frameMaterial
        );
        tray.position.set(-14.85, 0.9, -5);
        tray.castShadow = true;
        chalkboardGroup.add(tray);

        this.scene.add(chalkboardGroup);
    }

    createWhiteboard() {
        const whiteboardGroup = new THREE.Group();

        // Whiteboard frame
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x4a4a4a,
            roughness: 0.6,
            metalness: 0.3
        });

        const frame = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 2.2, 4.2),
            frameMaterial
        );
        frame.position.set(-14.9, 2, 2);
        frame.castShadow = true;
        whiteboardGroup.add(frame);

        // Whiteboard surface (white)
        const boardMaterial = new THREE.MeshStandardMaterial({
            color: 0xf0f0f0,
            roughness: 0.4
        });

        const board = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 2, 4),
            boardMaterial
        );
        board.position.set(-14.85, 2, 2);
        whiteboardGroup.add(board);

        // Marker tray
        const tray = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 0.1, 4),
            frameMaterial
        );
        tray.position.set(-14.85, 0.9, 2);
        tray.castShadow = true;
        whiteboardGroup.add(tray);

        this.scene.add(whiteboardGroup);
    }

    // Timeline action methods
    sceneStart() {
        console.log('[ACTION] Scene 8 starting - The Lost Person Incident');
    }
}
