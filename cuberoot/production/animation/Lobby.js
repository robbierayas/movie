import * as THREE from 'three';

/**
 * INZO Headquarters Lobby with timeline wall showing company history
 */
export class Lobby {
    constructor(options = {}) {
        this.width = options.width || 10;
        this.height = options.height || 15;
        this.depth = options.depth || 10;
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
        this.buildTimelineWall();
        this.buildReceptionDesk();
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

        // North wall (with timeline) - back wall
        const northWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.wallThickness),
            wallMaterial
        );
        northWall.position.set(0, 7.5, -5);
        this.group.add(northWall);

        // South wall (with entrance doors)
        const southWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.wallThickness),
            wallMaterial
        );
        southWall.position.set(0, 7.5, 5);
        this.group.add(southWall);

        // West wall
        const westWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        westWall.position.set(-5, 7.5, 0);
        this.group.add(westWall);

        // East wall
        const eastWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        eastWall.position.set(5, 7.5, 0);
        this.group.add(eastWall);
    }

    buildTimelineWall() {
        // Timeline panel at standing height on north wall
        const panelWidth = 8;
        const panelHeight = 3;
        const centerHeight = 1.5; // Standing eye level

        const panelMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            roughness: 0.5,
            metalness: 0.1
        });

        const panel = new THREE.Mesh(
            new THREE.BoxGeometry(panelWidth, panelHeight, 0.1),
            panelMaterial
        );
        panel.position.set(0, centerHeight, -4.8);
        panel.castShadow = true;
        this.group.add(panel);

        // INZO branding above timeline
        const inzoMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.3,
            metalness: 0.2,
            emissive: 0xcccccc,
            emissiveIntensity: 0.4
        });

        const inzoBox = new THREE.Mesh(
            new THREE.BoxGeometry(3, 0.6, 0.1),
            inzoMaterial
        );
        inzoBox.position.set(0, 3, -4.73);
        this.group.add(inzoBox);

        // SOF-TAK milestone (highlighted - Alex's achievement) - near west door
        const softakMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700,  // Gold color
            roughness: 0.3,
            metalness: 0.3,
            emissive: 0xffaa00,
            emissiveIntensity: 0.5
        });

        const softakBox = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.6, 0.1),  // Larger than other milestones
            softakMaterial
        );
        softakBox.position.set(-3, 1.5, -4.74);
        this.group.add(softakBox);

        // Add highlight border around SOF-TAK
        const borderMaterial = new THREE.MeshStandardMaterial({
            color: 0xffff00,
            roughness: 0.2,
            emissive: 0xffff00,
            emissiveIntensity: 0.3
        });

        const border = new THREE.Mesh(
            new THREE.BoxGeometry(2.2, 0.8, 0.08),
            borderMaterial
        );
        border.position.set(-3, 1.5, -4.76);
        this.group.add(border);

        // Visible milestones (white/light colored) - positioned across width
        const visibleMilestones = [
            { text: '1000 FACILITIES', x: -1, y: 1.8 },
            { text: 'N=3 CUBE 2010', x: 1, y: 2.2 },
            { text: 'INZO FOUNDED 1977', x: 3, y: 2 }
        ];

        const visibleMaterial = new THREE.MeshStandardMaterial({
            color: 0xe0e0e0,
            roughness: 0.4,
            emissive: 0xb0b0b0,
            emissiveIntensity: 0.2
        });

        visibleMilestones.forEach(milestone => {
            const box = new THREE.Mesh(
                new THREE.BoxGeometry(1.5, 0.4, 0.08),
                visibleMaterial
            );
            box.position.set(milestone.x, milestone.y, -4.75);
            this.group.add(box);
        });

        // Redacted milestones (dark rectangles painted over)
        const redactedMilestones = [
            { x: -2, y: 1 },
            { x: 2, y: 0.8 }
        ];

        const redactedMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.8
        });

        redactedMilestones.forEach(milestone => {
            const box = new THREE.Mesh(
                new THREE.BoxGeometry(1.6, 0.45, 0.09),
                redactedMaterial
            );
            box.position.set(milestone.x, milestone.y, -4.76);
            this.group.add(box);
        });

        // Timeline connector line
        const lineMaterial = new THREE.MeshStandardMaterial({
            color: 0x606060,
            roughness: 0.5
        });

        const line = new THREE.Mesh(
            new THREE.BoxGeometry(panelWidth - 0.5, 0.05, 0.08),
            lineMaterial
        );
        line.position.set(0, centerHeight, -4.78);
        this.group.add(line);
    }

    buildReceptionDesk() {
        // REFERENCE POINT: Southwest corner of main desk section
        const deskRef = {
            x: -3.5,  // West side of room
            y: 1.1,   // Desk height
            z: 4.5    // Near south wall
        };

        const deskThickness = 0.1;
        const mainWidth = 1.5;   // Short side (east-west)
        const mainDepth = 5;     // Long side (north-south)
        const returnWidth = 3;   // Extends east
        const returnDepth = 1.5; // Short depth

        const deskMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a2510,
            roughness: 0.5,
            metalness: 0.2
        });

        // Main section (short side against south wall, extends north)
        const mainTop = new THREE.Mesh(
            new THREE.BoxGeometry(mainWidth, deskThickness, mainDepth),
            deskMaterial
        );
        mainTop.position.set(
            deskRef.x + mainWidth *3,
            deskRef.y,
            deskRef.z - mainDepth / 2
        );
        mainTop.castShadow = true;
        mainTop.receiveShadow = true;
        this.group.add(mainTop);

        // Main front panel
        const mainFront = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, deskRef.y - 0.3, mainDepth),
            deskMaterial
        );
        mainFront.position.set(
            deskRef.x + mainWidth *3.5,
            (deskRef.y - 0.3) / 2 + 0.2,
            deskRef.z - mainDepth / 2
        );
        mainFront.castShadow = true;
        this.group.add(mainFront);

        // Return section (connects to south end, extends east)
        const returnTop = new THREE.Mesh(
            new THREE.BoxGeometry(returnWidth, deskThickness, returnDepth),
            deskMaterial
        );
        returnTop.position.set(
            deskRef.x + mainWidth / 2 + returnWidth / 2,
            deskRef.y,
            deskRef.z - mainDepth +returnWidth/4
        );
        returnTop.castShadow = true;
        returnTop.receiveShadow = true;
        this.group.add(returnTop);

        // Return front panel
        const returnFront = new THREE.Mesh(
            new THREE.BoxGeometry(returnWidth, deskRef.y - 0.3, 0.1),
            deskMaterial
        );
        returnFront.position.set(
            deskRef.x + mainWidth / 2 + returnWidth / 2,
            (deskRef.y - 0.3) / 2 + 0.2,
            deskRef.z - mainDepth
        );
        returnFront.castShadow = true;
        this.group.add(returnFront);

        // Computer monitor on return desk
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
        monitor.position.set(
            deskRef.x + mainWidth / 2 + 1,
            deskRef.y + 0.3,
            deskRef.z - returnDepth / 2
        );
        monitor.castShadow = true;
        this.group.add(monitor);

        const screen = new THREE.Mesh(
            new THREE.BoxGeometry(0.55, 0.35, 0.02),
            screenMaterial
        );
        screen.position.set(
            deskRef.x + mainWidth / 2 + 1,
            deskRef.y + 0.3,
            deskRef.z - returnDepth / 2 + 0.03
        );
        this.group.add(screen);
    }

    buildDoors() {
        const doorWidth = 1;
        const doorHeight = 2.5;

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

        // Entrance door on east wall
        const doorEast = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, doorHeight, doorWidth),
            doorMaterial
        );
        doorEast.position.set(4.85, 1.45, 0);
        doorEast.castShadow = true;
        this.group.add(doorEast);

        const handleEast = new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8),
            handleMaterial
        );
        handleEast.position.set(4.9, 1.45, -0.3333);
        handleEast.rotation.z = Math.PI / 2;
        this.group.add(handleEast);

        // Food Science Lab door on west wall (close to north wall)
        const doorWest = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, doorHeight, doorWidth),
            doorMaterial
        );
        doorWest.position.set(-4.85, 1.45, -3);
        doorWest.castShadow = true;
        this.group.add(doorWest);

        const handleWest = new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8),
            handleMaterial
        );
        handleWest.position.set(-4.9, 1.45, -2.6667);
        handleWest.rotation.z = Math.PI / 2;
        this.group.add(handleWest);
    }

    getGroup() {
        return this.group;
    }
}
