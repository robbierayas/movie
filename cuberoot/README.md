# Cube^(0.333) Project

Screenplay and animation project for the Cube^(0.333) film.

---

## Project Structure

```
cuberoot/
├── main.txt                    # Project overview and synopsis
├── table_of_contents.txt       # Scene breakdown and structure
├── scene_tracker.csv           # Scene production tracking
├── writing/                    # All screenplay content
│   ├── acts/                   # Organized by three-act structure
│   └── Characters/             # Character bios and development
└── production/                 # Production files
    ├── audio/                  # Audio generation config
    │   ├── character_voices.json
    │   └── audio_output/
    └── animation/              # Animation scenes and environments
        ├── scene1/, scene2/, etc.
        └── Environment classes (Lab, ConferenceRoom, Cube, etc.)
```

## Shared Resources (Top-Level)

The following resources are shared between cuberoot and amazingtrash projects:

- **production/audio/voices/** - TTS voice models
- **production/audio/*.py** - Audio generation scripts
- **production/animation/characters/** - Character 3D models
- **production/animation/BaseCharacter.js** - Character animation system
- **production/animation/BaseScene.js** - Scene animation system
- **CLAUDE.md** - Animation system documentation
- **README.md** - Production workflow

## Quick Start

1. **Fill out main.txt** - Define your logline, synopsis, and story structure
2. **Update table_of_contents.txt** - Plan out your scenes
3. **Create scenes** - Write scenes in `writing/acts/`
4. **Develop characters** - Add character files to `writing/Characters/`

See the root README.md for complete production workflow (formatting, audio generation, animation).
