import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { BaseCharacter } from './BaseCharacter.js';

/**
 * Base scene class that handles setup and timing
 *
 * Scene instances should:
 * - Pass sceneConfig to super(sceneConfig)
 * - Implement setupBackground() to create environment
 * - Implement action methods that match action names in timeline
 */
export class BaseScene {
    constructor(sceneConfig) {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;

        this.startTime = null;
        this.currentTime = 0;
        this.lastFrameTime = null;
        this.timeline = [];
        this.initialized = false;

        this.characters = {};
        this.characterActions = [];
        this.cameraMoves = [];

        // Character tracking
        this.trackingCharacterId = null;
        this.trackingOffsetX = -2.5;  // Default: 2.5 units to the left (west)
        this.trackingOffsetZ = 2;     // Default: 2 units behind (south)
        this.trackingHeight = 1.45;   // Default camera height

        // Raycaster for wall detection
        this.raycaster = new THREE.Raycaster();
        this.wallCheckDistance = 0.5;  // Minimum distance from walls

        // Store config
        this.sceneConfig = sceneConfig;

        // Resolve timeline events to absolute times
        if (sceneConfig && sceneConfig.timeline) {
            this.timeline = sceneConfig.timeline.map(entry => {
                const absoluteTime = entry.event
                    ? sceneConfig.events[entry.event] + (entry.delay || 0)
                    : entry.time;

                return {
                    time: absoluteTime,
                    action: entry.action
                };
            });
        }

        // Resolve camera moves to absolute times
        if (sceneConfig && sceneConfig.cameraMoves) {
            this.cameraMoves = sceneConfig.cameraMoves.map(move => {
                const absoluteTime = move.event
                    ? sceneConfig.events[move.event] + (move.delay || 0)
                    : move.startTime;

                return {
                    ...move,
                    startTime: absoluteTime,
                    triggered: false
                };
            });
        }

        this.init().then(() => {
            this.initialized = true;
        });
    }

    async init() {
        console.log('[BaseScene] init() called');
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupControls();
        this.setupLights();

        // Let subclass set up scene-specific content
        console.log('[BaseScene] Checking for setupBackground:', typeof this.setupBackground);
        if (this.setupBackground) {
            console.log('[BaseScene] Calling setupBackground()');
            this.setupBackground();
        } else {
            console.warn('[BaseScene] No setupBackground method found!');
        }

        // Load characters if config provided
        if (this.sceneConfig && this.sceneConfig.characters) {
            await this.setupCharacters();
        }

        // Reset start time after everything is loaded
        this.startTime = null;
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a1a);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            35,  // Cinematic FOV - tight character framing
            window.innerWidth / window.innerHeight,
            0.01,
            1000
        );
        this.camera.position.set(8, 6, 8);
        // this.camera.lookAt(0, 0, 0);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.08;
        this.controls.minDistance = 3;
        this.controls.maxDistance = 30;
        this.controls.enableZoom = true;
        this.controls.update();
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize());
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (!this.initialized) return;

        if (!this.startTime) {
            // Set start time on first render after initialization
            this.startTime = performance.now();
            this.currentTime = 0;
            this.lastFrameTime = this.startTime;
        } else {
            const now = performance.now();
            const delta = now - this.lastFrameTime;
            const cappedDelta = Math.min(delta, 100); // Cap to 100ms per frame

            this.currentTime += cappedDelta;
            this.lastFrameTime = now;
        }

        this.processTimeline();
        this.processCharacterActions();
        this.processCameraMoves();
        this.updateCameraAnimation();
        this.updateCharacterTracking();

        // Update all characters
        Object.values(this.characters).forEach(character => {
            character.update();
        });

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    processTimeline() {
        this.timeline.forEach(event => {
            if (!event.triggered && this.currentTime >= event.time) {
                event.triggered = true;
                console.log(`[TIMELINE] Event triggered: ${event.action} at time ${event.time}ms`);
                if (typeof this[event.action] === 'function') {
                    // Call with .call() to ensure correct 'this' context
                    this[event.action].call(this);
                }
            }
        });
    }

    async setupCharacters() {
        // Load all characters from config
        for (const charConfig of this.sceneConfig.characters) {
            // Get initial position from first action
            const firstAction = charConfig.actions[0];
            const startPos = firstAction.startPosition;
            const rotation = firstAction.rotation;

            // Always load base model with walk animation
            const basePath = `../../characters/${charConfig.id}/character.fbx`;

            // Create character
            const character = new BaseCharacter(basePath, {
                scale: charConfig.scale,
                position: startPos,
                rotation: rotation
            });

            // Load the character model and all needed animations
            await character.load(charConfig.actions);

            // Store character reference
            this.characters[charConfig.id] = character;

            // Add to scene
            this.scene.add(character.getModel());

            // Register ALL character actions with timing
            charConfig.actions.forEach((action, index) => {
                // Resolve event + delay to absolute startTime
                const absoluteTime = action.event
                    ? this.sceneConfig.events[action.event] + (action.delay || 0)
                    : action.startTime;

                this.characterActions.push({
                    characterId: charConfig.id,
                    action: { ...action, startTime: absoluteTime },
                    triggered: false
                });
            });
        }
    }

    processCharacterActions() {
        this.characterActions.forEach(actionData => {
            if (!actionData.triggered && this.currentTime >= actionData.action.startTime) {
                actionData.triggered = true;
                console.log(`[CHARACTER ACTION] ${actionData.characterId}: ${actionData.action.type} at time ${actionData.action.startTime}ms`);
                this.executeCharacterAction(actionData.characterId, actionData.action);
            }
        });
    }

    processCameraMoves() {
        this.cameraMoves.forEach(moveData => {
            if (!moveData.triggered && this.currentTime >= moveData.startTime) {
                moveData.triggered = true;
                this.executeCameraMove(moveData);
            }
        });
    }

    executeCameraMove(move) {
        switch (move.type) {
            case 'panToPosition':
                this.panCameraToPosition(move.targetPos, move.lookAt, move.duration);
                break;
            case 'panKeepAngle':
                this.panCameraKeepAngle(move.targetPos, move.duration, move.lookAt);
                break;
            case 'cutToPosition':
                // Instant cut to position
                this.camera.position.set(move.targetPos.x, move.targetPos.y, move.targetPos.z);
                this.controls.target.set(move.lookAt.x, move.lookAt.y, move.lookAt.z);
                this.cameraAnimation = null;  // Cancel any ongoing animation
                console.log(`[CAMERA] Cut to position (${move.targetPos.x}, ${move.targetPos.y}, ${move.targetPos.z}) looking at (${move.lookAt.x}, ${move.lookAt.y}, ${move.lookAt.z})`);
                break;
            case 'trackCharacter':
                // Start tracking a character
                this.trackCharacter(
                    move.characterId,
                    move.offsetX !== undefined ? move.offsetX : -2.5,
                    move.offsetZ !== undefined ? move.offsetZ : 2,
                    move.height !== undefined ? move.height : 1.45
                );
                break;
            case 'stopTracking':
                // Stop tracking character
                this.stopTracking();
                break;
            default:
                console.warn(`Unknown camera move type: ${move.type}`);
        }
    }

    executeCharacterAction(characterId, action) {
        const character = this.characters[characterId];
        if (!character) return;

        // Update character position if startPosition is specified
        if (action.startPosition) {
            const model = character.getModel();
            if (model) {
                model.position.set(
                    action.startPosition.x,
                    action.startPosition.y,
                    action.startPosition.z
                );
            }
        }

        // Update character rotation if rotation is specified
        if (action.rotation) {
            const model = character.getModel();
            if (model) {
                model.rotation.set(
                    action.rotation.x,
                    action.rotation.y,
                    action.rotation.z
                );
            }
        }

        // Execute action based on type
        switch (action.type) {
            case 'walk':
                const endPos = action.endPosition;
                character.walkTo(
                    endPos.x,
                    endPos.y,
                    endPos.z,
                    { distancePerCycle: action.distancePerCycle || 2 }
                );
                break;
            case 'sitting':
                character.sit();
                break;
            case 'standing':
                character.stand();
                break;
            case 'waving':
                character.wave();
                break;
            case 'pointing':
                character.point();
                break;
            case 'talking':
                character.talk();
                break;
            case 'climbing':
                if (action.endPosition) {
                    const endPos = action.endPosition;
                    character.climbTo(
                        endPos.x,
                        endPos.y,
                        endPos.z,
                        {
                            distancePerCycle: action.distancePerCycle || 1,
                            manualRotation: action.rotation !== undefined
                        }
                    );
                } else {
                    character.climb();
                }
                break;
            case 'crawling':
                if (action.endPosition) {
                    const endPos = action.endPosition;
                    character.crawlTo(
                        endPos.x,
                        endPos.y,
                        endPos.z,
                        {
                            distancePerCycle: action.distancePerCycle || 0.8,
                            manualRotation: action.rotation !== undefined
                        }
                    );
                } else {
                    character.crawl();
                }
                break;
            case 'face':
                // Look at another character
                const targetCharacter = this.characters[action.targetCharacter];
                if (targetCharacter) {
                    const targetModel = targetCharacter.getModel();
                    if (targetModel) {
                        const targetPos = targetModel.position;
                        character.lookAt(targetPos.x, targetPos.y, targetPos.z);
                        console.log(`${characterId} facing ${action.targetCharacter} at (${targetPos.x.toFixed(2)}, ${targetPos.y.toFixed(2)}, ${targetPos.z.toFixed(2)})`);
                    } else {
                        console.warn(`Target character ${action.targetCharacter} has no model`);
                    }
                } else {
                    console.warn(`Target character ${action.targetCharacter} not found`);
                }
                break;
            case 'lookAt':
                // Look at a specific position
                if (action.position) {
                    const pos = action.position;
                    character.lookAt(pos.x, pos.y, pos.z);
                    console.log(`${characterId} looking at position (${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)})`);
                } else {
                    console.warn(`lookAt action requires position {x, y, z}`);
                }
                break;
            default:
                console.warn(`Unknown action type: ${action.type}`);
        }
    }

    // Camera animation methods
    animateCamera(targetPos, lookAtPos, duration) {
        const startPos = {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z
        };
        const startTime = this.currentTime;

        // Store animation state
        this.cameraAnimation = {
            startPos,
            targetPos,
            lookAtPos,
            startTime,
            duration
        };
    }

    updateCameraAnimation() {
        if (!this.cameraAnimation) return;

        const elapsed = this.currentTime - this.cameraAnimation.startTime;
        const progress = Math.min(elapsed / this.cameraAnimation.duration, 1);

        // Ease in-out function
        const easeProgress = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        // Interpolate position
        this.camera.position.x = this.cameraAnimation.startPos.x +
            (this.cameraAnimation.targetPos.x - this.cameraAnimation.startPos.x) * easeProgress;
        this.camera.position.y = this.cameraAnimation.startPos.y +
            (this.cameraAnimation.targetPos.y - this.cameraAnimation.startPos.y) * easeProgress;
        this.camera.position.z = this.cameraAnimation.startPos.z +
            (this.cameraAnimation.targetPos.z - this.cameraAnimation.startPos.z) * easeProgress;

        // Update OrbitControls target to match lookAt (prevents controls from overriding)
        this.controls.target.set(
            this.cameraAnimation.lookAtPos.x,
            this.cameraAnimation.lookAtPos.y,
            this.cameraAnimation.lookAtPos.z
        );

        // Clear animation when complete
        if (progress >= 1) {
            console.log(`[CAMERA] Pan complete - position: (${this.camera.position.x.toFixed(2)}, ${this.camera.position.y.toFixed(2)}, ${this.camera.position.z.toFixed(2)})`);
            this.cameraAnimation = null;
        }
    }

    setCameraPosition(positionName, duration = 1500) {
        if (!this.cameraPositions || !this.cameraPositions[positionName]) {
            console.warn(`Camera position "${positionName}" not found`);
            return;
        }
        const position = this.cameraPositions[positionName];
        this.animateCamera(position.pos, position.lookAt, duration);
    }
    cutToPosition(positionName) {
        // Instant cut to camera position (no animation)
        if (!this.cameraPositions || !this.cameraPositions[positionName]) {
            console.warn(`Camera position "${positionName}" not found`);
            return;
        }
        const position = this.cameraPositions[positionName];
        this.camera.position.set(position.pos.x, position.pos.y, position.pos.z);
        this.controls.target.set(position.lookAt.x, position.lookAt.y, position.lookAt.z);
        this.cameraAnimation = null;  // Cancel any ongoing animation
    }

    panCameraToPosition(targetPos, lookAtPos, duration = 2000) {
        // Smooth pan to target position
        console.log(`[CAMERA] Pan to position (${targetPos.x}, ${targetPos.y}, ${targetPos.z}) looking at (${lookAtPos.x}, ${lookAtPos.y}, ${lookAtPos.z}) over ${duration}ms`);
        this.animateCamera(targetPos, lookAtPos, duration);
    }

    panCameraKeepAngle(targetPos, duration = 2000, lookAt = null) {
        // Pan camera to new position while maintaining viewing angle
        // If lookAt is provided, set the viewing angle before panning
        console.log(`[CAMERA] Pan keeping angle to (${targetPos.x}, ${targetPos.y}, ${targetPos.z}) over ${duration}ms`);

        const startPos = {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z
        };

        // If lookAt is provided, set it before calculating the angle to maintain
        let startTarget;
        if (lookAt) {
            this.camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
            this.controls.target.set(lookAt.x, lookAt.y, lookAt.z);
            startTarget = {
                x: lookAt.x,
                y: lookAt.y,
                z: lookAt.z
            };
        } else {
            startTarget = {
                x: this.controls.target.x,
                y: this.controls.target.y,
                z: this.controls.target.z
            };
        }

        // Calculate the offset to move the controls target by the same amount
        // This keeps the viewing angle constant
        const deltaX = targetPos.x - startPos.x;
        const deltaY = targetPos.y - startPos.y;
        const deltaZ = targetPos.z - startPos.z;

        const targetLookAt = {
            x: startTarget.x + deltaX,
            y: startTarget.y + deltaY,
            z: startTarget.z + deltaZ
        };

        const startTime = this.currentTime;

        // Store animation state
        this.cameraAnimation = {
            startPos,
            targetPos,
            lookAtPos: targetLookAt,
            startTime,
            duration
        };
    }

    /**
     * Track a character with the camera
     * @param {string} characterId - ID of character to track
     * @param {number} offsetX - X offset from character (default: -2.5, to the left/west)
     * @param {number} offsetZ - Z offset from character (default: 2, behind/south)
     * @param {number} height - Camera height (default: 1.45)
     */
    trackCharacter(characterId, offsetX = -2.5, offsetZ = 2, height = 1.45) {
        this.trackingCharacterId = characterId;
        this.trackingOffsetX = offsetX;
        this.trackingOffsetZ = offsetZ;
        this.trackingHeight = height;
        console.log(`[CAMERA] Tracking ${characterId} with offset (${offsetX}, ${offsetZ})`);
    }

    /**
     * Stop tracking character
     */
    stopTracking() {
        console.log(`[CAMERA] Stopped tracking`);
        this.trackingCharacterId = null;
    }

    /**
     * Check if there's an obstacle between camera and target position
     * @param {THREE.Vector3} cameraPos - Camera position
     * @param {THREE.Vector3} targetPos - Target position
     * @returns {Object|null} - Returns intersection info if obstacle found, null otherwise
     */
    checkObstacle(cameraPos, targetPos) {
        // Calculate direction from camera to target
        const direction = new THREE.Vector3().subVectors(targetPos, cameraPos).normalize();
        const distance = cameraPos.distanceTo(targetPos);

        // Set up raycaster
        this.raycaster.set(cameraPos, direction);
        this.raycaster.far = distance;

        // Check for intersections with all scene objects
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        // Filter out the character models (we only care about walls/environment)
        const wallIntersections = intersects.filter(hit => {
            // Check if this is a character model
            const isCharacter = Object.values(this.characters).some(char => {
                const model = char.getModel();
                return model && (hit.object === model || hit.object.parent === model ||
                        hit.object.isDescendantOf?.(model));
            });
            return !isCharacter && hit.distance < distance - 0.1; // Small buffer
        });

        return wallIntersections.length > 0 ? wallIntersections[0] : null;
    }

    /**
     * Adjust camera position to avoid walls while maintaining desired framing
     * @param {THREE.Vector3} desiredPos - Desired camera position
     * @param {THREE.Vector3} targetPos - What we're looking at (character position)
     * @param {number} minDistance - Minimum acceptable distance from target
     * @param {boolean} isTracking - Whether this is for character tracking
     * @param {number} originalHeight - Original desired camera height (for tracking)
     * @returns {THREE.Vector3} - Adjusted camera position
     */
    adjustCameraForWalls(desiredPos, targetPos, minDistance = 1.5, isTracking = false, originalHeight = null) {
        let finalPos = desiredPos.clone();
        const obstacle = this.checkObstacle(desiredPos, targetPos);

        if (obstacle) {
            if (isTracking && this.trackingCharacterId) {
                // For tracking: try multiple candidate positions
                const currentDistance = Math.sqrt(
                    Math.pow(desiredPos.x - targetPos.x, 2) +
                    Math.pow(desiredPos.z - targetPos.z, 2)
                );

                const height = originalHeight || desiredPos.y;

                // Generate candidate positions:
                // 1. Current angle, pulled back slightly
                // 2. Rotate 90° left
                // 3. Rotate 90° right
                // 4. Rotate 45° left
                // 5. Rotate 45° right
                const currentAngle = Math.atan2(
                    desiredPos.z - targetPos.z,
                    desiredPos.x - targetPos.x
                );

                const candidates = [
                    currentAngle,           // Current direction
                    currentAngle + Math.PI / 2,   // 90° left
                    currentAngle - Math.PI / 2,   // 90° right
                    currentAngle + Math.PI / 4,   // 45° left
                    currentAngle - Math.PI / 4,   // 45° right
                ].map(angle => ({
                    x: targetPos.x + Math.cos(angle) * currentDistance,
                    y: height,
                    z: targetPos.z + Math.sin(angle) * currentDistance
                }));

                // Test each candidate position
                let bestPos = null;
                for (const candidate of candidates) {
                    const testPos = new THREE.Vector3(candidate.x, candidate.y, candidate.z);
                    const testObstacle = this.checkObstacle(testPos, targetPos);

                    if (!testObstacle) {
                        // Found a clear position!
                        bestPos = testPos;
                        break;
                    }
                }

                if (bestPos) {
                    finalPos = bestPos;

                    // Update tracking offsets with the clear position
                    const newOffsetX = finalPos.x - targetPos.x;
                    const newOffsetZ = finalPos.z - targetPos.z;

                    this.trackingOffsetX = newOffsetX;
                    this.trackingOffsetZ = newOffsetZ;

                    console.log(`[CAMERA] Found clear position during tracking - updated offsets to (${newOffsetX.toFixed(2)}, ${newOffsetZ.toFixed(2)}) at height: ${finalPos.y.toFixed(2)}`);
                } else {
                    // All positions blocked, fallback to pulling back along current direction
                    const directionXZ = new THREE.Vector2(
                        desiredPos.x - targetPos.x,
                        desiredPos.z - targetPos.z
                    ).normalize();

                    finalPos.x = targetPos.x + directionXZ.x * (currentDistance * 1.5);
                    finalPos.z = targetPos.z + directionXZ.y * (currentDistance * 1.5);
                    finalPos.y = height;

                    console.log(`[CAMERA] All positions blocked - pulling back further to (${finalPos.x.toFixed(2)}, ${finalPos.z.toFixed(2)})`);
                }
            } else {
                // For non-tracking: adjust position in 3D
                const direction = new THREE.Vector3().subVectors(desiredPos, targetPos).normalize();
                const obstacleDistance = obstacle.distance;

                // Place camera just before the obstacle
                finalPos = targetPos.clone().add(
                    direction.multiplyScalar(Math.max(minDistance, obstacleDistance - this.wallCheckDistance))
                );

                console.log(`[CAMERA] Adjusted position to avoid wall - moved from (${desiredPos.x.toFixed(2)}, ${desiredPos.y.toFixed(2)}, ${desiredPos.z.toFixed(2)}) to (${finalPos.x.toFixed(2)}, ${finalPos.y.toFixed(2)}, ${finalPos.z.toFixed(2)})`);
            }
        }

        return finalPos;
    }

    /**
     * Get proper camera framing position for a character
     * @param {THREE.Vector3} charPos - Character position
     * @param {string} shotType - 'close', 'medium', 'wide'
     * @param {number} angleHorizontal - Angle in radians around character (0 = south, Math.PI/2 = west)
     * @param {number} angleVertical - Vertical angle offset (0 = eye level, positive = above)
     * @returns {Object} - {position: Vector3, lookAt: Vector3}
     */
    getFramedCameraPosition(charPos, shotType = 'medium', angleHorizontal = Math.PI / 4, angleVertical = 0) {
        // Define shot distances (in meters, following CLAUDE.md guidelines)
        const shotDistances = {
            'close': 1.2,      // 0.8-1.5m
            'medium': 2.8,     // 2.0-3.5m
            'wide': 7.0        // 5.0-10.0m
        };

        const distance = shotDistances[shotType] || shotDistances['medium'];

        // Calculate camera position using spherical coordinates
        const cameraX = charPos.x + distance * Math.sin(angleHorizontal);
        const cameraZ = charPos.z + distance * Math.cos(angleHorizontal);
        const cameraY = charPos.y + 1.5 + angleVertical;  // Eye level + vertical offset

        const cameraPos = new THREE.Vector3(cameraX, cameraY, cameraZ);

        // Look at character head height (1.5-1.7m above character position)
        const lookAtPos = new THREE.Vector3(charPos.x, charPos.y + 1.6, charPos.z);

        // Adjust for walls
        const adjustedPos = this.adjustCameraForWalls(cameraPos, lookAtPos, distance * 0.5);

        return {
            position: adjustedPos,
            lookAt: lookAtPos
        };
    }

    /**
     * Update camera position to track character (called every frame)
     */
    updateCharacterTracking() {
        if (!this.trackingCharacterId) return;

        const character = this.characters[this.trackingCharacterId];
        const model = character?.getModel();
        if (!model) return;

        const charPos = model.position;

        // Calculate desired camera position with offset
        const desiredPos = new THREE.Vector3(
            charPos.x + this.trackingOffsetX,
            this.trackingHeight,
            charPos.z + this.trackingOffsetZ
        );

        // Character head position (look-at target)
        const headPos = new THREE.Vector3(charPos.x, charPos.y + 1.6, charPos.z);

        // Check for walls and adjust position if needed (pass isTracking=true and original height)
        const adjustedPos = this.adjustCameraForWalls(desiredPos, charPos, 1.5, true, this.trackingHeight);

        // Temporarily disable controls to prevent them from overriding our position
        const controlsWereEnabled = this.controls.enabled;
        this.controls.enabled = false;

        // Update camera position and target
        this.camera.position.set(adjustedPos.x, adjustedPos.y, adjustedPos.z);
        this.controls.target.set(headPos.x, headPos.y, headPos.z);
        this.camera.lookAt(headPos);

        // Update controls' internal state to match our manual positioning
        this.controls.object.position.copy(this.camera.position);
        this.controls.target.copy(headPos);
        this.controls.update();

        // Re-enable controls
        this.controls.enabled = controlsWereEnabled;
    }

    start() {
        this.setupEventListeners();
        this.animate();
    }
}
