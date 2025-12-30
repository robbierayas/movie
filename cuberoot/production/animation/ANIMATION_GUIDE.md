~~# Three.js Animation System - Key Concepts and Best Practices

This guide provides essential concepts, patterns, and best practices for working with the animation system. For detailed implementation instructions and step-by-step workflows, see `animation/README.md`.

---

## TABLE OF CONTENTS
- [Cube Structure and Design Reference](#cube-structure-and-design-reference)
- [Overview](#overview)
- [Core System Architecture](#core-system-architecture)
- [Creating Environment Classes](#creating-environment-classes)
- [Scene Setup Workflow - Character Marks](#scene-setup-workflow---character-marks)
- [Character Actions Reference](#character-actions-reference)
- [Position and Rotation Guide](#position-and-rotation-guide)
- [Camera & Character Movement Guide](#camera--character-movement-guide)
- [Common Issues and Solutions](#common-issues-and-solutions)
- [Best Practices](#best-practices)
- [Quick Reference](#quick-reference)
- [Export and Rendering](#export-and-rendering)
- [Resources](#resources)

---

## CUBE STRUCTURE AND DESIGN REFERENCE

### N=3 CUBE CONFIGURATION
- The n=3 cube is 3 cube rooms long on each side (3×3×3 = 27 total rooms)
- Each cube room has 6 equal-sized faces (floor, ceiling, 4 walls)
- In the center of each face is a door to the next room (or empty space at edges)
- Perpendicular from each edge of the door are ladder rungs
- Each door has 4 sets of ladder rungs going to it, positioned 90 degrees apart

### VISUAL DESIGN
- The blank wall space (areas without doors or rungs) has fractal-like tiles
- Tiles are the same color throughout most scenes, but can change color in specific scenes
- **IMPORTANT:** Walls do NOT shimmer or move during the film
- Walls can change color when the story requires it
- Traps can emerge from the walls
- Lighting: The walls/tiles emit light at normal brightness - bright enough to see clearly but not blinding

### DOOR MECHANICS
- Doors can close and trap people in rooms
- When doors are closed, the cube can mechanically rearrange/move entire rooms to different positions
- After rearrangement, doors may lead to different rooms than before
- Some doors close automatically
- The mechanical rearrangement is physical, not dimensional - rooms actually move within the cube structure

### IMPORTANT NOTE
There are no actual dimensional effects in the n=3 rooms themselves - just mechanical rearrangement of identical spaces that causes extreme disorientation. The team perceives impossible geometry but it's actually confusion from sameness and mechanical shuffling. Do not describe walls as "shimmering" or "moving" - they are static except when changing color or deploying traps.

---

## OVERVIEW

### Technology Stack
- **Three.js** for 3D rendering and scene management
- **Mixamo** for rigged character models with animations (.fbx format)
- Pre-built environment classes (ConferenceRoom, Lab, Cube)
- Timeline-based animation system with event-driven timing

### File Structure
```
animation/
  BaseScene.js           # Base scene class with timeline system
  BaseCharacter.js       # Character loading and animation
  ConferenceRoom.js      # Conference room environment
  Lab.js                 # Lab environment
  Cube.js               # Cube room environment
  utils.js              # Constants and utilities

  characters/           # Character FBX models
    alex/
      character.fbx     # Walking animation
      Sitting.fbx       # Sitting animation
      Standing.fbx      # Standing animation
      Waving.fbx        # Waving gesture
      Pointing.fbx      # Pointing gesture
    marcus/
      ... (same structure)
    ... (one folder per character)

  scene[N]/            # Individual scene folders
    location[N]/
      demo.html        # HTML entry point
      scene.js         # Scene class implementation
      sceneConfig.js   # Character and timeline configuration
```

---

## CORE SYSTEM ARCHITECTURE

### BaseScene.js
**Purpose**: Base class that all scenes extend from

**Key Features**:
- Sets up Three.js scene, camera, renderer, controls, lights
- **Timeline System**: Processes timeline array to trigger actions at specific times
- Animation loop management
- Camera animation utilities (panToPosition, panKeepAngle, cutToPosition)

**How it works**:
1. Scene class extends BaseScene
2. Pass sceneConfig to super() in constructor
3. BaseScene automatically processes timeline events, character actions, and camera moves
4. Scene implements setupBackground() and timeline action methods

**Event-Based Timing**: All timing uses named events. Change one event time, and all dependent actions update automatically.

### BaseCharacter.js
**Purpose**: Handles character model loading and animation

**Key Features**:
- Loads FBX models with animations
- Plays animations: walk, sitting, standing, waving, pointing, talking
- **Walking system**: Automatically moves character from startPosition to endPosition
- Automatic rotation to face movement direction
- Delta time capping to prevent position jumps

**Walking Animation System**:
- Automatically moves character along path
- Speed controlled by `distancePerCycle` parameter
- Stops animation when destination reached
- Handles direction calculation automatically

### Environment Classes

**ConferenceRoom.js**:
- Long table with 10 chairs (5 per side)
- Chair positions: x = [-4, -2, 0, 2, 4], z = ±2
- Single chair at south wall: x = 0, z = 6.5
- Projection screen on west wall
- Door on east wall

**Lab.js**:
- Large room (30×25)
- Two work tables, segmented loading bay door
- Eight office desks with monitors
- n=0 device with glowing core

**Cube.js**:
- Implements n=3 cube specifications
- 6 faces with doors and ladder rungs
- Configurable colors, opacity
- Emissive materials for lighting

### Cube Room Camera Positioning (Cube.js Specific)

**Default Cube Room Dimensions:**
- Size: 10×10×10 units (configurable in constructor)
- Center: (0, 0, 0)
- Walls at: x = ±5, y = ±5, z = ±5

**Maximum Camera Distance from Center:**
To position camera as far back as possible while staying inside cube walls:
- **Stay 0.1 units from walls** to avoid clipping through geometry
- X range: -4.9 to 4.9
- Y range: -4.9 to 4.9
- Z range: -4.9 to 4.9

**Corner Positioning Examples:**
```javascript
// Southwest corner (far back, left side)
targetPos: { x: -4.9, y: -3.5, z: 4.9 }

// Southeast corner (far back, right side)
targetPos: { x: 4.9, y: -3.5, z: 4.9 }

// Northeast corner (far back, right side, high angle)
targetPos: { x: 4.9, y: 4.9, z: -4.9 }
```

**Adjacent Cube Rooms:**
When scenes use multiple connected cubes:
- Cube 1 centered at (0, 0, 0): x = -5 to 5
- Cube 2 centered at (10, 0, 0): x = 5 to 15
- Door opening at x = 5 (shared wall)

**Camera Positioning in Multi-Cube Scenes:**
```javascript
// Cube 1 - Far back corner
targetPos: { x: -4.9, y: -3.5, z: 4.9 }

// Cube 2 - Far back corner
targetPos: { x: 14.9, y: -3.5, z: 4.9 }

// Inside cube 1 viewing door
targetPos: { x: 2, y: -2.5, z: 4.5 }
```

**Character Floor Level in Cubes:**
- Floor at y = -5 (bottom of cube)
- Character feet at y = -5
- Character head at approximately y = -3.4
- Camera height for eye-level: y = -3.5 to y = -2.5

**Reference Scene:** See `animation/cubeClimbTest/test1/sceneConfig.js` for examples of all camera move types at maximum distances within cube rooms.

---

## CREATING ENVIRONMENT CLASSES

When creating new locations (like ConferenceRoom.js, Lobby.js, Lab.js), follow these patterns:

### Basic Structure

```javascript
import * as THREE from 'three';

export class LocationName {
    constructor(options = {}) {
        this.width = options.width || 20;
        this.height = options.height || 10;
        this.depth = options.depth || 15;
        this.wallThickness = options.wallThickness || 0.2;
        this.wallColor = options.wallColor || 0xa0a0a0;
        this.floorColor = options.floorColor || 0x606060;

        this.group = new THREE.Group();
        this.build();
    }

    build() {
        this.buildFloor();
        this.buildCeiling();
        this.buildWalls();
        this.buildFurniture();
        this.buildDoors();
    }

    getGroup() {
        return this.group;
    }
}
```

### Coordinate System

```
      Y (Up)
      ↑
      |
      |____→ X (East)
     /
    /
   ↙
  Z (South)
```

- **X axis**: Negative = West, Positive = East
- **Y axis**: Up (height)
- **Z axis**: Negative = North, Positive = South

Room dimensions: `width` (X), `height` (Y), `depth` (Z)

### IMPORTANT: Use Hardcoded Numbers

**❌ BAD - Complex relative calculations:**
```javascript
const deskRef = { x: -3.5, y: 1.1, z: 4.5 };
mainTop.position.set(
    deskRef.x + mainWidth / 2 + returnWidth / 2,
    deskRef.y,
    deskRef.z - mainDepth / 2
);
```

**✅ GOOD - Hardcoded coordinates:**
```javascript
mainTop.position.set(-1.25, 1.1, 2.0);
returnTop.position.set(0.5, 1.1, 3.75);
```

**Why?** Relative calculations are hard to debug and adjust. Just calculate the final position once, then hardcode it. Moving objects is easier when you see the exact coordinates.

### Material Guidelines

**Standard Material Properties:**
- `roughness: 0.8` - Matte surfaces (wood, floor)
- `roughness: 0.3` - Polished surfaces (metal, screen)
- `metalness: 0.1-0.3` - Slight metallic sheen
- `emissive: color` - Self-illumination
- `emissiveIntensity: 0.2-0.5` - Glow brightness

**Common Colors:**
- Walls: `0xa0a0a0` (gray)
- Floor: `0x606060` (dark gray)
- Wood: `0x3a2510` (brown)
- Metal: `0x4a4a4a` (dark gray)
- Screens: `0x2a4a6a` (blue-gray)

### Position Reference Examples

**Conference Room (20×10×15):**
- Table center: `(0, 0.8, 0)`
- Chairs north side: `z = -2`, `x = [-4, -2, 0, 2, 4]`
- Chairs south side: `z = 2`, `x = [-4, -2, 0, 2, 4]`
- Door: `(9.9, 1.25, 0)` on east wall
- Screen: `(-9.5, 2, 0)` on west wall

**Lobby (10×15×10):**
- Desk: `(-1.25, 1.1, 2.0)` near south wall, west side
- Timeline: `(0, 1.5, -4.9)` on north wall, standing height
- East door: `(4.9, 1.25, 0)`
- West door: `(-4.9, 1.25, -3)` near north corner

---

## SCENE SETUP WORKFLOW - CHARACTER MARKS

**Command:** "Create base scene files for [Scene Name]"

**IMPORTANT:** Only create scene structure for scenes that have a `cam_` camera-ready screenplay file. Scene creation requires a camera-ready screenplay to extract beats and character positions.

**Purpose:** Set up scene structure with characters positioned on their "marks" for main action BEFORE defining character movements and camera choreography.

**This is the staging/blocking step - you're setting up the stage and placing actors before choreographing their dance.**

### WORKFLOW STEPS

#### STEP 1: Read Camera-Ready Screenplay
- **Verify `cam_*.txt` file exists** for the scene (e.g., `cam_Scene 4 - Meeting Lea.txt`)
- If no `cam_` file exists, **STOP** - scene is not ready for animation
- Read the `cam_*.txt` file for the scene
- Identify the location (Lab, Conference Room, Cube, Lobby, etc.)
- List all characters present in the scene
- Note the main "beats" or moments (key events where action happens)
- Identify where characters need to be positioned for these beats

#### STEP 2: Create Folder Structure
Create the scene folder structure:
```
animation/
  act[N]_scene[N]/
    [location_name]/
      demo.html
      scene.js
      sceneConfig.js
```

**Example:** `animation/act1_scene6/lab/`

#### STEP 3: Create demo.html
Template for demo.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Act 1 Scene 6 - Lab Introduction</title>
    <style>
        body { margin: 0; overflow: hidden; }
        canvas { display: block; }
    </style>
</head>
<body>
    <script type="module">
        import { Act1Scene6Lab } from './scene.js';

        const scene = new Act1Scene6Lab();
    </script>
</body>
</html>
```

#### STEP 4: Create scene.js with setupBackground
Create scene.js with:
- Import statements for environment class and BaseScene
- Class extending BaseScene
- setupBackground() method that builds the environment
- Placeholder timeline action methods (empty for now)

```javascript
import { BaseScene } from '../../BaseScene.js';
import { Lab } from '../../Lab.js';
import { sceneConfig } from './sceneConfig.js';

export class Act1Scene6Lab extends BaseScene {
    constructor() {
        super(sceneConfig);
    }

    setupBackground() {
        // Build environment
        this.lab = new Lab({
            width: 30,
            length: 25
        });
        this.scene.add(this.lab.getGroup());

        console.log('[SETUP] Lab environment created');
    }

    // Timeline action methods - placeholders for now
    sceneStart() {
        console.log('[ACTION] Scene starting');
    }

    teamEnters() {
        console.log('[ACTION] Team entering lab');
    }

    chenDemo() {
        console.log('[ACTION] Chen demonstrating transmitter');
    }

    messageRevealed() {
        console.log('[ACTION] Message revealed on sof-tak');
    }
}
```

#### STEP 5: Create sceneConfig.js with Character Marks
Create sceneConfig.js with:
- Events for main beats (with placeholder times)
- Characters array with IDs and ONLY standing positions on their marks (NO movements yet)
- Empty cameraMoves array (will fill in later)
- Timeline array referencing the action methods

**Key principle: Characters placed on "marks" for main action moments**

```javascript
import { CHARACTER_HEIGHT, CHARACTER_SCALE, ROTATION } from '../../utils.js';

export const sceneConfig = {
    // Main beats in the scene
    events: {
        sceneStart: 0,
        teamEnters: 2000,      // Team enters lab
        exploration: 8000,     // Team spreads out examining equipment
        chenDemo: 30000,       // Chen demonstrates transmitter
        sofTakSent: 50000,     // Sof-tak sent through
        messageRevealed: 65000 // Message comes back
    },

    characters: [
        // Position characters on their "marks" for key moments
        // NO movements yet - just standing positions
        {
            id: 'morris',
            name: 'Morris',
            scale: CHARACTER_SCALE,
            actions: [
                // Mark 1: Near equipment during exploration
                {
                    type: 'standing',
                    event: 'exploration',
                    delay: 0,
                    startPosition: { x: -8, y: CHARACTER_HEIGHT.STANDING, z: 5 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                }
            ]
        },
        {
            id: 'darius',
            name: 'Darius',
            scale: CHARACTER_SCALE,
            actions: [
                // Mark 1: Near transmitter during exploration
                {
                    type: 'standing',
                    event: 'exploration',
                    delay: 0,
                    startPosition: { x: 3, y: CHARACTER_HEIGHT.STANDING, z: -8 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                }
            ]
        },
        {
            id: 'sofia',
            name: 'Sofia',
            scale: CHARACTER_SCALE,
            actions: [
                // Mark 1: Near chalkboard during exploration
                {
                    type: 'standing',
                    event: 'exploration',
                    delay: 0,
                    startPosition: { x: -5, y: CHARACTER_HEIGHT.STANDING, z: -10 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },
        {
            id: 'nina',
            name: 'Nina',
            scale: CHARACTER_SCALE,
            actions: [
                // Mark 1: At chalkboard with Sofia
                {
                    type: 'standing',
                    event: 'exploration',
                    delay: 0,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.STANDING, z: -10 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },
        {
            id: 'rashid',
            name: 'Rashid',
            scale: CHARACTER_SCALE,
            actions: [
                // Mark 1: Near chalkboard area
                {
                    type: 'standing',
                    event: 'exploration',
                    delay: 0,
                    startPosition: { x: -6, y: CHARACTER_HEIGHT.STANDING, z: -8 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },
        {
            id: 'chen',
            name: 'Chen',
            scale: CHARACTER_SCALE,
            actions: [
                // Mark 1: At transmitter controls
                {
                    type: 'standing',
                    event: 'chenDemo',
                    delay: 0,
                    startPosition: { x: 5, y: CHARACTER_HEIGHT.STANDING, z: -10 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                }
            ]
        },
        {
            id: 'yuki',
            name: 'Yuki',
            scale: CHARACTER_SCALE,
            actions: [
                // Mark 1: Near chalkboard with other mathematicians
                {
                    type: 'standing',
                    event: 'exploration',
                    delay: 0,
                    startPosition: { x: -8, y: CHARACTER_HEIGHT.STANDING, z: -9 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        }
    ],

    // Camera moves - empty for now, will define after character movements
    cameraMoves: [],

    timeline: [
        { event: 'sceneStart', delay: 0, action: 'sceneStart' },
        { event: 'teamEnters', delay: 0, action: 'teamEnters' },
        { event: 'chenDemo', delay: 0, action: 'chenDemo' },
        { event: 'messageRevealed', delay: 0, action: 'messageRevealed' }
    ]
};
```

#### STEP 6: Test Scene with Character Marks
1. Open `demo.html` in browser
2. Verify environment loads correctly
3. Verify characters appear at their marked positions
4. Verify characters are facing correct directions
5. Verify console logs show timeline actions firing

**At this stage:**
- ✅ Environment is built
- ✅ Characters are positioned on their marks for key beats
- ✅ Timeline events are defined
- ✅ Scene structure is ready

**NOT yet done:**
- ❌ Character movements (walking, gestures)
- ❌ Camera choreography
- ❌ Action line details
- ❌ Timing adjustments

### NEXT STEPS (After Character Marks Are Set)

Once character marks are established and tested:

1. **Add Character Movements**: Define walk actions, gestures, sitting/standing transitions
2. **Add Camera Choreography**: Define cameraMoves array with cuts, pans, tracking
3. **Refine Timing**: Adjust event times based on walk durations and camera moves
4. **Add Details**: Implement timeline action methods with specific behaviors
5. **Polish**: Fine-tune positions, rotations, camera angles

### WHY THIS WORKFLOW?

**Benefits of setting marks first:**
1. **See the layout**: Understand spatial relationships before choreographing movement
2. **Test environment**: Verify location class works correctly with character positions
3. **Define hardcoded positions**: Lock in key positions before adding complexity
4. **Iterative refinement**: Easier to adjust standing positions than complex movement paths
5. **Clear structure**: Separates staging from choreography

**This matches theatrical production workflow:**
- First: Set the stage and place actors on their marks
- Then: Choreograph entrances, exits, and movements
- Finally: Add camera work and polish

---

## CHARACTER ACTIONS REFERENCE

### Action Type: `walk`

**Purpose**: Character walks from point A to point B

**Key Characteristics**:
- Uses `character.fbx` (walking animation)
- Y position: `CHARACTER_HEIGHT.WALKING` (0.1)
- Automatically calculates direction from start/end positions
- Stops when destination reached
- Speed controlled by `distancePerCycle` parameter

**Common Issues**:
- ❌ Don't change character's animation mid-walk (they'll stop moving)
- ❌ Don't use y = 0 for walking (use 0.1)
- ✅ Walking is continuous - characters reach destination automatically

### Action Type: `sitting`

**Purpose**: Character sits in chair or on surface

**Key Characteristics**:
- Uses `Sitting.fbx`
- Y position: `CHARACTER_HEIGHT.SITTING` (-0.25) - characters sit INTO chairs
- Requires rotation to specify facing direction

**Rotation Examples**:
- Face table/north: `y: ROTATION.NORTH`
- Face south: `y: ROTATION.SOUTH`
- Face east: `y: ROTATION.EAST`
- Face west: `y: ROTATION.WEST`

### Action Type: `standing`

**Purpose**: Character stands in place

**Key Characteristics**:
- Uses `Standing.fbx`
- Y position: `CHARACTER_HEIGHT.STANDING` (0.1)
- Requires rotation to specify facing direction

### Action Type: `waving`, `pointing`, and `talking` (Gestures)

**Purpose**: Character performs temporary gesture

**Key Characteristics**:
- Uses `Waving.fbx`, `Pointing.fbx`, or `Talking.fbx`
- Can be temporary (return to base animation after timeout)
- `talking` - animated hand gestures while speaking (use during dialogue)
- `waving` - greeting or farewell gesture
- `pointing` - indicating direction or object
- Useful for reactions, greetings, explanations, and natural dialogue movement

### Action Type: `face` or `lookAt`

**Purpose**: Character rotates to face another character

**Key Characteristics**:
- No animation file - just rotates the character in place
- Requires `targetCharacter` attribute specifying which character to look at
- Automatically calculates direction from current position to target character
- Instant rotation (not animated over time)
- Useful for conversation reactions, acknowledgments, and natural interactions

**Usage Example**:
```javascript
{
    type: 'face',
    targetCharacter: 'alex',  // Character will rotate to face Alex
    event: 'leaResponds',
    delay: 0
}
```

**Common Use Cases**:
- Characters turning to face each other before dialogue
- Reactions where character looks at speaker
- Group conversations where characters shift attention between speakers
- Acknowledgments or greetings where character turns to face newcomer

---

## POSITION AND ROTATION GUIDE

### Conference Room Layout

```
                    NORTH (-Z)
                        ↑
              [Projection Screen]

      -4    -2    0    2    4
    ┌────┬────┬────┬────┬────┐
    │    │    │    │    │    │  z = -2 (north side)
    └────┴────┴────┴────┴────┘
    ╔══════════════════════════╗
    ║        TABLE             ║
    ╚══════════════════════════╝
    ┌────┬────┬────┬────┬────┐
    │    │    │    │    │    │  z = 2 (south side)
    └────┴────┴────┴────┴────┘

              [Single Chair]
                 x = 0, z = 6.5

WEST (-X) ←                    → EAST (+X)

            [Door] x = 9, z = 0
```

**Table Chairs**:
- X positions: -4, -2, 0, 2, 4
- North side: z = -2, rotation: `y: ROTATION.SOUTH` (facing south/table)
- South side: z = 2, rotation: `y: ROTATION.NORTH` (facing north/table)

### Rotation Constants (from utils.js)

```javascript
ROTATION.NORTH = Math.PI        // Face toward -Z
ROTATION.SOUTH = 0              // Face toward +Z
ROTATION.EAST = -Math.PI / 2    // Face toward +X
ROTATION.WEST = Math.PI / 2     // Face toward -X
ROTATION.NORTHEAST = -Math.PI * 3/4
ROTATION.NORTHWEST = Math.PI * 3/4
ROTATION.SOUTHEAST = -Math.PI / 4
ROTATION.SOUTHWEST = Math.PI / 4
```

### Y-Axis Heights

```javascript
CHARACTER_HEIGHT.WALKING = 0.1    // Walking/standing on floor
CHARACTER_HEIGHT.STANDING = 0.1   // Standing in place
CHARACTER_HEIGHT.SITTING = -0.25  // Sitting in chair
```

**Why -0.25 for sitting?**
- Chairs have seat at y = 0.5
- Characters positioned at y = -0.25 to "sit on" the chair
- With scale 0.01, effective sitting height works correctly

---

## CAMERA & CHARACTER MOVEMENT GUIDE

### Camera Positioning Principles

#### Camera Height
- **Conversation**: Place at eye-line (1.6m Y) or slightly below for intimacy
- **Walking scenes**: 1.4-1.5m Y for natural following
- **Establishing shots**: 2.0-3.0m Y for spatial context
- **Dramatic moments**: Low (0.8-1.2m) or high (2.5m+) angles

#### Camera Distance
- **Close-up**: 0.8-1.5m from subject
- **Medium shot**: 2.0-3.5m from subject
- **Wide shot**: 5.0-10.0m from subject
- Start wider, move closer as scene develops

#### Camera Offset
- Avoid centering camera directly behind/in front of subject
- Offset 30-45° to side for depth (use sin/cos of angle)
- For two characters: position to capture both at complementary angles

#### Camera Field of View (FOV)
- **Default**: 35° - Cinematic framing with tight character focus
- **Wide-angle**: 50-75° - Shows more environment, but makes characters look smaller (avoid for dialogue)
- **Telephoto**: 25-35° - Compressed depth, tight on faces (good for emotional moments)
- **Rule**: Lower FOV = tighter/closer framing without moving camera
- The FOV is set in BaseScene.js setupCamera() method
- FOV of 35° provides movie-like character framing - fills frame with character head/torso with minimal empty space above

### Camera Movement

#### Natural Motion
- **Ease in/out**: Start slow, accelerate, then decelerate before stopping
- **Motivated moves**: Camera should react to action (follow character, reveal new element)
- **Speed**: 0.3-0.8 m/s for smooth tracking, 1.5+ m/s for urgency

#### Following Characters
- **Lead the action**: Camera arrives at destination slightly before character
- **Predictive positioning**: If character turning right, pan camera right first
- **Maintain spatial relationship**: Keep consistent distance/angle unless motivated to change

### Camera Look-At Targeting

#### Static Scenes
- Point at character's head/chest (Y = 1.5-1.7m)
- For seated: Y = 1.2-1.3m

#### Moving Scenes
- **Lead the target**: Point slightly ahead of character's movement direction
- **Offset**: Don't point at exact center; offset target 0.2-0.5m in direction of interest
- **Smooth transitions**: Rotate camera target over 1-2 seconds, not instantly

#### Multiple Characters
- Point at midpoint between characters
- Shift focus by moving look-at between characters (takes 0.5-1.5s)

### Character Group Movement

#### Walking Together
**Side-by-side (2 characters):**
- Spacing: 0.7-1.2m apart
- Sync: Start steps together, maintain same speed
- Natural variance: Add ±0.1s timing offset for realism

**Line formation (narrow halls):**
- Front/back spacing: 1.0-1.5m
- Leader walks at base speed
- Follower matches position with 0.3-0.5s delay

**Groups of 3+:**
- Triangle/cluster formation in open space
- Automatic single-file in narrow areas
- Spacing: 0.8-1.5m between characters

#### Door Transitions

**Single character:**
1. Approach: Walk to 0.5m before door
2. Slow down: 0.3s deceleration to 50% speed
3. Pass through: Maintain slower speed
4. Clear door: Resume normal speed 0.5m past door

**Multiple characters:**
1. First character: Normal door approach
2. Subsequent: Slow to 60% speed when 2.0m from door
3. Wait: If door occupied, pause 0.8m before door
4. Resume: Start moving 0.4s after previous character clears (1.2m past door)

**Door opening timing:**
- Start opening 0.6s before character reaches door
- Full open duration: 0.8-1.2s
- Begin closing: 0.5s after last character passes

#### Natural Variations
- Add small random offsets (±0.1-0.2s) to prevent robotic sync
- Vary walk speed by ±5-10% per character
- Slightly different stride timing makes movement organic

### Small Room Movement (9x9m or smaller)

#### Conversation Staging

**Two characters:**
- **Face-to-face**: 1.5-2.5m apart, angled 15-30° off direct opposition (not perfectly facing)
- **Intimate/tense**: 0.8-1.2m apart, maintain slight angle
- **Casual**: 2.0-3.0m apart, 45-60° angles create triangle with camera

**Three characters:**
- **Triangle formation**: 2.0-2.5m between each, all facing inward
- **Authority setup**: 1 vs 2, single character backed against wall/corner, others 2.5m away at 45° spread
- **Casual**: Arc formation, 2.5-3.0m spacing, all oriented toward conversation center

**Four+ characters:**
- **Circle**: 2.5-3.5m diameter, characters evenly spaced around perimeter
- **Sides**: Split into pairs/groups on opposite sides, 3-4m apart
- Avoid perfect symmetry - offset by 0.5-1.0m for natural feel

#### Camera in Small Rooms
- **Wide shot**: Camera in corner, 2.5-3.5m from center, Y=1.8m
- **Medium shots**: 2.0-2.5m from subjects, rotate around action
- **Over-shoulder**: Position 0.5m behind/beside character A, point at character B
- Keep camera against walls to maximize space

#### Fight Choreography

**One vs One (9x9 room):**
- Start 3.0-4.0m apart
- **Attacker advance**: Move 1.5-2.0m forward in 0.4-0.6s
- **Defender react**: Step back 0.8-1.2m OR sidestep 0.6-1.0m perpendicular
- **Circling**: Both rotate around room center, 2.5-3.5m radius, 30-45° every 1-2s
- **Impact zone**: Fighters meet at 0.5-1.2m distance for strike exchanges

**Confined space tactics:**
- Use corners: Defender backs into corner, attacker 1.5m away
- Wall pins: Attacker 0.3-0.5m from defender against wall
- Grapple movement: Both characters rotate/stumble 0.5-1.5m together
- **Spacing reset**: After exchange, fighters separate to 2.5-3.5m

**Multiple combatants:**
- **2 vs 1**: Attackers at 90-120° angles from defender, 2.0-3.0m distance
- **Free-for-all**: Maintain 1.5-2.5m minimum between all fighters
- Characters on edges move toward center, center characters pushed toward walls
- Use room diagonals (12.7m) for maximum movement distance

**Movement speeds:**
- **Aggressive advance**: 1.5-2.5 m/s
- **Defensive retreat**: 1.0-1.8 m/s
- **Sidestep/dodge**: 2.0-3.0 m/s (short burst)
- **Circling**: 0.3-0.6 m/s rotational

#### Proximity Rules
- **Personal space violation**: <0.6m = confrontational/intimate
- **Conversation comfort**: 1.2-2.5m = normal dialogue
- **Room awareness**: Keep 0.8m+ from walls unless pinned/cornered
- **Traffic**: Characters passing each other need 0.6m minimum clearance

#### Natural Behavior
- Characters shift weight/adjust stance every 3-8s (rotate 5-15°)
- Small steps during conversation: 0.2-0.4m forward/back for emphasis
- Nervous pacing: 1.5-2.5m path, 0.4-0.6 m/s
- Turn to face speaker: 0.6-1.2s rotation time

### Character Tracking as Camera Move Type

**IMPORTANT:** Character tracking is a camera move type that must be defined in sceneConfig.cameraMoves, NOT called from scene.js methods.

Camera follows a character's actual position every frame based on configured offset parameters.

**Camera Move Type: `trackCharacter`**

**Properties**:
- `type: 'trackCharacter'`
- `characterId` - ID of character to track (e.g., 'alex', 'lea')
- `offsetX` - X offset from character (default: -2.5)
    - Negative = camera west of character
    - Positive = camera east of character
- `offsetZ` - Z offset from character (default: 2)
    - **Negative = camera in front** (camera faces character)
    - **Positive = camera behind** (follows from behind)
- `height` - Camera Y position (default: 1.45m)

**IMPORTANT NOTES:**
1. **Do NOT use trackCharacter during crawling actions** - it looks bad. Use `cutToPosition` or `panToPosition` instead for static framing during crawls.

2. **Camera Shooting Through Walls Rule**:
   - **ONLY ALLOWED**: Camera can shoot through walls when character is **climbing** or **crawling** (because they're in the door opening)
   - **NOT ALLOWED**: Camera shooting through walls when character is **walking** or **standing**
   - When using trackCharacter for climbing/crawling, **MUST use stopTracking** before character transitions to walking/standing
   - Example: Track during climb down, but stop tracking before character walks away
   - This prevents the camera from continuing to track through solid walls when the character is no longer in a door opening

```javascript
// ✅ CORRECT - Stop tracking before walking
cameraMoves: [
    {
        event: 'characterClimbing',
        delay: 0,
        type: 'trackCharacter',
        characterId: 'chen',
        offsetX: -3.5,
        offsetZ: -4.0,
        height: -3.5
    },
    {
        event: 'characterClimbing',
        delay: 5000,  // Before climbing finishes
        type: 'stopTracking'
    }
]

// ❌ WRONG - Tracking continues during walking (shoots through walls)
cameraMoves: [
    {
        event: 'characterClimbing',
        delay: 0,
        type: 'trackCharacter',
        characterId: 'chen',
        offsetX: -3.5,
        offsetZ: -4.0,
        height: -3.5
    }
    // No stopTracking - camera will shoot through walls when character walks
]
```

**Common Shot Patterns**:

| Shot Type | offsetX | offsetZ | height | Use Case |
|-----------|---------|---------|--------|----------|
| Over-shoulder | 1.0 to 1.5 | -2.0 to -3.0 | 1.45 | Dialogue, looking at character |
| Side angle | -2.5 to -3.0 | -1.5 to -2.0 | 1.4 | Walking shots, medium coverage |
| Close-up | -1.5 to -2.0 | -0.8 to -1.2 | 1.45-1.55 | Emotional moments, reactions |
| Wide shot | -2.8 to -3.5 | -2.0 to -2.5 | 1.4 | Establishing, group context |
| From behind | any | 2.0 to 3.0 | 1.4-1.6 | Following character, POV |

**Usage Example in sceneConfig.js**:
```javascript
cameraMoves: [
    {
        event: 'sceneStart',
        delay: 0,
        type: 'cutToPosition',
        targetPos: { x: -5, y: 2, z: 10 },
        lookAt: { x: 0, y: 1.5, z: 0 }
    },
    {
        event: 'leaSpeaks1',
        delay: 0,
        type: 'trackCharacter',
        characterId: 'lea',
        offsetX: 1.2,
        offsetZ: -2.5,
        height: 1.45
    },
    {
        event: 'alexSpeaks1',
        delay: 0,
        type: 'trackCharacter',
        characterId: 'alex',
        offsetX: -1.5,
        offsetZ: -2.0,
        height: 1.45
    },
    {
        event: 'wideShot',
        delay: 0,
        type: 'trackCharacter',
        characterId: 'lea',
        offsetX: -2.8,
        offsetZ: -2.0,
        height: 1.4
    }
]
```

**Stop Tracking**:

Use `type: 'stopTracking'` to stop character tracking:

```javascript
{
    event: 'sceneEnd',
    delay: 0,
    type: 'stopTracking'
}
```

### Quick Estimation Formulas

**Follow distance behind character:**
```
camera_X = char_X - (forward_distance × cos(char_heading))
camera_Z = char_Z - (forward_distance × sin(char_heading))
```

**Offset to side:**
```
offset_X = side_distance × cos(char_heading + 90°)
offset_Z = side_distance × sin(char_heading + 90°)
```

**Movement duration:**
```
time = distance / speed (use 0.5-0.8 m/s for natural camera moves)
```

**Look-ahead target:**
```
target_X = char_X + (char_velocity_X × 0.5s)
target_Z = char_Z + (char_velocity_Z × 0.5s)
```

---

## COMMON ISSUES AND SOLUTIONS

### Issue 1: Characters Walking in Place

**Problem**: Characters start walking animation but don't move

**Causes**:
1. ❌ Their animation is being changed mid-walk
2. ❌ `distancePerCycle` is 0 or missing
3. ❌ `startPosition` and `endPosition` are the same

**Solution**: Don't interrupt walks - they complete automatically. Use sequential actions with proper timing based on walk duration.

### Issue 2: Camera Zooms Into Wrong Place

**Problem**: Camera moves to unexpected position or view

**Cause**: Camera position vs. lookAt target confusion

**Debugging Tips**:
- First parameter = where camera IS
- Second parameter = what camera LOOKS AT
- Camera position should have clear view of target (no obstacles)

### Issue 3: Character Not Loading

**Problem**: Character doesn't appear in scene

**Causes**:
1. ❌ Character folder name doesn't match `id` in config
2. ❌ FBX file missing or misnamed
3. ❌ Model path incorrect

**Check**:
- Folder structure: `characters/alex/character.fbx`, `Sitting.fbx`, etc.
- Character `id` in config matches folder name exactly

### Issue 4: Character Facing Wrong Direction

**Problem**: Character faces opposite or wrong direction

**Solution**: Use rotation constants from utils.js
```javascript
import { ROTATION } from '../../utils.js';

// Face north (toward table from south side)
rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
```

### Issue 5: Timeline Actions Not Firing

**Problem**: Timeline method never gets called

**Causes**:
1. ❌ Method name doesn't match action string
2. ❌ Event time hasn't been reached yet
3. ❌ Event not defined in sceneConfig.events

**Solution**: Ensure method names match action strings exactly, and events are properly defined.

---

## BEST PRACTICES

### 1. Use Constants from utils.js

```javascript
// ✅ Good
import { CHARACTER_HEIGHT, CHARACTER_SCALE, ROTATION, ANIMATION_SPEED } from '../../utils.js';

{
    startPosition: { x: 4, y: CHARACTER_HEIGHT.SITTING, z: 2 },
    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
}

// ❌ Bad (magic numbers)
{
    startPosition: { x: 4, y: -0.25, z: 2 },
    rotation: { x: 0, y: 3.14159, z: 0 }
}
```

### 2. Use Event-Based Timing

```javascript
// ✅ Good - change one time, everything updates
events: {
    alexAtTable: 4000  // Change this once...
}

characters: [{
    actions: [
        { type: 'sitting', event: 'alexAtTable', delay: 0 }      // 4000
        { type: 'standing', event: 'alexAtTable', delay: 2000 }  // 6000
    ]
}]

// ❌ Bad - hardcoded absolute times everywhere
{ type: 'sitting', startTime: 4000 }
{ type: 'standing', startTime: 6000 }
```

### 3. Stagger Character Entrances

```javascript
// ✅ Good - characters enter one after another
{
    id: 'alex',
    actions: [{ type: 'walk', event: 'teamEnters', delay: 0, ... }]
},
{
    id: 'morris',
    actions: [{ type: 'walk', event: 'teamEnters', delay: 200, ... }]
},
{
    id: 'darius',
    actions: [{ type: 'walk', event: 'teamEnters', delay: 400, ... }]
}

// ❌ Bad - all characters enter at once (crowded)
delay: 0 for everyone
```

### 4. Calculate Walk Times

Walking time = `distance / (distancePerCycle / animationDuration)`

For typical values (distancePerCycle = 2, animDuration ≈ 1.5s):
- Speed ≈ 1.33 units/second
- Distance 4 units = ~3 seconds

**Plan timeline accordingly**:
```javascript
events: {
    alexEnters: 0,      // Starts walking
    alexAtTable: 3000   // Arrives after ~3 seconds
}
```

### 5. Structure Timeline by Screenplay

Keep timeline actions organized by screenplay beats:
```javascript
events: {
    // ENTRANCE (screenplay lines 132-145)
    sceneStart: 0,
    teamEnters: 0,

    // INTRODUCTIONS (lines 146-189)
    marcusIntroduces: 4000,

    // PRESENTATION (lines 251-320)
    marcusPresents: 15000,
    focusOnScreen: 18000
}
```

### 6. Always Define cameraMoves in sceneConfig

**Every scene requires a cameraMoves array** in sceneConfig.js with all camera control defined there.

**IMPORTANT: Use a variety of camera move types** - Don't rely only on `trackCharacter`. Mix different types:
- Start with establishing shots (`cutToPosition` or `panToPosition`)
- Use `trackCharacter` for following moving characters
- Use `cutToPosition` for dramatic angle changes
- Use `panToPosition` for smooth reveals
- Variety creates visual interest and professional cinematography

```javascript
// ✅ CORRECT - sceneConfig.js
export const sceneConfig = {
    events: {
        sceneStart: 0,
        leaSpeaks1: 2000,
        alexSpeaks1: 8000
    },
    characters: [ /* ... */ ],

    // Required: Define all camera control here
    cameraMoves: [
        {
            event: 'sceneStart',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: -5, y: 2, z: 10 },
            lookAt: { x: 0, y: 1.5, z: 0 }
        },
        {
            event: 'leaSpeaks1',
            delay: 0,
            type: 'trackCharacter',
            characterId: 'lea',
            offsetX: 1.2,
            offsetZ: -2.5,
            height: 1.45
        },
        {
            event: 'alexSpeaks1',
            delay: 0,
            type: 'trackCharacter',
            characterId: 'alex',
            offsetX: -1.5,
            offsetZ: -2.0,
            height: 1.45
        }
    ],

    timeline: [ /* ... */ ]
};

// ❌ WRONG - Don't call camera methods in scene.js
// scene.js should only implement setupBackground() and timeline action methods
```

**Character tracking in cameraMoves benefits**:
- Automatically follows moving characters
- Switch between speakers by changing tracked character and offset
- Easy to adjust shot composition (just change offset)
- All camera control centralized in sceneConfig
- BaseScene processes everything automatically

### 7. Camera Positioning Formula (for static objects)

For viewing static objects at position `P` from direction `D`:

```javascript
// To view screen on west wall from east:
const screenPos = { x: -9, y: 2, z: 0 };  // Object position
const viewDistance = 15;                   // How far back
const cameraPos = {
    x: screenPos.x + viewDistance,         // Move east from screen
    y: screenPos.y + 1,                    // Slightly above
    z: screenPos.z                         // Same Z
};

// In cameraMoves:
{
    event: 'focusOnScreen',
    delay: 0,
    type: 'panToPosition',
    targetPos: cameraPos,
    lookAt: screenPos,
    duration: 2000
}
```

### 8. Log Everything During Development

```javascript
sceneStart() {
    console.log('Scene started - Food team entering');
}

focusOnTable() {
    console.log('Camera: Focusing on conference table');
}
```

This helps debug timing and sequence issues.

### 9. Don't Manually Control Walk Completion

```javascript
// ✅ Good - walk completes automatically
characterWalk(character, action) {
    character.playAnimation('walk', {
        animationState: { /* ... */ }
    });
    // That's it! Character reaches destination and stops
}

// ❌ Bad - trying to manually stop walk
characterWalk(character, action) {
    setTimeout(() => {
        character.playAnimation('sitting');  // Don't do this!
    }, 3000);
}
```

---

## QUICK REFERENCE

### Character Action Checklist

- [ ] Character folder exists: `characters/[id]/`
- [ ] FBX files present: `character.fbx`, `Sitting.fbx`, `Standing.fbx`
- [ ] `id` in config matches folder name
- [ ] Event defined in `sceneConfig.events`
- [ ] `event` and `delay` set for action
- [ ] `startPosition` coordinates correct
- [ ] Y position matches action type (0.1 for walking, -0.25 for sitting)
- [ ] Rotation set using `ROTATION` constants
- [ ] Walking actions include `endPosition` and `distancePerCycle`

### Timeline Action Checklist

- [ ] Each timeline entry has `event`, `delay`, and `action`
- [ ] Method exists in scene.js with matching name: `action: 'foo'` → `foo() {}`
- [ ] Events defined in `sceneConfig.events`
- [ ] Delays are in milliseconds
- [ ] Actions ordered chronologically

### Camera Animation Checklist

- [ ] `targetPos` = camera position (where it is)
- [ ] `lookAt` = look target (what it looks at)
- [ ] Duration in milliseconds
- [ ] Camera position has clear view of target (no obstacles)
- [ ] Event and delay specified

### Character Tracking Checklist

- [ ] Defined in sceneConfig.cameraMoves array (NOT in scene.js methods)
- [ ] Camera move has `type: 'trackCharacter'`
- [ ] Character ID matches character in sceneConfig
- [ ] Offset Z is negative for facing character (positive for from behind)
- [ ] Offset X: negative = west, positive = east
- [ ] Height appropriate for shot type (1.4-1.6m)
- [ ] Shot pattern chosen from common patterns (over-shoulder, side, close-up, wide)
- [ ] Event and delay specified

**Quick Reference - Common Offsets**:
- Over-shoulder: `(1.0-1.5, -2.0 to -3.0, 1.45)`
- Side angle: `(-2.5 to -3.0, -1.5 to -2.0, 1.4)`
- Close-up: `(-1.5 to -2.0, -0.8 to -1.2, 1.45-1.55)`
- Wide shot: `(-2.8 to -3.5, -2.0 to -2.5, 1.4)`
- From behind: `(any, 2.0 to 3.0, 1.4-1.6)`

---

## EXPORT AND RENDERING

### Frame Capture (Future)

Once scene is working in browser, use **CCapture.js** to capture frames:

```javascript
// In demo.html, add CCapture
const capturer = new CCapture({ format: 'png', framerate: 30 });

// Start capture
capturer.start();

// In animate loop
capturer.capture(canvas);

// Stop and save
capturer.stop();
capturer.save();
```

### Video Compilation

Use **ffmpeg** to compile PNG sequence into video:

```bash
ffmpeg -framerate 30 -i frame_%05d.png -c:v libx264 -pix_fmt yuv420p output.mp4
```

---

## RESOURCES

- **Mixamo**: https://www.mixamo.com (free characters + animations)
- **Three.js Docs**: https://threejs.org/docs/
- **FBX Loader**: https://threejs.org/docs/#examples/en/loaders/FBXLoader
- **CCapture.js**: https://github.com/spite/ccapture.js/
- **ffmpeg**: https://ffmpeg.org/

---

## DETAILED IMPLEMENTATION

See `animation/README.md` for:
- Complete step-by-step workflow from screenplay to animation
- Detailed code examples for sceneConfig.js and scene.js
- Character action implementation details
- Timeline system implementation
- Camera positioning and animation techniques
- Advanced techniques (waypoint pathing, preloading animations, frame delta capping)
- Troubleshooting guides with specific code examples~~
