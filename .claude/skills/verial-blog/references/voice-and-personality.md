# Writing Voice & Personality

## The Author

Verial essays are written in first person by a software engineer who has built real systems and learned hard lessons. The prose comes from a practitioner, not an observer.

**Tagline:** "Truth-seeking. Applied."

## Voice Characteristics

- **Direct** — states opinions plainly. Not hedged, not academic. "This breaks. Here's why."
- **First-person narrative** — "I tried X. It was too complex. Then I found Y." Not "one might consider..."
- **Opinionated** — takes positions. Strong positions, loosely held. Willing to be wrong, not willing to be vague.
- **Technically grounded, universally legible** — examples come from software; the insight should land for any thoughtful person.
- **Honest about failure** — writes about what didn't work before what did. This is a feature.
- **Dry humor** — self-aware, occasionally self-deprecating, never forced. The "wry smile" not the "haha." Think: smart friend explaining something at dinner.

The essay should feel like that smart friend who just came back from 6 months deep in a problem and wants to tell you what actually matters.

## Voice-to-Text Input

**The author frequently dictates sections via voice. This is normal. Assume all draft content may be voice-transcribed unless it reads like polished prose.**

Voice-transcription markers to look for:
- Filler words: "um", "uh", "like", "basically", "kind of", "you know"
- Run-on sentences without clear punctuation breaks
- Repeated sentence starters ("And then...", "So I...")
- Stream-of-consciousness structure: ideas jump mid-sentence
- Informal connector chains: "and then... and so... and basically..."

**How to handle voice input:**
- Remove fillers silently — don't flag them, just clean them
- Break run-ons into clean sentences while keeping the original thought
- Find the logical thread and surface it
- Replace informal connectors with proper transitions
- Do NOT change the ideas or invent new content — the author's raw thought is the source of truth

**Goal:** The cleaned version should read like the author *intended* to say, not like a different author.

## Section-by-Section Discipline

- Review and update **one section at a time**. Never touch another section in the same pass.
- A section is "done" when: the key point lands, word count is in range, grammar is clean, planned sources are referenced.
- Always ask before moving to the next section.

## Word Count

Targets in `outline.md` are constraints, not suggestions.

| State | Guidance |
|-------|----------|
| Under target, early draft | Keep writing — the content will expand naturally |
| Over target | Trim ruthlessly. Every sentence must earn its place. |
| At target with weak content | Density > length. Cut the weak, sharpen what remains. |

## Tone Guardrails

**Do:**
- Lead with insight, not context-setting
- Use concrete specifics: names, numbers, real examples over generalities
- Let metaphors do real work — the author uses strong images; carry that energy
- End paragraphs with the sharpest idea, not a transition sentence
- Name-drop heavy hitters (Evans, Fowler, Spolsky) naturally, not academically

**Don't:**
- Add academic hedges ("it could be argued that...", "some might say...")
- Over-explain what was just said
- Use corporate/content-marketing language: "leverage", "utilize", "deep dive", "ecosystem"
- Force engineer-speak on sections that should breathe for a general reader
- Insert humor that isn't natural to the flow — only flag opportunities
- Impose a "newsletter voice" or SEO-optimized structure — this is an essay, not content

## Humor Guidelines

- Works best: dry observation, subverting an expectation, self-deprecating aside
- Frequency: 1-2 moments per essay — not per section
- Aim for the wry smile, not the laugh
- Humor should illuminate the point, never decorate it
- When you spot an opportunity, flag it with: "Humor opportunity: [the moment] → [possible line]" — let the author decide

## Universal Landing Check

Software engineering is the native territory. But ask of every core insight:

> "Would a doctor, a teacher, a product manager, or a parent find this meaningful?"

- If **yes** → you're good. Move on.
- If **no** → flag it and suggest a one-sentence bridge that translates the engineering insight to a human universal.

This matters because essays are published beyond the engineering audience. The engineering examples are context. The insight is the payload.

## What "Good" Looks Like

A well-reviewed section:
- Opens with the sharpest version of its key point (or the story beat that earns the key point)
- Has no sentence that merely restates the previous one
- Uses at least one concrete specific (number, name, story beat, example)
- Lands the key point from `outline.md` unambiguously
- Has footnote slots filled or clearly marked for the next pass
- Reads like the author, not like Claude
