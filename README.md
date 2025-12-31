# Film Production Project

Screenplay and animation project for Cube^(0.333) and Amazingtrash films.

---

## Quick Start

**For screenplay writing:** See [Screenplay Writing Workflows](#screenplay-writing-workflows) below
**For animation production:** See [Animation Production Workflow](#animation-production-workflow) below

**Documentation:**
- **[CLAUDE.md](CLAUDE.md)** - Overview of workflow types (screenplay vs animation)
- **[production/SCREENPLAY_WORKFLOW.md](production/SCREENPLAY_WORKFLOW.md)** - Complete screenplay workflows (Workflows 1-6)
- **[production/animation/claude.md.animation](production/animation/claude.md.animation)** - Complete animation workflows

---

## Screenplay Writing Workflows

**When you say "Workflow 1", "Workflow 2", etc., these are the screenplay workflows.**

See **[production/SCREENPLAY_WORKFLOW.md](production/SCREENPLAY_WORKFLOW.md)** for complete details.

### Workflow 1: When Acts are Defined (main.txt Approved)

**User says:** "main.txt is how I want it" / "the acts look good" / "fill out table of contents"

**Claude does:**
1. Read main.txt to understand three-act structure
2. Create table_of_contents.txt with 10 scenes per act (30 total)
3. For each scene: name, location, characters, 2-3 sentence summary

### Workflow 2: When Table of Contents is Created (Build Character Files)

**User says:** "create the character files" / "build character profiles"

**Claude does:**
1. Read table_of_contents.txt to identify all characters
2. Create Characters/ directory
3. Create [CharacterName].txt for each major character with template sections
4. Character files start minimal and are updated as scenes are written

### Workflow 3: When Table of Contents is Approved (Create Scene Files)

**User says:** "table_of_contents is how I want it" / "create the scene files" / "make the scenes"

**Claude does:**
1. Read table_of_contents.txt
2. Create scene file for each scene in appropriate Act folder
3. File format: `writing/acts/Act [N] - [Act Name]/Scene [N] - [Scene Name].txt`
4. Each file includes: Location, Characters, Scene Layout (placeholder), Full Script (blank), Production Notes

### Workflow 4: When Scene Layout is Approved (Write Screenplay)

**User says:** "the scene layout is how I want it" / "scene layout looks good" / "write the screenplay for this scene"

**Claude does:**
1. Examine character files for all characters in scene
2. Examine scene layout sections
3. Create screenplay section (max 300 lines)
4. Update character files with KEY SCENES descriptions (1-3 sentences with key quotes)

### Workflow 5: When Scene Screenplay is Approved (Finalize Scene)

**User says:** "the screenplay is how I want it" / "screenplay looks good" / "finalize this scene"

**Claude does:**
1. Reformat screenplay for consistency
2. Update scene description to match screenplay changes
3. Update character files:
   - Update KEY SCENES section
   - Add to DIALOGUE STYLE section (how character voice manifested)
   - Only ADD to DIALOGUE STYLE, never remove

### Workflow 6: Character Profile Updates from Screenplay

**User says:** "update character profiles from completed screenplay"

**Claude does (Phase 1 - Analysis):**
1. Read KEY SCENES and DIALOGUE STYLE chronologically
2. Analyze patterns and draft updates for: ARCHETYPE, CHARACTER FUNCTION, PERSONALITY TRAITS, RELATIONSHIPS, CHARACTER ARC
3. Flag inconsistencies
4. Present report with proposed changes
5. Wait for approval

**Claude does (Phase 2 - Updates, after approval):**
1. Review DIALOGUE STYLE for quality improvements
2. Update character profiles with approved changes

**See [production/SCREENPLAY_WORKFLOW.md](production/SCREENPLAY_WORKFLOW.md) for:**
- Detailed workflow instructions
- Inference guidelines for character analysis
- Ensemble role archetypes reference

**Movie-specific screenplay documentation:**
- **[cuberoot/writing/dialogue.md](cuberoot/writing/dialogue.md)** - Cube^(0.333) screenplay project (cube mechanics, characters, status)
- **[amazingtrash/writing/dialogue.md](amazingtrash/writing/dialogue.md)** - Amazingtrash screenplay project (world-building, characters, status)
- **[hunted/writing/dialogue.md](hunted/writing/dialogue.md)** - Hunted screenplay project (home invasion thriller, characters, status)

---

## Animation Production Workflow

**When you say "animation workflow 1", "animation workflow 2", these are the animation workflows.**

Complete workflow for creating animated scenes. See **[production/animation/claude.md.animation](production/animation/claude.md.animation)** for complete details.

### Step 1: Format Screenplay

**Option A - Python Script (Recommended for TTS):**

```bash
# Format a single scene
python production/audio/format_screenplay_dialogue.py "cuberoot/writing/acts/Act 1 - Setup/Scene_01_Introduction.txt"

# Format all scenes in an Act (recursively processes all .txt files)
python production/audio/format_screenplay_dialogue.py "cuberoot/writing/acts/Act 1 - Setup"

# Format entire screenplay (all Acts)
python production/audio/format_screenplay_dialogue.py "cuberoot/writing/acts"
```

**What it does:**
- Centers character names (20 space indent)
- Indents dialogue properly (10 space indent)
- Converts parentheticals to action lines
- Converts ALL CAPS character names in action lines to proper case
- Wraps lines to 121 characters without chopping words

**Important**: Action lines with character names should use proper case (e.g., `Marcus turns, annoyed.`), NOT ALL CAPS (which indicates dialogue headers). **Required before TTS generation.**

**Option B - Claude Workflow (For camera-ready animation):**
**Command:** `"Make sure scene X is formatted for animation"`

Creates `cam_Scene X - [Title].txt` with camera-ready formatting (parentheticals → action lines, enhanced visual descriptions).

**Note:** Option A reformats the original file. Option B creates a new `cam_Scene` file with enhanced descriptions for animation.

**See [production/SCREENPLAY_FORMATTING.md](production/SCREENPLAY_FORMATTING.md) for detailed formatting instructions.**

### Step 2: Generate Audio

```bash
# Generate audio for a single scene
python production/audio/screenplay_to_tts.py "cuberoot/writing/acts/Act 1 - Setup/Scene_01_Introduction.txt"

# Generate audio for entire Act (recursively processes all .txt files)
python production/audio/screenplay_to_tts.py "cuberoot/writing/acts/Act 1 - Setup"

# Generate audio for all Acts
python production/audio/screenplay_to_tts.py "cuberoot/writing/acts"

# Alternative: Process all Acts with combined audio per scene
python production/audio/screenplay_to_tts.py "cuberoot/writing/acts" --combine
```

**Output modes:**
- `--mode separate` - One WAV file per dialogue line (default)
- `--mode single` - One WAV file per scene
- `--combine` - Combine all lines with multiple character voices (requires pydub)
- `--voice-config` - Path to character voice mapping JSON

**Output location:** `production/audio/audio_output/`

Creates WAV files in subdirectories named after each scene.

**See [production/audio/TTS_README.md](production/audio/TTS_README.md) for detailed audio generation instructions.**

### Step 3: Create Scene Structure (only for scenes with cam_ files)

**Command:** `"Create basic scene structure for scene X in [location] with grid"`

**IMPORTANT:** Only create scene structure for scenes that have a `cam_` camera-ready screenplay file. Skip this step if no `cam_` file exists.

**See [production/animation/ANIMATION_GUIDE.md](production/animation/ANIMATION_GUIDE.md) - "SCENE SETUP WORKFLOW - CHARACTER MARKS" section for complete details.**

Creates folder structure:
```
animation/
  act[N]_scene[N]/
    [location]/
      index.html     # Entry point with window.scene exposed
      scene.js       # Scene class with setupBackground()
      sceneConfig.js # Character marks and configuration
```

**Files generated:**

1. **index.html** - Scene entry point
   - Imports scene class
   - Exposes scene globally: `window.scene = new SceneClass()`
   - Starts scene automatically

2. **scene.js** - Scene implementation
   - Extends BaseScene
   - setupBackground() builds environment (Lab, ConferenceRoom, etc.)
   - Adds grid helper (50x50 units) for positioning
   - Adds axes helper (X=red, Y=green, Z=blue)
   - Placeholder timeline action methods
   - Scene paused by default: `this.paused = true`

3. **sceneConfig.js** - Configuration
   - Events with placeholder times
   - Characters array with standing positions on marks (NO movements yet)
   - Empty cameraMoves array
   - Timeline array with placeholder actions

**For mark positioning (steps 4-6), see [production/animation/claude.md.animation](production/animation/claude.md.animation)**

### Step 4: Set Character Marks

**What are character marks?** Final positions (XYZ coordinates) where each character should be at key moments in the scene.

**Quick workflow:**
1. Open `animation/act[N]_scene[N]/[location]/index.html` in browser
2. Scene loads paused with environment AND characters visible
3. Grid lines show spacing, axes show directions
4. Use console to position characters: `scene.characters.chen.getModel().position.set(2.5, 0.1, 9.5)`
5. Characters move in real-time as you adjust
6. Document final positions in sceneConfig.js

**Console commands:**
```javascript
// Scene is paused by default, unpause if needed
scene.paused = false

// Position a character (moves in real-time)
scene.characters.chen.getModel().position.set(2.5, 0.1, 9.5)

// Log position to copy coordinates
console.log('Chen:', scene.characters.chen.getModel().position)
```

**Y-axis heights** (from utils.js):
- Standing/Walking: `y: 0.1` (CHARACTER_HEIGHT.STANDING)
- Sitting: `y: -0.25` (CHARACTER_HEIGHT.SITTING)

**See [production/animation/claude.md.animation](production/animation/claude.md.animation) for complete mark setting workflow and next steps.**

### Step 5: Generate Scene Actions

**Command:** `"For scene X the marks are how I want them, add the scene actions for it to take Y minutes"`

Auto-generates all character actions, camera moves, timeline events scaled to target duration.

**See [production/animation/claude.md.animation](production/animation/claude.md.animation) for what gets generated (entrance walks with collision detection, talking animations, face actions, camera moves, etc.)**

### Step 6: Test Scene

Open `animation/act[N]_scene[N]/[location]/index.html` and verify timing, camera movements, character actions.

Unpause if needed: `scene.paused = false`

**Note:** Grid is still visible during testing. Remove it in next step when scene is finalized.

### Step 7: Finalize Scene (Remove Grid)

**Command:** `"Remove the grid and axes from act N scene X"`

Removes from scene.js setupBackground():
- Grid helper (floor grid lines)
- Axes helper (X/Y/Z arrows)
- Pause flag (scene starts automatically)

Scene is now production-ready with clean visuals.

---

## Documentation Reference

### Overview & Workflow Types
- **[CLAUDE.md](CLAUDE.md)** - Overview distinguishing screenplay vs animation workflows

### Screenplay Writing
- **[production/SCREENPLAY_WORKFLOW.md](production/SCREENPLAY_WORKFLOW.md)** - Complete screenplay workflows (Workflows 1-6)
- **[cuberoot/writing/dialogue.md](cuberoot/writing/dialogue.md)** - Cube^(0.333) project specifics
- **[amazingtrash/writing/dialogue.md](amazingtrash/writing/dialogue.md)** - Amazingtrash project specifics
- **[hunted/writing/dialogue.md](hunted/writing/dialogue.md)** - Hunted project specifics

### Animation Production
- **[production/animation/claude.md.animation](production/animation/claude.md.animation)** - PRIMARY: AI workflows, scene setup, collision detection, dialogue geometry
- **[production/animation/ANIMATION_GUIDE.md](production/animation/ANIMATION_GUIDE.md)** - Comprehensive animation guide with camera & character movement
- **[production/animation/README.md](production/animation/README.md)** - Production notes and code organization

### Screenplay Formatting & Audio
- **[production/SCREENPLAY_FORMATTING.md](production/SCREENPLAY_FORMATTING.md)** - Screenplay formatting standards
- **[production/audio/TTS_README.md](production/audio/TTS_README.md)** - Text-to-speech audio generation

---

## Notes

- All screenplay files must be in `.txt` or `.fountain` format
- Character names must be in ALL CAPS to be recognized
- Empty lines and planning sections are automatically skipped
- **"Workflow 1-6"** = Screenplay workflows (default)
- **"Animation workflow 1-2"** = Animation workflows (when specified)

