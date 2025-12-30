import * as THREE from 'three';

/**
 * Cube room class following the n=3 cube design specifications
 *
 * Design specs:
 * - 6 equal-sized faces (floor, ceiling, 4 walls)
 * - Door in center of each face (or null for edge rooms)
 * - 4 sets of ladder rungs per door (90° apart)
 * - Fractal-like tiles on blank walls
 * - Walls emit light at normal brightness
 * - Walls can change color
 * - Doors can close/open
 */
export class CubeRoom {
    constructor(options = {}) {
        this.size = options.size || 10;
        this.wallThickness = options.wallThickness || 0.1;
        this.wallColor = options.wallColor || 0x808080;
        this.wallOpacity = options.wallOpacity !== undefined ? options.wallOpacity : 0.2;
        this.floorColor = options.floorColor || 0x606060;

        // Which faces have doors (null means edge of cube - no door)
        this.doors = {
            north: options.doors?.north !== false, // back wall (-Z)
            south: options.doors?.south !== false, // front wall (+Z)
            east: options.doors?.east !== false,   // right wall (+X)
            west: options.doors?.west !== false,   // left wall (-X)
            up: options.doors?.up !== false,       // ceiling (+Y)
            down: options.doors?.down !== false    // floor (-Y)
        };

        this.group = new THREE.Group();
        this.wallMeshes = {};
        this.doorMeshes = {};
        this.doorStates = {}; // Track door open/closed state
        this.doorAnimations = {}; // Track ongoing animations

        // Create wall texture once and reuse
        this.wallTexture = this.createTileTexture();

        this.build();
    }

    /**
     * Create fractal-like tile pattern for walls
     */
    createTileTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Base color
        ctx.fillStyle = '#505050';
        ctx.fillRect(0, 0, 512, 512);

        // Draw recursive tile pattern
        const drawTiles = (x, y, size, depth) => {
            if (size < 8 || depth > 4) return;

            // Draw tile border
            ctx.strokeStyle = `rgba(${100 + depth * 20}, ${100 + depth * 20}, ${100 + depth * 20}, 0.3)`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, size, size);

            // Recursive subdivision
            if (depth < 3) {
                const half = size / 2;
                const quarter = size / 4;

                // Create fractal subdivision pattern
                if (Math.random() > 0.3) {
                    drawTiles(x, y, half, depth + 1);
                    drawTiles(x + half, y, half, depth + 1);
                    drawTiles(x, y + half, half, depth + 1);
                    drawTiles(x + half, y + half, half, depth + 1);
                }
            }

            // Add subtle detail
            ctx.fillStyle = `rgba(${120 + Math.random() * 40}, ${120 + Math.random() * 40}, ${120 + Math.random() * 40}, 0.1)`;
            ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
        };

        // Create grid of tiles
        const tileSize = 64;
        for (let x = 0; x < 512; x += tileSize) {
            for (let y = 0; y < 512; y += tileSize) {
                drawTiles(x, y, tileSize, 0);
            }
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);

        return texture;
    }

    build() {
        this.buildFloor();
        this.buildCeiling();
        this.buildWalls();
    }

    buildFloor() {
        const geometry = new THREE.BoxGeometry(
            this.size,
            this.wallThickness,
            this.size
        );

        const material = new THREE.MeshStandardMaterial({
            color: this.floorColor,
            roughness: 0.8,
            emissive: this.floorColor,
            emissiveIntensity: 0.1,
            map: this.wallTexture,
            emissiveMap: this.wallTexture
        });

        const floor = new THREE.Mesh(geometry, material);
        floor.position.y = -this.size / 2;
        floor.receiveShadow = true;
        this.group.add(floor);
        this.wallMeshes.floor = floor;

        if (this.doors.down) {
            this.addDoorAndRungs('down', 0, -this.size / 2, 0);
        }
    }

    buildCeiling() {
        const geometry = new THREE.BoxGeometry(
            this.size,
            this.wallThickness,
            this.size
        );

        const material = new THREE.MeshStandardMaterial({
            color: this.wallColor,
            roughness: 0.7,
            metalness: 0.2,
            transparent: true,
            opacity: this.wallOpacity,
            emissive: this.wallColor,
            emissiveIntensity: 0.15,
            map: this.wallTexture,
            emissiveMap: this.wallTexture
        });

        const ceiling = new THREE.Mesh(geometry, material);
        ceiling.position.y = this.size / 2;
        this.group.add(ceiling);
        this.wallMeshes.ceiling = ceiling;

        if (this.doors.up) {
            this.addDoorAndRungs('up', 0, this.size / 2, 0);
        }
    }

    buildWalls() {
        // North wall (back, -Z)
        this.buildWall('north',
            new THREE.BoxGeometry(this.size, this.size, this.wallThickness),
            new THREE.Vector3(0, 0, -this.size / 2)
        );

        // South wall (front, +Z)
        this.buildWall('south',
            new THREE.BoxGeometry(this.size, this.size, this.wallThickness),
            new THREE.Vector3(0, 0, this.size / 2)
        );

        // West wall (left, -X)
        this.buildWall('west',
            new THREE.BoxGeometry(this.wallThickness, this.size, this.size),
            new THREE.Vector3(-this.size / 2, 0, 0)
        );

        // East wall (right, +X)
        this.buildWall('east',
            new THREE.BoxGeometry(this.wallThickness, this.size, this.size),
            new THREE.Vector3(this.size / 2, 0, 0)
        );
    }

    buildWall(direction, geometry, position) {
        const material = new THREE.MeshStandardMaterial({
            color: this.wallColor,
            roughness: 0.7,
            metalness: 0.2,
            transparent: true,
            opacity: this.wallOpacity,
            emissive: this.wallColor,
            emissiveIntensity: 0.15,
            map: this.wallTexture,
            emissiveMap: this.wallTexture
        });

        if (this.doors[direction]) {
            // Build wall in 4 pieces with opening for door
            this.buildWallWithOpening(direction, position, material);
            this.addDoorAndRungs(direction, position.x, position.y, position.z);
        } else {
            // Build solid wall
            const wall = new THREE.Mesh(geometry, material);
            wall.position.copy(position);
            this.group.add(wall);
            this.wallMeshes[direction] = wall;
        }
    }

    buildWallWithOpening(direction, position, material) {
        const doorWidth = 2;
        const doorHeight = 3;
        const doorCenterY = -1; // Door center is 1 unit below room center

        // Calculate door bounds
        const doorLeft = -doorWidth / 2;
        const doorRight = doorWidth / 2;
        const doorBottom = doorCenterY - doorHeight / 2; // -2.5
        const doorTop = doorCenterY + doorHeight / 2;     // 0.5

        const wallGroup = new THREE.Group();

        if (direction === 'north' || direction === 'south') {
            // Wall runs horizontally (X) and vertically (Y)
            const wallLeft = -this.size / 2;
            const wallRight = this.size / 2;
            const wallBottom = -this.size / 2;
            const wallTop = this.size / 2;

            // Left section (from wall left to door left)
            const leftWidth = doorLeft - wallLeft;
            const leftGeom = new THREE.BoxGeometry(leftWidth, this.size, this.wallThickness);
            const leftWall = new THREE.Mesh(leftGeom, material);
            leftWall.position.set(wallLeft + leftWidth / 2, position.y, position.z);
            wallGroup.add(leftWall);

            // Right section (from door right to wall right)
            const rightWidth = wallRight - doorRight;
            const rightGeom = new THREE.BoxGeometry(rightWidth, this.size, this.wallThickness);
            const rightWall = new THREE.Mesh(rightGeom, material);
            rightWall.position.set(doorRight + rightWidth / 2, position.y, position.z);
            wallGroup.add(rightWall);

            // Top section (from door top to ceiling)
            const topHeight = wallTop - doorTop;
            const topGeom = new THREE.BoxGeometry(doorWidth, topHeight, this.wallThickness);
            const topWall = new THREE.Mesh(topGeom, material);
            topWall.position.set(0, doorTop + topHeight / 2, position.z);
            wallGroup.add(topWall);

            // Bottom section (from floor to door bottom)
            const bottomHeight = doorBottom - wallBottom;
            const bottomGeom = new THREE.BoxGeometry(doorWidth, bottomHeight, this.wallThickness);
            const bottomWall = new THREE.Mesh(bottomGeom, material);
            bottomWall.position.set(0, wallBottom + bottomHeight / 2, position.z);
            wallGroup.add(bottomWall);

        } else if (direction === 'east' || direction === 'west') {
            // Wall runs horizontally (Z) and vertically (Y)
            const wallFront = -this.size / 2;
            const wallBack = this.size / 2;
            const wallBottom = -this.size / 2;
            const wallTop = this.size / 2;

            // Front section (from wall front to door front)
            const frontDepth = doorLeft - wallFront;
            const frontGeom = new THREE.BoxGeometry(this.wallThickness, this.size, frontDepth);
            const frontWall = new THREE.Mesh(frontGeom, material);
            frontWall.position.set(position.x, position.y, wallFront + frontDepth / 2);
            wallGroup.add(frontWall);

            // Back section (from door back to wall back)
            const backDepth = wallBack - doorRight;
            const backGeom = new THREE.BoxGeometry(this.wallThickness, this.size, backDepth);
            const backWall = new THREE.Mesh(backGeom, material);
            backWall.position.set(position.x, position.y, doorRight + backDepth / 2);
            wallGroup.add(backWall);

            // Top section
            const topHeight = wallTop - doorTop;
            const topGeom = new THREE.BoxGeometry(this.wallThickness, topHeight, doorWidth);
            const topWall = new THREE.Mesh(topGeom, material);
            topWall.position.set(position.x, doorTop + topHeight / 2, 0);
            wallGroup.add(topWall);

            // Bottom section
            const bottomHeight = doorBottom - wallBottom;
            const bottomGeom = new THREE.BoxGeometry(this.wallThickness, bottomHeight, doorWidth);
            const bottomWall = new THREE.Mesh(bottomGeom, material);
            bottomWall.position.set(position.x, wallBottom + bottomHeight / 2, 0);
            wallGroup.add(bottomWall);
        }

        this.group.add(wallGroup);
        this.wallMeshes[direction] = wallGroup;
    }

    addDoorAndRungs(direction, x, y, z) {
        const doorWidth = 2;
        const doorHeight = 3;

        // Door frame - starts closed (solid)
        const doorGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, this.wallThickness * 2);
        const doorMaterial = new THREE.MeshStandardMaterial({
            color: 0x202020,
            emissive: 0x202020,
            emissiveIntensity: 0.05,
            transparent: true,
            opacity: 0.9  // Nearly opaque when closed
        });

        const door = new THREE.Mesh(doorGeometry, doorMaterial);

        // Position and rotate door based on direction
        switch(direction) {
            case 'north':
                door.position.set(x, y - 1, z + this.wallThickness);
                // Door already faces correct direction (default orientation)
                this.addLadderRungs(direction, x, y - 1, z + this.wallThickness * 2);
                break;
            case 'south':
                door.position.set(x, y - 1, z - this.wallThickness);
                door.rotation.y = Math.PI; // Rotate 180° to face opposite direction
                this.addLadderRungs(direction, x, y - 1, z - this.wallThickness * 2);
                break;
            case 'west':
                door.position.set(x + this.wallThickness, y - 1, z);
                door.rotation.y = Math.PI / 2; // Rotate 90° to face east
                this.addLadderRungs(direction, x + this.wallThickness * 2, y - 1, z);
                break;
            case 'east':
                door.position.set(x - this.wallThickness, y - 1, z);
                door.rotation.y = -Math.PI / 2; // Rotate -90° to face west
                this.addLadderRungs(direction, x - this.wallThickness * 2, y - 1, z);
                break;
            case 'up':
                door.position.set(x, y - this.wallThickness, z);
                door.rotation.x = Math.PI / 2; // Rotate to lie flat on ceiling
                this.addLadderRungs(direction, x, y - this.wallThickness * 2, z);
                break;
            case 'down':
                door.position.set(x, y + this.wallThickness, z);
                door.rotation.x = -Math.PI / 2; // Rotate to lie flat on floor
                this.addLadderRungs(direction, x, y + this.wallThickness * 2, z);
                break;
        }

        this.group.add(door);
        this.doorMeshes[direction] = door;
        this.doorStates[direction] = false; // Doors start closed
    }

    addLadderRungs(direction, doorX, doorY, doorZ) {
        const rungRadius = 0.04;
        const doorWidth = 2;
        const doorHeight = 3;
        const rungSpacing = 0.3;

        const rungMaterial = new THREE.MeshStandardMaterial({
            color: 0x404040,
            metalness: 0.6,
            roughness: 0.4,
            transparent: true,
            opacity: 0.22
        });

        // Calculate door edges based on direction
        const halfWidth = doorWidth / 2;
        const halfHeight = doorHeight / 2;

        // Different configurations for each wall direction
        if (direction === 'north') {
            // North wall (-Z), door faces +Z into room
            this.createRungSet(doorX, doorY + halfHeight, doorZ, 'horizontal-y', doorY + halfHeight, this.size/2, rungSpacing, rungMaterial); // top edge to ceiling
            this.createRungSet(doorX, doorY - halfHeight, doorZ, 'horizontal-y', -this.size/2, doorY - halfHeight, rungSpacing, rungMaterial); // bottom edge to floor
            this.createRungSet(doorX - halfWidth, doorY, doorZ, 'horizontal-x', -this.size/2, doorX - halfWidth, rungSpacing, rungMaterial); // left edge to west wall
            this.createRungSet(doorX + halfWidth, doorY, doorZ, 'horizontal-x', doorX + halfWidth, this.size/2, rungSpacing, rungMaterial); // right edge to east wall
        } else if (direction === 'south') {
            // South wall (+Z), door faces -Z into room
            this.createRungSet(doorX, doorY + halfHeight, doorZ, 'horizontal-y', doorY + halfHeight, this.size/2, rungSpacing, rungMaterial); // top edge to ceiling
            this.createRungSet(doorX, doorY - halfHeight, doorZ, 'horizontal-y', -this.size/2, doorY - halfHeight, rungSpacing, rungMaterial); // bottom edge to floor
            this.createRungSet(doorX - halfWidth, doorY, doorZ, 'horizontal-x', -this.size/2, doorX - halfWidth, rungSpacing, rungMaterial); // left edge to west wall
            this.createRungSet(doorX + halfWidth, doorY, doorZ, 'horizontal-x', doorX + halfWidth, this.size/2, rungSpacing, rungMaterial); // right edge to east wall
        } else if (direction === 'west') {
            // West wall (-X), door faces +X into room
            this.createRungSet(doorX, doorY + halfHeight, doorZ, 'horizontal-y2', doorY + halfHeight, this.size/2, rungSpacing, rungMaterial); // top edge to ceiling
            this.createRungSet(doorX, doorY - halfHeight, doorZ, 'horizontal-y2', -this.size/2, doorY - halfHeight, rungSpacing, rungMaterial); // bottom edge to floor
            this.createRungSet(doorX, doorY, doorZ - halfWidth, 'horizontal-z', -this.size/2, doorZ - halfWidth, rungSpacing, rungMaterial); // left edge to south wall
            this.createRungSet(doorX, doorY, doorZ + halfWidth, 'horizontal-z', doorZ + halfWidth, this.size/2, rungSpacing, rungMaterial); // right edge to north wall
        } else if (direction === 'east') {
            // East wall (+X), door faces -X into room
            this.createRungSet(doorX, doorY + halfHeight, doorZ, 'horizontal-y2', doorY + halfHeight, this.size/2, rungSpacing, rungMaterial); // top edge to ceiling
            this.createRungSet(doorX, doorY - halfHeight, doorZ, 'horizontal-y2', -this.size/2, doorY - halfHeight, rungSpacing, rungMaterial); // bottom edge to floor
            this.createRungSet(doorX, doorY, doorZ - halfWidth, 'horizontal-z', -this.size/2, doorZ - halfWidth, rungSpacing, rungMaterial); // left edge to south wall
            this.createRungSet(doorX, doorY, doorZ + halfWidth, 'horizontal-z', doorZ + halfWidth, this.size/2, rungSpacing, rungMaterial); // right edge to north wall
        } else if (direction === 'up') {
            // Ceiling (+Y), door faces -Y into room
            this.createRungSet(doorX, doorY, doorZ + halfWidth, 'horizontal-z2', doorZ + halfWidth, this.size/2, rungSpacing, rungMaterial); // north edge - door to north wall
            this.createRungSet(doorX, doorY, doorZ - halfWidth, 'horizontal-z2', -this.size/2, doorZ - halfWidth, rungSpacing, rungMaterial); // south edge - south wall to door
            this.createRungSet(doorX - halfWidth, doorY, doorZ, 'horizontal-x2', -this.size/2, doorX - halfWidth, rungSpacing, rungMaterial); // west edge - west wall to door
            this.createRungSet(doorX + halfWidth, doorY, doorZ, 'horizontal-x2', doorX + halfWidth, this.size/2, rungSpacing, rungMaterial); // east edge - door to east wall
        } else if (direction === 'down') {
            // Floor (-Y), door faces +Y into room
            this.createRungSet(0, doorY, doorZ + halfWidth, 'horizontal-z2', doorZ + halfWidth, this.size/2, rungSpacing, rungMaterial); // north edge - door to north wall
            this.createRungSet(0, doorY, doorZ - halfWidth, 'horizontal-z2', -this.size/2, doorZ - halfWidth, rungSpacing, rungMaterial); // south edge - south wall to door
            this.createRungSet(doorX - halfWidth, doorY, doorZ, 'horizontal-x2', -this.size/2, doorX - halfWidth, rungSpacing, rungMaterial); // west edge - west wall to door
            this.createRungSet(doorX + halfWidth, doorY, doorZ, 'horizontal-x2', doorX + halfWidth, this.size/2, rungSpacing, rungMaterial); // east edge - door to east wall
        }
    }

    /**
     * Create a set of rungs extending from door edge to room edge
     */
    createRungSet(startX, startY, startZ, orientation, rangeStart, rangeEnd, spacing, material) {
        const rungRadius = 0.04;
        const rungLength = 0.2; // Short length to be flush with wall
        const numRungs = 4; // Always exactly 4 rungs per set

        for (let i = 0; i < numRungs; i++) {
            const rungGeometry = new THREE.CylinderGeometry(rungRadius, rungRadius, rungLength, 8);
            const rung = new THREE.Mesh(rungGeometry, material);
            rung.castShadow = true;

            const progress = (i + 1) / (numRungs + 1);
            const position = rangeStart + (rangeEnd - rangeStart) * progress;

            // Position and orient based on direction
            if (orientation === 'horizontal-x') {
                // Rung runs along X axis
                rung.position.set(position, startY, startZ);
                rung.rotation.z = Math.PI ;
            } else if (orientation === 'horizontal-x2') {
                // Rung runs along X axis (for ceiling/floor)
                rung.position.set(position, startY, startZ);
                rung.rotation.z = Math.PI/2;
                rung.rotation.y = Math.PI/2;
            } else if (orientation === 'horizontal-y') {
                // Rung runs along Y axis (vertical)
                rung.position.set(startX, position, startZ);
                rung.rotation.z = Math.PI/2 ;
                // No rotation needed - default orientation
            } else if (orientation === 'horizontal-y2') {
                // Rung runs along Y axis (for east/west walls top/bottom)
                rung.position.set(startX, position, startZ);
                rung.rotation.x = Math.PI/2 ;
            } else if (orientation === 'horizontal-z') {
                // Rung runs along Z axis
                rung.position.set(startX, startY, position);
                rung.rotation.y = Math.PI ;
            } else if (orientation === 'horizontal-z2') {
                // Rung runs along Z axis (for ceiling/floor)
                rung.position.set(startX, startY, startZ);
                rung.rotation.z = Math.PI/2;
            }

            this.group.add(rung);
        }
    }

    /**
     * Change wall color (for specific scenes)
     */
    setWallColor(color) {
        this.wallColor = color;
        ['north', 'south', 'east', 'west', 'ceiling'].forEach(dir => {
            if (this.wallMeshes[dir]) {
                this.wallMeshes[dir].material.color.setHex(color);
                this.wallMeshes[dir].material.emissive.setHex(color);
            }
        });
    }

    /**
     * Animate door opening/closing
     * @param {string} direction - 'north', 'south', 'east', 'west', 'up', 'down'
     * @param {boolean} isOpen - true to open, false to close
     * @param {number} duration - Animation duration in ms (default: 800)
     */
    setDoorOpen(direction, isOpen, duration = 800) {
        const door = this.doorMeshes[direction];
        if (!door) return;

        // Cancel any existing animation for this door
        if (this.doorAnimations[direction]) {
            cancelAnimationFrame(this.doorAnimations[direction].animId);
        }

        const startTime = performance.now();
        const startScale = door.scale.y;
        const targetScale = isOpen ? 0.01 : 1; // Nearly invisible when open (0.01 instead of 0 to avoid rendering issues)

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease in-out
            const easeProgress = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            // Animate scale on Y axis (height) to simulate door opening upward/downward
            door.scale.y = startScale + (targetScale - startScale) * easeProgress;

            if (progress < 1) {
                this.doorAnimations[direction] = {
                    animId: requestAnimationFrame(animate)
                };
            } else {
                // Animation complete
                delete this.doorAnimations[direction];
                this.doorStates[direction] = isOpen;

                // Make nearly invisible doors fully transparent when open, solid when closed
                if (isOpen) {
                    door.material.opacity = 0.01;
                } else {
                    door.material.opacity = 0.9;
                }
            }
        };

        requestAnimationFrame(animate);
    }

    /**
     * Instantly set door state without animation
     */
    setDoorOpenInstant(direction, isOpen) {
        const door = this.doorMeshes[direction];
        if (!door) return;

        door.scale.y = isOpen ? 0.01 : 1;
        door.material.opacity = isOpen ? 0.01 : 0.9;
        this.doorStates[direction] = isOpen;
    }

    /**
     * Get the Three.js group to add to scene
     */
    getGroup() {
        return this.group;
    }
}
