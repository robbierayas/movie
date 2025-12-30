import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

export class BaseCharacter {
    // Private fields
    #modelPath;
    #model = null;
    #mixer = null;
    #currentAction = null;
    #clock = new THREE.Clock();
    #scale;
    #position;
    #rotation;
    #animationType = null;
    #animationOptions = null;
    #animationClips = {};
    #characterId;
    #lastLoggedPosition = null;

    constructor(modelPath, options = {}) {
        this.#modelPath = modelPath;

        // Extract character ID from path (e.g., "../../characters/alex/character.fbx" -> "alex")
        const pathParts = modelPath.split('/');
        const charIndex = pathParts.indexOf('characters');
        this.#characterId = charIndex >= 0 && charIndex < pathParts.length - 1
            ? pathParts[charIndex + 1]
            : null;

        // Default options
        this.#scale = options.scale || 0.01;
        this.#position = options.position || { x: 0, y: 0, z: 0 };
        this.#rotation = options.rotation || { x: 0, y: 0, z: 0 };
    }

    async load(actions = null) {
        // Load base model
        await new Promise((resolve, reject) => {
            const loader = new FBXLoader();
            loader.load(
                this.#modelPath,
                (fbx) => {
                    this.#model = fbx;

                    // Apply transformations
                    this.#model.scale.setScalar(this.#scale);
                    this.#model.position.set(this.#position.x, this.#position.y, this.#position.z);
                    this.#model.rotation.set(this.#rotation.x, this.#rotation.y, this.#rotation.z);

                    // Enable shadows
                    this.#model.traverse((child) => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });

                    // Setup animation mixer
                    this.#mixer = new THREE.AnimationMixer(fbx);

                    // Store initial animation clip (usually walk)
                    if (fbx.animations && fbx.animations.length > 0) {
                        this.#animationClips['walk'] = fbx.animations[0];
                        console.log(`Stored walk animation from base model`);
                    }

                    resolve(this.#model);
                },
                undefined,
                (error) => {
                    console.error('Error loading character:', error);
                    reject(error);
                }
            );
        });

        // Load additional animations if actions provided
        if (actions && this.#characterId) {
            // Determine which animations this character needs
            const neededAnimations = new Set(actions.map(a => a.type));

            // Load only the animations this character uses
            for (const animType of neededAnimations) {
                if (animType === 'walk') {
                    continue; // Already loaded with base model
                }

                const animFile = {
                    'sitting': 'Sitting.fbx',
                    'standing': 'Standing.fbx',
                    'waving': 'Waving.fbx',
                    'pointing': 'Pointing.fbx',
                    'talking': 'Talking.fbx',
                    'climbing': 'Climbing.fbx',
                    'crawling': 'Crawling.fbx'
                }[animType];

                if (animFile) {
                    await this.#loadAnimation(animType, `../../characters/${this.#characterId}/${animFile}`);
                }
            }
        }

        return this.#model;
    }

    // Private method to load animation
    async #loadAnimation(animationType, fbxPath) {
        return new Promise((resolve, reject) => {
            const loader = new FBXLoader();
            loader.load(
                fbxPath,
                (fbx) => {
                    // Extract animation clip from FBX
                    if (fbx.animations && fbx.animations.length > 0) {
                        this.#animationClips[animationType] = fbx.animations[0];
                        console.log(`Loaded ${animationType} animation from ${fbxPath}`);
                    }
                    resolve();
                },
                undefined,
                (error) => {
                    console.error(`Error loading ${animationType} animation:`, error);
                    reject(error);
                }
            );
        });
    }

    // Private method to play animation
    #playAnimation(animationType, options = {}) {
        if (!this.#model || !this.#mixer) {
            console.warn('Character not loaded or no animations available');
            return;
        }

        // Stop current action if playing
        if (this.#currentAction) {
            this.#currentAction.stop();
        }

        this.#animationType = animationType;
        this.#animationOptions = options;

        // Reset clock to prevent huge initial delta
        this.#clock.getDelta();

        // Get animation clip for this type
        const animation = this.#animationClips[animationType];
        if (!animation) {
            console.warn(`No animation loaded for type: ${animationType}`);
            return;
        }

        // Clone animation to avoid modifying original
        const animClone = animation.clone();

        // Remove root position tracks to prevent position reset on loop
        const tracks = [];
        animClone.tracks.forEach(track => {
            if (!track.name.includes('.position')) {
                tracks.push(track);
            }
        });
        animClone.tracks = tracks;

        this.#currentAction = this.#mixer.clipAction(animClone);
        this.#currentAction.reset();
        this.#currentAction.play();

        console.log('Playing animation:', animationType);
    }

    // Private method to set position
    #setPosition(x, y, z) {
        if (this.#model) {
            this.#model.position.set(x, y, z);
        }
    }

    // Private method to set rotation
    #setRotation(x, y, z) {
        if (this.#model) {
            this.#model.rotation.set(x, y, z);
        }
    }

    update() {
        if (!this.#model || !this.#mixer) return;

        let delta = this.#clock.getDelta();

        // Cap delta to prevent huge jumps (max 100ms frame time)
        delta = Math.min(delta, 0.1);

        // Handle animation type-specific updates
        let shouldUpdateAnimation = true;

        if (this.#animationType === 'walk' && this.#animationOptions?.animationState) {
            shouldUpdateAnimation = this.#updateWalkAnimation(delta);
        } else if (this.#animationType === 'climbing' && this.#animationOptions?.animationState) {
            shouldUpdateAnimation = this.#updateMovementAnimation(delta);
        } else if (this.#animationType === 'crawling' && this.#animationOptions?.animationState) {
            shouldUpdateAnimation = this.#updateMovementAnimation(delta);
        }

        // Update animation mixer only if movement is still happening
        if (this.#currentAction && shouldUpdateAnimation) {
            this.#mixer.update(delta);
        }
    }

    // Private method to update walk animation
    #updateWalkAnimation(delta) {
        const state = this.#animationOptions.animationState;

        if (state.startX === undefined || state.endX === undefined) {
            console.warn('Walk animation requires animationState with startX and endX');
            return false;
        }

        const animDuration = this.#currentAction.getClip().duration;
        const distancePerCycle = state.distancePerCycle || 2;
        const speed = distancePerCycle / animDuration;

        // Calculate total distance and direction
        const startX = state.startX;
        const startY = state.startY || 0;
        const startZ = state.startZ || 0;
        const endX = state.endX;
        const endY = state.endY || 0;
        const endZ = state.endZ || 0;

        const dx = endX - startX;
        const dy = endY - startY;
        const dz = endZ - startZ;
        const totalDistance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // Normalize direction
        const dirX = dx / totalDistance;
        const dirY = dy / totalDistance;
        const dirZ = dz / totalDistance;

        // Calculate distance from start
        const currentDx = this.#model.position.x - startX;
        const currentDy = this.#model.position.y - startY;
        const currentDz = this.#model.position.z - startZ;
        const distanceFromStart = Math.sqrt(currentDx * currentDx + currentDy * currentDy + currentDz * currentDz);

        // Check if still moving
        if (distanceFromStart < totalDistance) {
            const moveX = dirX * speed * delta;
            const moveY = dirY * speed * delta;
            const moveZ = dirZ * speed * delta;

            this.#model.position.x += moveX;
            this.#model.position.y += moveY;
            this.#model.position.z += moveZ;

            // Only log every 2 units of movement
            if (!this.#lastLoggedPosition) {
                this.#lastLoggedPosition = { x: startX, y: startY, z: startZ };
            }

            const dx = this.#model.position.x - this.#lastLoggedPosition.x;
            const dy = this.#model.position.y - this.#lastLoggedPosition.y;
            const dz = this.#model.position.z - this.#lastLoggedPosition.z;
            const distanceSinceLog = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distanceSinceLog >= 2.0) {
                // console.log(`Moving: pos=(${this.#model.position.x.toFixed(2)}, ${this.#model.position.y.toFixed(2)}, ${this.#model.position.z.toFixed(2)}), delta=${delta.toFixed(4)}, speed=${speed.toFixed(2)}`);
                this.#lastLoggedPosition = {
                    x: this.#model.position.x,
                    y: this.#model.position.y,
                    z: this.#model.position.z
                };
            }

            state.destinationReached = false;
            return true;
        }

        // Log destination reached only once
        if (!state.destinationReached) {
            console.log('Reached destination');
            state.destinationReached = true;
            this.#lastLoggedPosition = null; // Reset for next walk
        }
        return false;
    }

    // Private method to update movement animations (climbing, crawling)
    #updateMovementAnimation(delta) {
        const state = this.#animationOptions.animationState;

        if (state.startX === undefined || state.endX === undefined) {
            console.warn(`${this.#animationType} animation requires animationState with startX and endX`);
            return false;
        }

        const animDuration = this.#currentAction.getClip().duration;
        const distancePerCycle = state.distancePerCycle || 1;
        const speed = distancePerCycle / animDuration;

        // Calculate total distance and direction
        const startX = state.startX;
        const startY = state.startY || 0;
        const startZ = state.startZ || 0;
        const endX = state.endX;
        const endY = state.endY || 0;
        const endZ = state.endZ || 0;

        const dx = endX - startX;
        const dy = endY - startY;
        const dz = endZ - startZ;
        const totalDistance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // Normalize direction
        const dirX = dx / totalDistance;
        const dirY = dy / totalDistance;
        const dirZ = dz / totalDistance;

        // Calculate distance from start
        const currentDx = this.#model.position.x - startX;
        const currentDy = this.#model.position.y - startY;
        const currentDz = this.#model.position.z - startZ;
        const distanceFromStart = Math.sqrt(currentDx * currentDx + currentDy * currentDy + currentDz * currentDz);

        // Check if still moving
        if (distanceFromStart < totalDistance) {
            const moveX = dirX * speed * delta;
            const moveY = dirY * speed * delta;
            const moveZ = dirZ * speed * delta;

            this.#model.position.x += moveX;
            this.#model.position.y += moveY;
            this.#model.position.z += moveZ;

            state.destinationReached = false;
            return true;
        }

        // Log destination reached only once
        if (!state.destinationReached) {
            console.log(`${this.#animationType} destination reached`);
            state.destinationReached = true;
        }
        return false;
    }

    // Public getter for model (needed by BaseScene to add to scene)
    getModel() {
        return this.#model;
    }

    // Public interface methods

    /**
     * Rotate character to look at a position
     */
    lookAt(x, y, z) {
        if (!this.#model) return;

        // Calculate direction to target
        const dx = x - this.#model.position.x;
        const dz = z - this.#model.position.z;
        const angle = Math.atan2(dx, dz);

        // Set rotation to face target
        this.#setRotation(0, angle, 0);
    }

    /**
     * Rotate character to face a position (same as lookAt)
     */
    face(x, y, z) {
        this.lookAt(x, y, z);
    }

    /**
     * Walk to a target position
     */
    walkTo(x, y, z, options = {}) {
        if (!this.#model) return;

        const startPos = {
            x: this.#model.position.x,
            y: this.#model.position.y,
            z: this.#model.position.z
        };

        // Calculate direction and rotation
        const dx = x - startPos.x;
        const dz = z - startPos.z;
        const angle = Math.atan2(dx, dz);

        // Set rotation to face movement direction
        this.#setRotation(0, angle, 0);

        // Start walk animation
        this.#playAnimation('walk', {
            animationState: {
                startX: startPos.x,
                startY: startPos.y,
                startZ: startPos.z,
                endX: x,
                endY: y,
                endZ: z,
                distancePerCycle: options.distancePerCycle || 2
            }
        });
    }

    /**
     * Play sitting animation
     */
    sit() {
        this.#playAnimation('sitting');
    }

    /**
     * Play standing animation
     */
    stand() {
        this.#playAnimation('standing');
    }

    /**
     * Play waving animation
     */
    wave() {
        this.#playAnimation('waving');
    }

    /**
     * Play pointing animation
     */
    point() {
        this.#playAnimation('pointing');
    }

    /**
     * Play talking animation
     */
    talk() {
        this.#playAnimation('talking');
    }

    /**
     * Climb to a target position
     */
    climbTo(x, y, z, options = {}) {
        if (!this.#model) return;

        const startPos = {
            x: this.#model.position.x,
            y: this.#model.position.y,
            z: this.#model.position.z
        };

        // Only auto-calculate rotation if not manually set
        if (!options.manualRotation) {
            // Calculate direction and rotation
            const dx = x - startPos.x;
            const dz = z - startPos.z;
            const angle = Math.atan2(dx, dz);

            // Set rotation to face movement direction
            this.#setRotation(0, angle, 0);
        }

        // Start climbing animation with movement
        this.#playAnimation('climbing', {
            animationState: {
                startX: startPos.x,
                startY: startPos.y,
                startZ: startPos.z,
                endX: x,
                endY: y,
                endZ: z,
                distancePerCycle: options.distancePerCycle || 1
            }
        });
    }

    /**
     * Crawl to a target position
     */
    crawlTo(x, y, z, options = {}) {
        if (!this.#model) return;

        const startPos = {
            x: this.#model.position.x,
            y: this.#model.position.y,
            z: this.#model.position.z
        };

        // Only auto-calculate rotation if not manually set
        if (!options.manualRotation) {
            // Calculate direction and rotation
            const dx = x - startPos.x;
            const dz = z - startPos.z;
            const angle = Math.atan2(dx, dz);

            // Set rotation to face movement direction
            this.#setRotation(0, angle, 0);
        }

        // Start crawling animation with movement
        this.#playAnimation('crawling', {
            animationState: {
                startX: startPos.x,
                startY: startPos.y,
                startZ: startPos.z,
                endX: x,
                endY: y,
                endZ: z,
                distancePerCycle: options.distancePerCycle || 0.8
            }
        });
    }

    /**
     * Play climbing animation (stationary)
     */
    climb() {
        this.#playAnimation('climbing');
    }

    /**
     * Play crawling animation (stationary)
     */
    crawl() {
        this.#playAnimation('crawling');
    }
}
