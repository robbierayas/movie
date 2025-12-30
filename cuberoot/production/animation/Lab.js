import * as THREE from 'three';

/**
 * Lab room with work tables, loading bay, office desks, and n=0 device
 */
export class Lab {
    constructor(options = {}) {
        this.width = options.width || 20;
        this.height = options.height || 12;
        this.depth = options.depth || 25;
        this.wallThickness = options.wallThickness || 0.2;
        this.wallColor = options.wallColor || 0x707070;
        this.floorColor = options.floorColor || 0x505050;

        this.group = new THREE.Group();

        this.build();
    }

    build() {
        this.buildFloor();
        this.buildCeiling();
        this.buildWalls();
        this.buildWorkTables();
        this.buildLoadingBayDoor();
        this.buildDoor();
        this.buildOfficeDesks();
        this.buildN0Device();
    }

    buildFloor() {
        const geometry = new THREE.BoxGeometry(this.width, this.wallThickness, this.depth);
        const material = new THREE.MeshStandardMaterial({
            color: this.floorColor,
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

        // Back wall (with loading bay) - North
        const backWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.wallThickness),
            wallMaterial
        );
        backWall.position.set(0, 6, -12.5);
        this.group.add(backWall);

        // Front wall - South
        const frontWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.wallThickness),
            wallMaterial
        );
        frontWall.position.set(0, 6, 12.5);
        this.group.add(frontWall);

        // Left wall - West
        const leftWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        leftWall.position.set(-10, 6, 0);
        this.group.add(leftWall);

        // Right wall - East
        const rightWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        rightWall.position.set(10, 6, 0);
        this.group.add(rightWall);
    }

    buildWorkTables() {
        const tableLength = 8;
        const tableWidth = 1.5;
        const tableHeight = 0.9;

        const tableMaterial = new THREE.MeshStandardMaterial({
            color: 0x4a4a4a,
            roughness: 0.6,
            metalness: 0.3
        });

        // Two parallel tables near back wall
        const spacing = 4;

        // Table 1 (left)
        const table1 = this.createTable(tableLength, tableWidth, tableHeight, tableMaterial);
        table1.position.set(-2, 0, -9.5);
        table1.rotation.y = Math.PI / 2;
        this.group.add(table1);

        // Add boxes on table 1
        this.addBoxesOnTable(-2, tableHeight, -9.5, tableWidth, tableLength);

        // Table 2 (right)
        const table2 = this.createTable(tableLength, tableWidth, tableHeight, tableMaterial);
        table2.position.set(2, 0, -9.5);
        table2.rotation.y = Math.PI / 2;
        this.group.add(table2);

        // Add boxes on table 2
        this.addBoxesOnTable(2, tableHeight, -9.5, tableWidth, tableLength);
    }

    addBoxesOnTable(centerX, tableHeight, centerZ, tableWidth, tableLength) {
        // Create organized boxes in a grid pattern with small variations
        const rows = 3;
        const cols = 6;
        const spacingZ = tableLength / (cols + 1);
        const spacingX = tableWidth / (rows + 1);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // Box dimensions with small variation
                const boxWidth = 0.3 + Math.random() * 0.2;
                const boxHeight = 0.2 + Math.random() * 0.3;
                const boxDepth = 0.3 + Math.random() * 0.2;

                // Random gray color
                const grayValue = Math.floor(0x40 + Math.random() * 0x60);
                const color = (grayValue << 16) | (grayValue << 8) | grayValue;

                const boxMaterial = new THREE.MeshStandardMaterial({
                    color: color,
                    roughness: 0.6 + Math.random() * 0.3
                });

                const box = new THREE.Mesh(
                    new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth),
                    boxMaterial
                );

                // Grid position with small random offset
                const xOffset = (row - (rows - 1) / 2) * spacingX + (Math.random() - 0.5) * 0.1;
                const zOffset = (col - (cols - 1) / 2) * spacingZ + (Math.random() - 0.5) * 0.1;

                box.position.set(
                    centerX + xOffset,
                    tableHeight + boxHeight / 2 + 0.05,
                    centerZ + zOffset
                );

                // Small random rotation
                box.rotation.y = (Math.random() - 0.5) * 0.3;

                box.castShadow = true;
                this.group.add(box);
            }
        }
    }

    createTable(length, width, height, material) {
        const table = new THREE.Group();

        // Top
        const top = new THREE.Mesh(
            new THREE.BoxGeometry(length, 0.1, width),
            material
        );
        top.position.y = height;
        top.castShadow = true;
        top.receiveShadow = true;
        table.add(top);

        // Legs
        const legGeometry = new THREE.BoxGeometry(0.08, height, 0.08);
        const legPositions = [
            [length / 2 - 0.3, height / 2, width / 2 - 0.3],
            [length / 2 - 0.3, height / 2, -width / 2 + 0.3],
            [-length / 2 + 0.3, height / 2, width / 2 - 0.3],
            [-length / 2 + 0.3, height / 2, -width / 2 + 0.3]
        ];

        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, material);
            leg.position.set(pos[0], pos[1], pos[2]);
            leg.castShadow = true;
            table.add(leg);
        });

        return table;
    }

    buildLoadingBayDoor() {
        const doorWidth = 6;
        const doorHeight = 4;

        // Door frame
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x303030,
            roughness: 0.7,
            metalness: 0.4
        });

        const frame = new THREE.Mesh(
            new THREE.BoxGeometry(doorWidth + 0.4, doorHeight + 0.4, 0.2),
            frameMaterial
        );
        frame.position.set(0, 1.45, -12.4);
        this.group.add(frame);

        // Door (segmented for industrial look)
        const doorMaterial = new THREE.MeshStandardMaterial({
            color: 0x505050,
            roughness: 0.6,
            metalness: 0.5
        });

        const segments = 6;
        const segmentHeight = doorHeight / segments;

        for (let i = 0; i < segments; i++) {
            const segment = new THREE.Mesh(
                new THREE.BoxGeometry(doorWidth, segmentHeight - 0.05, 0.15),
                doorMaterial
            );
            segment.position.set(
                0,
                0.2 + segmentHeight / 2 + i * segmentHeight,
                -12.35
            );
            segment.castShadow = true;
            this.group.add(segment);
        }
    }

    buildDoor() {
        // Regular entrance door on north wall, left of loading bay
        const doorWidth = 1.2;
        const doorHeight = 2.4;
        const doorX = -7; // Left (west) of loading bay

        // Door frame
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x404040,
            roughness: 0.6,
            metalness: 0.3
        });

        const frame = new THREE.Mesh(
            new THREE.BoxGeometry(doorWidth + 0.15, doorHeight + 0.15, 0.15),
            frameMaterial
        );
        frame.position.set(doorX, doorHeight / 2, -12.42);
        this.group.add(frame);

        // Door
        const doorMaterial = new THREE.MeshStandardMaterial({
            color: 0x606060,
            roughness: 0.5,
            metalness: 0.4
        });

        const door = new THREE.Mesh(
            new THREE.BoxGeometry(doorWidth, doorHeight, 0.1),
            doorMaterial
        );
        door.position.set(doorX, doorHeight / 2, -12.38);
        door.castShadow = true;
        this.group.add(door);

        // Door handle
        const handleMaterial = new THREE.MeshStandardMaterial({
            color: 0x808080,
            roughness: 0.3,
            metalness: 0.8
        });

        const handle = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 0.05, 0.08),
            handleMaterial
        );
        handle.position.set(doorX + doorWidth / 3, doorHeight / 2, -12.33);
        this.group.add(handle);
    }

    buildOfficeDesks() {
        const deskWidth = 2.5;
        const deskDepth = 0.8;
        const deskHeight = 0.75;

        const deskMaterial = new THREE.MeshStandardMaterial({
            color: 0xf0f0f0,
            roughness: 0.5
        });

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

        const chairMaterial = new THREE.MeshStandardMaterial({
            color: 0x202020,
            roughness: 0.6
        });

        // 2 groups of 4 desks, closer to each wall
        // Group 1 - closer to west wall
        for (let i = 0; i < 4; i++) {
            const xPos = -6;
            const zPos = -4 + i * 2.5;

            // Desk
            const desk = this.createDesk(deskWidth, deskDepth, deskHeight, deskMaterial);
            desk.position.set(xPos, 0, zPos);
            this.group.add(desk);

            // Monitor on left side of desk
            const monitor = this.createMonitor(monitorMaterial, screenMaterial);
            monitor.position.set(xPos - deskWidth / 2 + 0.4, deskHeight, zPos - 0.2);
            this.group.add(monitor);

            // Chair on right side of desk with small random offset
            const chair = this.createOfficeChair(0.5, 0.5, 1, 0.5, chairMaterial);
            const chairXOffset = (Math.random() - 0.5) * 0.1;
            const chairZOffset = (Math.random() - 0.5) * 0.1;
            const chairRotOffset = (Math.random() - 0.5) * 0.2;
            chair.position.set(xPos + deskWidth / 2 + 0.5 + chairXOffset, 0, zPos + chairZOffset);
            chair.rotation.y = Math.PI / 2 + chairRotOffset;
            this.group.add(chair);
        }

        // Group 2 - closer to east wall
        for (let i = 0; i < 4; i++) {
            const xPos = 6;
            const zPos = -4 + i * 2.5;

            // Desk
            const desk = this.createDesk(deskWidth, deskDepth, deskHeight, deskMaterial);
            desk.position.set(xPos, 0, zPos);
            this.group.add(desk);

            // Monitor on right side of desk
            const monitor = this.createMonitor(monitorMaterial, screenMaterial);
            monitor.position.set(xPos + deskWidth / 2 - 0.4, deskHeight, zPos - 0.2);
            this.group.add(monitor);

            // Chair on left side of desk with small random offset
            const chair = this.createOfficeChair(0.5, 0.5, 1, 0.5, chairMaterial);
            const chairXOffset = (Math.random() - 0.5) * 0.1;
            const chairZOffset = (Math.random() - 0.5) * 0.1;
            const chairRotOffset = (Math.random() - 0.5) * 0.2;
            chair.position.set(xPos - deskWidth / 2 - 0.5 + chairXOffset, 0, zPos + chairZOffset);
            chair.rotation.y = -Math.PI / 2 + chairRotOffset;
            this.group.add(chair);
        }
    }

    createDesk(width, depth, height, material) {
        const desk = new THREE.Group();

        // Desktop
        const top = new THREE.Mesh(
            new THREE.BoxGeometry(width, 0.08, depth),
            material
        );
        top.position.y = height;
        top.castShadow = true;
        top.receiveShadow = true;
        desk.add(top);

        // Legs
        const legGeometry = new THREE.BoxGeometry(0.06, height, 0.06);
        const legPositions = [
            [width / 2 - 0.2, height / 2, depth / 2 - 0.2],
            [width / 2 - 0.2, height / 2, -depth / 2 + 0.2],
            [-width / 2 + 0.2, height / 2, depth / 2 - 0.2],
            [-width / 2 + 0.2, height / 2, -depth / 2 + 0.2]
        ];

        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, material);
            leg.position.set(pos[0], pos[1], pos[2]);
            leg.castShadow = true;
            desk.add(leg);
        });

        return desk;
    }

    createMonitor(frameMaterial, screenMaterial) {
        const monitor = new THREE.Group();

        // Monitor frame
        const frame = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.4, 0.05),
            frameMaterial
        );
        frame.position.set(0, 0.25, 0);
        frame.castShadow = true;
        monitor.add(frame);

        // Screen
        const screen = new THREE.Mesh(
            new THREE.BoxGeometry(0.45, 0.35, 0.02),
            screenMaterial
        );
        screen.position.set(0, 0.25, 0.03);
        monitor.add(screen);

        // Stand
        const stand = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.08, 0.15, 8),
            frameMaterial
        );
        stand.position.set(0, 0.075, 0);
        stand.castShadow = true;
        monitor.add(stand);

        return monitor;
    }

    createOfficeChair(width, depth, height, seatHeight, material) {
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

    buildN0Device() {
        const deviceGroup = new THREE.Group();

        // Main chamber (cylindrical)
        const chamberRadius = 2;
        const chamberHeight = 0.2;

        const chamberMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a3a,
            roughness: 0.3,
            metalness: 0.7,
            emissive: 0x1a1a2a,
            emissiveIntensity: 0.2
        });

        const chamber = new THREE.Mesh(
            new THREE.CylinderGeometry(chamberRadius, chamberRadius, chamberHeight, 32),
            chamberMaterial
        );
        chamber.position.y = chamberHeight / 2 + 0.5;
        chamber.castShadow = true;
        deviceGroup.add(chamber);

        // Central glowing core
        const coreGeometry = new THREE.SphereGeometry(0.8, 32, 32);
        const coreMaterial = new THREE.MeshStandardMaterial({
            color: 0x4466ff,
            roughness: 0.2,
            metalness: 0.5,
            emissive: 0x3355ee,
            emissiveIntensity: 0.8,
            transparent: true,
            opacity: 0.7
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        core.position.y = chamberHeight / 2 + 0.5;
        deviceGroup.add(core);

        // Small base platform (walkable)
        const baseMaterial = new THREE.MeshStandardMaterial({
            color: 0x303030,
            roughness: 0.6,
            metalness: 0.4
        });

        const base = new THREE.Mesh(
            new THREE.CylinderGeometry(chamberRadius + 0.2, chamberRadius + 0.3, 0.2, 32),
            baseMaterial
        );
        base.position.y = 0.1;
        base.castShadow = true;
        deviceGroup.add(base);

        // Control panels (4 around the device)
        const panelMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.5
        });

        const screenMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff88,
            roughness: 0.3,
            emissive: 0x00aa55,
            emissiveIntensity: 0.5
        });

        for (let i = 0; i < 4; i++) {
            const angle = (Math.PI / 2) * i;
            const distance = chamberRadius + 0.8;

            // Panel stand
            const panelStand = new THREE.Mesh(
                new THREE.BoxGeometry(0.6, 1.2, 0.1),
                panelMaterial
            );
            panelStand.position.set(
                Math.cos(angle) * distance,
                1.1,
                Math.sin(angle) * distance
            );
            panelStand.rotation.y = -angle+Math.PI/2;
            panelStand.castShadow = true;
            deviceGroup.add(panelStand);

            // Panel screen
            const panelScreen = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.4, 0.02),
                screenMaterial
            );
            panelScreen.position.set(
                Math.cos(angle) * (distance + 0.06),
                1.3,
                Math.sin(angle) * (distance + 0.06)
            );
            panelScreen.rotation.y = -angle+Math.PI/2;
            deviceGroup.add(panelScreen);
        }

        // Position device on south wall, centered (aligned with loading bay on north wall)
        deviceGroup.position.set(0, 0, 12);
        this.group.add(deviceGroup);
    }

    getGroup() {
        return this.group;
    }
}
