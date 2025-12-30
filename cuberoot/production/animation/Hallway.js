import * as THREE from 'three';

/**
 * Generic hallway corridor with configurable length and optional doors
 */
export class Hallway {
    constructor(options = {}) {
        this.width = options.width || 3;
        this.height = options.height || 10;
        this.depth = options.depth || 20;
        this.wallThickness = options.wallThickness || 0.2;
        this.wallColor = options.wallColor || 0x707070;
        this.floorColor = options.floorColor || 0x505050;
        this.hasDoorNorth = options.hasDoorNorth !== undefined ? options.hasDoorNorth : true;
        this.hasDoorSouth = options.hasDoorSouth !== undefined ? options.hasDoorSouth : true;

        this.group = new THREE.Group();

        this.build();
    }

    build() {
        this.buildFloor();
        this.buildCeiling();
        this.buildWalls();
        this.buildLighting();
        if (this.hasDoorNorth) this.buildDoor('north');
        if (this.hasDoorSouth) this.buildDoor('south');
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

        // North wall (far end)
        const northWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.wallThickness),
            wallMaterial
        );
        northWall.position.set(0, 5, -10);
        this.group.add(northWall);

        // South wall (near end)
        const southWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.wallThickness),
            wallMaterial
        );
        southWall.position.set(0, 5, 10);
        this.group.add(southWall);

        // West wall
        const westWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        westWall.position.set(-1.5, 5, 0);
        this.group.add(westWall);

        // East wall
        const eastWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.wallThickness, this.height, this.depth),
            wallMaterial
        );
        eastWall.position.set(1.5, 5, 0);
        this.group.add(eastWall);
    }

    buildLighting() {
        // Overhead emissive ceiling panels every 5 units
        const panelWidth = this.width - 0.6;
        const panelDepth = 1.2;
        const spacing = 5;

        const lightMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.3,
            emissive: 0xffffff,
            emissiveIntensity: 0.5
        });

        const numPanels = Math.floor(this.depth / spacing);
        const startZ = -7.5;

        for (let i = 0; i < numPanels; i++) {
            const panel = new THREE.Mesh(
                new THREE.BoxGeometry(panelWidth, 0.05, panelDepth),
                lightMaterial
            );
            panel.position.set(0, 9.9, startZ + i * spacing);
            this.group.add(panel);
        }
    }

    buildDoor(position) {
        const doorWidth = 1;
        const doorHeight = 2.5;

        const doorMaterial = new THREE.MeshStandardMaterial({
            color: 0x4a4a4a,
            roughness: 0.5,
            metalness: 0.3
        });

        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x303030,
            roughness: 0.6
        });

        let zPos, zOffset;
        if (position === 'north') {
            zPos = -10;
            zOffset = 0.15;
        } else {
            zPos = 10;
            zOffset = -0.15;
        }

        // Door frame
        const frame = new THREE.Mesh(
            new THREE.BoxGeometry(doorWidth + 0.2, doorHeight + 0.2, 0.15),
            frameMaterial
        );
        frame.position.set(0, 1.45, zPos);
        this.group.add(frame);

        // Door
        const door = new THREE.Mesh(
            new THREE.BoxGeometry(doorWidth, doorHeight, 0.1),
            doorMaterial
        );
        door.position.set(0, 1.45, zPos + zOffset);
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
        handle.position.set(0.3333, 1.45, zPos + zOffset * 1.2);
        handle.rotation.z = Math.PI / 2;
        this.group.add(handle);
    }

    getGroup() {
        return this.group;
    }
}
