# [Project Title]

Movie project template for screenplay and animation production.

## Project Structure

```
amazingtrash/
├── main.txt                    # Project overview and synopsis
├── table_of_contents.txt       # Scene breakdown and structure
├── writing/                    # All screenplay content
│   ├── acts/                   # Organized by three-act structure
│   │   ├── Act 1 - Setup/
│   │   ├── Act 2 - Confrontation/
│   │   └── Act 3 - Resolution/
│   ├── Characters/             # Character bios and development
│   └── README.md
└── README.md (this file)
```

## Quick Start

1. **Fill out main.txt** - Define your logline, synopsis, and story structure
2. **Update table_of_contents.txt** - Plan out your scenes
3. **Create scenes** - Use the template in `writing/acts/Act 1 - Setup/Scene 0 - Template.txt`
4. **Develop characters** - Add character files to `writing/Characters/`

## Screenplay Format

All scenes should follow professional screenplay format. See `/production/SCREENPLAY_FORMATTING.md` for:
- Action line formatting
- Dialogue formatting
- Character introductions
- Camera direction best practices
- TTS production requirements

## Animation Production

For Three.js animation:
1. Write scenes in standard screenplay format
2. Create camera-ready versions with `cam_` prefix
3. Follow formatting guidelines for animation translation
4. See `/production/animation/` for animation workflow

## Audio Production

Audio generation is configured for Amazingtrash characters in `production/audio/`:
- Character voice mappings in `production/audio/character_voices.json`
- Audio output saved to `production/audio/audio_output/`
- See `production/audio/README.md` for detailed usage

The TTS scripts automatically detect Amazingtrash files and use the correct configuration.

## Resources

- **SCREENPLAY_FORMATTING.md** - Complete screenplay formatting guide
- **production/audio/README.md** - Amazingtrash audio production setup
- **README.md (root)** - Complete production workflow including detailed audio generation instructions
