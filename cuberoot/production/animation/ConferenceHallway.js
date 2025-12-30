import * as THREE from 'three';

/**
 * Conference Hallway - L-shaped hallway outside conference room
 */
export class ConferenceHallway {
    constructor(options = {}) {
        this.width = options.width || 6;
        this.height = options.height || 10;
        this.depth = options.depth || 32;  // Doubled from 16
        this.perpDepth = options.perpDepth || 32;  // Perpendicular hallway length
        this.wallThickness = options.wallThickness || 0.2;
        this.wallColor = options.wallColor || 0x808080;
        this.floorColor = options.floorColor || 0x606060;

        this.group = new THREE.Group();

        this.build();
    }

    build() {
        this.buildMainHallway();
        this.buildPerpendicularHallway();
        this.buildBenches();
        this.buildConferenceRoomDoor();
        this.buildCoffeeAreaDoor();
    }

    buildMainHallway() {
        // North-south main hallway
        this.buildFloorSection(this.width, this.depth, 0, 0);
        this.buildCeilingSection(this.width, this.depth, 0, 0);
        this.buildMainWalls();
    }

    buildPerpendicularHallway() {
        // East-west hallway at north end
        // Positioned at z = -depth/2, extending east
        const perpZPos = -13;
        const perpXPos = 19;

        this.buildFloorSection(this.perpDepth, this.width, perpXPos, perpZPos);
        this.buildCeilingSection(this.perpDepth, this.width, perpXPos, perpZPos);
        this.buildPerpendicularWalls();
    }

    buildFloorSection(width, depth, x, z) {
        const geometry = new THREE.BoxGeometry(width, this.wallThickness, depth);
        const material = new THREE.MeshStandardMaterial({
            color: this.floorColor,
            roughness: 0.8,
            opacity: 0.2,
            transparent: true
        });
        const floor = new THREE.Mesh(geometry, material);
        floor.position.set(x, 0, z);
        floor.receiveShadow = true;
        this.group.add(floor);
    }

    buildCeilingSection(width, depth, x, z) {
        const geometry = new THREE.BoxGeometry(width, this.wallThickness, depth);
        const material = new THREE.MeshStandardMaterial({
            color: this.wallColor,
            roughness: 0.7,
            opacity: 0.2,
            transparent: true
        });
        const ceiling = new THREE.Mesh(geometry, material);
        ceiling.position.set(x, this.height, z);
        this.group.add(ceiling);
    }

    buildMainWalls() {
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: this.wallColor,
            roughness: 0.7,
            transparent: true,
            opacity: 0.2
        });

        // South wall (near end)
        const southWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.wallThickness),
            wallMaterial
        );
        southWall.position.set(0, 5, 16);
        this.group.add(southWall);

        // West wall (main hallway)
        const westWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        westWall.position.set(-3, 5, 0);
        this.group.add(westWall);

        // East wall (with conference room door) - only south of intersection
        const eastWallSouth = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, 26),
            wallMaterial
        );
        eastWallSouth.position.set(3, 5, 3);
        this.group.add(eastWallSouth);
    }

    buildPerpendicularWalls() {
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: this.wallColor,
            roughness: 0.7,
            transparent: true,
            opacity: 0.2
        });

        const perpZPos = -13;
        const perpXStart = 3;
        const perpXEnd = 35;

        // North wall of perpendicular hallway
        const northWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.perpDepth, this.height, this.wallThickness),
            wallMaterial
        );
        northWall.position.set(19, 5, -16);
        this.group.add(northWall);

        // South wall of perpendicular hallway
        const southWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.perpDepth, this.height, this.wallThickness),
            wallMaterial
        );
        southWall.position.set(19, 5, -10);
        this.group.add(southWall);

        // East end wall
        const eastWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.width),
            wallMaterial
        );
        eastWall.position.set(35, 5, -13);
        this.group.add(eastWall);
    }

    buildBenches() {
        const benchMaterial = new THREE.MeshStandardMaterial({
            color: 0x4a4a4a,
            roughness: 0.6
        });

        // West wall bench (south section)
        const benchWest1 = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 0.5, 0.4),
            benchMaterial
        );
        benchWest1.position.set(-2.25, 0.5, 10);
        benchWest1.castShadow = true;
        this.group.add(benchWest1);

        const backrestWest1 = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 0.8, 0.1),
            benchMaterial
        );
        backrestWest1.position.set(-2.25, 0.9, 10.15);
        backrestWest1.castShadow = true;
        this.group.add(backrestWest1);

        // West wall bench (middle section)
        const benchWest2 = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 0.5, 0.4),
            benchMaterial
        );
        benchWest2.position.set(-2.25, 0.5, 0);
        benchWest2.castShadow = true;
        this.group.add(benchWest2);

        const backrestWest2 = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 0.8, 0.1),
            benchMaterial
        );
        backrestWest2.position.set(-2.25, 0.9, 0.15);
        backrestWest2.castShadow = true;
        this.group.add(backrestWest2);

        // West wall bench (north section)
        const benchWest3 = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 0.5, 0.4),
            benchMaterial
        );
        benchWest3.position.set(-2.25, 0.5, -10);
        benchWest3.castShadow = true;
        this.group.add(benchWest3);

        const backrestWest3 = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 0.8, 0.1),
            benchMaterial
        );
        backrestWest3.position.set(-2.25, 0.9, -10.15);
        backrestWest3.castShadow = true;
        this.group.add(backrestWest3);
    }

    buildConferenceRoomDoor() {
        const doorMaterial = new THREE.MeshStandardMaterial({
            color: 0x5a5a5a,
            roughness: 0.5,
            metalness: 0.3
        });

        const handleMaterial = new THREE.MeshStandardMaterial({
            color: 0xc0c0c0,
            roughness: 0.3,
            metalness: 0.8
        });

        // Conference room door on east wall (center)
        const door = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 2.5, 1.2),
            doorMaterial
        );
        door.position.set(2.25, 1.45, 0);
        door.castShadow = true;
        this.group.add(door);

        const handle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8),
            handleMaterial
        );
        handle.position.set(1.9, 1.45, -0.4);
        handle.rotation.z = Math.PI / 2;
        this.group.add(handle);

        // Door sign
        const signMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a3a3a,
            roughness: 0.5
        });

        const sign = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.3, 0.6),
            signMaterial
        );
        sign.position.set(2.27, 2.2, -1);
        this.group.add(sign);
    }

    buildCoffeeAreaDoor() {
        const doorMaterial = new THREE.MeshStandardMaterial({
            color: 0x5a5a5a,
            roughness: 0.5,
            metalness: 0.3
        });

        const handleMaterial = new THREE.MeshStandardMaterial({
            color: 0xc0c0c0,
            roughness: 0.3,
            metalness: 0.8
        });

        // Coffee area door on perpendicular hallway north wall
        const perpZPos = -16;
        const door = new THREE.Mesh(
            new THREE.BoxGeometry(1, 2.5, 0.1),
            doorMaterial
        );
        door.position.set(11, 1.45, -18.9);
        door.castShadow = true;
        this.group.add(door);

        const handle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8),
            handleMaterial
        );
        handle.position.set(10.7, 1.45, -18.9);
        handle.rotation.z = Math.PI / 2;
        this.group.add(handle);
    }

    getGroup() {
        return this.group;
    }
}
