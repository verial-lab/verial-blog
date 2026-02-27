# /review-draft — Essay Section Review

Review one section of an in-progress essay draft. Works **section by section** — never reviews the whole essay at once. Designed for voice-dictated drafts cleaned up into essay form.

## Arguments

`$ARGUMENTS` format: `<slug> [section-number]`

**Examples:**
- `/review-draft legibility 1` — review the Hook
- `/review-draft legibility 2` — review The New Failure Mode
- `/review-draft legibility` — show section list and ask which to review

---

## Workflow

<workflow>

<step id="locate-draft">

### 1. Locate Draft

Essay directory: `packages/essay-manager/essays/<slug>/`

Find the draft file in this priority order:
1. Latest versioned draft — look for `draft-v*.md` files and pick the highest version number (e.g. `draft-v2.md` over `draft-v1.md`)
2. Fall back to `essay.md`

Tell the user: which file you're reading and which version it is.

Also read:
- `outline.md` — the master plan, word counts, key points, planned footnotes
- `sources.json` — research sources with section tags
- `status.json` — current section completion state

</step>

<step id="select-section">

### 2. Select Section

If a section number was provided in `$ARGUMENTS`, proceed immediately.

If not, list all sections from the outline with:
- Section number and title
- Word count target (from outline)
- Current status (from `status.json`)

Then ask the user which section to review. **Wait for their response before continuing.**

Focus exclusively on the selected section — do not read or comment on other sections.

</step>

<step id="detect-voice">

### 3. Detect Voice-to-Text Input

Read the section content. Check for voice-transcription markers:
- Run-on sentences without punctuation breaks
- Filler words: "um", "uh", "like", "basically", "kind of", "you know"
- Stream-of-consciousness: ideas jump without clear transitions
- Repeated sentence starters ("And then...", "So then...", "I think...")
- Informal connector chains: "and then... and then... and so..."
- First-person narrative that reads like spoken thought mid-stream

If 3 or more markers are present, flag it clearly: **"Input detected as voice transcription."**

Then use the Task tool to launch a `general-purpose` sub-agent with this prompt:

> You are a speech and communication coach. Read the following voice-transcribed text and give practical coaching feedback. Identify: (1) the core message in one sentence — what is the author actually trying to say? (2) what's already clear and should be preserved verbatim — quote specific lines, (3) 2-3 specific, actionable tips to communicate this idea more clearly and influentially next time the author speaks it. Also note: what ideas belong in this section vs. what should be moved or cut entirely. Be direct — the author wants to improve their spoken communication so ideas land harder. Do not rewrite the content. Just coach the speaker.
>
> Text: [paste full section content here]

Show the sub-agent's coaching feedback in a clearly labeled block:

---
**Speech Coaching Feedback**
[sub-agent output here]
---

Then **save the coaching notes** to `packages/essay-manager/essays/<slug>/reviews/voice-coaching-section-<N>.md` (create the `reviews/` directory if needed):

```markdown
# Voice Coaching — Section <N>: <Title>

_Captured: <today's date>_

## Core Message (as spoken)
[one sentence]

## Lines to Keep (Nearly Verbatim)
[quoted lines with brief notes]

## Three Coaching Tips
1. ...
2. ...
3. ...

## What Belongs Here vs. What to Move
**Keep:** ...
**Move or cut:** ...
```

Confirm to the user that the notes were saved with the file path.

</step>

<step id="outline-alignment">

### 4. Outline Alignment Check

Read the corresponding section block in `outline.md`. Extract:
- **Key point** — the one idea this section must land
- **Word count target** — the range (e.g. 120-180w)
- **Planned footnotes** — which sources the outline calls for
- **Stickiness notes** — Story / Concrete / Unexpected / Emotional markers

Compare the draft content to these. Answer:
- Does the section land the key point? (yes / partially / no)
- Which stickiness markers are present? Which are missing?
- Is there content in the draft NOT in the outline? Flag it as a potential addition, not an error — the author may be discovering something new.

</step>

<step id="word-count">

### 5. Word Count

Count the words in the current section draft (exclude headings, HTML comments, and TODO markers).

Report clearly: **current / target range**

Examples:
- `87 / 120-180w — 33w under target (keep writing)`
- `210 / 120-180w — 30w over target (trim needed)`
- `155 / 120-180w — on target`

</step>

<step id="sources">

### 6. Source & Footnote Review

From `sources.json`, identify sources tagged for this section.
From `outline.md`, note which footnote slots are planned for this section.

Flag:
- Planned footnotes from the outline that haven't been inserted yet
- Sources in `sources.json` that belong here but aren't referenced
- Claims in the draft that sound like facts and need sourcing (fact-check risk)
- Claims that could be strengthened by a specific stat or citation from the planned sources

</step>

<step id="voice-grammar">

### 7. Voice & Grammar Review

Read the section with these rules:

**Preserve the voice** — direct, first-person, opinionated, slightly dry. Not academic, not content-marketing. Do not rewrite it into something polished and generic.

**Fix grammar** — flag punctuation errors, sentence fragments (unintentional), subject-verb agreement issues, unclear pronoun references.

**Flag, don't rewrite** — for each problem, quote the original line, name the issue, suggest a fix. Let the author decide.

**Humor** — note 1-2 places where a dry observation or self-aware aside would land naturally. Only flag opportunities — never insert jokes.

**Universal landing check** — software engineering examples are fine. But for each core insight, ask: would a doctor, teacher, or parent find this meaningful without an engineering background? If not, flag it and suggest a one-sentence bridge.

**Density check** — does every sentence earn its place? Flag sentences that restate what was just said or transition without adding value.

</step>

<step id="recommendations">

### 8. Recommendations

Output a structured review:

---

**Section [N]: [Title]**

**Status:** [voice draft / partial draft / solid draft / complete]
**Word count:** [X / target range]
**Outline alignment:** [on-track / missing key point / off-outline]

**What's working:**
(2-4 specific things — quote the line if it's strong)

**Recommended edits:**
(Numbered list. Quote the problem sentence → name the issue → suggest the fix. Be specific, not general.)

**Missing from outline:**
(What the outline calls for that isn't in the draft yet)

**Source slots to fill:**
(Which footnotes to add, and suggested placement)

**Optional additions:**
(Content in the draft that wasn't planned but could strengthen it — flag for author's call)

---

Then ask: **"Ready to work on any of these, or move to the next section?"**

</step>

</workflow>

---

## Guiding Principles

- **One section at a time.** Never comment on or update other sections in the same pass.
- **Recommend, don't rewrite.** Show the problem and a possible fix — the author decides.
- **Voice-first.** The author often dictates. The goal is to help them say what they meant, not say something different.
- **Outline is the contract.** The outline was designed intentionally. Suggest changes only as deliberate departures, clearly flagged.
- **Word count discipline.** Targets in the outline are binding. Don't let sections balloon.
- **Back and forth.** End every review by asking what to do next. This is collaborative, not a one-shot rewrite.

See also: `.claude/skills/verial-blog/references/voice-and-personality.md` for the full author voice guidelines.
