import * as THREE from 'three';

/**
 * Conference room with table, chairs, projection screen, and door
 */
export class ConferenceRoom {
    constructor(options = {}) {
        this.width = 20;
        this.height = 2.875;
        this.depth = 15;
        this.wallThickness = options.wallThickness || 0.2;
        this.wallColor = options.wallColor || 0x808080;
        this.floorColor = options.floorColor || 0x404040;

        this.group = new THREE.Group();

        this.build();
    }

    build() {
        this.buildFloor();
        this.buildCeiling();
        this.buildWalls();
        this.buildTable();
        this.buildChairs();
        this.buildProjectionScreen();
        this.buildDoor();
    }

    buildFloor() {
        const geometry = new THREE.BoxGeometry(this.width, this.wallThickness, this.depth);
        const material = new THREE.MeshStandardMaterial({
            color: this.floorColor,
            opacity: 0.2,
            transparent: true,
            roughness: 0.8
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
            opacity: 0.2,
            transparent: true,
            roughness: 0.7
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

        // Back wall (with projection screen) - North
        const backWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.wallThickness),
            wallMaterial
        );
        backWall.position.set(0, 1.4375, -7.5);
        this.group.add(backWall);

        // Front wall - South
        const frontWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.wallThickness),
            wallMaterial
        );
        frontWall.position.set(0, 1.4375, 7.5);
        this.group.add(frontWall);

        // Left wall (with door) - West
        const leftWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        leftWall.position.set(-10, 1.4375, 0);
        this.group.add(leftWall);

        // Right wall (with single chair) - East
        const rightWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        rightWall.position.set(10, 1.4375, 0);
        this.group.add(rightWall);
    }

    buildTable() {
        const tableLength = 12;
        const tableWidth = 3;
        const tableHeight = 0.8;
        const legThickness = 0.1;

        // Table top
        const topGeometry = new THREE.BoxGeometry(tableLength, 0.1, tableWidth);
        const topMaterial = new THREE.MeshStandardMaterial({
            color: 0x4a3520,
            roughness: 0.6,
            metalness: 0.1
        });
        const tableTop = new THREE.Mesh(topGeometry, topMaterial);
        tableTop.position.set(0, tableHeight, 0);
        tableTop.castShadow = true;
        tableTop.receiveShadow = true;
        this.group.add(tableTop);

        // Table legs (4 corners)
        const legGeometry = new THREE.BoxGeometry(legThickness, tableHeight, legThickness);
        const legMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a2510,
            roughness: 0.7
        });

        const legPositions = [
            [tableLength / 2 - 0.5, tableHeight / 2, tableWidth / 2 - 0.5],
            [tableLength / 2 - 0.5, tableHeight / 2, -tableWidth / 2 + 0.5],
            [-tableLength / 2 + 0.5, tableHeight / 2, tableWidth / 2 - 0.5],
            [-tableLength / 2 + 0.5, tableHeight / 2, -tableWidth / 2 + 0.5]
        ];

        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(pos[0], pos[1], pos[2]);
            leg.castShadow = true;
            this.group.add(leg);
        });
    }

    buildChairs() {
        const chairWidth = 0.5;
        const chairDepth = 0.5;
        const chairHeight = 1;
        const seatHeight = 0.5;

        const chairMaterial = new THREE.MeshStandardMaterial({
            color: 0x202020,
            roughness: 0.6
        });

        // 5 chairs on each side of table (10 total)
        const tableLength = 12;
        const spacing = tableLength / 6;

        for (let i = 0; i < 5; i++) {
            const xPos = -tableLength / 2 + spacing + i * spacing;

            // Side 1 (north side)
            const chair1 = this.createChair(chairWidth, chairDepth, chairHeight, seatHeight, chairMaterial);
            chair1.position.set(xPos, 0, -2);
            chair1.rotation.y = 0;
            this.group.add(chair1);

            // Side 2 (south side)
            const chair2 = this.createChair(chairWidth, chairDepth, chairHeight, seatHeight, chairMaterial);
            chair2.position.set(xPos, 0, 2);
            chair2.rotation.y = Math.PI;
            this.group.add(chair2);
        }

        // Single chair against south wall (front)
        const singleChair = this.createChair(chairWidth, chairDepth, chairHeight, seatHeight, chairMaterial);
        singleChair.position.set(0, 0, 6.5);
        singleChair.rotation.y = Math.PI;
        this.group.add(singleChair);
    }

    createChair(width, depth, height, seatHeight, material) {
        const chair = new THREE.Group();

        // Seat
        const seatGeometry = new THREE.BoxGeometry(width, 0.1, depth);
        const seat = new THREE.Mesh(seatGeometry, material);
        seat.position.y = seatHeight;
        seat.castShadow = true;
        chair.add(seat);

        // Backrest
        const backGeometry = new THREE.BoxGeometry(width, height - seatHeight, 0.1);
        const back = new THREE.Mesh(backGeometry, material);
        back.position.set(0, seatHeight + (height - seatHeight) / 2, -depth / 2);
        back.castShadow = true;
        chair.add(back);

        // Legs (4)
        const legGeometry = new THREE.CylinderGeometry(0.03, 0.03, seatHeight, 8);
        const legPositions = [
            [width / 2 - 0.1, seatHeight / 2, depth / 2 - 0.1],
            [width / 2 - 0.1, seatHeight / 2, -depth / 2 + 0.1],
            [-width / 2 + 0.1, seatHeight / 2, depth / 2 - 0.1],
            [-width / 2 + 0.1, seatHeight / 2, -depth / 2 + 0.1]
        ];

        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, material);
            leg.position.set(pos[0], pos[1], pos[2]);
            leg.castShadow = true;
            chair.add(leg);
        });

        return chair;
    }

    buildProjectionScreen() {
        const screenWidth = 6;
        const screenHeight = 3.5;

        // Screen frame
        const frameGeometry = new THREE.BoxGeometry(0.1, screenHeight + 0.2, screenWidth + 0.2);
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.5
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.set(-9.8, 0.875, 0);
        this.group.add(frame);

        // Screen surface
        const screenGeometry = new THREE.BoxGeometry(0.05, screenHeight, screenWidth);
        const screenMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.3,
            emissive: 0xffffff,
            emissiveIntensity: 0.4
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(-9.75, 0.875, 0);
        this.group.add(screen);
    }

    buildDoor() {
        const doorWidth = 1;
        const doorHeight = 2.5;

        const doorGeometry = new THREE.BoxGeometry(0.1, doorHeight, doorWidth);
        const doorMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a2510,
            roughness: 0.6
        });
        const door = new THREE.Mesh(doorGeometry, doorMaterial);
        door.position.set(9.85, 1.35, 3.75);
        door.castShadow = true;
        this.group.add(door);

        // Door handle
        const handleGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8);
        const handleMaterial = new THREE.MeshStandardMaterial({
            color: 0xc0c0c0,
            roughness: 0.3,
            metalness: 0.8
        });
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        handle.position.set(9.8, 1.25, 4.0833);
        handle.rotation.z = Math.PI / 2;
        this.group.add(handle);
    }

    getGroup() {
        return this.group;
    }
}
