#!/usr/bin/env python3
"""
Screenplay to TTS Converter using Piper
Converts screenplay text files to audio using Piper TTS with character voice mapping
"""

import argparse
import os
import sys
import re
import wave
import json
from pathlib import Path
from typing import List, Dict, Tuple, Optional
from dataclasses import dataclass

try:
    from piper import PiperVoice
    from piper.voice import PiperVoice
except ImportError:
    print("Error: piper-tts not installed. Run: pip install piper-tts")
    sys.exit(1)


@dataclass
class DialogueLine:
    """Represents a line of dialogue or action from the screenplay"""
    speaker: str  # Character name or "ACTION" for scene descriptions
    text: str
    line_number: int


class ScreenplayParser:
    """Parses screenplay format and extracts dialogue and action lines"""

    # Patterns to identify different screenplay elements
    # Character headers: ALL CAPS, alphabetic only (no commas/periods), centered with indentation
    CHARACTER_PATTERN = re.compile(r'^\s*([A-Z][A-Z\s]+?)(?:\s*\([^)]*\))?\s*$')
    DIALOGUE_PATTERN = re.compile(r'^["\']')
    SCENE_HEADER_PATTERN = re.compile(r'^(INT\.|EXT\.|SCENE|LOCATION:|FADE)')
    # Action lines: Start with capital, has lowercase, ends with period OR has comma (character actions)
    ACTION_PATTERN = re.compile(r'^[A-Z][a-z].*[.,]')

    def __init__(self):
        self.current_speaker = None

    def parse_file(self, filepath: str, line_by_line: bool = False) -> List[DialogueLine]:
        """Parse a screenplay file and extract dialogue/action lines

        Args:
            filepath: Path to screenplay file
            line_by_line: If True, preserve line breaks in dialogue blocks.
                         If False (default), combine consecutive dialogue lines
                         from same character into single block
        """
        lines = []
        script_started = False

        # For grouping consecutive dialogue lines
        pending_dialogue_lines = []
        pending_dialogue_start_line = None

        def flush_pending_dialogue():
            """Combine accumulated dialogue lines into single DialogueLine"""
            nonlocal pending_dialogue_lines, pending_dialogue_start_line
            if pending_dialogue_lines and self.current_speaker:
                # Combine lines with spaces, removing excess whitespace
                combined_text = ' '.join(pending_dialogue_lines)
                # Normalize whitespace: collapse multiple spaces into one
                combined_text = ' '.join(combined_text.split())
                print(f"[DEBUG] Line {pending_dialogue_start_line}: Combined dialogue for '{self.current_speaker}': {combined_text[:50]}...")
                lines.append(DialogueLine(self.current_speaker, combined_text, pending_dialogue_start_line))
                pending_dialogue_lines = []
                pending_dialogue_start_line = None

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.readlines()

        for i, line in enumerate(content, 1):
            stripped = line.strip()

            # Check if we've reached the script marker (FULL SCRIPT or SCREENPLAY)
            # Handle markdown headers like "## SCREENPLAY" or plain "SCREENPLAY"
            if "FULL SCRIPT" in stripped.upper() or "SCREENPLAY" in stripped.upper():
                script_started = True
                print(f"[DEBUG] Found script marker at line {i}: {stripped[:50]}")
                continue

            # Skip everything before script marker
            if not script_started:
                continue

            # Skip empty lines and separators
            if not stripped or stripped.startswith('===') or stripped.startswith('---'):
                continue

            # Check for character name
            # Character headers have NO punctuation (commas, periods) - those are action lines
            # Exception: (V.O.) and (O.S.) are valid character annotations
            char_match = self.CHARACTER_PATTERN.match(stripped)
            # Remove V.O./O.S. annotations before checking for punctuation
            stripped_for_punct_check = re.sub(r'\s*\((V\.O\.|O\.S\.)\)\s*$', '', stripped)
            if char_match and ',' not in stripped_for_punct_check and '.' not in stripped_for_punct_check:
                # Flush any pending dialogue before switching speakers
                if not line_by_line:
                    flush_pending_dialogue()

                self.current_speaker = char_match.group(1).strip()
                print(f"[DEBUG] Line {i}: Found character: '{self.current_speaker}'")
                continue

            # Check for scene headers (INT./EXT./FADE/etc) - these are ACTION, not NARRATOR
            if self.SCENE_HEADER_PATTERN.match(stripped):
                # Flush any pending dialogue before action line
                if not line_by_line:
                    flush_pending_dialogue()

                print(f"[DEBUG] Line {i}: Scene header (ACTION): {stripped[:50]}...")
                lines.append(DialogueLine("ACTION", stripped, i))
                self.current_speaker = None  # Reset after scene header
                continue

            # Check for parentheticals (character actions in dialogue)
            if stripped.startswith('(') and stripped.endswith(')'):
                continue  # Skip stage directions

            # Check if line is indented (dialogue in screenplay format)
            is_indented = line.startswith(' ') or line.startswith('\t')

            # Check for dialogue (lines starting with quotes)
            if self.DIALOGUE_PATTERN.match(stripped):
                speaker = self.current_speaker or "ACTION"
                # Remove quotes
                text = stripped.strip('"\'')

                if line_by_line:
                    # Old behavior: separate line for each
                    print(f"[DEBUG] Line {i}: Quoted dialogue for '{speaker}': {text[:50]}...")
                    lines.append(DialogueLine(speaker, text, i))
                else:
                    # New behavior: accumulate
                    if not pending_dialogue_lines:
                        pending_dialogue_start_line = i
                    pending_dialogue_lines.append(text)
                continue

            # If line is indented and we have a current speaker, it's dialogue continuation
            if is_indented and self.current_speaker and len(stripped) > 0:
                if line_by_line:
                    # Old behavior: separate line for each
                    print(f"[DEBUG] Line {i}: Dialogue for '{self.current_speaker}': {stripped[:50]}...")
                    lines.append(DialogueLine(self.current_speaker, stripped, i))
                else:
                    # New behavior: accumulate
                    if not pending_dialogue_lines:
                        pending_dialogue_start_line = i
                    pending_dialogue_lines.append(stripped)
                continue

            # Check for action lines (scene descriptions) - non-indented only
            # Action lines: start with capital, contain lowercase OR all caps with punctuation
            # Examples: "Marcus turns, annoyed." or "MARCUS turns, annoyed." or "Josh, suddenly lucid, sharp."
            if not is_indented and stripped and stripped[0].isupper():
                # Check if it matches action pattern OR has punctuation (likely an action line)
                if self.ACTION_PATTERN.match(stripped) or (',' in stripped or '.' in stripped):
                    # Flush any pending dialogue before action line
                    if not line_by_line:
                        flush_pending_dialogue()

                    print(f"[DEBUG] Line {i}: Action description: {stripped[:50]}...")
                    lines.append(DialogueLine("ACTION", stripped, i))
                    self.current_speaker = None  # Reset after action line
                    continue

        # Flush any remaining dialogue at end of file
        if not line_by_line:
            flush_pending_dialogue()

        return lines


class PiperTTSConverter:
    """Converts screenplay to audio using Piper TTS with character voice mapping"""

    def __init__(self, voice_model_path: Optional[str] = None,
                 voice_config_path: Optional[str] = None,
                 use_cuda: bool = False):
        """Initialize the TTS converter

        Args:
            voice_model_path: Path to single Piper .onnx voice model (for single-voice mode)
            voice_config_path: Path to JSON config mapping characters to voice models
            use_cuda: Enable GPU acceleration (requires onnxruntime-gpu)
        """
        self.use_cuda = use_cuda
        self.voices: Dict[str, PiperVoice] = {}
        self.character_voice_map: Dict[str, str] = {}

        if voice_config_path:
            # Multi-voice mode: load character-to-voice mapping
            self._load_voice_config(voice_config_path)
        elif voice_model_path:
            # Single-voice mode: use one voice for all characters
            if not os.path.exists(voice_model_path):
                raise FileNotFoundError(f"Voice model not found: {voice_model_path}")
            print(f"Loading voice model: {voice_model_path}")
            self.default_voice = PiperVoice.load(voice_model_path, use_cuda=use_cuda)
            self.voices["_default"] = self.default_voice
        else:
            raise ValueError("Must provide either voice_model_path or voice_config_path")

    def _load_voice_config(self, config_path: str):
        """Load character-to-voice mapping from JSON config"""
        if not os.path.exists(config_path):
            raise FileNotFoundError(f"Voice config not found: {config_path}")

        with open(config_path, 'r') as f:
            raw_map = json.load(f)

        # Resolve voice paths relative to config file's directory
        config_dir = Path(config_path).parent
        # Shared voices directory at production/audio/voices/
        script_dir = Path(__file__).parent
        shared_voices_dir = script_dir / "voices"

        self.character_voice_map = {}
        for char, value in raw_map.items():
            # Handle both formats: plain string or dict with "voice" key
            if isinstance(value, dict):
                voice_path = value.get("voice", "")
            else:
                voice_path = value

            # If path is relative, try config dir first, then shared voices dir
            if voice_path and not Path(voice_path).is_absolute():
                local_path = config_dir / voice_path
                if local_path.exists():
                    resolved_path = str(local_path)
                else:
                    # Try shared voices directory (production/audio/voices/)
                    # voice_path is like "voices/en_US-ryan-high.onnx", extract just the filename
                    voice_filename = Path(voice_path).name
                    shared_path = shared_voices_dir / voice_filename
                    if shared_path.exists():
                        resolved_path = str(shared_path)
                    else:
                        # Fallback to original relative path for error reporting
                        resolved_path = str(local_path)
            else:
                resolved_path = voice_path
            self.character_voice_map[char] = resolved_path

        print(f"Loading voice models from config: {config_path}")
        print(f"[DEBUG] Character mappings in config:")
        for char, voice_path in self.character_voice_map.items():
            print(f"[DEBUG]   '{char}' -> {os.path.basename(voice_path)}")

        # Get unique voice model paths
        unique_voices = set(self.character_voice_map.values())

        # Load each unique voice model
        for voice_path in unique_voices:
            if not os.path.exists(voice_path):
                print(f"Warning: Voice model not found: {voice_path}, skipping...")
                continue

            print(f"  Loading: {os.path.basename(voice_path)}")
            self.voices[voice_path] = PiperVoice.load(voice_path, use_cuda=self.use_cuda)

        # Set default voice
        if "_default" in self.character_voice_map:
            default_path = self.character_voice_map["_default"]
            if default_path in self.voices:
                self.default_voice = self.voices[default_path]
            else:
                # Default voice file doesn't exist, fallback to first available
                if self.voices:
                    self.default_voice = next(iter(self.voices.values()))
                    print(f"Warning: Default voice not found, using {list(self.voices.keys())[0]}")
                else:
                    raise ValueError("No valid voice models loaded. Check voice paths in character_voices.json")
        else:
            # Use first loaded voice as default
            if self.voices:
                self.default_voice = next(iter(self.voices.values()))
            else:
                raise ValueError("No valid voice models loaded. Check voice paths in character_voices.json")

    def _get_voice_for_character(self, character: str) -> PiperVoice:
        """Get the appropriate voice model for a character"""
        if not self.character_voice_map:
            # Single-voice mode
            print(f"[DEBUG] Character '{character}' -> default voice (single-voice mode)")
            return self.default_voice

        # Multi-voice mode: lookup character
        voice_path = self.character_voice_map.get(character)
        if voice_path and voice_path in self.voices:
            print(f"[DEBUG] Character '{character}' -> {os.path.basename(voice_path)}")
            return self.voices[voice_path]

        # Fallback to default
        print(f"[DEBUG] Character '{character}' NOT FOUND in config, using default voice")
        return self.default_voice

    def convert_to_speech(self, dialogue_lines: List[DialogueLine],
                         output_path: str, narrator_prefix: bool = False,
                         multi_voice: bool = False):
        """Convert dialogue lines to a single WAV file

        Args:
            dialogue_lines: List of dialogue lines to convert
            output_path: Output WAV file path
            narrator_prefix: If True, prefix dialogue with speaker name
            multi_voice: If True, use different voices per character (requires pydub)
        """
        if multi_voice and self.character_voice_map:
            self._convert_multi_voice(dialogue_lines, output_path, narrator_prefix)
        else:
            self._convert_single_voice(dialogue_lines, output_path, narrator_prefix)

    def _convert_single_voice(self, dialogue_lines: List[DialogueLine],
                             output_path: str, narrator_prefix: bool = False):
        """Convert dialogue to single file using one voice"""
        full_text = []

        for line in dialogue_lines:
            if narrator_prefix and line.speaker != "ACTION":
                text = f"{line.speaker} says: {line.text}"
            else:
                text = line.text
            full_text.append(text)

        # Join all text with pauses
        complete_text = ". ... ".join(full_text)

        print(f"Generating audio for {len(dialogue_lines)} lines (single voice)...")

        with wave.open(output_path, "wb") as wav_file:
            self.default_voice.synthesize_wav(complete_text, wav_file)

        print(f"Audio saved to: {output_path}")

    def _convert_multi_voice(self, dialogue_lines: List[DialogueLine],
                            output_path: str, narrator_prefix: bool = False):
        """Convert dialogue to single file using multiple voices per character"""
        try:
            from pydub import AudioSegment
        except ImportError:
            print("Error: pydub not installed. Install with: pip install pydub")
            print("Falling back to single voice mode...")
            self._convert_single_voice(dialogue_lines, output_path, narrator_prefix)
            return

        import tempfile

        print(f"Generating audio for {len(dialogue_lines)} lines (multiple voices)...")

        combined_audio = AudioSegment.empty()

        for i, line in enumerate(dialogue_lines, 1):
            # Get voice for this character
            voice = self._get_voice_for_character(line.speaker)

            # Prepare text
            if narrator_prefix and line.speaker != "ACTION":
                text = f"{line.speaker} says: {line.text}"
            else:
                text = line.text

            # Generate audio to temporary file
            with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as temp_file:
                temp_path = temp_file.name

            with wave.open(temp_path, "wb") as wav_file:
                voice.synthesize_wav(text, wav_file)

            # Load and add to combined audio
            audio_segment = AudioSegment.from_wav(temp_path)

            # Make ACTION narrator speak 1.5x faster
            # if line.speaker == "ACTION":
            #     audio_segment = audio_segment.speedup(playback_speed=1.5)

            combined_audio += audio_segment

            # Add pause between lines (500ms)
            combined_audio += AudioSegment.silent(duration=500)

            # Clean up temp file
            os.remove(temp_path)

            print(f"  [{i}/{len(dialogue_lines)}] {line.speaker}")

        # Export final combined audio
        combined_audio.export(output_path, format="wav")
        print(f"Audio saved to: {output_path}")

    def convert_to_separate_files(self, dialogue_lines: List[DialogueLine],
                                  output_dir: str):
        """Convert each dialogue line to a separate WAV file

        Args:
            dialogue_lines: List of dialogue lines
            output_dir: Directory to save individual audio files
        """
        os.makedirs(output_dir, exist_ok=True)

        for i, line in enumerate(dialogue_lines, 1):
            filename = f"{i:04d}_{line.speaker.replace(' ', '_')}.wav"
            output_path = os.path.join(output_dir, filename)

            # Get the appropriate voice for this character
            voice = self._get_voice_for_character(line.speaker)

            # Generate audio
            with wave.open(output_path, "wb") as wav_file:
                voice.synthesize_wav(line.text, wav_file)

            # Speed up ACTION narrator by 1.5x
            # if line.speaker == "ACTION":
            #     try:
            #         from pydub import AudioSegment
            #         audio = AudioSegment.from_wav(output_path)
            #         audio = audio.speedup(playback_speed=1.5)
            #         audio.export(output_path, format="wav")
            #     except ImportError:
            #         # pydub not available, skip speedup
            #         pass

            print(f"  [{i}/{len(dialogue_lines)}] {filename}")

        print(f"\nAll files saved to: {output_dir}")


def main():
    parser = argparse.ArgumentParser(
        description="Convert screenplay files to TTS audio using Piper"
    )
    parser.add_argument(
        "input_path",
        nargs="?",
        default=".",
        help="Screenplay file or directory (recursively processes all .txt files in directory, default: writing/acts/)"
    )
    parser.add_argument(
        "--voice-model",
        help="Path to Piper .onnx voice model (single voice for all characters)"
    )
    parser.add_argument(
        "--voice-config",
        help="Path to JSON config mapping characters to voice models"
    )
    parser.add_argument(
        "--output-dir",
        default=None,
        help="Output directory for audio files (default: production/audio/audio_output)"
    )
    parser.add_argument(
        "--mode",
        choices=["single", "separate"],
        default="separate",
        help="Output mode: 'separate' WAV per line (default) or 'single' WAV per file"
    )
    parser.add_argument(
        "--combine",
        action="store_true",
        help="Combine all lines into one file with multiple voices (requires pydub)"
    )
    parser.add_argument(
        "--narrator-prefix",
        action="store_true",
        help="Prefix dialogue with speaker name (e.g., 'ALEX says:')"
    )
    parser.add_argument(
        "--cuda",
        action="store_true",
        help="Use CUDA for GPU acceleration (requires onnxruntime-gpu)"
    )
    parser.add_argument(
        "--line-by-line",
        action="store_true",
        help="Keep line breaks in dialogue blocks (old behavior). Default: combine dialogue lines into continuous blocks"
    )
    parser.add_argument(
        "--movie",
        help="Movie folder name (e.g., 'cuberoot', 'amazingtrash', 'hunted'). Required unless detectable from input path."
    )

    args = parser.parse_args()

    # Detect which movie folder we're processing
    input_path_str = str(Path(args.input_path).resolve())
    project_root = Path(__file__).parent.parent.parent  # Go up to untitled/

    # Use explicit --movie parameter if provided, otherwise try auto-detection
    movie_folder = args.movie
    if not movie_folder:
        if "amazingtrash" in input_path_str:
            movie_folder = "amazingtrash"
        elif "cuberoot" in input_path_str:
            movie_folder = "cuberoot"
        elif "hunted" in input_path_str:
            movie_folder = "hunted"

    # Set default output directory and voice config based on movie folder
    if movie_folder:
        movie_audio = project_root / movie_folder / "production" / "audio"

        if args.output_dir is None:
            args.output_dir = str(movie_audio / "audio_output")

        if not args.voice_model and not args.voice_config:
            movie_config = movie_audio / "character_voices.json"
            if movie_config.exists():
                args.voice_config = str(movie_config)
                print(f"Auto-detected {movie_folder} voice config: {movie_config}")
            else:
                parser.error(f"{movie_folder} voice config not found: {movie_config}")
    else:
        # Could not detect movie folder - require explicit --movie parameter
        parser.error("Could not detect movie folder from input path. Please specify --movie (e.g., --movie hunted)")

    # Validate input path
    input_path = Path(args.input_path)

    # If input_path is ".", look in movie_folder/writing/acts from project root
    if str(input_path) == ".":
        # Use movie folder's writing/acts directory
        if movie_folder:
            input_path = project_root / movie_folder / "writing" / "acts"
        else:
            # Fallback: try current directory
            current_dir = Path.cwd()
            if (current_dir / "writing" / "acts").exists():
                input_path = current_dir / "writing" / "acts"
            else:
                input_path = project_root / "writing" / "acts"

    # If input_path doesn't exist, try prepending writing/acts/
    if not input_path.exists():
        # Try movie folder's writing/acts first
        if movie_folder:
            movie_alt_path = project_root / movie_folder / "writing" / "acts" / input_path.name
            if movie_alt_path.exists():
                input_path = movie_alt_path
            else:
                print(f"Error: Path not found: {input_path}")
                print(f"Also tried: {movie_alt_path}")
                sys.exit(1)
        else:
            # Try relative to current directory
            alt_path = Path.cwd() / "writing" / "acts" / input_path.name
            if alt_path.exists():
                input_path = alt_path
            else:
                print(f"Error: Path not found: {input_path}")
                print(f"Also tried: {alt_path}")
                sys.exit(1)

    # Files to exclude (not screenplay content)
    EXCLUDED_FILES = {
        "table_of_contents.txt",
        "main.txt",
        "old traps.txt",
        "trap ideas.txt",
        "readme.md",
        "tts_readme.md",
        "claude.md"
    }

    # Get list of screenplay files
    if input_path.is_file():
        screenplay_files = [input_path]
    else:
        # Directory mode: recursively find all .txt files
        # Use rglob to find files at any depth
        all_files = sorted(input_path.rglob("*.txt"))

        # Filter out excluded files
        screenplay_files = [f for f in all_files if f.name.lower() not in EXCLUDED_FILES]

        # Show Act folders if found (for user feedback)
        act_folders = sorted([
            p for p in input_path.glob("Act *")
            if p.is_dir()
        ])
        if act_folders:
            print(f"Found {len(act_folders)} Act folder(s): {', '.join(f.name for f in act_folders)}")

    if not screenplay_files:
        print("Error: No .txt files found")
        print("Tip: Act folders should be in writing/acts/ directory")
        sys.exit(1)

    print(f"Found {len(screenplay_files)} screenplay file(s)")

    # Initialize parser and TTS converter
    parser_obj = ScreenplayParser()

    try:
        tts_converter = PiperTTSConverter(
            voice_model_path=args.voice_model,
            voice_config_path=args.voice_config,
            use_cuda=args.cuda
        )
    except Exception as e:
        print(f"Error initializing TTS: {e}")
        sys.exit(1)

    # Process each file
    os.makedirs(args.output_dir, exist_ok=True)

    for screenplay_file in screenplay_files:
        print(f"\n{'='*60}")
        print(f"Processing: {screenplay_file.name}")
        print(f"{'='*60}")

        # Parse screenplay
        dialogue_lines = parser_obj.parse_file(str(screenplay_file), line_by_line=args.line_by_line)

        if not dialogue_lines:
            print(f"  No dialogue found, skipping...")
            continue

        print(f"Extracted {len(dialogue_lines)} dialogue/action lines")

        # Generate output filename
        base_name = screenplay_file.stem

        if args.mode == "single" or args.combine:
            output_file = os.path.join(args.output_dir, f"{base_name}.wav")
            tts_converter.convert_to_speech(
                dialogue_lines,
                output_file,
                narrator_prefix=args.narrator_prefix,
                multi_voice=args.combine
            )
        else:  # separate
            output_subdir = os.path.join(args.output_dir, base_name)
            tts_converter.convert_to_separate_files(dialogue_lines, output_subdir)

    print(f"\n{'='*60}")
    print("Conversion complete!")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
