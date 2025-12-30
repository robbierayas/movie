import * as THREE from 'three';

/**
 * Food Experimentation Facility - large space with lab and production areas
 */
export class FoodExperimentationBuilding {
    constructor(options = {}) {
        this.width = options.width || 25;
        this.height = options.height || 12;
        this.depth = options.depth || 25;
        this.wallThickness = options.wallThickness || 0.2;
        this.wallColor = options.wallColor || 0x808080;
        this.floorColor = options.floorColor || 0x606060;

        this.group = new THREE.Group();

        this.build();
    }

    build() {
        this.buildFloor();
        this.buildCeiling();
        this.buildWalls();
        this.buildCentralWorkArea();
        this.buildProductionEquipment();
        this.buildStorageAreas();
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
        northWall.position.set(0, 6, -12.5);
        this.group.add(northWall);

        // South wall
        const southWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.wallThickness),
            wallMaterial
        );
        southWall.position.set(0, 6, 12.5);
        this.group.add(southWall);

        // West wall
        const westWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        westWall.position.set(-12.5, 6, 0);
        this.group.add(westWall);

        // East wall
        const eastWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        eastWall.position.set(12.5, 6, 0);
        this.group.add(eastWall);
    }

    buildCentralWorkArea() {
        const tableLength = 8;
        const tableWidth = 2;
        const tableHeight = 0.9;

        const tableMaterial = new THREE.MeshStandardMaterial({
            color: 0xa0a0a0,
            roughness: 0.6,
            metalness: 0.3
        });

        // 3 large work tables in center
        const positions = [
            { x: -6, z: 0 },
            { x: 0, z: 0 },
            { x: 6, z: 0 }
        ];

        positions.forEach(pos => {
            const table = this.createTable(tableLength, tableWidth, tableHeight, tableMaterial);
            table.position.set(pos.x, 0, pos.z);
            this.group.add(table);

            // Add work items on tables
            this.addWorkItems(pos.x, tableHeight, pos.z, tableLength, tableWidth);
        });
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
        const legGeometry = new THREE.BoxGeometry(0.1, height, 0.1);
        const legPositions = [
            [length / 2 - 0.4, height / 2, width / 2 - 0.4],
            [length / 2 - 0.4, height / 2, -width / 2 + 0.4],
            [-length / 2 + 0.4, height / 2, width / 2 - 0.4],
            [-length / 2 + 0.4, height / 2, -width / 2 + 0.4]
        ];

        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, material);
            leg.position.set(pos[0], pos[1], pos[2]);
            leg.castShadow = true;
            table.add(leg);
        });

        return table;
    }

    addWorkItems(centerX, tableHeight, centerZ, tableLength, tableWidth) {
        // Create boxes and containers representing work in progress
        const numItems = 4 + Math.floor(Math.random() * 3);

        for (let i = 0; i < numItems; i++) {
            const boxWidth = 0.2 + Math.random() * 0.3;
            const boxHeight = 0.15 + Math.random() * 0.25;
            const boxDepth = 0.2 + Math.random() * 0.3;

            const grayValue = Math.floor(0x50 + Math.random() * 0x70);
            const color = (grayValue << 16) | (grayValue << 8) | grayValue;

            const material = new THREE.MeshStandardMaterial({
                color: color,
                roughness: 0.6 + Math.random() * 0.3
            });

            const box = new THREE.Mesh(
                new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth),
                material
            );

            const xOffset = (Math.random() - 0.5) * (tableLength - 1);
            const zOffset = (Math.random() - 0.5) * (tableWidth - 0.5);

            box.position.set(
                centerX + xOffset,
                tableHeight + boxHeight / 2,
                centerZ + zOffset
            );

            box.rotation.y = (Math.random() - 0.5) * 0.5;
            box.castShadow = true;
            this.group.add(box);
        }
    }

    buildProductionEquipment() {
        const equipmentMaterial = new THREE.MeshStandardMaterial({
            color: 0x505050,
            roughness: 0.5,
            metalness: 0.5
        });

        // Large production machines (cylinders and boxes representing machinery)
        const machines = [
            { x: -8, z: -8, type: 'cylinder' },
            { x: 8, z: -8, type: 'box' },
            { x: -8, z: 8, type: 'box' },
            { x: 8, z: 8, type: 'cylinder' }
        ];

        machines.forEach(machine => {
            const machineGroup = new THREE.Group();

            if (machine.type === 'cylinder') {
                // Cylindrical machine
                const body = new THREE.Mesh(
                    new THREE.CylinderGeometry(1.2, 1.2, 3, 24),
                    equipmentMaterial
                );
                body.position.y = 1.5;
                body.castShadow = true;
                machineGroup.add(body);

                // Top cap
                const cap = new THREE.Mesh(
                    new THREE.CylinderGeometry(1.3, 1.2, 0.3, 24),
                    equipmentMaterial
                );
                cap.position.y = 3.15;
                cap.castShadow = true;
                machineGroup.add(cap);
            } else {
                // Box machine
                const body = new THREE.Mesh(
                    new THREE.BoxGeometry(2, 2.5, 1.5),
                    equipmentMaterial
                );
                body.position.y = 1.25;
                body.castShadow = true;
                machineGroup.add(body);

                // Control panel
                const panelMaterial = new THREE.MeshStandardMaterial({
                    color: 0x88ff88,
                    roughness: 0.3,
                    emissive: 0x44aa44,
                    emissiveIntensity: 0.3
                });

                const panel = new THREE.Mesh(
                    new THREE.BoxGeometry(0.6, 0.4, 0.05),
                    panelMaterial
                );
                panel.position.set(0, 1.5, 0.78);
                machineGroup.add(panel);
            }

            machineGroup.position.set(machine.x, 0, machine.z);
            this.group.add(machineGroup);
        });
    }

    buildStorageAreas() {
        const shelfMaterial = new THREE.MeshStandardMaterial({
            color: 0x606060,
            roughness: 0.6,
            metalness: 0.2
        });

        const shelfWidth = 4;
        const shelfHeight = 0.05;
        const shelfDepth = 0.8;

        // Storage shelves along north and south walls
        for (let wall = 0; wall < 2; wall++) {
            const zPos = wall === 0 ? -11.5 : 11.5;

            for (let i = 0; i < 3; i++) {
                const xPos = -6 + i * 6;

                // 3 shelves high
                for (let level = 0; level < 3; level++) {
                    const shelf = new THREE.Mesh(
                        new THREE.BoxGeometry(shelfWidth, shelfHeight, shelfDepth),
                        shelfMaterial
                    );
                    shelf.position.set(xPos, 0.5 + level * 1.5, zPos);
                    shelf.castShadow = true;
                    shelf.receiveShadow = true;
                    this.group.add(shelf);

                    // Add storage boxes on shelves
                    if (level < 2) {
                        this.addStorageBoxes(xPos, 0.5 + level * 1.5, zPos, shelfWidth);
                    }
                }

                // Shelf supports
                const supportPositions = [
                    [xPos - shelfWidth / 2 + 0.2, 1.5],
                    [xPos + shelfWidth / 2 - 0.2, 1.5]
                ];

                supportPositions.forEach(pos => {
                    const support = new THREE.Mesh(
                        new THREE.BoxGeometry(0.08, 3, 0.08),
                        shelfMaterial
                    );
                    support.position.set(pos[0], pos[1], zPos);
                    support.castShadow = true;
                    this.group.add(support);
                });
            }
        }
    }

    addStorageBoxes(centerX, shelfY, shelfZ, shelfWidth) {
        const numBoxes = 2 + Math.floor(Math.random() * 3);

        for (let i = 0; i < numBoxes; i++) {
            const boxSize = 0.3 + Math.random() * 0.2;
            const color = Math.random() > 0.5 ? 0x8a6e3a : 0x505050;

            const material = new THREE.MeshStandardMaterial({
                color: color,
                roughness: 0.7
            });

            const box = new THREE.Mesh(
                new THREE.BoxGeometry(boxSize, boxSize, boxSize),
                material
            );

            const xOffset = (i - numBoxes / 2) * (boxSize + 0.1);
            box.position.set(centerX + xOffset, shelfY + boxSize / 2 + 0.05, shelfZ);
            box.castShadow = true;
            this.group.add(box);
        }
    }

    buildDoors() {
        const doorWidth = 1.2;
        const doorHeight = 2.5;

        const doorMaterial = new THREE.MeshStandardMaterial({
            color: 0x505050,
            roughness: 0.5,
            metalness: 0.4
        });

        const doorPositions = [
            { x: 12.5, z: -5, rotation: 0 },
            { x: 12.5, z: 5, rotation: 0 },
            { x: -12.5, z: 0, rotation: 0 }
        ];

        doorPositions.forEach(doorPos => {
            const door = new THREE.Mesh(
                new THREE.BoxGeometry(0.1, doorHeight, doorWidth),
                doorMaterial
            );

            if (doorPos.x === 12.5) {
                door.position.set(12.35, 1.45, doorPos.z);
            } else {
                door.position.set(-12.35, 1.45, doorPos.z);
            }

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

            if (doorPos.x === 12.5) {
                handle.position.set(12.3, 1.45, doorPos.z + 0.4);
            } else {
                handle.position.set(-12.3, 1.45, doorPos.z + 0.4);
            }

            handle.rotation.z = Math.PI / 2;
            this.group.add(handle);
        });
    }

    getGroup() {
        return this.group;
    }
}
