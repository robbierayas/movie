# Animation System - Code Organization

**Overview of the Three.js animation codebase structure.**

**For workflows and instructions, see [claude.md.animation](claude.md.animation)**

---

## Technology Stack

- **Three.js** - 3D rendering and scene management
- **Mixamo** - Rigged character models with animations (.fbx format)
- **FBX Loader** - Loading character models and animations
- **OrbitControls** - Camera navigation
- **Event-driven timeline system** - Coordinated character and camera actions

---

## Why Three.js

- Geometry-based - no manual drawing required
- Pre-made 3D models (Mixamo characters)
- Script-driven animations
- Coordinate-based positioning
- Frame export capability (CCapture.js, ffmpeg)

---

## Core Classes

**BaseScene.js** - Base scene class for all scenes
- Handles all Three.js setup (scene, camera, renderer, controls, lights)
- Timeline system - triggers actions at specific times
- Processes `this.timeline` array from scene instances
- Scene instances extend this class and define their own actions

**BaseCharacter.js** - Character loading and animation
- Loads FBX models with animations
- Handles animation playback (walk, sitting, standing, idle)
- Movement system for walking characters
- Automatic rotation to face movement direction
- Delta time capping to prevent large position jumps

**Cube.js** - Reusable CubeRoom class
- Implements all cube design specs from CLAUDE.md
- 6 faces with doors and ladder rungs (4 rungs per set)
- Configurable size, colors, opacity
- Methods to change colors and open/close doors
- Emissive materials for wall lighting
- Procedural fractal tile texture

**ConferenceRoom.js** - Conference room environment
- Long table with 10 chairs (5 per side)
- Chairs positioned at x = [-4, -2, 0, 2, 4] on both sides
- Projection screen on west wall
- Door on east wall
- Single chair against south wall at z = depth/2 - 1
- Seat height = 0.5, but characters sit at y = 0

**Lab.js** - Lab environment
- Large room (30×25)
- Two parallel work tables with boxes
- Segmented loading bay door between tables
- Eight office desks with monitors (2 rows of 4)
- n=0 device with glowing core and control panels

---

## File Structure
```
animation/
  BaseScene.js           # Base scene class
  BaseCharacter.js       # Character loading/animation
  Cube.js               # Cube room environment
  ConferenceRoom.js     # Conference room
  Lab.js                # Lab environment

  characters/           # Character models
    alex/
      character.fbx     # Walking animation
      Sitting.fbx       # Sitting animation
      Standing.fbx      # Standing animation
    marcus/
      character.fbx
      Sitting.fbx
      Standing.fbx
    ... (one folder per character)

  act1_scene6/         # Example: Lab introduction scene
    lab/
      index.html       # HTML entry point
      scene.js         # Scene class
      sceneConfig.js   # Character and timeline configuration
```

---

## Scene File Breakdown

### index.html
- Imports scene class
- **Exposes `window.scene`** globally for console access
- Starts scene automatically

### scene.js
- Extends `BaseScene`
- `setupBackground()` - Creates environment (Lab, ConferenceRoom, Cube, etc.)
- Timeline action methods - Called from sceneConfig.timeline
- **During setup**: includes grid and axes helpers, scene paused by default

### sceneConfig.js
- **events** - Named timestamps (event-based timing)
- **characters** - Character IDs, actions, positions
- **cameraMoves** - All camera control (pans, cuts, tracking)
- **timeline** - Scene action triggers

---

## Character Models

Downloaded from Mixamo.com in .fbx format:

### Required Files Per Character
```
characters/
  [characterId]/
    character.fbx   # Walking animation
    Sitting.fbx     # Sitting animation
    Standing.fbx    # Standing animation
    Waving.fbx      # Gesture
    Pointing.fbx    # Gesture
    Talking.fbx     # Dialogue gesture
    Climbing.fbx    # Ladder climbing
    Crawling.fbx    # Low crawl
```

---

## Event-Based Timing System

**All timing uses named events** rather than absolute timestamps.

### Benefits
- Change one event time, all dependent actions update automatically
- Easier to maintain and adjust timing
- Clear organization of scene beats

### Example

```javascript
events: {
    sceneStart: 0,
    alexEnters: 0,
    alexAtTable: 3000,     // Change this...
    marcusStands: 5000
}

// All actions using 'alexAtTable' automatically update:
characters: [{
    actions: [
        { type: 'sitting', event: 'alexAtTable', delay: 0 },      // → 3000ms
        { type: 'standing', event: 'alexAtTable', delay: 2000 }   // → 5000ms
    ]
}]

cameraMoves: [
    { event: 'alexAtTable', delay: 0, type: 'cutToPosition', ... }  // → 3000ms
]

timeline: [
    { event: 'alexAtTable', delay: 500, action: 'focusOnAlex' }     // → 3500ms
]
```

---

## BaseScene Architecture

**BaseScene automatically handles:**
- ✅ Character loading with all animations
- ✅ Character action triggering (walk, sit, stand, gestures)
- ✅ Camera move execution (pan, cut, tracking)
- ✅ Timeline event processing
- ✅ Frame delta capping
- ✅ Animation loop

**Scene class implements:**
- ✅ `setupBackground()` - Create environment, add grid/axes
- ✅ Timeline action methods - Custom logic for scene events

### Minimal Scene Example

```javascript
import { BaseScene } from '../../../BaseScene.js';
import { Lab } from '../../../Lab.js';
import { sceneConfig } from './sceneConfig.js';

export class Act1Scene6Lab extends BaseScene {
    constructor() {
        super(sceneConfig);
        this.paused = true;  // Paused for mark setting
    }

    setupBackground() {
        // Create environment
        this.lab = new Lab({ width: 30, length: 25 });
        this.scene.add(this.lab.getGroup());

        // Add grid and axes for positioning
        const gridHelper = new THREE.GridHelper(50, 50);
        this.scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
    }

    // Timeline action methods
    sceneStart() {
        console.log('[ACTION] Scene starting');
    }

    teamEnters() {
        console.log('[ACTION] Team entering');
    }
}
```

---

## Character Action Types Reference

**For complete details, see [ANIMATION_GUIDE.md](ANIMATION_GUIDE.md) "CHARACTER ACTIONS REFERENCE"**

| Action Type | FBX File | Y Height | Rotation | Usage |
|-------------|----------|----------|----------|-------|
| walk | character.fbx | 0.1 | Auto-calculated | Movement between positions |
| sitting | Sitting.fbx | -0.25 | Manual | Sitting in chairs |
| standing | Standing.fbx | 0.1 | Manual | Standing in place |
| waving | Waving.fbx | 0.1 | Manual | Greeting gesture |
| pointing | Pointing.fbx | 0.1 | Manual | Indicating direction |
| talking | Talking.fbx | 0.1 | Manual | Dialogue hand gestures |
| climbing | Climbing.fbx | varies | Auto-calculated | Ladder movement |
| crawling | Crawling.fbx | varies | Auto-calculated | Low crawl |
| face | - | - | Auto-calculated | Turn to face another character |

---

## Camera Move Types Reference

**For complete details, see [ANIMATION_GUIDE.md](ANIMATION_GUIDE.md) "CAMERA SYSTEM"**

| Move Type | Duration | Usage |
|-----------|----------|-------|
| cutToPosition | Instant | Hard cuts, dramatic angle changes |
| panToPosition | Timed | Smooth camera movement to new position |
| panKeepAngle | Timed | Dolly shot maintaining angle |
| trackCharacter | Real-time | Follow character movement |
| stopTracking | Instant | End character tracking |

**All camera moves defined in sceneConfig.cameraMoves array.**

---

## Console Commands for Mark Setting

When setting character positions with grid visible:

```javascript
// Scene is paused by default
scene.paused = false  // Unpause if needed

// Position character (moves in real-time)
scene.characters.chen.getModel().position.set(2.5, 0.1, 9.5)

// Log position to copy coordinates
console.log('Chen:', scene.characters.chen.getModel().position)
```

---

## Development Tips

- **Character scale**: `CHARACTER_SCALE` (0.01 for Mixamo models)
- **Walking speed**: `distancePerCycle: 2` (~1.33 units/second)
- **Y positions**: Use constants from utils.js (WALKING: 0.1, SITTING: -0.25)
- **Rotation**: Use ROTATION constants from utils.js
- **Stagger entrances**: 200-600ms apart for natural flow
- **Frame delta**: Automatically capped at 100ms by BaseScene
- **Pathfinding**: Hardcode waypoints - no automatic collision detection in BaseScene

## Resources

- **Mixamo**: https://www.mixamo.com (free characters + animations)
- **Three.js Docs**: https://threejs.org/docs/
- **Sketchfab**: Free 3D models and textures
- **CCapture.js**: Frame capture library
- **ffmpeg**: Video compilation tool
