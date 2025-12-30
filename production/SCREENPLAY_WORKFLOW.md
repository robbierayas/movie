# SCREENPLAY DEVELOPMENT WORKFLOWS - COMMON INSTRUCTIONS

This document contains common workflows and guidelines for all screenplay projects. Each movie project has its own `dialogue.md` file with movie-specific information.

---

## CRITICAL: SCENE STRUCTURE RULES

**IMPORTANT**: The table of contents defines ALL scenes in the screenplay. DO NOT create, add, remove, or significantly alter scenes without explicit user request.

### Rules:
1. **If a scene file is missing**, check table_of_contents.txt or main.txt FIRST to see what should be in it
2. **If still unclear**, ASK the user what should be in that scene - DO NOT invent content based on "dramatic logic"
3. **Do NOT add new scenes** between existing scenes without user request
4. **Do NOT create elaborate sequences** that weren't in the original structure
5. **Follow the established structure exactly** - the user has planned the story beats

### Why This Matters:
- Inventing scenes based on "what would be dramatic" can derail the intended pacing and story
- Over-explaining through additional scenes dilutes the impact
- The user's structure is intentional - trust it

**When in doubt about scene content: ASK, don't assume.**

---

## SCENE LAYOUT FORMATTING NOTE

In scene layout sections, quoted text attributed to characters represents their **thoughts or internal reactions**, not necessarily spoken dialogue. For example:
- Character: "Did we just get bigger?" - This is the character's thought/confusion
- Character: "He knows this place" - This is the character's internal assessment

The actual screenplay dialogue may differ from these thought representations.

---

## SCREENPLAY DEVELOPMENT WORKFLOWS

### Workflow 1: When Acts are Defined (main.txt Approved)

When the user indicates the acts are defined in main.txt (e.g., "main.txt is how I want it", "the acts look good", "fill out table of contents"), follow these steps:

1. **Read main.txt** to understand the three-act structure
2. **Create table_of_contents.txt** with 10 scenes per act (30 scenes total)
3. **For each scene in table_of_contents.txt**:
   - Assign a descriptive scene name based on main.txt
   - Add location: `INT./EXT. - LOCATION - TIME`
   - List main characters appearing in the scene
   - Write 2-3 sentence summary of what happens
   - Include scene count and estimated runtime summaries at the bottom

**Output format**:
```
# TABLE OF CONTENTS

## Act 1 - [Title from main.txt]

### Scene 0 - [Descriptive Name]
- Location: INT./EXT. - LOCATION - TIME
- Characters: [Character list]
- Summary: [2-3 sentence description]

[Continue for 10 scenes in Act 1]

## Act 2 - [Title from main.txt]
[10 scenes]

## Act 3 - [Title from main.txt]
[10 scenes]

## Scene Count Summary
- Act 1: 10 scenes
- Act 2: 10 scenes
- Act 3: 10 scenes
- **Total: 30 scenes**

## Estimated Runtime
[Calculate based on scene complexity]
```

### Workflow 2: When Table of Contents is Created (Build Character Files)

When the table_of_contents.txt has been created from Workflow 1, follow these steps to build character profile files:

1. **Read table_of_contents.txt** to identify all characters appearing across scenes
2. **Create a Characters/ directory** if it doesn't already exist
3. **For each major character**, create a character profile file:
   - File path: `writing/Characters/[Character Name].txt`
   - File name format: `[Character Name].txt` (e.g., `Adam.txt`, `Geoff.txt`)

4. **Character file template**:
```
# [CHARACTER NAME]

## BASIC INFORMATION
- **Full Name**: [Character's full name]
- **Age**: [To be determined from screenplay]
- **Occupation**: [Job/role]
- **Family**: [Family status - to be determined]

## ARCHETYPE
[Primary ensemble role - to be determined after screenplay is written]

## CHARACTER FUNCTION
[What this character does for the story - to be expanded after scenes are written]

## PHYSICAL DESCRIPTION
[Physical appearance, distinctive features - to be determined from screenplay]

## PERSONALITY TRAITS
[Core personality characteristics - to be expanded after scenes are written]

## RELATIONSHIPS
[Key relationships with other characters - to be expanded after scenes are written]

## CHARACTER ARC
[Character's journey through the story - to be expanded after scenes are written]

## DIALOGUE STYLE
[How this character speaks - to be expanded after scenes are written]

## KEY SCENES
[To be filled in as scenes are written using Workflow 4]
```

5. **Create character files for all major characters** mentioned in table_of_contents.txt
6. **Report completion**: List all created character files

**Note**: These character files start with minimal information and will be progressively updated as scenes are written in later workflows.

### Workflow 3: When Table of Contents is Approved

When the user indicates the table of contents is approved (e.g., "table_of_contents is how I want it", "create the scene files", "make the scenes"), follow these steps:

1. **Read table_of_contents.txt** to get all scene information
2. **For each scene**, create a scene file in the appropriate Act folder:
   - File path: `writing/acts/Act [N] - [Act Name]/Scene [N] - [Scene Name].txt`
   - File name format: `Scene [Number] - [Descriptive Name].txt`

3. **Scene file template** (for regular scenes):
```
# Scene [N] - [Scene Name]

## LOCATION
[Copy from table_of_contents.txt]

## CHARACTERS
[Copy character list from table_of_contents.txt]

## SCENE LAYOUT

### Opening
[Placeholder - describe how scene opens]

### Key Beats
1. [First major beat]
2. [Second major beat]
3. [Third major beat]

### Character Moments
- **[Character Name]**: [Key action/reaction/decision]
- **[Character Name]**: [Key action/reaction/decision]

### Closing
[Placeholder - describe how scene ends and transitions]

---

## FULL SCRIPT

[LOCATION from above]

[Screenplay section - left blank for Workflow 3]

---

## Production Notes
[Placeholder for animation requirements, technical considerations]
```

4. **Montage scene template** (if scene is a montage):
```
# Scene [N] - [Scene Name] (MONTAGE)

## TYPE
[Linear Montage / Thematic Montage / Series of Shots]

## PURPOSE
[What this montage accomplishes: compress time, show transformation, establish theme, etc.]

## TIME SPAN
[How much story time passes: minutes, hours, days, weeks, etc.]

## MONTAGE STRUCTURE

### Shot 1
[Brief description of first visual moment]

### Shot 2
[Brief description of second visual moment]

### Shot 3
[Brief description of third visual moment]

### Shot 4
[Brief description of fourth visual moment]

[Continue for 3-8 shots total]

---

## FULL SCRIPT

[MONTAGE formatting - see SCREENPLAY_FORMATTING.md for formatting options]

---

## Production Notes
[Animation considerations: reusable assets, camera notes, time/lighting changes]
```

5. **Identifying montages**: Look for these indicators in table_of_contents.txt:
   - Scene summary mentions "time passes", "over the course of", "weeks later"
   - Scene shows progression/training/transformation
   - Scene name includes "Journey", "Preparation", "Training", "Passage of Time"
   - Multiple locations visited briefly
   - Thematic connection between disparate moments

6. **Create all 30 scene files** following appropriate template
7. **Report completion**: List all created files organized by Act, noting which are montages

### Workflow 4: When Scene Layout is Approved

When the user indicates the scene layout is approved (e.g., "the scene layout is how I want it", "scene layout looks good", "write the screenplay for this scene"), follow these steps for that scene:

**For Regular Scenes:**

1. **Remove the screenplay section** from the scene file
2. **Examine the character files** for all characters appearing in the scene
3. **Examine the scene layout and other sections** (Description, Key Elements, Character Moments, Establishes, etc.)
4. **Create the screenplay section** based on the scene layout
   - Maximum 300 lines
   - Reference character files for voice consistency
   - Translate scene layout thoughts into appropriate dialogue or action
5. **Update character files** with short descriptions in **"KEY SCENES"** section:
   - Add concise description of what happened in the scene for each character
   - Include key dialogue quotes, decisions made, and emotional beats
   - Keep descriptions SHORT (1-3 sentences focusing on actions and key quotes)
   - Format: "Act X, Scene Y: Scene Title - brief description with key moments and quotes"

**For Montage Scenes:**

1. **Review montage structure** section to understand progression
2. **Choose formatting method** (see SCREENPLAY_FORMATTING.md):
   - Method 1: MONTAGE header with dash list (most common)
   - Method 2: Scene heading with brief slug lines (multi-location)
   - Method 3: Series of short scenes (when detail needed)
3. **Write montage screenplay**:
   - Keep each shot to ONE line or brief paragraph
   - 3-8 shots total (avoid making too long)
   - Minimal or no dialogue
   - Focus on visual progression or thematic connection
   - For animation: specify positions, camera angles, reusable assets
4. **Character files update**:
   - Montages typically don't require detailed KEY SCENES updates
   - Only update if montage contains significant character moment
   - Format: "Act X, Scene Y: Montage - [brief overall summary]"

**Montage-Specific Considerations:**
- Don't create full scene headings for each shot (unless using Method 3)
- Don't use CUT TO: between shots
- Each shot should advance progression or connect thematically
- Consider music/score notation if important: `MONTAGE - TITLE (MUSIC)`
- For animation: note if locations/assets are reused across shots

### Workflow 5: When Scene Screenplay is Approved

When the user indicates the scene screenplay is approved (e.g., "the screenplay is how I want it", "screenplay looks good", "finalize this scene"), follow these steps for that scene:

1. **Reformat the screenplay** for consistency and clarity
2. **Update the scene description** in the file to match any screenplay changes
3. **Update character files** for all characters with significant moments in the scene:
   - Update **"KEY SCENES"** section with what happened in the screenplay
   - Update **"DIALOGUE STYLE"** section to capture how the character's voice manifested
   - DIALOGUE STYLE additions should:
     - Point out how the character's voice is different or unique
     - Give insight into deeper feelings revealed through dialogue
     - Only ADD to DIALOGUE STYLE, never remove existing content
     - User will edit/refine after

**Important**: These workflows ensure scene files, character files, and screenplay all stay synchronized as the project develops.

### Workflow 6: Character Profile Updates from Screenplay

When character profiles need updating to reflect completed screenplay, use this workflow to ensure consistency and flag any issues:

**Phase 1: Analysis & Inconsistency Detection**

For each character:

1. **Read KEY SCENES chronologically** (already complete and accurate from Workflow 4)
2. **Read DIALOGUE STYLE** (already complete and accurate from Workflow 5)
3. **Analyze patterns** and draft updates for:
   - **ARCHETYPE** (new section - Ensemble Role, see reference below)
   - **CHARACTER FUNCTION**
   - **PERSONALITY TRAITS**
   - **RELATIONSHIPS**
   - **CHARACTER ARC**

4. **Flag inconsistencies** before making changes:
   - Contradiction between current profile and screenplay evidence
   - Contradiction between KEY SCENES and DIALOGUE STYLE
   - Missing information in current profile
   - Outdated information that conflicts with finalized scenes
   - Character behavior that doesn't fit proposed archetype
   - Any conflicting characterization patterns

5. **Present report**: Show proposed changes + all flagged inconsistencies for each character
6. **Wait for user approval** before updating files

**Phase 2: Updates** (only after approval)

7. **Review DIALOGUE STYLE section** for quality improvements:
   - Check for duplicate descriptions (concepts that repeat even with different wording)
   - Remove quoted dialogue examples that don't enhance the description, but keep the analytical description itself
   - Flag any duplicates or unnecessary quotes found

8. Update character profiles with approved changes
9. Note: PHYSICAL DESCRIPTION and BASIC INFORMATION require manual script review (age, status, family, etc.) - separate task

**Inference Guidelines:**

- **CHARACTER FUNCTION**: Ask "What would this story lose if this character didn't exist?" Look for plot function (causes/reacts/witnesses), thematic function (what idea they embody), structural function (when they enter/exit, what changes), contrast function (who they're a foil to), emotional function (comic relief, horror, pathos, hope)

- **PERSONALITY TRAITS**: Cross-reference DIALOGUE STYLE (how they process info, handle stress, their values, social comfort) with KEY SCENES (consistent behaviors, reactions to stimuli, actions vs. words, growth/regression). If DIALOGUE STYLE shows rambling but KEY SCENES shows silence in crisis, that's meaningful characterization.

- **RELATIONSHIPS**: Track interaction frequency, quality (supportive/antagonistic), dialogue shifts with certain people, loyalty tests (who they defend/abandon), influence (who changes whose mind), death reactions (whose deaths affect them most). Note power dynamics.

- **CHARACTER ARC**: Structure from KEY SCENES - Beginning State (Act 1 beliefs/fears/goals), Inciting Incident (what challenges worldview), Escalation (Act 2 responses to pressure), Crisis Point (lowest moment/biggest choice), End State (how they changed or failed to change). Types: Positive Change (overcomes flaw), Negative Change (succumbs to flaw), Flat Arc (belief tested but holds), Disillusionment Arc (loses faith).

**Note**: Workflow 2 (Build Character Files) should be completed before Workflow 4 (Scene Layout) so character files exist for reference during scene writing.

**Ensemble Role Archetypes Reference:**

Characters typically have a primary archetype with possible secondary traits. Archetypes can shift between Acts.

- **The Leader** - Takes charge, makes decisions, rallies others (often protagonist)
- **The Skeptic** - Questions everything, doubts plans, voice of caution
- **The Heart** - Emotional center, empathy, represents humanity/morality
- **The Brain** - Intellectual, solves problems through knowledge
- **The Comic Relief** - Breaks tension, provides levity (often while being competent)
- **The Pragmatist** - Practical solutions, grounded, "what works"
- **The Idealist** - Believes in principles, hope, doing the right thing
- **The Loyalist** - Devoted to person/cause, follows rather than leads
- **The Survivor** - Adapts, endures, prioritizes self-preservation
- **The Innocent** - Naive, trusting, represents purity/corruption
- **The Mentor** - Guides others, shares knowledge, often dies
- **The Wildcard** - Unpredictable, changes allegiances, keeps audience guessing
- **The Betrayer** - Turns on group, self-interested (can overlap with Skeptic/Survivor)
- **The Protector** - Shields others, sacrifices for the group
- **The Voice of Reason** - Cuts through emotion with logic and clarity

---

## MOVIE-SPECIFIC DIALOGUE.MD FILE STRUCTURE

Each movie project should have a `dialogue.md` file in its `writing/` directory with the following structure:

### Required Sections:

1. **Project Title and Overview** - Brief description of the screenplay project
2. **Project Structure** - List of documentation files specific to this movie:
   - Main documentation files (main.txt, table_of_contents.txt, etc.)
   - Character files list with brief descriptions
   - Additional resources (mechanics files, trap ideas, equipment notes, etc.)
   - Files to ignore
3. **Screenplay Status** - Track completed/in-progress scenes
4. **Movie-Specific Mechanics/Rules** (if applicable) - Any unique world-building, physics, or storytelling rules specific to this screenplay
5. **Working With This Project** - Quick reference for which files to check for different questions

### Optional Sections (as needed):
- Visual design notes
- Terminology references
- Equipment/prop notes
- World-building details
- Technical specifications

### What NOT to Include (covered in SCREENPLAY_WORKFLOW.md):
- Workflow instructions (1-6)
- Scene layout formatting notes
- Ensemble role archetypes
- Scene structure rules

