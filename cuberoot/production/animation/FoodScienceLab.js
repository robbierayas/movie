import * as THREE from 'three';

/**
 * Food Science Laboratory with work tables and scientific equipment
 */
export class FoodScienceLab {
    constructor(options = {}) {
        this.width = 14;
        this.height = 8;
        this.depth = 12;
        this.wallThickness = options.wallThickness || 0.2;
        this.wallColor = options.wallColor || 0xd0d0d0;
        this.floorColor = options.floorColor || 0xa0a0a0;

        this.group = new THREE.Group();

        this.build();
    }

    build() {
        this.buildFloor();
        this.buildCeiling();
        this.buildWalls();
        this.buildWorkTables();
        this.buildStorageCabinets();
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

        // North wall (with storage cabinets) - back wall
        const northWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.wallThickness),
            wallMaterial
        );
        northWall.position.set(0, 4, -6);
        this.group.add(northWall);

        // South wall - front wall
        const southWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.wallThickness),
            wallMaterial
        );
        southWall.position.set(0, 4, 6);
        this.group.add(southWall);

        // West wall
        const westWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        westWall.position.set(-7, 4, 0);
        this.group.add(westWall);

        // East wall (with door)
        const eastWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        eastWall.position.set(7, 4, 0);
        this.group.add(eastWall);
    }

    buildWorkTables() {
        const tableLength = 6;
        const tableWidth = 1.5;
        const tableHeight = 0.9;

        const tableMaterial = new THREE.MeshStandardMaterial({
            color: 0xe0e0e0,
            roughness: 0.5,
            metalness: 0.2
        });

        // 4 tables arranged in the room
        const positions = [
            { x: -3, z: -3 },
            { x: 3, z: -3 },
            { x: -3, z: 2 },
            { x: 3, z: 2 }
        ];

        positions.forEach(pos => {
            const table = this.createTable(tableLength, tableWidth, tableHeight, tableMaterial);
            table.position.set(pos.x, 0, pos.z);
            this.group.add(table);

            // Add scientific equipment on each table
            this.addScientificEquipment(pos.x, tableHeight, pos.z, tableLength, tableWidth);
        });
    }

    createTable(length, width, height, material) {
        const table = new THREE.Group();

        // Top
        const top = new THREE.Mesh(
            new THREE.BoxGeometry(length, 0.08, width),
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

    addScientificEquipment(centerX, tableHeight, centerZ, tableLength, tableWidth) {
        // Microscope (cylinder + box)
        const microscopeMaterial = new THREE.MeshStandardMaterial({
            color: 0x303030,
            roughness: 0.6,
            metalness: 0.4
        });

        const microscope = new THREE.Group();

        // Base
        const base = new THREE.Mesh(
            new THREE.CylinderGeometry(0.15, 0.18, 0.08, 16),
            microscopeMaterial
        );
        base.position.y = tableHeight + 0.04;
        microscope.add(base);

        // Body
        const body = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.08, 0.4, 12),
            microscopeMaterial
        );
        body.position.y = tableHeight + 0.28;
        body.rotation.x = Math.PI / 8;
        microscope.add(body);

        microscope.position.set(centerX - tableLength / 3, 0, centerZ);
        microscope.castShadow = true;
        this.group.add(microscope);

        // Beakers and containers (cylinders)
        const glasswarePositions = [
            { x: centerX, z: centerZ - 0.3, r: 0.08, h: 0.25, color: 0x88ccff },
            { x: centerX + 0.4, z: centerZ - 0.2, r: 0.06, h: 0.2, color: 0xffaa88 },
            { x: centerX - 0.3, z: centerZ + 0.2, r: 0.07, h: 0.22, color: 0xaaffaa }
        ];

        glasswarePositions.forEach(item => {
            const beaker = new THREE.Mesh(
                new THREE.CylinderGeometry(item.r, item.r * 0.9, item.h, 16),
                new THREE.MeshStandardMaterial({
                    color: item.color,
                    roughness: 0.2,
                    metalness: 0.1,
                    transparent: true,
                    opacity: 0.4
                })
            );
            beaker.position.set(item.x, tableHeight + item.h / 2, item.z);
            beaker.castShadow = true;
            this.group.add(beaker);
        });

        // Measurement device (box)
        const deviceMaterial = new THREE.MeshStandardMaterial({
            color: 0x505050,
            roughness: 0.5
        });

        const device = new THREE.Mesh(
            new THREE.BoxGeometry(0.3, 0.15, 0.25),
            deviceMaterial
        );
        device.position.set(centerX + tableLength / 3, tableHeight + 0.075, centerZ);
        device.castShadow = true;
        this.group.add(device);

        // Small screen on device
        const screenMaterial = new THREE.MeshStandardMaterial({
            color: 0x88ff88,
            roughness: 0.3,
            emissive: 0x44aa44,
            emissiveIntensity: 0.3
        });

        const screen = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 0.1, 0.02),
            screenMaterial
        );
        screen.position.set(centerX + tableLength / 3, tableHeight + 0.15, centerZ + 0.13);
        this.group.add(screen);
    }

    buildStorageCabinets() {
        const cabinetWidth = 1.5;
        const cabinetHeight = 2;
        const cabinetDepth = 0.5;

        const cabinetMaterial = new THREE.MeshStandardMaterial({
            color: 0xf0f0f0,
            roughness: 0.6
        });

        // Cabinets along north wall
        for (let i = 0; i < 3; i++) {
            const cabinet = new THREE.Mesh(
                new THREE.BoxGeometry(cabinetWidth, cabinetHeight, cabinetDepth),
                cabinetMaterial
            );
            cabinet.position.set(
                -4 + i * 4,
                1.2,
                -5.45
            );
            cabinet.castShadow = true;
            this.group.add(cabinet);

            // Cabinet handles
            const handleMaterial = new THREE.MeshStandardMaterial({
                color: 0xc0c0c0,
                roughness: 0.3,
                metalness: 0.8
            });

            const handle = new THREE.Mesh(
                new THREE.CylinderGeometry(0.02, 0.02, 0.2, 8),
                handleMaterial
            );
            handle.position.set(
                -4 + i * 4,
                1.2,
                -5.18
            );
            handle.rotation.z = Math.PI / 2;
            this.group.add(handle);
        }
    }

    buildDoor() {
        const doorWidth = 1;
        const doorHeight = 2.5;

        const doorMaterial = new THREE.MeshStandardMaterial({
            color: 0xf0f0f0,
            roughness: 0.5
        });

        const door = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, doorHeight, doorWidth),
            doorMaterial
        );
        door.position.set(6.85, 1.45, 0);
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
        handle.position.set(6.8, 1.45, 0.3333);
        handle.rotation.z = Math.PI / 2;
        this.group.add(handle);
    }

    getGroup() {
        return this.group;
    }
}
