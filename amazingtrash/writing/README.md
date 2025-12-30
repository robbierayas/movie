# Writing Folder Structure

This folder contains all screenplay and character content for the project.

## Folder Structure

```
writing/
├── acts/
│   ├── Act 1 - Setup/
│   │   ├── Scene 0 - [Name].txt
│   │   ├── Scene 1 - [Name].txt
│   │   └── cam_Scene X - [Name].txt (camera-ready versions)
│   ├── Act 2 - Confrontation/
│   │   └── Scene X - [Name].txt
│   └── Act 3 - Resolution/
│       └── Scene X - [Name].txt
├── Characters/
│   └── [Character files and bios]
└── README.md (this file)
```

## File Naming Conventions

### Scene Files
- **Format:** `Scene [Number] - [Descriptive Name].txt`
- **Examples:**
  - `Scene 0 - Opening Trap.txt`
  - `Scene 1 - Food Team Introduction.txt`

### Camera-Ready Scene Files
- **Format:** `cam_Scene [Number] - [Descriptive Name].txt`
- **Purpose:** Animation-ready versions formatted for Three.js translation
- **Created from:** Original scene files using screenplay formatting workflow

## Scene Template

Each scene file should include:
1. **Scene Information** (header section)
   - Location
   - Characters
   - Purpose/summary

2. **FULL SCRIPT** marker (required for TTS parsing)
   - Professional screenplay format
   - Scene heading
   - Action lines
   - Dialogue

3. **Production Notes** (optional)
   - Animation requirements
   - Technical considerations

## Screenplay Formatting

Follow the guidelines in `/production/SCREENPLAY_FORMATTING.md`:
- Use proper scene headings: `INT./EXT. - LOCATION - TIME`
- Character names in ALL CAPS on first appearance only
- Minimal parentheticals
- Show don't tell in action lines
- No technical camera directions

## TTS Production

Before generating TTS audio:
1. Ensure scenes follow proper formatting
2. Run `format_screenplay_dialogue.py` if needed
3. Character names must be properly indented (20 spaces)
4. Dialogue must be indented (10 spaces)

See `/production/SCREENPLAY_FORMATTING.md` for complete TTS requirements.
