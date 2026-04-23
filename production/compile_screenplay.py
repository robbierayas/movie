#!/usr/bin/env python3
"""
Screenplay Compiler

Compiles all scene files from a screenplay project into a single file,
extracting only the FULL SCRIPT sections.

Two output modes:
  --format working   (default) Working draft with scene headers and separators
  --format submission         Submission draft: no scene numbers, no separators,
                              scenes flow together with only slug lines as breaks.
                              Continuous sequences share slug lines naturally.

Supports two scene file formats:
1. Markdown: ## FULL SCRIPT
2. Old text: ===== FULL SCRIPT =====

Usage:
    python compile_screenplay.py <project_name> [--output <output_file>] [--format working|submission]

Example:
    python compile_screenplay.py hunted
    python compile_screenplay.py hunted --format submission
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


def compile_screenplay(project_name: str, output_file: str = None, fmt: str = 'working') -> str:
    """
    Compile all scene files from a project into a single screenplay file.

    Args:
        project_name: Name of the project folder (e.g., 'hunted')
        output_file: Optional output file path
        fmt: 'working' for working draft with scene headers, 'submission' for clean draft

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

    if fmt == 'submission':
        compiled_text = _compile_submission(project_name, scene_files)
    else:
        compiled_text = _compile_working(project_name, scene_files)

    # Determine output path
    if output_file:
        output_path = Path(output_file)
    else:
        output_dir = script_dir / project_name / 'writing'
        suffix = '_full_screenplay.txt' if fmt == 'working' else '_submission_draft.txt'
        output_path = output_dir / f"{project_name}{suffix}"

    # Write the compiled screenplay
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(compiled_text, encoding='utf-8')

    print(f"Compiled {len(scene_files)} scenes ({fmt} format) to: {output_path}")
    return str(output_path)


def _compile_working(project_name: str, scene_files: list) -> str:
    """Working draft with scene headers and separators."""
    compiled_parts = []
    compiled_parts.append(f"{'='*60}")
    compiled_parts.append(f"{project_name.upper()} - FULL SCREENPLAY")
    compiled_parts.append(f"{'='*60}")
    compiled_parts.append("")

    current_act = None

    for scene_file in scene_files:
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

    compiled_parts.append("")
    compiled_parts.append(f"{'='*60}")
    compiled_parts.append("END OF SCREENPLAY")
    compiled_parts.append(f"{'='*60}")

    return '\n'.join(compiled_parts)


def _compile_submission(project_name: str, scene_files: list) -> str:
    """
    Submission draft: clean screenplay format.

    - No scene numbers, no separators, no act headers
    - Title page at top
    - Scenes flow together — only slug lines (INT./EXT.) mark transitions
    - Consecutive scenes at the same location with CONTINUOUS timing
      flow without extra whitespace
    - Duplicate slug lines between adjacent scenes are collapsed
      (if Scene A ends at INT. ROOM - CONTINUOUS and Scene B starts
      with the same slug, it appears only once)
    """
    # Read main.txt for title info if available
    script_dir = Path(scene_files[0]).parents[3]
    title = project_name.upper()

    # Build title page
    parts = []
    parts.append("")
    parts.append("")
    parts.append("")
    parts.append("")
    parts.append(f"                         {title}")
    parts.append("")
    parts.append("")
    parts.append("")
    parts.append("")
    parts.append("")
    parts.append("FADE IN:")
    parts.append("")

    prev_last_slug = None

    for i, scene_file in enumerate(scene_files):
        scene_title, script_content = extract_full_script(scene_file)

        if not script_content:
            continue

        # Strip leading/trailing whitespace from the script content
        script_content = script_content.strip()

        # Find the first slug line in this scene's content
        lines = script_content.split('\n')
        first_slug_idx = None
        first_slug = None
        for j, line in enumerate(lines):
            stripped = line.strip()
            if stripped.startswith(('INT.', 'EXT.', 'INT./EXT.')):
                first_slug_idx = j
                first_slug = stripped
                break

        # Check if the first slug duplicates the last slug from previous scene
        if first_slug and prev_last_slug and _slugs_match(first_slug, prev_last_slug):
            # Remove the duplicate slug line — scenes flow together
            if first_slug_idx is not None:
                lines = lines[first_slug_idx + 1:]
                # Strip any blank lines right after the removed slug
                while lines and not lines[0].strip():
                    lines.pop(0)
                script_content = '\n'.join(lines)

        # Add the scene content
        if i > 0:
            parts.append("")  # Single blank line between scenes

        parts.append(script_content)

        # Track the last slug line in this scene for dedup with next scene
        prev_last_slug = None
        for line in reversed(lines):
            stripped = line.strip()
            if stripped.startswith(('INT.', 'EXT.', 'INT./EXT.')):
                prev_last_slug = stripped
                break

    # Strip any trailing FADE OUT from the compiled content to avoid duplication
    # It may be embedded in the last appended string, not on its own line in parts
    if parts:
        last = parts[-1].rstrip()
        last = re.sub(r'\n*\s*FADE\s*OUT\.?\s*$', '', last, flags=re.IGNORECASE)
        parts[-1] = last.rstrip()
    while parts and not parts[-1].strip():
        parts.pop()

    # End
    parts.append("")
    parts.append("")
    parts.append("FADE OUT.")
    parts.append("")
    parts.append("")
    parts.append("                         THE END")

    return '\n'.join(parts)


def _slugs_match(slug_a: str, slug_b: str) -> bool:
    """
    Check if two slug lines refer to the same location.
    Matches if location portion is identical, ignoring CONTINUOUS/NIGHT/etc.
    """
    def normalize(slug: str) -> str:
        # Remove timing (CONTINUOUS, NIGHT, DAY, LATER, etc.) and compare location
        slug = re.sub(r'\s*-\s*(CONTINUOUS|NIGHT|DAY|LATER|DUSK|DAWN|MORNING|AFTERNOON|EVENING)\s*$', '', slug, flags=re.IGNORECASE)
        return slug.strip().upper()
    return normalize(slug_a) == normalize(slug_b)


def main():
    parser = argparse.ArgumentParser(
        description='Compile screenplay scene files into a single file'
    )
    parser.add_argument(
        'project',
        help='Project name (e.g., hunted, cuberoot, amazingtrash)'
    )
    parser.add_argument(
        '--output', '-o',
        help='Output file path (default: <project>/writing/<project>_full_screenplay.txt)'
    )
    parser.add_argument(
        '--format', '-f',
        choices=['working', 'submission'],
        default='working',
        help='Output format: working (with scene headers) or submission (clean draft)'
    )

    args = parser.parse_args()

    try:
        output_path = compile_screenplay(args.project, args.output, args.format)
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
