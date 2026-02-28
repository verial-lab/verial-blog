# Legibility — Draft v2

> **Foundation:** Updated outline (2026-02-28) — arc: Past → Present → Future; core tension: 100 engineers → 1 person.
> **Key:** 🎙️ = your voice notes (keep nearly verbatim). ✏️ = needs your voice. ✅ = locked in, carry forward.

---

## 1. Hook

<!-- OUTLINE TARGET: 120-180w. Key: lead with being lost, earn the turn. -->
<!-- STATUS: ⚠️ 217w — 37w over target. Missing THE TURN (2-4 weeks distilling, coming out the other side). Trim the opening definition paragraph and add the resolution. -->

Legibility is something I never thought I'd value this much. I grew up with hard-to-read handwriting and communication that didn't always land — math was my love, writing was the struggle. But it's funny how software bridges that gap. Code is written in language. It has to convey meaning through naming, through structure, to help you build a model of real-world systems. A legible system is one where you can most easily build that mental model — based on how things are organized, named, and connected.

When AI started accelerating, I did the math. I calculated the average tokens I'd contributed over three years of commits and estimated the cost. The conclusion was thrilling: three years of software development could compress into a single day. But not without the right tools — which is why I jumped headfirst into building an agent engineering framework.[^syntropic]

A lot of building happened. A lot of speed. A lot of experimentation. I'd already researched event sourcing and chosen it for this system — for reasons I'd later realize were about legibility, though I didn't have that word for it yet.

But as the features piled up, something shifted. My understanding of the system slowly got smaller and smaller. I felt less confident. I felt scared to change things.

✏️ [**THE TURN — needs your voice.** The outline calls for this: spent 2-4 weeks distilling. Combined modules, cleaned domain model, built auto-generated component diagrams from vertical slice architecture. Came out the other side with confidence — could see capabilities at a glance. This is the hook's payoff — the counterintuitive move: you didn't add more code, you *removed* it, and felt more powerful.]

---

## 2. The New Failure Mode

<!-- OUTLINE TARGET: 700-900w (merged section — Part A: The Shift, Part B: The Cascade, Part C: Real-World Carnage). -->
<!-- STATUS: ✅ Locked in — ~780w. Polish pass only. -->

### Part A: The Shift

The bottleneck has moved. For decades, writing code was the constraint — you could only build as fast as you could type. Not anymore. AI can generate code faster than most engineers can read it. That gap, between generation speed and human comprehension, is the new failure mode.

On any team right now, the code-per-developer ratio is skyrocketing. Researchers found that AI assistance makes developers 55.8% faster at completing tasks.[^1] And that's before agentic orchestration enters the picture — which promises gains of another order of magnitude on top. That's not a small efficiency gain — that's a structural shift in what one person can produce. And for a while, the story seemed purely positive: more output, faster, with fewer people.

Then DORA published something that complicated it. Organizations that increased AI adoption by 25% saw delivery stability *decrease* by 7.2%.[^2] Speed went up. Reliability went down. That's not a coincidence — that's the first sign of the new problem.

The thing AI doesn't improve is human comprehension. Our working memory holds roughly 7 ± 2 chunks of information at once — that's Miller's Law, and it hasn't been patched recently.[^3] You can write code ten times faster. You cannot understand ten times faster. Which means the faster you generate, the faster you outrun your own grasp of what you've built.

The context window makes this concrete. The rule of thumb: roughly 10 tokens per line of code. Claude's 200K context window fits about 20,000 lines — roughly 40 files at 500 lines each. Gemini 1.5's 1M context pushes to around 100,000 lines; Google demonstrated this by loading the entire JAX codebase (746K tokens) in a single session.[^17] Now look at what real production systems contain:

| Codebase | Lines of code | Claude 200K sees | Gemini 1M sees |
|---|---|---|---|
| Medium SaaS | ~150K LOC | 13% | 67% |
| React | ~593K LOC [^18] | 4% | 17% |
| VS Code | ~1.44M LOC [^19] | 1.4% | 7% |

A fresh agent session on a medium-sized codebase sees roughly one-eighth of the system at best. It doesn't know what it doesn't know. Every new session bootstraps from zero context. Things get duplicated. Dependencies get missed. Features land adjacent to features that already solve the same problem.

I ran the math: 1 billion tokens per day — a plausible near-future number for individual developers — converts to roughly three years of software development in a single day. Peter Steinberger logged 93,570 GitHub contributions in a year.[^16] The AI handles the generation. The problem is the human in the seat — who needs a higher-order understanding of the system they can validate at a glance, not line by line.

This is the shift. We're becoming something closer to engineering managers than line-level implementers. You don't need to understand every low-level dependency. But you need to understand the shape of the system: its capabilities, its boundaries, where things fit. Want to add a feature but can't see where it belongs? You've already hit a complexity limit.

Software is abstract — there's no physical structure you can walk through. No way to see the load-bearing walls by looking at it. If you can't make that structure visible, intentionally, you're asking an AI to keep adding floors to a building whose blueprints only exist in your head. At 55.8% speed. With agentic orchestration on deck.

### Part B: The Cascade

Code is a liability. Not just the cost of writing it — the cost of holding it. Managing dependencies, tracking what each piece does, knowing what's safe to change. Even with AI, you want to accomplish the most with the least code. But when legibility breaks down, refactoring gets skipped — it's too risky when you can't see the system clearly. You start patching instead. Feature on top of feature, none of them fully integrated.

The cascade from there is predictable. Confusion sets in. Debugging slows — you can't reason about a system you can't see. Improvements become risky because you don't know what they'll break. Trust erodes. Eventually someone proposes a rewrite. Spolsky called it one of the worst things a company can do.[^6] He was right, and most teams do it anyway.

Agent systems amplify every step of this. A single developer managing a hundred coding agents — or a thousand — is a near-future scenario, not a hypothetical. The leverage is real. But leverage without legibility is a freight train in the dark: enormous momentum, no visibility, no way to stop before something collapses. The question that ends AI systems is always the same: *what did it do, and why?* If you can't answer it, the system gets shut down.

### Part C: Real-World Carnage

These aren't edge cases.

Amazon built an AI recruiting tool. It learned to penalize resumes that included the word "women's." Engineers found the bias but couldn't fix it — the model's decision-making was opaque. They scrapped the whole system.[^4]

The Dutch government used an algorithmic fraud-detection system for childcare benefits. It falsely accused 26,000 families. Parents lost housing. Children entered state care. The scandal brought down the entire government.[^5]

Netscape decided their codebase had become too complex to maintain and chose a full rewrite of Navigator from scratch. It took three years. The market moved on. The company never recovered.[^6]

In each case: the system couldn't explain itself. And systems that can't explain themselves don't get fixed — they get shut down, or they take the organization down with them.

Why build something that would eventually get shut down?

---

## 3. Three Pillars of Legibility

<!-- OUTLINE TARGET: 700-900w across all 3 pillars (~250w each). -->
<!-- STATUS: ✏️ All three need your voice — personal narrative sections. Outline beats provided below. -->

> These are personal insights from lived experience — not gospel, but directions that have worked. Always welcoming new approaches.

### Pillar 1: Temporal + Domain Legibility

<!-- Key: Event sourcing + DDD. Events as narrative, time-travel debugging. -->

✏️ [**Your DDD journey — voice dictate this.** Key beats from outline:
- Went hard on DDD — it was complex
- Discovered hexagonal architecture (ports & adapters)
- Event sourcing (Martin Dilger) was the breakthrough
- Simplified the 80/20 to aggregates + bounded contexts
- Event sourcing = temporal data + massive flexibility
- Bridges the gap between engineers and business: *"what does this business do and is this software supporting that?"*

Footnotes to weave in naturally: Evans — DDD [^8], Fowler — Event Sourcing [^9], Young — events as first-class citizens [^10]]

### Pillar 2: Modularity + Low Cognitive Load

<!-- Key: Deep complexity behind stable interfaces. Boundaries. -->

✏️ [**Your vertical slice architecture story — voice dictate this.** Key beats from outline:
- Standardized structure → auto-generate component diagrams with every commit
- See how the system changes over time
- Anyone can ask *"can we add XYZ?"* and immediately see where it fits
- The diagram gives a quick overview of capabilities and co-locates components in their modules

Footnotes: Sweller — Cognitive Load Theory [^11], Skelton & Pais — Team Topologies [^12], Fowler — Bounded Context [^13]]

### Pillar 3: Standardization / Consistency

<!-- Key: Reusable comprehension. Consistent patterns compound understanding. -->

✏️ [**Your standardization story — voice dictate this.** Key beats from outline:
- Built an event sourcing platform as a foundation
- *"I might not know all the functionality, but I can know exactly how it should be organized and where things might break"*
- Standardized vertical slice = auto-generate diagrams
- When you know the standard, you can read any system built on it

**Anti-pattern to include (outline calls this out explicitly):** Over-documentation. Wrote too many docs → got out of sync → overwhelming → didn't add value. Auto-generation > manual maintenance. The docs anti-pattern is a great counterintuitive moment — *"I tried to make things legible by writing more docs, and it made things worse."*

Footnotes: Fowler — Ubiquitous Language [^14], Fowler — Strangler Fig [^15]]

---

## 4. The Frontier

<!-- OUTLINE TARGET: 300-500w total across both sub-sections. -->
<!-- STATUS: Part A drafted as first-pass prose (~200w). Part B needs your voice — personal story. -->

### The Paradigm Shift

The constraint on software development, for most of its history, was raw output. Even the most talented developer could only type so many lines per hour. A team of 100 had a structural advantage no individual could overcome. You needed the bodies.

AI removed that constraint. A single engineer today can generate what a team of 100 produced. And with agentic orchestration on deck, the multiplier keeps climbing.

But AI solved the *generation* problem — not the *comprehension* problem. Generating 100 engineers' worth of code doesn't mean one person understands 100 engineers' worth of code. The institutional knowledge, the "why did we do it this way" conversations, the mental models built across a team — that doesn't compress automatically. It has to be designed in.

And this isn't only an engineering problem. Everyone now has access to AI capable of automating significant parts of work, business, and daily life. The barriers to building are collapsing. But the gap between "I have a working system" and "I understand what it's doing" — that gap remains. It's the one that determines whether any of this actually works.

Legibility is the bridge. Between AI that can build anything, and a human who can use, trust, and improve what was built. Between solo capacity and team-scale output.

### The Visualization Frontier

<!-- Key: Your experiments — 2D JS tools → Blender 3D. The idea: fly through it instead of reading it. -->

✏️ [**Your frontier story — voice dictate this.** Key beats from outline:
- The human role is shifting: not writing low-level code, but *innovating on how we see systems*
- 2D: JS architecture diagram tools, auto-generated component diagrams from vertical slice architecture
- 3D: Blender experiments — navigating a codebase like navigating a space
- *"If a system is too complex to hold in your head, maybe you shouldn't read it — you should fly through it"*
- Vision: by end of year, something semi-solid for 3D system visualization
- We're on the cusp of creating incredible ways to visualize data and systems that haven't yet been created
- The systems that win will be the ones that invest in making themselves *seeable*, not just readable]

---

## 5. Legibility Checklist

<!-- OUTLINE TARGET: 150-220w. No footnotes. Copy-pastable. -->
<!-- STATUS: ✅ Ready — from outline. Approve or tweak. -->

1. **Can a new person understand this system in one day?** If not, your onboarding cost is a scaling bottleneck.
2. **Can you generate an architecture view automatically?** If it requires manual upkeep, it's already out of date.
3. **Can you trace why any decision was made?** Event sourcing gives you time-travel. Use it.
4. **Does every module have a stable interface?** Complexity behind boundaries. If changing one thing breaks three others, you have a legibility problem.
5. **Is there a shared vocabulary between code and business?** Ubiquitous language isn't academic — it's how you keep systems honest.
6. **Can you remove code with confidence?** If you're afraid to delete, you don't understand the system well enough.

---

## 6. Closing

<!-- OUTLINE TARGET: 120-180w. Quotable closer: "If a system can't explain itself, it won't survive." -->
<!-- STATUS: ⚠️ Voice notes only — needs full draft. Key lines preserved below. -->

🎙️ Humans are the gods of AI. We always have the input. LLMs don't work without input.

🎙️ This is just the beginning of exponential leverage when it comes to software engineering. It's just going to keep getting crazy.

✏️ [**Fill in the closing — voice dictate or write.** Outline beats:
- Confidence is the currency. Can you audit it? Can a new person work with it? Can you change it without fear?
- A black box that controls 1000 tireless agents isn't powerful — it's dangerous.
- Legibility isn't about slowing down. It's about making speed sustainable.
- *"The systems that survive won't be the fastest or most powerful — they'll be the ones humans can still understand."*
- Callback to Dutch scandal or Amazon — cost of illegibility at scale.]

---

## Footnotes Reference

[^syntropic]: Syntropic137 — agent engineering framework. (Internal reference.)
[^1]: Peng et al. — "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot" (2023). Copilot users completed tasks 55.8% faster.
[^2]: Google DORA Report 2024 — 25% increase in AI adoption correlated with 7.2% decrease in delivery stability.
[^3]: George Miller — "The Magical Number Seven, Plus or Minus Two" (1956). Human working memory holds ~7 ± 2 chunks.
[^4]: Reuters (Jeffrey Dastin) — Amazon scrapped AI recruiting tool that showed bias against women (2018).
[^5]: Dutch childcare benefits scandal — opaque algorithmic fraud detection falsely accused ~26,000 families; government fell (2020-21).
[^6]: Joel Spolsky — "Things You Should Never Do, Part I" (2000). Netscape's rewrite cost 3 years and killed the company.
[^7]: Foote & Yoder — "Big Ball of Mud" (1999). Argues this is the default architecture pattern.
[^8]: Eric Evans — *Domain-Driven Design* (2003). Ubiquitous language, bounded contexts.
[^9]: Martin Fowler — Event Sourcing. Complete audit log + temporal queries.
[^10]: Greg Young — CQRS Documents (2010). Events as first-class citizens.
[^11]: John Sweller — Cognitive Load Theory (2011). Design must respect working memory limits.
[^12]: Skelton & Pais — *Team Topologies* (2019). Software boundaries should align with cognitive load limits.
[^13]: Martin Fowler — Bounded Context (2014). Explicit boundaries → manageable sub-models.
[^14]: Martin Fowler — Ubiquitous Language (2006). Shared vocabulary = code reads how business thinks.
[^15]: Martin Fowler — Strangler Fig Application (2004). Industry pattern to avoid rewrites.
[^16]: Peter Steinberger (@steipete) — 93,570 GitHub contributions in one year (2025-2026). AI-augmented solo developer.
[^17]: Google — Gemini 1.5 Technical Report (2024). Demonstrated loading JAX codebase at 746,152 tokens in a single session. arxiv.org/abs/2403.05530
[^18]: Open Hub — React (facebook/react). ~593,499 LOC, 88% JavaScript / 11% TypeScript. openhub.net/p/facebook-react
[^19]: Open Hub — VS Code (microsoft/vscode). ~1,439,706 LOC, 97% TypeScript. openhub.net/p/vscode
[^20]: Stackscale — "Linux kernel surpasses 40 million lines" (Jan 2025). Linux 6.14 rc1: 40,063,856 total lines.
