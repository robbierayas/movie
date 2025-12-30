import * as THREE from 'three';

/**
 * Quantum Logistics Building Lobby - modern, tech-focused entrance
 */
export class QuantumLobby {
    constructor(options = {}) {
        this.width = options.width || 12;
        this.height = options.height || 15;
        this.depth = options.depth || 12;
        this.wallThickness = options.wallThickness || 0.2;
        this.wallColor = options.wallColor || 0xa0a0a0;
        this.floorColor = options.floorColor || 0x606060;

        this.group = new THREE.Group();

        this.build();
    }

    build() {
        this.buildFloor();
        this.buildCeiling();
        this.buildWalls();
        this.buildReceptionDesk();
        this.buildDisplayScreens();
        this.buildDoors();
    }

    buildFloor() {
        const geometry = new THREE.BoxGeometry(this.width, this.wallThickness, this.depth);
        const material = new THREE.MeshStandardMaterial({
            color: this.floorColor,
            roughness: 0.8,
            opacity: 0.2,
            transparent: true
        });
        const floor = new THREE.Mesh(geometry, material);
        floor.position.y = 0;
        floor.receiveShadow = true;
        this.group.add(floor);
    }

    buildCeiling() {
        const geometry = new THREE.BoxGeometry(this.width, this.wallThickness, this.depth);
        const material = new THREE.MeshStandardMaterial({
            color: this.wallColor,
            roughness: 0.7,
            opacity: 0.2,
            transparent: true
        });
        const ceiling = new THREE.Mesh(geometry, material);
        ceiling.position.y = this.height;
        this.group.add(ceiling);
    }

    buildWalls() {
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: this.wallColor,
            roughness: 0.7,
            transparent: true,
            opacity: 0.2
        });

        // North wall
        const northWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.wallThickness),
            wallMaterial
        );
        northWall.position.set(0, 7.5, -6);
        this.group.add(northWall);

        // South wall (entrance)
        const southWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.wallThickness),
            wallMaterial
        );
        southWall.position.set(0, 7.5, 6);
        this.group.add(southWall);

        // West wall
        const westWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        westWall.position.set(-6, 7.5, 0);
        this.group.add(westWall);

        // East wall
        const eastWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        eastWall.position.set(6, 7.5, 0);
        this.group.add(eastWall);
    }

    buildReceptionDesk() {
        const deskMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a2510,
            roughness: 0.5,
            metalness: 0.2
        });

        // Main desk (centered, near south wall)
        const mainTop = new THREE.Mesh(
            new THREE.BoxGeometry(4, 0.1, 1.5),
            deskMaterial
        );
        mainTop.position.set(0, 1.1, 4);
        mainTop.castShadow = true;
        mainTop.receiveShadow = true;
        this.group.add(mainTop);

        // Front panel
        const frontPanel = new THREE.Mesh(
            new THREE.BoxGeometry(4, 0.8, 0.1),
            deskMaterial
        );
        frontPanel.position.set(0, 0.7, 4.75);
        frontPanel.castShadow = true;
        this.group.add(frontPanel);

        // Monitor on desk
        const monitorMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.4
        });

        const screenMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a4a6a,
            roughness: 0.3,
            emissive: 0x1a3a5a,
            emissiveIntensity: 0.3
        });

        const monitor = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 0.4, 0.05),
            monitorMaterial
        );
        monitor.position.set(0, 1.4, 3.5);
        monitor.castShadow = true;
        this.group.add(monitor);

        const screen = new THREE.Mesh(
            new THREE.BoxGeometry(0.55, 0.35, 0.02),
            screenMaterial
        );
        screen.position.set(0, 1.4, 3.48);
        this.group.add(screen);
    }

    buildDisplayScreens() {
        // Large display screens on north wall showing quantum data
        const screenMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a4a6a,
            roughness: 0.3,
            emissive: 0x1a3a5a,
            emissiveIntensity: 0.4
        });

        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            roughness: 0.5,
            metalness: 0.3
        });

        // Left screen
        const leftFrame = new THREE.Mesh(
            new THREE.BoxGeometry(3, 2, 0.1),
            frameMaterial
        );
        leftFrame.position.set(-3, 2.5, -5.9);
        leftFrame.castShadow = true;
        this.group.add(leftFrame);

        const leftScreen = new THREE.Mesh(
            new THREE.BoxGeometry(2.8, 1.8, 0.05),
            screenMaterial
        );
        leftScreen.position.set(-3, 2.5, -5.85);
        this.group.add(leftScreen);

        // Right screen
        const rightFrame = new THREE.Mesh(
            new THREE.BoxGeometry(3, 2, 0.1),
            frameMaterial
        );
        rightFrame.position.set(3, 2.5, -5.9);
        rightFrame.castShadow = true;
        this.group.add(rightFrame);

        const rightScreen = new THREE.Mesh(
            new THREE.BoxGeometry(2.8, 1.8, 0.05),
            screenMaterial
        );
        rightScreen.position.set(3, 2.5, -5.85);
        this.group.add(rightScreen);
    }

    buildDoors() {
        const doorMaterial = new THREE.MeshStandardMaterial({
            color: 0x4a4a4a,
            roughness: 0.5,
            metalness: 0.3
        });

        const handleMaterial = new THREE.MeshStandardMaterial({
            color: 0xc0c0c0,
            roughness: 0.3,
            metalness: 0.8
        });

        // Entrance door on south wall
        const doorSouth = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 2.5, 1),
            doorMaterial
        );
        doorSouth.position.set(0, 1.45, 5.9);
        doorSouth.castShadow = true;
        this.group.add(doorSouth);

        const handleSouth = new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8),
            handleMaterial
        );
        handleSouth.position.set(-0.3, 1.45, 5.9);
        handleSouth.rotation.z = Math.PI / 2;
        this.group.add(handleSouth);

        // Interior door on west wall (to labs)
        const doorWest = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 2.5, 1),
            doorMaterial
        );
        doorWest.position.set(-5.9, 1.45, -3);
        doorWest.castShadow = true;
        this.group.add(doorWest);

        const handleWest = new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8),
            handleMaterial
        );
        handleWest.position.set(-5.9, 1.45, -2.7);
        handleWest.rotation.z = Math.PI / 2;
        this.group.add(handleWest);
    }

    getGroup() {
        return this.group;
    }
}
