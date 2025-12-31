# PROJECT DOCUMENTATION

This file provides an overview of the different workflows and documentation available.

---

## WORKFLOW TYPES

### Screenplay Workflows (DEFAULT)

**When user says "Workflow 1", "Workflow 2", etc. without specifying "animation", they mean the screenplay workflows.**

See: **[production/SCREENPLAY_WORKFLOW.md](production/SCREENPLAY_WORKFLOW.md)** for:
- Workflow 1: When Acts are Defined (main.txt Approved)
- Workflow 2: When Table of Contents is Created (Build Character Files)
- Workflow 3: When Table of Contents is Approved (Create Scene Files)
- Workflow 4: When Scene Layout is Approved (Write Screenplay)
- Workflow 5: When Scene Screenplay is Approved (Finalize Scene)
- Workflow 6: Character Profile Updates from Screenplay

**Movie-specific screenplay documentation:**
- **[cuberoot/writing/dialogue.md](cuberoot/writing/dialogue.md)** - Cube^(0.333) screenplay project
- **[amazingtrash/writing/dialogue.md](amazingtrash/writing/dialogue.md)** - Amazingtrash screenplay project
- **[hunted/writing/dialogue.md](hunted/writing/dialogue.md)** - Hunted screenplay project

### Animation Workflows

**When user says "animation workflow 1", "animation workflow 2", etc., they mean the animation workflows.**

See: **[production/animation/claude.md.animation](production/animation/claude.md.animation)** - Animation workflow instructions

---

# Three.js Animation System - Key Concepts and Best Practices

This guide provides essential concepts, patterns, and best practices for working with the animation system.

**IMPORTANT: For AI animation workflows, see [production/animation/claude.md.animation](production/animation/claude.md.animation) - PRIMARY INSTRUCTION FILE**

**Additional documentation:**
- **[production/animation/ANIMATION_GUIDE.md](production/animation/ANIMATION_GUIDE.md)** - Technical reference manual (camera systems, character actions, code examples)
- **[production/animation/README.md](production/animation/README.md)** - Code organization and file structure

---

## TABLE OF CONTENTS
- [Cube Structure and Design Reference](#cube-structure-and-design-reference)
- [Overview](#overview)
- [Core System Architecture](#core-system-architecture)
- [Character Actions Reference](#character-actions-reference)
- [Camera System](#camera-system)
- [Position and Rotation Guide](#position-and-rotation-guide)
- [Screenplay Formatting](#screenplay-formatting)
- [Common Issues and Solutions](#common-issues-and-solutions)
- [Best Practices](#best-practices)
- [Quick Reference](#quick-reference)

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
See [production/animation/README.md](production/animation/README.md) for complete file structure details.

---

## CORE SYSTEM ARCHITECTURE

### BaseScene.js
**Purpose**: Base class that all scenes extend from

**Key Features**:
- Sets up Three.js scene, camera, renderer, controls, lights
- **Timeline System**: Processes timeline array to trigger actions at specific times
- **Event-Based Timing**: All timing uses named events - change one event time, and all dependent actions update automatically
- **Camera System**: Processes cameraMoves array for all camera control
- **Character System**: Automatically loads characters and executes actions

**How it works**:
1. Scene class extends BaseScene
2. Pass sceneConfig to super() in constructor
3. BaseScene automatically processes timeline events, character actions, and camera moves
4. Scene implements setupBackground() and timeline action methods

### BaseCharacter.js
**Purpose**: Handles character model loading and animation

**Key Features**:
- Loads FBX models with animations
- Plays animations: walk, sitting, standing, waving, pointing, talking, climbing, crawling
- **Walking system**: Automatically moves character from startPosition to endPosition
- **Automatic rotation** for movement actions (walk, climb, crawl) - calculates direction from start/end positions
- Delta time capping to prevent position jumps

### Environment Classes
- **ConferenceRoom.js**: Conference room with table, chairs, screen, door
- **Lab.js**: Lab with work tables, desks, monitors, n=0 device
- **Cube.js**: Implements n=3 cube specifications with doors and ladder rungs

For environment class creation patterns and detailed implementation, see [production/animation/README.md](production/animation/README.md) and [production/animation/ANIMATION_GUIDE.md](production/animation/ANIMATION_GUIDE.md).

---

## CHARACTER ACTIONS REFERENCE

### IMPORTANT: Automatic Rotation for Movement Actions

**DO NOT manually specify rotation for movement actions (walk, climbing, crawling).**

BaseCharacter automatically calculates rotation based on start/end positions:
- ✅ `walk` - automatically faces movement direction
- ✅ `climbing` - automatically faces movement direction
- ✅ `crawling` - automatically faces movement direction

**For stationary actions** (sitting, standing), manually set rotation using ROTATION constants.

---

### Action Types

### walk
- Uses `character.fbx` (walking animation)
- Y position: `CHARACTER_HEIGHT.WALKING` (0.1)
- Automatically calculates rotation from start/end positions
- Stops when destination reached
- Speed controlled by `distancePerCycle` parameter

### sitting
- Uses `Sitting.fbx`
- Y position: `CHARACTER_HEIGHT.SITTING` (-0.25) - characters sit INTO chairs
- Requires manual rotation to specify facing direction

### standing
- Uses `Standing.fbx`
- Y position: `CHARACTER_HEIGHT.STANDING` (0.1)
- Requires manual rotation to specify facing direction

### waving, pointing, talking (Gestures)
- Uses `Waving.fbx`, `Pointing.fbx`, or `Talking.fbx`
- Can be temporary (return to base animation after timeout)
- `talking` - animated hand gestures while speaking (use during dialogue)
- `waving` - greeting or farewell gesture
- `pointing` - indicating direction or object

### face / lookAt
- **Purpose**: Character rotates to face another character
- No animation file - just rotates the character in place
- Requires `targetCharacter` attribute specifying which character to look at
- Automatically calculates direction from current position to target character
- Instant rotation (not animated over time)
- Useful for conversation reactions, acknowledgments, and natural interactions

**Example**:
```javascript
{
    type: 'face',
    targetCharacter: 'alex',
    event: 'leaResponds',
    delay: 0
}
```

### climbing
- Uses `Climbing.fbx`
- Automatically calculates rotation from start/end positions
- Movement handled by `climbTo(x, y, z)` with `endPosition`
- Speed controlled by `distancePerCycle` (default: 1.0)

### crawling
- Uses `Crawling.fbx`
- Automatically calculates rotation from start/end positions
- Movement handled by `crawlTo(x, y, z)` with `endPosition`
- Speed controlled by `distancePerCycle` (default: 0.8)

---

## CAMERA SYSTEM

### IMPORTANT: All Camera Control in sceneConfig.cameraMoves

**Every scene MUST define camera movements in sceneConfig.cameraMoves array.**

BaseScene automatically processes all camera moves based on event timing. This is the ONLY place for camera configuration.

**IMPORTANT: Use a variety of camera move types** - Don't rely only on `trackCharacter`. Mix different types:
- Start with establishing shots (`cutToPosition` or `panToPosition`)
- Use `trackCharacter` for following moving characters
- Use `cutToPosition` for dramatic angle changes
- Use `panToPosition` for smooth reveals
- Variety creates visual interest and professional cinematography

### Camera Move Types

#### panToPosition
- Smooth camera movement to new position and look target
- `targetPos: { x, y, z }` - where camera moves to
- `lookAt: { x, y, z }` - what camera looks at
- `duration: 2000` - movement duration in milliseconds

#### panKeepAngle
- Dolly shot - camera moves while maintaining angle to look target
- `targetPos: { x, y, z }` - where camera moves to
- `lookAt: { x, y, z }` - (optional) set angle before pan
- `duration: 2000` - movement duration in milliseconds

#### cutToPosition
- Instant cut to new position (no duration needed)
- `targetPos: { x, y, z }` - where camera moves to
- `lookAt: { x, y, z }` - what camera looks at

#### trackCharacter
- Camera follows character in real-time every frame
- `characterId` - ID of character to track
- `offsetX` - X offset from character (negative = west, positive = east)
- `offsetZ` - Z offset from character (negative = in front, positive = behind)
- `height` - Camera Y position (default: 1.45m)

**IMPORTANT NOTES:**
1. **Do NOT use trackCharacter during crawling actions** - it looks bad. Use `cutToPosition` or `panToPosition` instead for static framing during crawls.

2. **Camera Shooting Through Walls Rule**:
   - **ONLY ALLOWED**: Camera can shoot through walls when character is **climbing** or **crawling** (because they're in the door opening)
   - **NOT ALLOWED**: Camera shooting through walls when character is **walking** or **standing**
   - When using trackCharacter for climbing/crawling, **MUST call stopTracking** before character transitions to walking/standing
   - Example: Track during climb down, but stop tracking before character walks away

```javascript
// ✅ CORRECT - Stop tracking before walking
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

// ❌ WRONG - Tracking continues during walking (shoots through walls)
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
```

**Example sceneConfig.cameraMoves:**
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
        event: 'alexSpeaks',
        delay: 0,
        type: 'trackCharacter',
        characterId: 'alex',
        offsetX: -1.5,
        offsetZ: -2.0,
        height: 1.45
    },
    {
        event: 'focusOnScreen',
        delay: 0,
        type: 'panToPosition',
        targetPos: { x: 5, y: 2, z: 0 },
        lookAt: { x: -9, y: 2, z: 0 },
        duration: 6000
    }
]
```

### Camera Positioning Principles

#### Camera Height
- **Conversation**: 1.6m Y (eye-line) or slightly below for intimacy
- **Walking scenes**: 1.4-1.5m Y for natural following
- **Establishing shots**: 2.0-3.0m Y for spatial context
- **Dramatic moments**: Low (0.8-1.2m) or high (2.5m+) angles

#### Camera Distance
- **Close-up**: 0.8-1.5m from subject
- **Medium shot**: 2.0-3.5m from subject
- **Wide shot**: 5.0-10.0m from subject

#### Camera Field of View (FOV)
- **Default**: 35° - Cinematic framing with tight character focus
- **Wide-angle**: 50-75° - Shows more environment (avoid for dialogue)
- **Telephoto**: 25-35° - Compressed depth, tight on faces
- FOV of 35° provides movie-like character framing

### Common trackCharacter Offset Patterns

| Shot Type | offsetX | offsetZ | height | Use Case |
|-----------|---------|---------|--------|----------|
| Over-shoulder | 1.0 to 1.5 | -2.0 to -3.0 | 1.45 | Dialogue, looking at character |
| Side angle | -2.5 to -3.0 | -1.5 to -2.0 | 1.4 | Walking shots, medium coverage |
| Close-up | -1.5 to -2.0 | -0.8 to -1.2 | 1.45-1.55 | Emotional moments, reactions |
| Wide shot | -2.8 to -3.5 | -2.0 to -2.5 | 1.4 | Establishing, group context |
| From behind | any | 2.0 to 3.0 | 1.4-1.6 | Following character, POV |

For detailed camera movement guidelines (character group movement, door transitions, fight choreography), see [production/animation/ANIMATION_GUIDE.md](production/animation/ANIMATION_GUIDE.md) - "CAMERA & CHARACTER MOVEMENT GUIDE" section.

---

## POSITION AND ROTATION GUIDE

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

### Conference Room Layout Reference

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

---

## SCREENPLAY FORMATTING

For comprehensive screenplay formatting standards and guidelines for creating camera-ready scripts that can be directly translated into animation, see **[SCREENPLAY_FORMATTING.md](production/SCREENPLAY_FORMATTING.md)**.

**Key principle**: Use visual action lines and minimal parentheticals. Show what the camera sees, not technical camera directions.

---

## COMMON ISSUES AND SOLUTIONS

### Issue 1: Characters Walking in Place

**Problem**: Characters start walking animation but don't move

**Causes**:
1. ❌ Their animation is being changed mid-walk
2. ❌ `distancePerCycle` is 0 or missing
3. ❌ `startPosition` and `endPosition` are the same

**Solution**: Don't interrupt walks - they complete automatically. Use sequential actions with proper timing.

### Issue 2: Camera Not Following Character

**Problem**: Camera doesn't track character movement

**Cause**: Using separate `this.trackCharacter()` calls instead of sceneConfig.cameraMoves

**Solution**: Define camera tracking in sceneConfig.cameraMoves:
```javascript
cameraMoves: [
    {
        event: 'dialogue',
        delay: 0,
        type: 'trackCharacter',
        characterId: 'alex',
        offsetX: -1.5,
        offsetZ: -2.0,
        height: 1.45
    }
]
```

### Issue 3: Character Not Loading

**Problem**: Character doesn't appear in scene

**Causes**:
1. ❌ Character folder name doesn't match `id` in config
2. ❌ FBX file missing or misnamed
3. ❌ Model path incorrect

**Check**: Folder structure: `characters/alex/character.fbx`, `Sitting.fbx`, `Standing.fbx`, etc.

### Issue 4: Character Facing Wrong Direction

**Problem**: Character faces opposite or wrong direction

**Solution**:
- For stationary actions (sitting, standing): Use rotation constants from utils.js
- For movement actions (walk, climb, crawl): Don't set rotation - it's calculated automatically

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

### 3. Always Define cameraMoves in sceneConfig

**Every scene requires a cameraMoves array** in sceneConfig.js:

```javascript
// ✅ CORRECT - sceneConfig.js
export const sceneConfig = {
    events: { /* ... */ },
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
            event: 'dialogue',
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

### 4. Stagger Character Entrances

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
```

### 5. Calculate Walk Times

Walking time = `distance / (distancePerCycle / animationDuration)`

For typical values (distancePerCycle = 2, animDuration ≈ 1.5s):
- Speed ≈ 1.33 units/second
- Distance 4 units = ~3 seconds

### 6. Structure Timeline by Screenplay

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

### 7. Use trackCharacter Camera Type for Dialogue Scenes

For dialogue scenes with moving characters, use trackCharacter camera move type:

```javascript
// sceneConfig.js
cameraMoves: [
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
]
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

---

## QUICK REFERENCE

### Character Action Checklist

- [ ] Character folder exists: `characters/[id]/`
- [ ] FBX files present: `character.fbx`, `Sitting.fbx`, `Standing.fbx`, etc.
- [ ] `id` in config matches folder name
- [ ] Event defined in `sceneConfig.events`
- [ ] `event` and `delay` set for action
- [ ] `startPosition` coordinates correct
- [ ] Y position matches action type (0.1 for walking, -0.25 for sitting)
- [ ] Rotation set for stationary actions only (walk/climb/crawl auto-rotate)
- [ ] Walking actions include `endPosition` and `distancePerCycle`

### Timeline Action Checklist

- [ ] Each timeline entry has `event`, `delay`, and `action`
- [ ] Method exists in scene.js with matching name: `action: 'foo'` → `foo() {}`
- [ ] Events defined in `sceneConfig.events`
- [ ] Delays are in milliseconds
- [ ] Actions ordered chronologically

### Camera Animation Checklist

- [ ] **cameraMoves array defined in sceneConfig.js** (required for every scene)
- [ ] Each camera move has `event`, `delay`, `type`
- [ ] `type` is one of: `'panToPosition'`, `'panKeepAngle'`, `'cutToPosition'`, `'trackCharacter'`
- [ ] Required properties for each type set correctly
- [ ] Camera moves processed automatically by BaseScene
- [ ] No camera method calls in scene.js (except setupBackground initial position)

### Resources

- **[production/animation/README.md](production/animation/README.md)** - Production notes and code organization
- **[production/animation/ANIMATION_GUIDE.md](production/animation/ANIMATION_GUIDE.md)** - Comprehensive animation guide with camera & character movement
- **[production/SCREENPLAY_FORMATTING.md](production/SCREENPLAY_FORMATTING.md)** - Screenplay formatting standards
- **Mixamo**: https://www.mixamo.com (free characters + animations)
- **Three.js Docs**: https://threejs.org/docs/
