import * as THREE from 'three';

/**
 * Executive office with desk, chairs, bookshelf, and window
 */
export class EdgarOffice {
    constructor(options = {}) {
        this.width = options.width || 12;
        this.height = options.height || 10;
        this.depth = options.depth || 10;
        this.wallThickness = options.wallThickness || 0.2;
        this.wallColor = options.wallColor || 0x6a5a4a;
        this.floorColor = options.floorColor || 0x4a3a2a;

        this.group = new THREE.Group();

        this.build();
    }

    build() {
        this.buildFloor();
        this.buildCeiling();
        this.buildWalls();
        this.buildDesk();
        this.buildChairs();
        this.buildBookshelf();
        this.buildWindow();
        this.buildMeetingArea();
        this.buildDoor();
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
        northWall.position.set(0, 5, -5);
        this.group.add(northWall);

        // South wall (with door)
        const southWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.wallThickness),
            wallMaterial
        );
        southWall.position.set(0, 5, 5);
        this.group.add(southWall);

        // West wall (with window)
        const westWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        westWall.position.set(-6, 5, 0);
        this.group.add(westWall);

        // East wall
        const eastWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        eastWall.position.set(6, 5, 0);
        this.group.add(eastWall);
    }

    buildDesk() {
        const deskWidth = 2.5;
        const deskDepth = 1.2;
        const deskHeight = 0.75;

        const deskMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a2510,
            roughness: 0.4,
            metalness: 0.2
        });

        // Desktop
        const top = new THREE.Mesh(
            new THREE.BoxGeometry(deskWidth, 0.08, deskDepth),
            deskMaterial
        );
        top.position.set(-2, deskHeight, -2);
        top.castShadow = true;
        top.receiveShadow = true;
        this.group.add(top);

        // Desk legs
        const legGeometry = new THREE.BoxGeometry(0.08, deskHeight, 0.08);
        const legPositions = [
            [-2 + deskWidth / 2 - 0.2, deskHeight / 2, -2 + deskDepth / 2 - 0.2],
            [-2 + deskWidth / 2 - 0.2, deskHeight / 2, -2 - deskDepth / 2 + 0.2],
            [-2 - deskWidth / 2 + 0.2, deskHeight / 2, -2 + deskDepth / 2 - 0.2],
            [-2 - deskWidth / 2 + 0.2, deskHeight / 2, -2 - deskDepth / 2 + 0.2]
        ];

        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, deskMaterial);
            leg.position.set(pos[0], pos[1], pos[2]);
            leg.castShadow = true;
            this.group.add(leg);
        });

        // Desk accessories
        this.addDeskAccessories(-2, deskHeight, -2, deskWidth, deskDepth);
    }

    addDeskAccessories(centerX, deskHeight, centerZ, deskWidth, deskDepth) {
        // Computer monitor
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
        monitor.position.set(centerX - 0.5, deskHeight + 0.3, centerZ - deskDepth / 3);
        monitor.castShadow = true;
        this.group.add(monitor);

        const screen = new THREE.Mesh(
            new THREE.BoxGeometry(0.55, 0.35, 0.02),
            screenMaterial
        );
        screen.position.set(centerX - 0.5, deskHeight + 0.3, centerZ - deskDepth / 3 + 0.03);
        this.group.add(screen);

        // Desk lamp
        const lampMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            roughness: 0.5,
            metalness: 0.6
        });

        const lampBase = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.1, 0.05, 16),
            lampMaterial
        );
        lampBase.position.set(centerX + 0.6, deskHeight + 0.025, centerZ + deskDepth / 3);
        lampBase.castShadow = true;
        this.group.add(lampBase);

        const lampArm = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8),
            lampMaterial
        );
        lampArm.position.set(centerX + 0.6, deskHeight + 0.3, centerZ + deskDepth / 3);
        lampArm.rotation.z = Math.PI / 4;
        lampArm.castShadow = true;
        this.group.add(lampArm);

        // Picture frame
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            roughness: 0.4
        });

        const frame = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 0.2, 0.02),
            frameMaterial
        );
        frame.position.set(centerX + 0.3, deskHeight + 0.1, centerZ);
        frame.rotation.y = -Math.PI / 6;
        frame.castShadow = true;
        this.group.add(frame);
    }

    buildChairs() {
        const chairWidth = 0.6;
        const chairDepth = 0.6;
        const chairHeight = 1.2;
        const seatHeight = 0.5;

        const chairMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            roughness: 0.5
        });

        // Executive desk chair
        const deskChair = this.createChair(chairWidth, chairDepth, chairHeight, seatHeight, chairMaterial, true);
        deskChair.position.set(-2, 0, -0.5);
        deskChair.rotation.y = Math.PI;
        this.group.add(deskChair);

        // Guest chairs (2)
        const guestChair1 = this.createChair(0.5, 0.5, 1, 0.5, chairMaterial, false);
        guestChair1.position.set(-0.5, 0, -2.5);
        guestChair1.rotation.y = -Math.PI / 2;
        this.group.add(guestChair1);

        const guestChair2 = this.createChair(0.5, 0.5, 1, 0.5, chairMaterial, false);
        guestChair2.position.set(-0.5, 0, -1.5);
        guestChair2.rotation.y = -Math.PI / 2;
        this.group.add(guestChair2);
    }

    createChair(width, depth, height, seatHeight, material, isExecutive) {
        const chair = new THREE.Group();

        // Seat
        const seatGeometry = new THREE.BoxGeometry(width, 0.1, depth);
        const seat = new THREE.Mesh(seatGeometry, material);
        seat.position.y = seatHeight;
        seat.castShadow = true;
        chair.add(seat);

        // Backrest
        const backHeight = isExecutive ? height - seatHeight + 0.3 : height - seatHeight;
        const backGeometry = new THREE.BoxGeometry(width, backHeight, 0.1);
        const back = new THREE.Mesh(backGeometry, material);
        back.position.set(0, seatHeight + backHeight / 2, -depth / 2);
        back.castShadow = true;
        chair.add(back);

        // Legs
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

    buildBookshelf() {
        const shelfWidth = 2.5;
        const shelfHeight = 2.5;
        const shelfDepth = 0.4;

        const shelfMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a2510,
            roughness: 0.6
        });

        // Main bookshelf frame
        const frame = new THREE.Mesh(
            new THREE.BoxGeometry(shelfWidth, shelfHeight, shelfDepth),
            shelfMaterial
        );
        frame.position.set(5.5, 1.45, -2);
        frame.castShadow = true;
        this.group.add(frame);

        // Individual shelves (5 levels)
        for (let i = 0; i < 5; i++) {
            const shelf = new THREE.Mesh(
                new THREE.BoxGeometry(shelfWidth - 0.1, 0.05, shelfDepth - 0.05),
                shelfMaterial
            );
            shelf.position.set(
                5.5,
                0.2 + i * 0.6,
                -2
            );
            shelf.castShadow = true;
            shelf.receiveShadow = true;
            this.group.add(shelf);

            // Add books on each shelf
            if (i < 4) {
                this.addBooks(5.5, 0.2 + i * 0.6, -2, shelfWidth - 0.2);
            }
        }
    }

    addBooks(centerX, shelfY, shelfZ, shelfWidth) {
        const numBooks = 8 + Math.floor(Math.random() * 5);

        for (let i = 0; i < numBooks; i++) {
            const bookWidth = 0.08 + Math.random() * 0.04;
            const bookHeight = 0.3 + Math.random() * 0.15;
            const bookDepth = 0.15;

            const colors = [0x8a4a2a, 0x2a4a6a, 0x4a2a2a, 0x2a5a2a, 0x5a4a2a];
            const color = colors[Math.floor(Math.random() * colors.length)];

            const material = new THREE.MeshStandardMaterial({
                color: color,
                roughness: 0.7
            });

            const book = new THREE.Mesh(
                new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth),
                material
            );

            const xOffset = (i - numBooks / 2) * (bookWidth + 0.01);
            book.position.set(centerX + xOffset, shelfY + bookHeight / 2 + 0.03, shelfZ);

            // Slight random tilt
            book.rotation.z = (Math.random() - 0.5) * 0.1;
            book.castShadow = true;
            this.group.add(book);
        }
    }

    buildWindow() {
        const windowWidth = 3;
        const windowHeight = 2.5;

        // Window frame
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0xf0f0f0,
            roughness: 0.5
        });

        const frame = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, windowHeight, windowWidth),
            frameMaterial
        );
        frame.position.set(-5.85, 5, 0);
        frame.castShadow = true;
        this.group.add(frame);

        // Window glass (emissive to simulate outside light)
        const glassMaterial = new THREE.MeshStandardMaterial({
            color: 0xaaccff,
            roughness: 0.1,
            metalness: 0.1,
            emissive: 0x88aacc,
            emissiveIntensity: 0.4,
            transparent: true,
            opacity: 0.3
        });

        const glass = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, windowHeight - 0.2, windowWidth - 0.2),
            glassMaterial
        );
        glass.position.set(-5.85, 5, 0);
        this.group.add(glass);
    }

    buildMeetingArea() {
        const tableMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a2510,
            roughness: 0.5
        });

        // Small meeting table
        const table = new THREE.Mesh(
            new THREE.BoxGeometry(1.5, 0.08, 1),
            tableMaterial
        );
        table.position.set(2, 0.5, 2);
        table.castShadow = true;
        table.receiveShadow = true;
        this.group.add(table);

        // Table legs
        const legGeometry = new THREE.BoxGeometry(0.08, 0.5, 0.08);
        const legPositions = [
            [2 + 0.6, 0.25, 2 + 0.4],
            [2 + 0.6, 0.25, 2 - 0.4],
            [2 - 0.6, 0.25, 2 + 0.4],
            [2 - 0.6, 0.25, 2 - 0.4]
        ];

        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, tableMaterial);
            leg.position.set(pos[0], pos[1], pos[2]);
            leg.castShadow = true;
            this.group.add(leg);
        });

        // Small couch/sofa
        const sofaMaterial = new THREE.MeshStandardMaterial({
            color: 0x4a3a2a,
            roughness: 0.8
        });

        const sofaSeat = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.4, 0.8),
            sofaMaterial
        );
        sofaSeat.position.set(2, 0.4, 3.5);
        sofaSeat.castShadow = true;
        this.group.add(sofaSeat);

        const sofaBack = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.8, 0.2),
            sofaMaterial
        );
        sofaBack.position.set(2, 0.7, 3.9);
        sofaBack.castShadow = true;
        this.group.add(sofaBack);
    }

    buildDoor() {
        const doorWidth = 1;
        const doorHeight = 2.5;

        const doorMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a2510,
            roughness: 0.5
        });

        const door = new THREE.Mesh(
            new THREE.BoxGeometry(doorWidth, doorHeight, 0.1),
            doorMaterial
        );
        door.position.set(-2, 1.45, 4.85);
        door.castShadow = true;
        this.group.add(door);

        // Door handle
        const handleMaterial = new THREE.MeshStandardMaterial({
            color: 0xc0c0c0,
            roughness: 0.3,
            metalness: 0.8
        });

        const handle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.03, 0.25, 8),
            handleMaterial
        );
        handle.position.set(-1.6, 1.45, 4.9);
        handle.rotation.z = Math.PI / 2;
        this.group.add(handle);
    }

    getGroup() {
        return this.group;
    }
}
