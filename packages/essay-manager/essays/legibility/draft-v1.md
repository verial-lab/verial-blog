# Legibility — First Draft

> Each section is isolated for independent editing. Voice-transcribed material cleaned up, not rewritten.
> **Key:** 🎙️ = from your voice notes (lightly restructured, your words). ✏️ = needs your fill-in.

---

## 1. Hook

Legibility is something I never thought I'd value this much. I grew up with hard-to-read handwriting and communication that didn't always land — math was my love, writing was the struggle. But it's funny how software bridges that gap. Code is written in language. It has to convey meaning through naming, through structure, to help you build a model of real-world systems. A legible system is one where you can most easily build that mental model — based on how things are organized, named, and connected.

When AI started accelerating, I did the math. I calculated the average tokens I'd contributed over three years of commits and estimated the cost. The conclusion was thrilling: three years of software development could compress into a single day. But not without the right tools — which is why I jumped headfirst into building an agent engineering framework, recently branded Syntropic137.

A lot of building happened. A lot of speed. A lot of experimentation. I'd already researched event sourcing and chosen it for this system — for reasons I'd later realize were about legibility, though I didn't have that word for it yet.

But as the features piled up, something shifted. My understanding of the system slowly got smaller and smaller. I felt less confident. I felt scared to change things.

---

## 2. The New Failure Mode

<!-- OUTLINE TARGET: 250-350w. Core idea: AI generates code faster than humans can comprehend it. Bottleneck shifted from writing to understanding. -->

🎙️ On any team, the amount of code per developer is skyrocketing. We're moving into a point where we're having less developers managing orders of magnitude more code than was available before AI.

🎙️ Review time and planning — that seems to be the current bottleneck. And we're definitely not at a point yet where AI can be fully trusted. If you care about quality, you always want to have a quality and review check — whether it's CI/CD, AI review, preferably both.

🎙️ But there's still the limitation of human cognition. Even though AI is ridiculously fast, it doesn't automatically make our ability to learn faster and understand things faster improve. [^3 Miller — working memory ~7 ± 2 chunks]

🎙️ So at this point, managing complexity and legibility are arguably so much more important than they ever were before. Because if a single person is managing ten times the amount of code, but they can still only comprehend the same amount as they did before — it's pretty challenging.

✏️ [INSERT: The scale numbers — 1B tokens/day ≈ 3 years of human work. Reference Steinberger's 93,570 contributions/year as concrete evidence of what AI-augmented output looks like from a single developer.]

🎙️ Of course, it means we're moving up the stack. We're becoming more like engineering managers. You don't have to go down and know every single detail about all the low-level packages. But the system as a whole — the functionality — that's really key. The ability to see what's happening.

✏️ [INSERT: Peng et al. stat — Copilot users 55.8% faster [^1]. DORA 2024 — 25% more AI adoption → 7.2% decrease in delivery stability [^2]. The speed is real, but so is the instability.]

🎙️ And then there's the context problem. LLMs with a 200k context window can only really hold about fifty 500-line files at one time. That means it's likely missing so much of the system's code. Things get duplicated. Dependencies get missed.

🎙️ Planning is an interesting one. You want to add a feature, but you're not really sure where it fits in. If an AI gives you a plan, you kind of just have to trust it. And then that gets back to the problem of code rot — context is being missed, things are being duplicated.

---

## 3. What Breaks When Legibility Breaks

<!-- OUTLINE TARGET: 250-350w. The cascade: prediction fails → debugging stalls → improvement risky → transfer fails → trust collapses → shutdown. -->

🎙️ Legibility can come in the form of structural — when it comes to architecture and being able to understand the system, its functionality, its features. But it can also come in terms of operational as well, especially with agent systems. You hear about observability and traceability, and those are really key, especially for very powerful systems at scale.

🎙️ The question is: what did this system do, and why did it do it? Because you really have to think — the system itself will get shut down if you can't answer that.

🎙️ Code is definitely a liability. Writing a bunch of code, managing a bunch of code, managing dependencies — even with AI, you always want to try to do the most possible with the least amount of code. So when it comes to refactoring: if you're not clear on what features need to be part of it, and it's not clear where those pieces fit into the system through its legibility, then refactoring might be skipped altogether. And then you're basically patching on features.

🎙️ If we start to feel confused about a system, we start to feel non-confident. Debugging and iteration cycles start to get slower. Improvement is risky because it could create bugs and unexpected things — because it's not clear what happens. Trust starts to collapse over time. The code starts turning into a code rot scenario because you're scared to refactor. Improvement is risky. Trust is breaking down. And eventually the system gets shut down.

🎙️ **"It's basically like driving a freight train in the dark. You can feel the power. It's moving. But you don't see that the tunnel through the next mountain had collapsed. And you just keep chugging along at faster and faster speeds until everything is obliterated."**

✏️ [INSERT: Real-world examples that prove this cascade:
- Amazon scrapped its AI recruiting tool — opaque bias, couldn't fix it [^4]
- Dutch childcare scandal — opaque algorithm, 26,000 false accusations, government fell [^5]
- Netscape rewrote Navigator from scratch, cost 3 years, killed the company [^6]
- The Big Ball of Mud is the default, not the exception [^7]]

🎙️ For AI systems — they're extremely powerful. There's a lot of internal decision-making. How do you make all that work visible? How can you be absolutely confident that they're taking safe actions?

🎙️ Think about it: three years ago, a single developer was just writing their own code. Now we're moving into the possibility of a single developer managing a hundred or even a thousand coding agents. That completely changes the focus, the profession. The leverage is insanely obvious. But how does it land? It lands with legibility.

🎙️ I'm sure we all heard of the rewrite cycle — where complexity becomes hard to manage, and the idea comes up to rewrite a system. There's many people in this software world that say this should only happen in very, very rare scenarios. Do your best not to plan to rewrite a system from the start.

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
