#!/usr/bin/env python3
"""
Screenplay Compiler

Compiles all scene files from a screenplay project into a single file,
extracting only the FULL SCRIPT sections.

Supports two scene file formats:
1. Markdown: ## FULL SCRIPT
2. Old text: ===== FULL SCRIPT =====

Usage:
    python compile_screenplay.py <project_name> [--output <output_file>]

Example:
    python compile_screenplay.py hunted
    python compile_screenplay.py cuberoot --output cuberoot_full.txt
"""

import argparse
import os
import re
from pathlib import Path


def extract_full_script(file_path: Path) -> tuple[str, str]:
    """
    Extract the screenplay section from a scene file.

    Supports multiple formats:
    1. Markdown: ## FULL SCRIPT or ## SCREENPLAY
    2. Old text: ===== FULL SCRIPT ===== or ===== SCREENPLAY =====

    Returns:
        Tuple of (scene_title, script_content)
    """
    content = file_path.read_text(encoding='utf-8')

    # Extract scene title from first line (handles both "# Title" and "TITLE" formats)
    title_match = re.match(r'^(?:#\s*)?(.+?)(?:\s*=+)?$', content, re.MULTILINE)
    scene_title = title_match.group(1).strip() if title_match else file_path.stem

    # Try markdown format: ## FULL SCRIPT or ## SCREENPLAY
    script_match = re.search(
        r'##\s*(?:FULL SCRIPT|SCREENPLAY)\s*\n(.*?)(?=\n---|\n##|\Z)',
        content,
        re.DOTALL | re.IGNORECASE
    )

    if script_match:
        script_content = script_match.group(1).strip()
        return scene_title, script_content

    # Try old text format: ===== FULL SCRIPT ===== or ===== SCREENPLAY =====
    script_match = re.search(
        r'=+\s*\n\s*(?:FULL SCRIPT|SCREENPLAY)\s*\n\s*=+\s*\n(.*?)(?:\Z)',
        content,
        re.DOTALL | re.IGNORECASE
    )

    if script_match:
        script_content = script_match.group(1).strip()
        return scene_title, script_content

    # Try format: ====\n\nFULL SCRIPT...\n\n (with optional suffix like "- ACT 3, SCENE 24")
    script_match = re.search(
        r'=+\s*\n+\s*(?:FULL SCRIPT|SCREENPLAY)[^\n]*\n+(?:=+\s*\n+)?(.*?)(?:\Z)',
        content,
        re.DOTALL | re.IGNORECASE
    )

    if script_match:
        script_content = script_match.group(1).strip()
        return scene_title, script_content

    return scene_title, ""


def parse_scene_number(filename: str) -> int:
    """Extract scene number from filename for sorting."""
    match = re.search(r'Scene\s*(\d+)', filename, re.IGNORECASE)
    return int(match.group(1)) if match else 999


def compile_screenplay(project_name: str, output_file: str = None) -> str:
    """
    Compile all scene files from a project into a single screenplay file.

    Args:
        project_name: Name of the project folder (e.g., 'hunted')
        output_file: Optional output file path

    Returns:
        Path to the compiled output file
    """
    # Find the project directory
    script_dir = Path(__file__).parent.parent
    project_dir = script_dir / project_name / 'writing' / 'acts'

    if not project_dir.exists():
        raise FileNotFoundError(f"Project directory not found: {project_dir}")

    # Collect all scene files
    scene_files = []
    for act_dir in sorted(project_dir.iterdir()):
        if act_dir.is_dir() and 'Act' in act_dir.name:
            for scene_file in act_dir.glob('Scene*.txt'):
                scene_files.append(scene_file)

    # Sort by scene number
    scene_files.sort(key=lambda f: parse_scene_number(f.name))

    if not scene_files:
        raise FileNotFoundError(f"No scene files found in {project_dir}")

    # Compile the screenplay
    compiled_parts = []
    compiled_parts.append(f"{'='*60}")
    compiled_parts.append(f"{project_name.upper()} - FULL SCREENPLAY")
    compiled_parts.append(f"{'='*60}")
    compiled_parts.append("")

    current_act = None

    for scene_file in scene_files:
        # Check if we're in a new act
        act_name = scene_file.parent.name
        if act_name != current_act:
            current_act = act_name
            compiled_parts.append("")
            compiled_parts.append(f"{'#'*60}")
            compiled_parts.append(f"# {act_name.upper()}")
            compiled_parts.append(f"{'#'*60}")
            compiled_parts.append("")

        scene_title, script_content = extract_full_script(scene_file)

        if script_content:
            compiled_parts.append(f"\n{'-'*40}")
            compiled_parts.append(f"# {scene_title}")
            compiled_parts.append(f"{'-'*40}\n")
            compiled_parts.append(script_content)
            compiled_parts.append("")
        else:
            compiled_parts.append(f"\n[Scene file has no FULL SCRIPT section: {scene_file.name}]\n")

    # Add footer
    compiled_parts.append("")
    compiled_parts.append(f"{'='*60}")
    compiled_parts.append("END OF SCREENPLAY")
    compiled_parts.append(f"{'='*60}")

    # Determine output path
    if output_file:
        output_path = Path(output_file)
    else:
        output_dir = script_dir / project_name / 'writing'
        output_path = output_dir / f"{project_name}_full_screenplay.txt"

    # Write the compiled screenplay
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text('\n'.join(compiled_parts), encoding='utf-8')

    print(f"Compiled {len(scene_files)} scenes to: {output_path}")
    return str(output_path)


def main():
    parser = argparse.ArgumentParser(
        description='Compile screenplay scene files into a single TTS-ready file'
    )
    parser.add_argument(
        'project',
        help='Project name (e.g., hunted, cuberoot, amazingtrash)'
    )
    parser.add_argument(
        '--output', '-o',
        help='Output file path (default: <project>/writing/<project>_full_screenplay.txt)'
    )

    args = parser.parse_args()

    try:
        output_path = compile_screenplay(args.project, args.output)
        print(f"Success! Screenplay compiled to: {output_path}")
    except FileNotFoundError as e:
        print(f"Error: {e}")
        return 1
    except Exception as e:
        print(f"Error: {e}")
        return 1

    return 0


if __name__ == '__main__':
    exit(main())
