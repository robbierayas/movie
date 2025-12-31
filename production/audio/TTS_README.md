# Screenplay to TTS Converter

Python script that converts screenplay files to audio using [Piper TTS](https://github.com/OHF-Voice/piper1-gpl).

## Quick Start

**Run all commands from the project root directory** (C:\Users\robbi\WebstormProjects\untitled)

```bash
# 1. Format your screenplay FIRST (IMPORTANT!)
python production/audio/format_screenplay_dialogue.py "hunted/writing/acts/Act 1 - The Predator/Scene 1.txt"

# 2. Install dependencies
pip install -r production/audio/requirements.txt

# 3. Download voices
python production/audio/download_voice.py

# 4. Generate audio (specify the movie folder)
python production/audio/screenplay_to_tts.py --movie hunted
```

Done! Audio files will be in `hunted/production/audio/audio_output/` folder.

**IMPORTANT:** Always format your screenplay using `format_screenplay_dialogue.py` before generating TTS. See [SCREENPLAY_FORMATTING.md](../SCREENPLAY_FORMATTING.md) for details.

## Usage

**Run all commands from the project root directory.**

**Simplest usage (specify movie folder, processes all Act folders):**
```bash
python production/audio/screenplay_to_tts.py --movie hunted
python production/audio/screenplay_to_tts.py --movie cuberoot
python production/audio/screenplay_to_tts.py --movie amazingtrash
```

**Process specific Act folder:**
```bash
python production/audio/screenplay_to_tts.py --movie hunted "Act 1 - The Predator"
```

**Process single file:**
```bash
python production/audio/screenplay_to_tts.py "hunted/writing/acts/Act 1 - The Predator/Scene 1.txt"
```
(Movie folder is auto-detected from the path when processing specific files)

## Output

The script creates separate WAV files for each dialogue line:

```
hunted/production/audio/audio_output/
├── Scene 1 - The Humiliation/
│   ├── 0001_ELI.wav
│   ├── 0002_EMMA.wav
│   ├── 0003_ELI.wav
│   └── ...
└── ...
```

**Note:** ACTION narrator lines use a separate voice (lessac by default).

## Character Voice Mapping

Edit `character_voices.json` in your movie's production/audio folder to assign voices to characters:

```json
{
  "HANK": { "voice": "voices/en_US-ryan-high.onnx", "model": "hank" },
  "SARAH": { "voice": "voices/en_US-amy-medium.onnx", "model": "sarah" },
  "LIAM": { "voice": "voices/en_GB-alan-medium.onnx", "model": "liam" },
  "ACTION": { "voice": "voices/en_US-lessac-medium.onnx", "model": null },
  "_default": { "voice": "voices/en_US-lessac-medium.onnx", "model": null }
}
```

**Note:** Voice files are stored in the shared `production/audio/voices/` directory. The script automatically checks there if voices aren't found in the movie-specific directory.

Available voices: amy, kathleen, kristin, ljspeech (female); ryan, danny, joe, john, bryce, alan (male); lessac, libritts (narrator)

## Features

- ✅ **High-Quality TTS**: Uses Piper neural voices
- ✅ **Screenplay Parsing**: Handles standard screenplay format
- ✅ **Character Voices**: Different voices per character
- ✅ **Batch Processing**: Process entire Act folders at once
- ✅ **Multi-Movie Support**: Works with any movie folder (hunted, cuberoot, amazingtrash)
- ✅ **Auto-detection**: Finds `character_voices.json` automatically from movie folder

## Prerequisites

**IMPORTANT: Format Your Screenplay Before Running TTS**

The TTS script requires properly formatted screenplay files. See [SCREENPLAY_FORMATTING.md](../SCREENPLAY_FORMATTING.md) for complete formatting requirements.

**Quick formatting (run from project root):**
```bash
python production/audio/format_screenplay_dialogue.py "hunted/writing/acts/Act 1 - The Predator/Scene 1.txt"
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

3. Voice files will be automatically placed in the `production/audio/voices/` directory (shared across all movies)

## Character Voice Configuration

Create/edit `character_voices.json` in your movie's `production/audio/` folder:

**Example for hunted (hunted/production/audio/character_voices.json):**
```json
{
  "HANK": { "voice": "voices/en_US-ryan-high.onnx", "model": "hank" },
  "SARAH": { "voice": "voices/en_US-amy-medium.onnx", "model": "sarah" },
  "LIAM": { "voice": "voices/en_GB-alan-medium.onnx", "model": "liam" },
  "ELI": { "voice": "voices/en_US-bryce-medium.onnx", "model": "eli" },
  "EMMA": { "voice": "voices/en_US-kathleen-low.onnx", "model": "emma" },
  "ACTION": { "voice": "voices/en_US-lessac-medium.onnx", "model": null },
  "_default": { "voice": "voices/en_US-lessac-medium.onnx", "model": null }
}
```

- Each character name maps to an object with `voice` (path to .onnx file) and `model` (animation model name or null)
- `_default` is used for any character not in the mapping
- Download multiple voices using: `python production/audio/download_voice.py`

## Usage Examples

### Basic Usage (specify movie):
```bash
python production/audio/screenplay_to_tts.py --movie hunted
```

That's it! The script will:
- Use voice config from `hunted/production/audio/character_voices.json`
- Find all "Act 1", "Act 2", "Act 3" folders in `hunted/writing/acts/`
- Process all `.txt` files in those folders
- Create separate audio files for each dialogue line
- Output to `hunted/production/audio/audio_output/`

### Output:
Running the command creates `audio_output/` folder in the movie's production/audio directory:
```
hunted/production/audio/audio_output/
├── Scene 1 - The Humiliation/
│   ├── 0001_ELI.wav
│   ├── 0002_EMMA.wav
│   └── ...
├── Scene 2 - Bar Revenge/
│   ├── 0001_ELI.wav
│   ├── 0002_HANK.wav
│   └── ...
└── ...
```

### Other Options:

**Process specific Act folder:**
```bash
python production/audio/screenplay_to_tts.py --movie hunted "Act 1 - The Predator"
```

**Combined file with multiple voices:**
```bash
python production/audio/screenplay_to_tts.py --movie hunted --combine
```
Creates ONE WAV file per screenplay with different voices per character (requires pydub)

**Single voice mode (testing):**
```bash
python production/audio/screenplay_to_tts.py --movie hunted --voice-model production/audio/voices/en_US-lessac-medium.onnx
```
All characters use the same voice.

**Custom output directory:**
```bash
python production/audio/screenplay_to_tts.py --movie hunted --output-dir my_audio
```

**Use GPU acceleration (requires onnxruntime-gpu):**
```bash
python production/audio/screenplay_to_tts.py --movie hunted --cuda
```

## Options

- `input_path`: Screenplay file or folder (default: movie's writing/acts/)
- `--movie`: Movie folder name (e.g., 'hunted', 'cuberoot', 'amazingtrash'). Required unless detectable from input path.
- `--voice-config`: Path to JSON config mapping characters to voices (default: auto-detect from movie folder)
- `--voice-model`: Path to Piper .onnx voice model (single voice mode)
- `--output-dir`: Output directory for audio files (default: movie's production/audio/audio_output)
- `--mode`: Output mode - `separate` (default, one WAV per line) or `single` (one WAV per file)
- `--combine`: Combine into one file with multiple voices (requires pydub)
- `--narrator-prefix`: Prefix dialogue with speaker name
- `--cuda`: Use CUDA for GPU acceleration

**Defaults:**
- Input: Movie's writing/acts/ directory (searches for "Act 1", "Act 2", "Act 3" folders)
- Voice config: Auto-detects from movie folder's production/audio/character_voices.json
- Mode: `separate` (individual files per dialogue line)

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

**Process all acts for a movie:**
```bash
python production/audio/screenplay_to_tts.py --movie hunted
```

**Process only Act 1:**
```bash
python production/audio/screenplay_to_tts.py --movie hunted "Act 1 - The Predator"
```

**Combine into single files with multiple voices:**
```bash
python production/audio/screenplay_to_tts.py --movie cuberoot --combine
```

**Custom output directory:**
```bash
python production/audio/screenplay_to_tts.py --movie amazingtrash --output-dir my_screenplay_audio
```

## Troubleshooting

**"piper-tts not installed"**
- Run: `pip install piper-tts`

**"pydub not installed" (when using --combine)**
- Run: `pip install pydub`
- Or install all dependencies: `pip install -r production/audio/requirements.txt`

**"Voice model not found"**
- Ensure both `.onnx` and `.onnx.json` files are present
- Use absolute or correct relative path to voice model
- Download voices using: `python production/audio/download_voice.py`

**"No dialogue found"**
- Check screenplay file format
- Ensure character names are in ALL CAPS
- Ensure dialogue follows proper formatting

**"Could not detect movie folder"**
- Use the `--movie` parameter: `--movie hunted`
- Or provide full path to screenplay file

## Advanced Tips

**Adjusting pause duration in combined files:**
Edit line 363 in `screenplay_to_tts.py`:
```python
combined_audio += AudioSegment.silent(duration=500)  # Change 500 to adjust milliseconds
```

**Testing voice samples:**
Visit https://rhasspy.github.io/piper-samples/ to hear all available voices before downloading.
