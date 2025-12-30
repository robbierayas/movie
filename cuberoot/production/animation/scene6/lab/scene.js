import { BaseScene } from '../../../../../production/animation/BaseScene.js';
import { Lab } from '../../Lab.js';
import { sceneConfig } from './sceneConfig.js';
import * as THREE from 'three';

/**
 * Act 1 Scene 6 - Lab Introduction and First Test
 * The team enters the lab, explores, and witnesses Chen's transmitter demonstration.
 * A fragment returns with a desperate message from Barry.
 */
export class Scene6Lab extends BaseScene {
    constructor() {
        super(sceneConfig);
    }

    setupBackground() {
        console.log('[SETUP] Starting setupBackground() for Scene 6 Lab');

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

        // Note: Barry's desk is the southernmost west desk at position (-6, 0.75, 3.5)
        //       - Closest to whiteboard (z=2) and transmitter (z=12)
        //       - Photo and workspace details visible there
        // The transmitter (n=0 device) is on the south wall at position (0, 0, 12)
        // Equipment kit/care package location (future): center of room at (0, 0, 0)
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
        console.log('[ACTION] Scene 6 starting - Lab entrance');
    }

    teamEnters() {
        console.log('[ACTION] Team at door, ready to enter');
    }

    spreadOut() {
        console.log('[ACTION] Team spreading out to examine different areas');
    }

    exploration() {
        console.log('[ACTION] Team at their marks, examining equipment');
    }

    chalkboardConvo() {
        console.log('[ACTION] Mathematics conversation at chalkboard');
        console.log('[DIALOGUE] MORRIS: "Are these the equations for dimensional transition?"');
    }

    yukiFixesEquation() {
        console.log('[ACTION] Yuki corrects equation on chalkboard');
        console.log('[DIALOGUE] YUKI: "Wait—this equation is wrong. The denominator should be squared."');
    }

    sofiaToDesk() {
        console.log('[ACTION] Sofia notices Barry\'s desk, moves toward it');
    }

    barrysDesk() {
        console.log('[ACTION] Sofia at Barry\'s desk, sees family photo');
        console.log('[DIALOGUE] SOFIA: "This was Barry\'s workspace?"');
        console.log('[DIALOGUE] CHEN: "Yeah. He left that coffee two weeks ago. Never came back to finish it."');
    }

    sofiaReturns() {
        console.log('[ACTION] Sofia moves back toward group');
    }

    sofTakStory() {
        console.log('[ACTION] Sofia lightens mood with sof-tak casserole story');
        console.log('[DIALOGUE] SOFIA: "Morris makes a mean one. Morris, do you remember..."');
    }

    teamLaughs() {
        console.log('[ACTION] Team laughs, bonding moment');
    }

    morrisToTransmitter() {
        console.log('[ACTION] Morris walks to transmitter with sof-tak container');
    }

    chenDemo() {
        console.log('[ACTION] Chen prepares to demonstrate transmitter');
        console.log('[DIALOGUE] CHEN: "Dimensional inversion in three... two... one."');
    }

    teamGathers() {
        console.log('[ACTION] Team gathering around transmitter platform');
    }

    sofTakSent() {
        console.log('[ACTION] Sof-tak sent through dimensional inversion');
        console.log('[VFX] Transmitter HUMS, air SHIMMERS, sof-tak COMPRESSES and vanishes');
    }

    transmission() {
        console.log('[ACTION] Transmission in progress, spatial coordinates vanishing');
        console.log('[DIALOGUE] MORRIS: "It\'s beautiful..."');
    }

    messageReturns() {
        console.log('[ACTION] Fragment materializes on platform - part of sof-tak skin');
        console.log('[DIALOGUE] MORRIS: "That\'s... that\'s part of the sof-tak. It came back?"');
    }

    chenReads() {
        console.log('[ACTION] Chen picks up fragment, reads scratched message');
        console.log('[MESSAGE] "WE\'RE ALL DYING"');
    }

    teamReacts() {
        console.log('[ACTION] Team reacts - horror, realization that people are conscious in root-space');
        console.log('[DIALOGUE] YUKI: "They\'re conscious. They\'re aware in there."');
        console.log('[DIALOGUE] RASHID: "And they\'re dying."');
    }
}
