# Screenplay to TTS Converter

Python script that converts screenplay files to audio using [Piper TTS](https://github.com/OHF-Voice/piper1-gpl).

## Quick Start

**Run all commands from the project root directory** (C:\Users\robbi\WebstormProjects\untitled)

```bash
# 1. Format your screenplay FIRST (IMPORTANT!)
python production/audio/format_screenplay_dialogue.py "writing/acts/Act 1 - Explaining the New Cube/Scene X.txt"

# 2. Install dependencies
pip install -r production/audio/requirements.txt

# 3. Download voices
python production/audio/download_voice.py

# 4. Generate audio (auto-detects Act folders in writing/acts/)
python production/audio/screenplay_to_tts.py
```

Done! Audio files will be in `production/audio/audio_output/` folder.

**IMPORTANT:** Always format your screenplay using `format_screenplay_dialogue.py` before generating TTS. See [SCREENPLAY_FORMATTING.md](../SCREENPLAY_FORMATTING.md) for details.

## Usage

**Run all commands from the project root directory.**

**Simplest usage (process all Act folders):**
```bash
python production/audio/screenplay_to_tts.py
```

**Process specific Act folder:**
```bash
python production/audio/screenplay_to_tts.py "Act 1 - Explaining the New Cube"
```

**Process single file:**
```bash
python production/audio/screenplay_to_tts.py "writing/acts/Act 1 - Explaining the New Cube/Scene 1.txt"
```

## Output

The script creates separate WAV files for each dialogue line:

```
production/audio/audio_output/
├── Scene 1 - Food Team Introduction/
│   ├── 0001_ALEX.wav
│   ├── 0002_MORRIS.wav
│   ├── 0003_ALEX.wav
│   └── ...
└── ...
```

**Note:** ACTION narrator lines are spoken at 1.5x speed to reduce file length.

## Character Voice Mapping

Edit `character_voices.json` to assign voices to characters:

```json
{
  "ALEX": "voices/en_US-amy-medium.onnx",
  "MARCUS": "voices/en_US-ryan-high.onnx",
  "LEA": "voices/en_US-lessac-medium.onnx",
  "ACTION": "voices/en_US-lessac-medium.onnx",
  "_default": "voices/en_US-lessac-medium.onnx"
}
```

Available voices: amy, kathleen, kristin (female); ryan, danny, joe, john, bryce (male); lessac, libritts (narrator)

## Features

- ✅ **High-Quality TTS**: Uses Piper neural voices
- ✅ **Screenplay Parsing**: Handles standard screenplay format
- ✅ **Character Voices**: Different voices per character
- ✅ **Batch Processing**: Process entire Act folders at once
- ✅ **Auto-detection**: Finds `character_voices.json` automatically

## Prerequisites

**IMPORTANT: Format Your Screenplay Before Running TTS**

The TTS script requires properly formatted screenplay files. See [SCREENPLAY_FORMATTING.md](../SCREENPLAY_FORMATTING.md) for complete formatting requirements.

**Quick formatting (run from project root):**
```bash
python production/audio/format_screenplay_dialogue.py "writing/acts/Act 1 - Explaining the New Cube/Scene X.txt"
```

This converts parentheticals to action lines and ensures proper indentation for character names and dialogue.

**Note**: Improperly formatted files may result in all text being read as action/narrator instead of character dialogue.

## Installation

**Run all commands from the project root directory.**

1. Install Python dependencies:
```bash
pip install -r production/audio/requirements.txt
```

2. Download Piper voice models using the downloader script:
   ```bash
   python production/audio/download_voice.py
   ```

   Available voices include:
   - **Female voices**: amy, kathleen, kristin, ljspeech, hfc_female
   - **Male voices**: ryan, danny, joe, john, bryce, hfc_male
   - **Neutral/Narrator**: lessac, libritts
   - **British**: alan

   Select which voices to download (you can choose multiple or 'all')

3. Voice files will be automatically placed in the `voices/` directory

## Character Voice Configuration

Edit `character_voices.json` to map characters to voice models:

```json
{
  "ALEX": "voices/en_US-amy-medium.onnx",
  "MARCUS": "voices/en_US-ryan-high.onnx",
  "LEA": "voices/en_US-lessac-medium.onnx",
  "NARRATOR": "voices/en_US-lessac-medium.onnx",
  "_default": "voices/en_US-lessac-medium.onnx"
}
```

- Each character name maps to a voice model path
- `_default` is used for any character not in the mapping
- Download multiple voices using `python download_voice.py`

## Usage

### Simplest Usage (Run from project root):
```bash
python production/audio/screenplay_to_tts.py
```

That's it! The script will:
- Auto-detect `character_voices.json` from production/audio/ for voice mapping
- Find all "Act 1", "Act 2", "Act 3" folders in writing/acts/
- Process all `.txt` files in those folders
- Create separate audio files for each dialogue line
- Use different voices for each character

### Output:
Running the command creates `audio_output/` folder with subfolders for each screenplay:
```
audio_output/
├── Scene 1 - Food Team Introduction/
│   ├── 0001_ALEX.wav
│   ├── 0002_MORRIS.wav
│   ├── 0003_ALEX.wav
│   └── ...
├── Scene 2 - Marcus and Edgar Pre-Meeting/
│   ├── 0001_MARCUS.wav
│   ├── 0002_EDGAR.wav
│   └── ...
└── ...
```

### Other Options:

**Process specific Act folder:**
```bash
python production/audio/screenplay_to_tts.py "Act 1 - Explaining the New Cube"
```

**Combined file with multiple voices:**
```bash
python production/audio/screenplay_to_tts.py --combine
```
Creates ONE WAV file per screenplay with different voices per character (requires pydub)

**Single voice mode (testing):**
```bash
python production/audio/screenplay_to_tts.py --voice-model production/audio/voices/en_US-lessac-medium.onnx
```
All characters use the same voice.

**Custom output directory:**
```bash
python production/audio/screenplay_to_tts.py --output-dir my_audio
```

**Remove narrator prefix (just dialogue, no "CHARACTER says:"):**
```bash
python production/audio/screenplay_to_tts.py --no-narrator-prefix
```

**Use GPU acceleration (requires onnxruntime-gpu):**
```bash
python production/audio/screenplay_to_tts.py --cuda
```

## Options

- `input_path`: Screenplay file or folder (default: current directory, searches for Act folders)
- `--voice-config`: Path to JSON config mapping characters to voices (default: auto-detect `character_voices.json`)
- `--voice-model`: Path to Piper .onnx voice model (single voice mode)
- `--output-dir`: Output directory for audio files (default: `./audio_output`)
- `--mode`: Output mode - `separate` (default, one WAV per line) or `single` (one WAV per file)
- `--combine`: Combine into one file with multiple voices (requires pydub)
- `--no-narrator-prefix`: Don't prefix dialogue with speaker name
- `--cuda`: Use CUDA for GPU acceleration

**Defaults:**
- Input: Current directory (searches for "Act 1", "Act 2", "Act 3" folders)
- Voice config: Auto-detects `character_voices.json` if present
- Mode: `separate` (individual files per dialogue line)
- Uses multiple voices if `character_voices.json` is found

## Output

- **Single mode**: Creates one `.wav` file per screenplay with all dialogue
- **Separate mode**: Creates a folder per screenplay with numbered dialogue files

## Features

- Automatically extracts dialogue and action lines from screenplay format
- Identifies character names and scene descriptions
- Supports narrator voice for scene descriptions
- Optional speaker name prefix for clarity
- Batch processing of multiple files

## Screenplay Format Support

The parser recognizes:
- Character names (ALL CAPS lines)
- Dialogue (quoted text or text following character name)
- Scene headers (INT./EXT./SCENE/LOCATION:/FADE)
- Stage directions (parentheticals)

## Examples

**Process all acts with default settings:**
```bash
python production/audio/screenplay_to_tts.py
```
Processes all "Act 1", "Act 2", "Act 3" folders with character voices

**Process only Act 1:**
```bash
python production/audio/screenplay_to_tts.py "Act 1 - Explaining the New Cube"
```

**Combine into single files with multiple voices:**
```bash
python production/audio/screenplay_to_tts.py --combine
```

**Custom output directory:**
```bash
python production/audio/screenplay_to_tts.py --output-dir my_screenplay_audio
```

## Troubleshooting

**"piper-tts not installed"**
- Run: `pip install piper-tts`

**"pydub not installed" (when using --combine)**
- Run: `pip install pydub`
- Or install all dependencies: `pip install -r requirements.txt`

**"Voice model not found"**
- Ensure both `.onnx` and `.onnx.json` files are present
- Use absolute or correct relative path to voice model
- Download voices using: `python download_voice.py`

**"No dialogue found"**
- Check screenplay file format
- Ensure character names are in ALL CAPS
- Ensure dialogue follows proper formatting

## Advanced Tips

**Adjusting pause duration in combined files:**
Edit line 242 in `screenplay_to_tts.py`:
```python
combined_audio += AudioSegment.silent(duration=500)  # Change 500 to adjust milliseconds
```

**Testing voice samples:**
Visit https://rhasspy.github.io/piper-samples/ to hear all available voices before downloading.
