#!/usr/bin/env python3
"""
Download Piper voice models for TTS
"""

import os
import sys
import urllib.request
from pathlib import Path

# Available voice models
VOICES = {
    # Female voices
    "en_US-amy-medium": {
        "onnx": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/amy/medium/en_US-amy-medium.onnx",
        "config": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/amy/medium/en_US-amy-medium.onnx.json",
        "desc": "Female voice, clear"
    },
    "en_US-kathleen-low": {
        "onnx": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/kathleen/low/en_US-kathleen-low.onnx",
        "config": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/kathleen/low/en_US-kathleen-low.onnx.json",
        "desc": "Female voice, warm"
    },
    "en_US-kristin-medium": {
        "onnx": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/kristin/medium/en_US-kristin-medium.onnx",
        "config": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/kristin/medium/en_US-kristin-medium.onnx.json",
        "desc": "Female voice, professional"
    },
    "en_US-ljspeech-medium": {
        "onnx": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/ljspeech/medium/en_US-ljspeech-medium.onnx",
        "config": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/ljspeech/medium/en_US-ljspeech-medium.onnx.json",
        "desc": "Female voice, expressive"
    },
    "en_US-hfc_female-medium": {
        "onnx": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/hfc_female/medium/en_US-hfc_female-medium.onnx",
        "config": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/hfc_female/medium/en_US-hfc_female-medium.onnx.json",
        "desc": "Female voice"
    },

    # Male voices
    "en_US-ryan-high": {
        "onnx": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/ryan/high/en_US-ryan-high.onnx",
        "config": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/ryan/high/en_US-ryan-high.onnx.json",
        "desc": "Male voice, clear"
    },
    "en_US-danny-low": {
        "onnx": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/danny/low/en_US-danny-low.onnx",
        "config": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/danny/low/en_US-danny-low.onnx.json",
        "desc": "Male voice, conversational"
    },
    "en_US-joe-medium": {
        "onnx": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/joe/medium/en_US-joe-medium.onnx",
        "config": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/joe/medium/en_US-joe-medium.onnx.json",
        "desc": "Male voice, deep"
    },
    "en_US-john-medium": {
        "onnx": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/john/medium/en_US-john-medium.onnx",
        "config": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/john/medium/en_US-john-medium.onnx.json",
        "desc": "Male voice"
    },
    "en_US-bryce-medium": {
        "onnx": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/bryce/medium/en_US-bryce-medium.onnx",
        "config": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/bryce/medium/en_US-bryce-medium.onnx.json",
        "desc": "Male voice, young"
    },
    "en_US-hfc_male-medium": {
        "onnx": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/hfc_male/medium/en_US-hfc_male-medium.onnx",
        "config": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/hfc_male/medium/en_US-hfc_male-medium.onnx.json",
        "desc": "Male voice"
    },

    # Neutral/Multi-speaker voices
    "en_US-lessac-medium": {
        "onnx": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/lessac/medium/en_US-lessac-medium.onnx",
        "config": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/lessac/medium/en_US-lessac-medium.onnx.json",
        "desc": "Neutral voice, narrator quality"
    },
    "en_US-libritts-high": {
        "onnx": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/libritts/high/en_US-libritts-high.onnx",
        "config": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/libritts/high/en_US-libritts-high.onnx.json",
        "desc": "Multi-speaker, high quality"
    },

    # British English
    "en_GB-alan-medium": {
        "onnx": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_GB/alan/medium/en_GB-alan-medium.onnx",
        "config": "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_GB/alan/medium/en_GB-alan-medium.onnx.json",
        "desc": "British male voice"
    }
}


def download_file(url: str, output_path: str):
    """Download a file with progress bar"""
    print(f"  Downloading: {os.path.basename(output_path)}")

    def reporthook(count, block_size, total_size):
        percent = int(count * block_size * 100 / total_size)
        sys.stdout.write(f"\r  Progress: {percent}%")
        sys.stdout.flush()

    urllib.request.urlretrieve(url, output_path, reporthook)
    print()  # New line after download


def main():
    print("Piper Voice Model Downloader")
    print("=" * 60)
    print("\nAvailable voices:")
    for i, (voice_name, voice_data) in enumerate(VOICES.items(), 1):
        desc = voice_data.get("desc", "")
        print(f"  {i:2d}. {voice_name:30s} - {desc}")

    print("\nEnter voice number(s) to download (comma-separated, or 'all'):")
    choice = input("> ").strip().lower()

    # Create voices directory
    voices_dir = Path("voices")
    voices_dir.mkdir(exist_ok=True)

    # Determine which voices to download
    if choice == "all":
        voices_to_download = list(VOICES.keys())
    else:
        try:
            indices = [int(x.strip()) for x in choice.split(",")]
            voices_to_download = [list(VOICES.keys())[i - 1] for i in indices]
        except (ValueError, IndexError):
            print("Invalid selection")
            sys.exit(1)

    # Download selected voices
    print(f"\nDownloading {len(voices_to_download)} voice(s)...\n")

    for voice_name in voices_to_download:
        print(f"Voice: {voice_name}")

        voice_data = VOICES[voice_name]

        # Download .onnx file
        onnx_path = voices_dir / f"{voice_name}.onnx"
        if not onnx_path.exists():
            download_file(voice_data["onnx"], str(onnx_path))
        else:
            print(f"  {onnx_path.name} already exists, skipping")

        # Download .onnx.json config file
        config_path = voices_dir / f"{voice_name}.onnx.json"
        if not config_path.exists():
            download_file(voice_data["config"], str(config_path))
        else:
            print(f"  {config_path.name} already exists, skipping")

        print()

    print("=" * 60)
    print("Download complete!")
    print(f"\nVoice models saved to: {voices_dir.absolute()}")
    print("\nUsage example:")
    print(f"  python screenplay_to_tts.py screenplay.txt --voice-model voices/{voices_to_download[0]}.onnx")


if __name__ == "__main__":
    main()
