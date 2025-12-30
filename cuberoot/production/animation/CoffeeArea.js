import * as THREE from 'three';

/**
 * Coffee/Break Area - small room with coffee station and casual seating
 */
export class CoffeeArea {
    constructor(options = {}) {
        this.width = options.width || 8;
        this.height = options.height || 10;
        this.depth = options.depth || 10;
        this.wallThickness = options.wallThickness || 0.2;
        this.wallColor = options.wallColor || 0x909090;
        this.floorColor = options.floorColor || 0x707070;

        this.group = new THREE.Group();

        this.build();
    }

    build() {
        this.buildFloor();
        this.buildCeiling();
        this.buildWalls();
        this.buildCoffeeStation();
        this.buildSmallTables();
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

        // West wall
        const westWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        westWall.position.set(-4, 5, 0);
        this.group.add(westWall);

        // East wall
        const eastWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        eastWall.position.set(4, 5, 0);
        this.group.add(eastWall);
    }

    buildCoffeeStation() {
        const counterMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a2510,
            roughness: 0.6
        });

        const machineMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            roughness: 0.5,
            metalness: 0.4
        });

        // Counter along north wall
        const counter = new THREE.Mesh(
            new THREE.BoxGeometry(4, 0.1, 1),
            counterMaterial
        );
        counter.position.set(0, 0.9, -4.4);
        counter.castShadow = true;
        counter.receiveShadow = true;
        this.group.add(counter);

        // Counter front panel
        const frontPanel = new THREE.Mesh(
            new THREE.BoxGeometry(4, 0.8, 0.1),
            counterMaterial
        );
        frontPanel.position.set(0, 0.5, -3.9);
        frontPanel.castShadow = true;
        this.group.add(frontPanel);

        // Coffee machine
        const coffeeMachine = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.6, 0.4),
            machineMaterial
        );
        coffeeMachine.position.set(-1, 1.2, -4.3);
        coffeeMachine.castShadow = true;
        this.group.add(coffeeMachine);

        // Screen on coffee machine
        const screenMaterial = new THREE.MeshStandardMaterial({
            color: 0x88ff88,
            roughness: 0.3,
            emissive: 0x44aa44,
            emissiveIntensity: 0.3
        });

        const screen = new THREE.Mesh(
            new THREE.BoxGeometry(0.25, 0.15, 0.02),
            screenMaterial
        );
        screen.position.set(-1, 1.35, -4.1);
        this.group.add(screen);

        // Cups holder
        const cupsMaterial = new THREE.MeshStandardMaterial({
            color: 0xe0e0e0,
            roughness: 0.4
        });

        const cupsHolder = new THREE.Mesh(
            new THREE.BoxGeometry(0.4, 0.2, 0.3),
            cupsMaterial
        );
        cupsHolder.position.set(0.5, 1, -4.3);
        cupsHolder.castShadow = true;
        this.group.add(cupsHolder);

        // Water dispenser
        const dispenser = new THREE.Mesh(
            new THREE.CylinderGeometry(0.15, 0.18, 0.8, 16),
            new THREE.MeshStandardMaterial({
                color: 0x88ccff,
                roughness: 0.3,
                transparent: true,
                opacity: 0.6
            })
        );
        dispenser.position.set(1.5, 1.3, -4.3);
        dispenser.castShadow = true;
        this.group.add(dispenser);
    }

    buildSmallTables() {
        const tableMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a2510,
            roughness: 0.6
        });

        const chairMaterial = new THREE.MeshStandardMaterial({
            color: 0x404040,
            roughness: 0.7
        });

        // Small round table 1 (west side)
        const table1Top = new THREE.Mesh(
            new THREE.CylinderGeometry(0.6, 0.6, 0.08, 16),
            tableMaterial
        );
        table1Top.position.set(-2, 0.8, 1);
        table1Top.castShadow = true;
        table1Top.receiveShadow = true;
        this.group.add(table1Top);

        const table1Leg = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.12, 0.8, 12),
            tableMaterial
        );
        table1Leg.position.set(-2, 0.4, 1);
        table1Leg.castShadow = true;
        this.group.add(table1Leg);

        // Chairs for table 1
        const chair1 = this.createChair(chairMaterial);
        chair1.position.set(-2.6, 0, 1);
        this.group.add(chair1);

        const chair2 = this.createChair(chairMaterial);
        chair2.position.set(-1.4, 0, 1);
        this.group.add(chair2);

        // Small round table 2 (east side)
        const table2Top = new THREE.Mesh(
            new THREE.CylinderGeometry(0.6, 0.6, 0.08, 16),
            tableMaterial
        );
        table2Top.position.set(2, 0.8, 1);
        table2Top.castShadow = true;
        table2Top.receiveShadow = true;
        this.group.add(table2Top);

        const table2Leg = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.12, 0.8, 12),
            tableMaterial
        );
        table2Leg.position.set(2, 0.4, 1);
        table2Leg.castShadow = true;
        this.group.add(table2Leg);

        // Chairs for table 2
        const chair3 = this.createChair(chairMaterial);
        chair3.position.set(1.4, 0, 1);
        this.group.add(chair3);

        const chair4 = this.createChair(chairMaterial);
        chair4.position.set(2.6, 0, 1);
        this.group.add(chair4);
    }

    createChair(material) {
        const chair = new THREE.Group();

        // Seat
        const seat = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.1, 0.5),
            material
        );
        seat.position.y = 0.5;
        seat.castShadow = true;
        chair.add(seat);

        // Backrest
        const backrest = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.6, 0.1),
            material
        );
        backrest.position.set(0, 0.8, -0.2);
        backrest.castShadow = true;
        chair.add(backrest);

        // Legs
        const legGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8);
        const legPositions = [
            [0.2, 0.25, 0.2],
            [0.2, 0.25, -0.2],
            [-0.2, 0.25, 0.2],
            [-0.2, 0.25, -0.2]
        ];

        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, material);
            leg.position.set(pos[0], pos[1], pos[2]);
            leg.castShadow = true;
            chair.add(leg);
        });

        return chair;
    }

    buildDoor() {
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

        // Door on south wall
        const door = new THREE.Mesh(
            new THREE.BoxGeometry(1, 2.5, 0.1),
            doorMaterial
        );
        door.position.set(0, 1.45, 4.9);
        door.castShadow = true;
        this.group.add(door);

        const handle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8),
            handleMaterial
        );
        handle.position.set(-0.3, 1.45, 4.9);
        handle.rotation.z = Math.PI / 2;
        this.group.add(handle);
    }

    getGroup() {
        return this.group;
    }
}
