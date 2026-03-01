# Legibility — First Draft

> Each section is isolated for independent editing. Voice-transcribed material cleaned up, not rewritten.
> **Key:** 🎙️ = from your voice notes (lightly restructured, your words). ✏️ = needs your fill-in.

---

## 1. Hook

Legibility is something I never thought I'd value this much. I grew up with hard-to-read handwriting and communication that didn't always land — math was my love, writing was the struggle. But it's funny how software bridges that gap. Code is written in language. It has to convey meaning through naming, through structure, to help you build a model of real-world systems. A legible system is one where you can most easily build that mental model — based on how things are organized, named, and connected.

When AI started accelerating, I did the math. I calculated the average tokens I'd contributed over three years of commits and estimated the cost. [NOTE to post (not yet made)] The conclusion was thrilling: three years of software development could compress into a single day. But not without the right tools — which is why I jumped headfirst into building an agent engineering framework (EDIT: add footnote to: Syntropic137, but don't shill much).

(needs a lot of work) A lot of building happened. A lot of speed. A lot of experimentation. I'd already researched event sourcing and chosen it for this system — for reasons I'd later realize were about legibility, though I didn't have that word for it yet.

But as the features piled up, something shifted. My understanding of the system slowly got smaller and smaller. I felt less confident. I felt scared to change things.

(VTT) It was when the systems that I built that got confusing and hard to restart. I noticed they would tend to stall and procrastinate on them, and eventually they would just get lost in a pile of unfinished projects. I mean, technically they were all, in a way, their own little experiments, which isn't a bad thing, but it did feel like lots of... It did feel like a fair amount of wasted effort and frustration knowing how I started with the excitement of some of these projects and then ending with just kind of loss and confusion. So I would say that's one of the first insights with the whole value of legibility, especially as we're scaling very high.

I mean, for me basically, you know, I would start to feel bad, feel frustrated, kind of have some self-doubt. But fortunately after enough of the frustration and, you know, some great meditation, just trying to sit with my feelings. And even though I'm feeling uncertain, eventually like some, the right book would come or the right idea. and I would just slowly make a little bit of progress towards feeling more confident in how I was architecting and just like feeling about like these more complex systems. And yeah, the high note is that today I do feel confident. I do feel confident about how to build systems that feel that we can better understand. And ultimately, the insights led me to the realization that if we're going to be able to, if we're basically going to be doing a single engineer or person's going to be doing the work of 100 software engineers from 2022, then we definitely have to take our ability to understand and feel confident about that system seriously. And that's where legibility comes in almost as a forefront. I would say legibility was important before up until 2022. But I would argue that now it's front and center, and you hear stuff about traceability, observability, and agentic systems, and those are all part of the purpose of legibility, which is to be able to understand and comprehend these powerful systems we're working on.

---

## 2. The New Failure Mode

<!-- OUTLINE TARGET: 500-700w (expanded — essay target now ~5,000w). Core idea: AI generates code faster than humans can comprehend it. Bottleneck shifted from writing to understanding. -->
<!-- STATUS: 📝 Draft written 2026-02-27 — needs author review + voice tuning. -->

The bottleneck has moved. For decades, writing code was the constraint — you could only build as fast as you could type. Not anymore. AI can generate code faster than most engineers can read it. That gap, between generation speed and human comprehension, is the new failure mode.

On any team right now, the code-per-developer ratio is skyrocketing. Researchers found that AI assistance makes developers 55.8% faster at completing tasks.[^1] (EDIT: and with agentic orchestration around the corner to offer orders of magnitude gains) That's not a small efficiency gain — that's a structural shift in what one person can produce. And for a while, the story seemed purely positive: more output, faster, with fewer people.

Then DORA published something that complicated it. Organizations that increased AI adoption by 25% saw delivery stability *decrease* by 7.2%.[^2] Speed went up. Reliability went down. That's not a coincidence — that's the first sign of the new problem.

The thing AI doesn't improve is human comprehension. Our working memory holds roughly 7 ± 2 chunks of information at once — that's Miller's Law, and it hasn't been patched recently.[^3] You can write code ten times faster. You cannot understand ten times faster. Which means the faster you generate, the faster you outrun your own grasp of what you've built.

(EDIT: So this section is, I kind of want to do it a little bit differently. And like the interesting thing is like this doesn't just apply to humans understanding systems, it also applies to LLM's understanding systems too. I you know the well while I have a software background this can also apply to any kind of any field where you're managing a lot of data and information and we're all going to be managing like any kind of knowledge work is going to be basically scaled to a lot and even non-non-knowledge work has knowledge behind it um any like hands-on work can have a whole knowledge base behind it so a little bit of a ramble. But the key here, though, is like whenever, how we design systems is also important because AI can generate, LLMs can generate a ton of code and documentation, writing, legal documents, accounting output. But then if they're trying to work on all of that information, how much they have a limited context window as well. So similar to humans, we have kind of a fixed context window. LLMs have the context window that's been fixed for the past year. Of course, as they get better, that context window will increase. So that's kind of something we have to think about is when we plug in an LLM into a system, Is there a distilled amount of information for the AI to even understand it? Is it clear how it's built? Because humans need to understand it, but so does AI to be able to get up to speed quickly and even move around. And hopefully the pieces are modular in a sense that they... Anyway, so the main key point here is that for this section is that it's important to keep in mind like what the AI is working on too because the context limit numbers below show that even a single LLM model can't understand an entire code base it can only understand pieces at a time)
. The rule of thumb practitioners use: roughly 10 tokens per line of code. Claude's 200K context window fits about 20,000 lines — roughly 40 files at 500 lines each. Gemini 1.5's 1M context pushes to around 100,000 lines. Now look at what real production systems contain:

| Codebase | Lines of code | Claude 200K sees | Gemini 1M sees |
|---|---|---|---|
| Small startup app | ~50K LOC | 40% | 100% |
| Medium SaaS | ~150K LOC | 13% | 67% |
| React | ~593K LOC | 4% | 17% |
| VS Code | ~1.44M LOC | 1.4% | 7% |
| Linux kernel | ~40M LOC | 0.05% | 0.25% |

A fresh agent session on a medium-sized codebase sees roughly one-eighth of the system at best. It doesn't know what it doesn't know. Every new session bootstraps from zero context. That's not carelessness — the agent genuinely can't see the existing implementation. So things get duplicated. Dependencies get missed. Features land adjacent to features that already solve the same problem.

Now scale that up. I (EDIT: I don't feel great about the "I" statements, more like, the math says) ran the math on where this is heading: within a few years, running 1 billion tokens per day will be within reach of individual developers. Converting that to code output — using my own commit history as a baseline — that's roughly three years of software development compressed into a single day. Peter Steinberger logged 93,570 GitHub contributions in a single year.[^16] That's what one AI-augmented developer already looks like at full tilt. The AI can handle the generation. The problem is the human in the seat.

Reviewing a day's output that represents three years of work is obviously impossible line by line. You need a higher-order understanding of the system — something you can validate at a glance. The moment you can't validate it, you've lost the ability to direct it. You're watching a dashboard and hoping the numbers make sense.

This is the shift. We're moving up the stack — becoming something closer to managers than hands on producers. You don't need to understand every low-level dependency. But you need to understand the shape of the system: its capabilities, its boundaries, where things fit. Want to add a feature but can't see where it belongs? You've already hit a complexity limit.

Think of it like a building. Software is abstract — there's no physical structure you can walk through, no way to see the load-bearing walls by looking at it. That structure has to be made intentional. And the systems that do this — that surface their own shape, that show you what they can do — those are the ones that survive being handed to a human orchestrator of agents.

(EDIT: This doesn't sound great) not a fan) A locomotive is one of the most powerful leverage devices ever built: one human, moving thousands of tonnes. The constraint on that system isn't the engine. It's the driver's ability to see the track. You have a buzzer that tells you when to stop at the next station. But if anything happens between stations — it's going to be bad. Speed without visibility isn't power. It's just a faster way to crash.

---

## 3. What Breaks When Legibility Breaks

<!-- OUTLINE TARGET: 250-350w. The cascade: prediction fails → debugging stalls → improvement risky → transfer fails → trust collapses → shutdown. -->

🎙️ Legibility can come in the form of structural — when it comes to architecture and being able to understand the system, its functionality, its features. But it can also come in terms of operational as well, especially with agent systems. You hear about observability and traceability, and those are really key, especially for very powerful systems at scale.

🎙️ The question is: what did this system do, and why did it do it? Because you really have to think — the system itself will get shut down if you can't answer that.

🎙️ Code is definitely a liability. Writing a bunch of code, managing a bunch of code, managing dependencies — even with AI, you always want to try to do the most possible with the least amount of code. So when it comes to refactoring: if you're not clear on what features need to be part of it, and it's not clear where those pieces fit into the system through its legibility, then refactoring might be skipped altogether. And then you're basically patching on features.

🎙️ If we start to feel confused about a system, we start to feel non-confident. Debugging and iteration cycles start to get slower. Improvement is risky because it could create bugs and unexpected things — because it's not clear what happens. Trust starts to collapse over time. The code starts turning into a code rot scenario because you're scared to refactor. Improvement is risky. Trust is breaking down. And eventually the system gets shut down.

🎙️ **"It's basically like driving a freight train in the dark. You can feel the power. It's moving. But you don't see that the tunnel through the next mountain had collapsed. And you just keep chugging along at faster and faster speeds until everything is obliterated."**

✏️ [INSERT: Real-world examples — this is where the evidence hits hardest:
- Amazon built an AI recruiting tool, discovered it had learned opaque gender bias, and *couldn't fix it* — they scrapped the whole system[^4]
- The Dutch government used an opaque fraud-detection algorithm that falsely accused 26,000 families — the scandal brought down the entire government[^5]
- Netscape rewrote Navigator from scratch. It cost three years and killed the company[^6]
- Foote & Yoder called it the Big Ball of Mud — and argued it's the *default* architecture, not the exception[^7]]

🎙️ For AI systems — they're extremely powerful. There's a lot of internal decision-making. How do you make all that work visible? How can you be absolutely confident that they're taking safe actions?

🎙️ Think about it: three years ago, a single developer was just writing their own code. Now we're moving into the possibility of a single developer managing a hundred or even a thousand coding agents. That completely changes the focus, the profession. The leverage is insanely obvious. But how does it land? It lands with legibility.

🎙️ I'm sure we all heard of the rewrite cycle — where complexity becomes hard to manage, and the idea comes up to rewrite a system. There's many people in this software world that say this should only happen in very, very rare scenarios. Do your best not to plan to rewrite a system from the start.

======
MY VOICE DRAFT V0



---

## 4. The 3 Pillars

<!-- OUTLINE TARGET: 700-900w across all 3 pillars. -->

### Pillar 1: Temporal + Domain Legibility (~250w)

<!-- Core: Event sourcing + DDD. Events as narrative, time-travel debugging. -->
<!-- Your DDD journey: went hard on DDD → complex → hexagonal architecture → event sourcing breakthrough -->

✏️ [Your DDD journey story — this is personal narrative, needs your voice. Key beats from outline:
- Went hard on DDD, it was complex
- Discovered hexagonal architecture (ports & adapters)
- Event sourcing (Martin Dilger) was the breakthrough
- Simplified the 80/20 to aggregates + bounded contexts
- Event sourcing provides temporal data + massive flexibility
- Bridges the gap between engineers and business — "what does this business do and is this software supporting that?"

Footnotes: Evans — DDD [^8], Fowler — Event Sourcing [^9], Young — events as first-class citizens [^10]]

### Pillar 2: Modularity + Low Cognitive Load (~250w)

<!-- Core: Deep complexity behind stable interfaces. Boundaries. -->
<!-- Your story: Vertical slice architecture → auto-generated component diagrams with every commit -->

✏️ [Your vertical slice story. Key beats from outline:
- Standardized structure so you can auto-generate component diagrams with every commit
- See how the system changes over time
- Anyone can ask "can we add XYZ?" and immediately see where it fits
- The diagram gives a quick overview of capabilities and co-locates components

Footnotes: Sweller — Cognitive Load Theory [^11], Skelton & Pais — Team Topologies [^12], Fowler — Bounded Context [^13]]

### Pillar 3: Standardization / Consistency (~250w)

<!-- Core: Reusable comprehension. Consistent patterns compound understanding. -->
<!-- Your story: Event sourcing platform as foundation. Understanding compounds across systems. -->

✏️ [Your standardization story. Key beats from outline:
- Built an event sourcing platform as a foundation
- "I might not know all the functionality, but I can know exactly how it should be organized and where things might break"
- Standardized vertical slice = can auto-generate diagrams
- When you know the standard, you can read any system built on it

**Anti-pattern to include:** Over-documentation. Wrote too many docs → got out of sync → overwhelming → didn't add value. Auto-generation > manual maintenance.

Footnotes: Fowler — Ubiquitous Language [^14], Fowler — Strangler Fig [^15]]

---

## 5. Legibility Checklist

<!-- OUTLINE TARGET: 150-220w. 6 copy-pastable bullets. No footnotes. -->

✏️ [These are ready from the outline — just need your voice/approval:]

1. **Can a new person understand this system in one day?** If not, your onboarding cost is a scaling bottleneck.
2. **Can you generate an architecture view automatically?** If it requires manual upkeep, it's already out of date.
3. **Can you trace why any decision was made?** Event sourcing gives you time-travel. Use it.
4. **Does every module have a stable interface?** Complexity behind boundaries. If changing one thing breaks three others, you have a legibility problem.
5. **Is there a shared vocabulary between code and business?** Ubiquitous language isn't academic — it's how you keep systems honest.
6. **Can you remove code with confidence?** If you're afraid to delete, you don't understand the system well enough.

---

## 6. Closing

<!-- OUTLINE TARGET: 120-180w. "If a system can't explain itself, it won't survive." -->

🎙️ Humans are the gods of AI. We always have the input. LLMs don't work without input.

🎙️ This is just the beginning of exponential leverage when it comes to software engineering. It's just going to keep getting crazy.

✏️ [Fill in the closing beats from outline:
- Confidence is the currency. Can you audit it? Can a new person work with it? Can you change it without fear?
- A black box that controls 1000 tireless agents isn't powerful — it's dangerous.
- Legibility isn't about slowing down. It's about making speed sustainable.
- "The systems that survive won't be the fastest or most powerful — they'll be the ones humans can still understand."
- Maybe callback to Dutch scandal or Amazon as cost of illegibility at scale.]

---

## Footnotes Reference

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
