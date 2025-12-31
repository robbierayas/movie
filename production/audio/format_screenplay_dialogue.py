#!/usr/bin/env python3
"""
Screenplay Dialogue Formatter
Converts screenplay dialogue to proper TTS-friendly format following SCREENPLAY_FORMATTING.md

Usage:
    python format_screenplay_dialogue.py <screenplay_file.txt>

This script formats dialogue in a screenplay file to follow proper formatting:
- Character names centered with 20 spaces indent
- Dialogue indented with 10 spaces
- Action lines (parentheticals) converted to proper action descriptions
- Maintains proper spacing between elements

The script preserves:
- Scene headings
- Action lines (non-dialogue descriptions)
- Proper screenplay structure

Example input format:
    ALEX
    (moving toward window)
    We need to leave now.

Example output format:
    Alex moves toward the window.

                        ALEX
              We need to leave now.
"""

import re
import sys
import textwrap
import os
from pathlib import Path

# Common character names in the screenplay (add more as needed)
# Cube^(0.333) characters
CUBE_CHARACTERS = [
    'MARCUS', 'ALEX', 'LEA', 'EDGAR', 'MORRIS', 'DARIUS', 'SOFIA',
    'CHEN', 'NINA', 'YUKI', 'RASHID', 'JOSH', 'BARRY'
]

# Amazingtrash characters
AMAZINGTRASH_CHARACTERS = [
    'ADAM', 'GEOFF', 'MOOSK', 'GAL', 'TYSON', 'JOE',
    'VICTIM', 'BODY', 'NIGHT', 'POLICE', 'OFFICERS', 'STANDARD', 'CLASS', 'PASSENGER'
]

# Hunted characters
HUNTED_CHARACTERS = [
    'LIAM', 'HANK', 'BOBBY', 'SARAH', 'ELI', 'EMMA', 'OLIVIA', 'GIRLY',
    'REGULAR CUSTOMER', 'ATTRACTIVE WOMAN', 'MAN WITH GLASSES',
    'EMPLOYEE', 'BARTENDER', 'OFFICER', 'FEMALE OFFICER', 'DETECTIVE'
]

# Combine all character names
CHARACTER_NAMES = CUBE_CHARACTERS + AMAZINGTRASH_CHARACTERS + HUNTED_CHARACTERS

def wrap_line(line, max_width=121):
    """
    Wrap a line to max_width without chopping words.
    Preserves leading indentation.

    Args:
        line (str): The line to wrap
        max_width (int): Maximum line width (default: 121)

    Returns:
        list: List of wrapped lines
    """
    if len(line) <= max_width:
        return [line]

    # Get leading whitespace
    stripped = line.lstrip()
    indent = line[:len(line) - len(stripped)]

    # Wrap the text (pass stripped text, wrapper adds indent)
    wrapper = textwrap.TextWrapper(
        width=max_width,
        initial_indent=indent,
        subsequent_indent=indent,
        break_long_words=False,
        break_on_hyphens=False
    )

    return wrapper.wrap(stripped)

def fix_action_line_caps(line):
    """
    Convert ALL CAPS character names in action lines to proper case.

    According to SCREENPLAY_FORMATTING.md:
    - Character names in dialogue headers: ALL CAPS (e.g., "                    MARCUS")
    - Character names in action lines: Proper case (e.g., "Marcus turns, annoyed.")

    Args:
        line (str): Action line that may have ALL CAPS character names

    Returns:
        str: Action line with proper case character names
    """
    # Check if line starts with an ALL CAPS character name
    words = line.split()
    if not words:
        return line

    first_word = words[0].rstrip(',.')

    # If first word is an ALL CAPS character name, convert to proper case
    if first_word in CHARACTER_NAMES:
        # Replace first word with proper case version
        proper_case_name = first_word.capitalize()
        return line.replace(first_word, proper_case_name, 1)

    return line

def format_screenplay_dialogue(content):
    """
    Format dialogue in screenplay to follow proper formatting standards.

    Args:
        content (str): The screenplay content to format

    Returns:
        str: Formatted screenplay content
    """
    lines = content.split('\n')
    new_lines = []
    i = 0

    while i < len(lines):
        line = lines[i]

        # Check if this is a character name (formatted or unformatted)
        # Strip leading whitespace to check the actual content
        line_stripped = line.lstrip()

        # Strip (CONT'D), (O.S.), (V.O.) etc. for alpha check
        line_check = line_stripped.replace('(CONT\'D)', '').replace('(O.S.)', '').replace('(V.O.)', '').strip()

        # Check if this is a character dialogue header (not an action line)
        # Character headers are: ALL CAPS, alphabetic only (no commas/periods), on their own line
        # Note: (V.O.) and (O.S.) annotations contain periods but are valid character headers
        line_for_punct_check = re.sub(r'\s*\((V\.O\.|O\.S\.)\)', '', line_stripped)
        is_character_header = (line_stripped and
            line_stripped == line_stripped.upper() and
            len(line_stripped) < 40 and
            line_check.replace(' ', '').isalpha() and
            not line_stripped.startswith('INT.') and
            not line_stripped.startswith('EXT.') and
            not line_stripped.startswith('FADE') and
            not line_stripped.startswith('CUT') and
            not line_stripped.startswith('SCENE') and
            # Not an action line (action lines have punctuation like commas/periods)
            # Exclude V.O./O.S. from punctuation check
            ',' not in line_for_punct_check and
            '.' not in line_for_punct_check)

        if is_character_header:

            # This is a character name that needs formatting
            char_name = line_stripped

            # Check if next line is a parenthetical (action note)
            if i + 1 < len(lines) and lines[i + 1].strip().startswith('(') and lines[i + 1].strip().endswith(')'):
                # Convert parenthetical to action line BEFORE character name
                paren = lines[i + 1].strip()[1:-1]  # Remove parentheses

                # Create proper action line from parenthetical
                if paren:
                    action_line = format_parenthetical_to_action(char_name, paren)
                    new_lines.append(action_line)
                    new_lines.append('')  # Blank line after action

                i += 2  # Skip the parenthetical line
            else:
                i += 1

            # Add properly formatted character name
            new_lines.append(' ' * 20 + char_name)

            # Get dialogue lines until we hit a blank line or another character
            while i < len(lines):
                if not lines[i].strip():
                    new_lines.append('')
                    i += 1
                    break

                # Check if this is a character name (including CONT'D)
                next_line_stripped = lines[i].lstrip()
                next_line_check = next_line_stripped.replace('(CONT\'D)', '').replace('(O.S.)', '').replace('(V.O.)', '').strip()
                if (next_line_stripped and
                    next_line_stripped == next_line_stripped.upper() and
                    len(next_line_stripped) < 40 and
                    next_line_check.replace(' ', '').isalpha()):
                    # Hit next character name
                    break

                # This is dialogue - indent it properly
                dialogue = lines[i]
                if not dialogue.startswith(' '):
                    # No indentation - add proper dialogue indent
                    new_lines.append(' ' * 10 + dialogue)
                else:
                    # Has some indentation - strip and re-indent to 10 spaces
                    new_lines.append(' ' * 10 + dialogue.lstrip())
                i += 1
        else:
            # Not a character name - could be action line or other content
            # Fix ALL CAPS character names in action lines
            fixed_line = fix_action_line_caps(line)
            new_lines.append(fixed_line)
            i += 1

    # Apply word wrap to all lines (max 121 characters)
    wrapped_lines = []
    for line in new_lines:
        wrapped_lines.extend(wrap_line(line, max_width=121))

    return '\n'.join(wrapped_lines)


def format_parenthetical_to_action(character, parenthetical):
    """
    Convert a parenthetical (wryly) to proper action line.

    Args:
        character (str): Character name
        parenthetical (str): The parenthetical text without parentheses

    Returns:
        str: Formatted action line
    """
    # Handle common parentheticals
    paren_lower = parenthetical.lower().strip()
    char_name = character.capitalize()

    # Direction-based (to someone)
    if paren_lower.startswith('to '):
        target = parenthetical[3:].strip()
        return f"{char_name} turns to {target}."

    # Simple delivery modifiers
    if paren_lower in ['quietly', 'whispered', 'whispers']:
        return f"{char_name}, quietly."
    if paren_lower in ['shouting', 'yelling', 'shouts']:
        return f"{char_name} shouts."
    if paren_lower in ['firmly', 'firm']:
        return f"{char_name}, firm."
    if paren_lower in ['sharply', 'sharp']:
        return f"{char_name}, sharp."

    # Physical actions
    if 'moving' in paren_lower or 'walks' in paren_lower or 'walking' in paren_lower:
        return f"{char_name} {parenthetical.strip()}."
    if 'smirk' in paren_lower:
        return f"{char_name} smirks."
    if 'smile' in paren_lower or 'smiling' in paren_lower:
        return f"{char_name} smiles."
    if 'laugh' in paren_lower or 'laughing' in paren_lower:
        return f"{char_name} laughs."
    if 'nod' in paren_lower or 'nodding' in paren_lower:
        return f"{char_name} nods."
    if 'shake' in paren_lower or 'shaking' in paren_lower:
        return f"{char_name} shakes their head."

    # Default: Make it a complete sentence
    if not parenthetical.endswith('.'):
        return f"{char_name}, {parenthetical.strip()}."
    return f"{char_name}, {parenthetical.strip()}"


def process_file(filename):
    """
    Process a single screenplay file.

    Args:
        filename (str): Path to the screenplay file

    Returns:
        bool: True if successful, False otherwise
    """
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        formatted = format_screenplay_dialogue(content)

        with open(filename, 'w', encoding='utf-8') as f:
            f.write(formatted)

        return True

    except Exception as e:
        print(f"  Error processing {filename}: {e}")
        return False


def main():
    if len(sys.argv) < 2:
        print("Usage: python format_screenplay_dialogue.py <screenplay_file.txt | directory>")
        print()
        print("This script formats dialogue in a screenplay to follow proper TTS-friendly format:")
        print("- Character names centered (20 space indent)")
        print("- Dialogue indented (10 space indent)")
        print("- Parentheticals converted to action lines")
        print()
        print("Accepts either a single file or a directory (processes all .txt files recursively)")
        sys.exit(1)

    path = sys.argv[1]

    # Check if path is a file or directory
    path_obj = Path(path)

    if not path_obj.exists():
        print(f"Error: Path '{path}' not found")
        sys.exit(1)

    files_to_process = []

    if path_obj.is_file():
        # Single file
        if path_obj.suffix.lower() == '.txt':
            files_to_process.append(path_obj)
        else:
            print(f"Error: File must be a .txt file")
            sys.exit(1)
    elif path_obj.is_dir():
        # Directory - find all .txt files recursively
        files_to_process = list(path_obj.rglob('*.txt'))

        if not files_to_process:
            print(f"No .txt files found in directory: {path}")
            sys.exit(0)
    else:
        print(f"Error: '{path}' is neither a file nor directory")
        sys.exit(1)

    # Process all files
    success_count = 0
    fail_count = 0

    print(f"Processing {len(files_to_process)} file(s)...\n")

    for file_path in files_to_process:
        print(f"Processing: {file_path}")
        if process_file(str(file_path)):
            success_count += 1
            print(f"  ✓ Successfully formatted")
        else:
            fail_count += 1

    # Summary
    print(f"\n{'='*60}")
    print(f"Formatting complete!")
    print(f"  - {success_count} file(s) successfully formatted")
    if fail_count > 0:
        print(f"  - {fail_count} file(s) failed")
    print(f"\nFormatting applied:")
    print(f"  - Character names centered (20 space indent)")
    print(f"  - Dialogue properly indented (10 space indent)")
    print(f"  - Parentheticals converted to action lines")
    print(f"  - Lines wrapped to 121 characters (no word chopping)")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
