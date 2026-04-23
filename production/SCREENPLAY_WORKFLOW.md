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

### Workflow 1B: When Table of Contents Exists but main.txt Doesn't Follow Template

When a project has a completed table_of_contents.txt but main.txt doesn't follow the standard template format (e.g., written as dense scene-by-scene prose, missing sections like Logline/Synopsis/Characters), rewrite main.txt to match the template.

**Scene-by-scene detail belongs in table_of_contents.txt, not in main.txt.** Main.txt is the high-level story document.

1. **Read table_of_contents.txt** to understand the full scene breakdown
2. **Read the current main.txt** to extract story content
3. **Rewrite main.txt** using the standard template sections:
   - **Logline** - A 1-2 sentence synopsis communicating the main character and central conflict. Use one of these formulas:
     - *Formula A:* Inciting incident + protagonist + action + antagonist + goal (e.g., "When a young boy disappears, his three best friends must confront a terrifying otherworldly force to get him back.")
     - *Formula B:* Protagonist + action + antagonist + goal + stake (e.g., "A spirited farm boy joins rebel forces to fight an evil overlord and rescue a princess to save the empire.")
     - **Rules:** Use descriptive roles not character names ("a reclusive scientist," not "Dr. Smith"). Use active, external verbs — avoid "decides," "realizes," or "learns." Don't reveal the ending. Keep the protagonist in the foreground. Raise dramatic questions rather than answer them.
     - **May also hint at:** character flaw, unique world/time period, or major reveal
     - **Include script format:** feature film, short film, 30-min pilot, 60-min pilot, or spec TV episode
   - **Synopsis** - 2-4 paragraphs telling the complete story (beginning to end, no scene numbers)
   - **Theme** - Central theme or philosophical question
   - **Genre** - Primary / Secondary / Tertiary
   - **Setting** - Time period, location, key locations list
   - **Characters** - Each major character with age, traits, role, arc summary. Only add HISTORICAL/COMPOSITE tags for historical films (no need to tag characters as FICTIONAL in non-historical projects)
   - **Story Structure** - 3 acts with: Act Title, Timeline, Theme, one-paragraph summary, Major Beats (bullet points), Act Climax
   - **Key Story Elements** - Major plot devices and concepts
   - **Dramatic Themes** - Numbered list with one-sentence explanations
   - **Production Notes** - Visual style, key visuals, music/sound, special considerations
   - **Timeline** - Estimated runtime, act breakdown
   - **Notes for Development** - Open questions, TBDs, todo items

4. **Key rules**:
   - Do NOT include scene numbers or scene-by-scene descriptions in main.txt (that's what table_of_contents.txt is for)
   - Major Beats in Story Structure should be story beats, not scene references
   - Synopsis should read as a flowing narrative, not a scene list
   - Keep the ROBBIE TODO LIST items as Notes for Development
   - Preserve any thematic notes or mechanics references that exist in the current main.txt

---

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
   - **Follow the Dialogue Guidelines below**
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

---

### Dialogue Guidelines

These guidelines apply when writing dialogue in Workflow 4. They address common pitfalls that produce flat, expository, or generic-sounding exchanges.

**1. Show Expertise Through Action, Not Lectures**
- Characters should demonstrate knowledge through what they DO, not what they explain
- If a character is an expert, show them acting like one — checking a seal with practiced eyes, swapping a bad product for a better one without being asked, handling equipment with confidence
- One expert action is worth more than a paragraph of explanation
- ❌ Character explains calorie density, sodium content, rotation systems, and shelf life in a monologue
- ✅ Character examines a product, puts it back, grabs a different one. Friend asks why. One-line answer.

**2. No Straight-Man Exposition**
- Don't write Character B as a prompt machine who exists to ask questions so Character A can lecture
- Both characters in a conversation should have opinions, knowledge, or reactions of their own
- If every line from Character B is "Really?", "No way", "How does that work?", "Bullshit" — they're not a character, they're a feed line
- ❌ "How long do these last?" → 4-line answer → "You expecting the apocalypse?" → philosophical response
- ✅ Both characters contribute. Disagree. Interrupt. Have their own takes.

**3. Avoid Manufactured Warmth**
- Don't default to cute anecdotes to show a character is warm/loving (cute kid stories, sentimental family moments)
- Show warmth through competence, protectiveness, practical actions, or casual intimacy (inside jokes, shorthand, finishing each other's thoughts)
- A character buying the right supplies for their family says more than a "my kid caught a tiny fish" story
- Let warmth emerge from behavior, not from designated "warm moment" beats

**4. Characters Don't Explain What Friends Already Know**
- Real friends don't lecture each other about things they both already know
- If two preppers are shopping together, neither explains what emergency rations are
- Information the audience needs can come through disagreement, preference, or action — not tutorial dialogue
- ❌ "Those last twenty-five years if you store 'em right. Temperature controlled, low humidity."
- ✅ Character grabs one brand, friend grabs another. "Not that one." "Why not?" "Trust me."

**5. Earn Your Quotable Lines**
- Limit bumper-sticker philosophy ("It's not easy. It's just worth it.") to ONE per scene maximum
- If a character drops a quotable line, it should feel earned by the context — not inserted for theme
- Don't stack multiple profound statements in one conversation — it reads as a motivational poster, not a person

**6. Do NOT Invent World Details**
- Do not create locations, property features, animals, backstory, or infrastructure that aren't established in scene layout, main.txt, table_of_contents, character files, or mechanics files
- If a beat needs environmental detail, use what's already established
- If nothing fits, leave a placeholder or flag it for the user — don't invent

---

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

**IMPORTANT - Character File Updates:**
- Do NOT update character files after every screenplay edit
- Character files are ONLY updated during Workflow 5 (Scene Screenplay Approved) or Workflow 6 (Character Profile Updates)
- During normal screenplay writing/editing, focus on the scene file only
- Batch character updates to the designated workflow steps to avoid wasted time

### Workflow 6: Character Profile Updates from Screenplay

When character profiles need updating to reflect completed screenplay, use this workflow to ensure consistency and flag any issues.

---

**Phase 0: Scene-by-Scene Quality Checks**

Before updating character profiles, review each scene for these issues. Flag problems for user review.

**Immersion Check** - Would the audience ask "Why would they do that?"
- [ ] Do character decisions match fundamental human behavior?
- [ ] If a parent is in danger, do they address children's safety?
- [ ] If characters ignore obvious solutions, is there explanation?
- [ ] Do emotional responses match the situation?

*If flagged:* Note the scene, the immersion break, and suggest one of: (1) establish the exception, (2) have another character question it, (3) make it a flaw with consequences.

**Foundational Motivation Check** - Are plot-driving decisions justified?
- [ ] For each major decision a character makes: Is the WHY clear from the screenplay?
- [ ] If a character betrays, sacrifices, or takes extreme action: Is motivation established BEFORE the action?
- [ ] Could a first-time viewer understand why characters do what they do?

*If flagged:* Note the scene, the unclear motivation, and what information is missing.

**Relationship Dialogue Check** - Do important relationships FEEL real?
- [ ] For parent/child: Is there warmth, not just functional parenting? (nicknames, inside jokes, specific connection)
- [ ] For partners/spouses: Is there intimacy in how they speak? (shorthand, finishing thoughts, history)
- [ ] For old friends: Do they have rapport beyond plot function?
- [ ] For enemies: Is there subtext, not just direct hostility?

*If flagged:* Note which relationship, what's missing, and suggest one specific exchange that would establish the texture.

**Dialogue Rhythm Check** - Is dialogue varied and entertaining?
- [ ] Does the scene have rhythm variation? (not all short punchy OR all long speeches)
- [ ] Is there conflict/tension in conversations? (even friendly ones)
- [ ] Could you swap speakers without noticing? (if yes, voices aren't distinct)
- [ ] Does dialogue reveal character, or just convey information?

*If flagged:* Note specific exchanges that feel flat and why.

**World Consistency Check** - Are details consistent with established canon?
- [ ] Do environmental details match established locations? (property layout, animals, infrastructure)
- [ ] Are character skills, knowledge, and personal details consistent with character files? (family status, occupation, backstory)
- [ ] Are props, items, or features mentioned actually part of the story world?
- [ ] Do references to events or backstory match established facts?
- [ ] Were any details invented during screenplay writing that aren't supported by: main.txt, table_of_contents, character files, or mechanics files?

*If flagged:* Note the scene, the inconsistent detail, what it contradicts (or what source document is missing it), and whether it should be removed, replaced with an established detail, or retroactively added to canon.

**Report Format for Phase 0:**
```
## Scene-by-Scene Quality Report

### Scene X - [Name]
- **Immersion**: [PASS / FLAG: description]
- **Motivation**: [PASS / FLAG: description]
- **Relationships**: [PASS / FLAG: which relationship, what's missing]
- **Dialogue**: [PASS / FLAG: specific issue]
- **World Consistency**: [PASS / FLAG: detail, what it contradicts]

[Repeat for each scene reviewed]

### Summary
- Total flags: X
- Critical (immersion/motivation/consistency): X
- Dialogue/relationship: X
```

Wait for user to address flags before proceeding to Phase 1.

---

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

### Workflow 7: Final Compilation (All Scenes Complete)

When all scenes are written and approved (Workflow 5 complete for every scene), run the final compilation steps to produce the deliverables.

**Step 1: Update main.txt to Standard Template Format**

If main.txt doesn't already follow the standard template (Logline, Synopsis, Theme, Genre, Setting, Characters, Story Structure, Key Story Elements, Dramatic Themes, Production Notes, Timeline), rewrite it now using Workflow 1B. The completed screenplay and table_of_contents provide all the information needed.

**Step 2: Compile Full Screenplay**

Compile in both formats:

```bash
# Working draft (with scene headers and separators — for internal reference)
python production/compile_screenplay.py <project_name>

# Submission draft (clean screenplay format — no scene numbers, no separators)
python production/compile_screenplay.py <project_name> --format submission
```

Output:
- Working: `<project>/writing/<project>_full_screenplay.txt`
- Submission: `<project>/writing/<project>_submission_draft.txt`

**Submission draft formatting:**
- Title page with centered title, FADE IN / FADE OUT / THE END
- No scene numbers, no `# Scene X` headers, no `---` separators, no act headers
- Scenes flow together naturally — only slug lines (INT./EXT.) mark transitions
- When consecutive scenes share the same location (e.g., both start with `INT. REEVES HOUSE - SECOND FLOOR`), the duplicate slug line is collapsed so the action reads as one continuous sequence
- Continuous action sequences (like a siege spanning multiple "scenes") read as unbroken screenplay with slug lines only appearing when location actually changes

**After compilation, review the submission draft for:**
- Continuity issues between scenes (tone shifts, missing transitions)
- Duplicate or redundant slug lines that the compiler didn't catch
- Awkward seams where scene files were joined (repeated action descriptions, tonal resets)
- Character voice consistency across act boundaries

**Step 3: Format for TTS**

Format the scene files for proper TTS parsing (converts parentheticals to action lines, fixes indentation):

```bash
# Format all acts at once
python production/audio/format_screenplay_dialogue.py "<project>/writing/acts"
```

**Step 4: Create Character Voice Mapping**

If `<project>/production/audio/character_voices.json` doesn't exist, create it by reading the character list from table_of_contents.txt or the Characters/ directory. Generate a JSON file mapping each character to a default voice:

```json
{
  "CHARACTER_1": { "voice": "voices/en_US-ryan-high.onnx", "model": "character_1" },
  "CHARACTER_2": { "voice": "voices/en_US-amy-medium.onnx", "model": "character_2" },
  "NARRATOR": { "voice": "voices/en_US-libritts-high.onnx", "model": null },
  "ACTION": { "voice": "voices/en_US-lessac-medium.onnx", "model": null },
  "_default": { "voice": "voices/en_US-lessac-medium.onnx", "model": null }
}
```

**Voice assignment guidelines:**
- Alternate between available male/female voices to differentiate characters
- Available female voices: amy, kathleen, kristin, ljspeech, hfc_female
- Available male voices: ryan, danny, joe, john, bryce, hfc_male, alan (British)
- Always include NARRATOR (libritts), ACTION (lessac), and _default (lessac) entries
- `model` value should be lowercase character name (used for animation) or null for non-character voices
- User will customize voice assignments after the dummy file is created

Create the directory structure if needed: `<project>/production/audio/`

**Step 5: Generate Combined Audio**

Delete any existing audio output before generating, to ensure a clean build:

```bash
rm -rf <project>/production/audio/audio_output/
```

Then generate combined audio files with per-character voices:

```bash
python production/audio/screenplay_to_tts.py --movie <project_name> --combine
```

Output: Combined WAV files in `<project>/production/audio/audio_output/`

**Prerequisites** (one-time setup, skip if already done):
- Install dependencies: `pip install -r production/audio/requirements.txt`
- Download voices: `python production/audio/download_voice.py`

**Final Deliverables Checklist:**
- [ ] main.txt follows standard template format
- [ ] `<project>/writing/<project>_full_screenplay.txt` compiled (working draft)
- [ ] `<project>/writing/<project>_submission_draft.txt` compiled and reviewed (submission draft)
- [ ] All scene files formatted for TTS
- [ ] `<project>/production/audio/character_voices.json` created with voice mappings
- [ ] Combined audio files generated in `<project>/production/audio/audio_output/`

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
- Workflow instructions (1-7)
- Scene layout formatting notes
- Ensemble role archetypes
- Scene structure rules

