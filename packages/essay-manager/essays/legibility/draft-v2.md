# Legibility — Draft v2

> **Foundation:** Updated outline (2026-02-28) — arc: Past → Present → Future; core tension: 100 engineers → 1 person.
> **Key:** 🎙️ = your voice notes (keep nearly verbatim). ✏️ = needs your voice. ✅ = locked in, carry forward.

---

## 1. Hook

<!-- OUTLINE TARGET: 120-180w. Key: lead with being lost, earn the turn. -->
<!-- STATUS: 🎙️ VTT draft — full section present including the turn. Needs tightening: ~350w → 120-180w. -->

Legibility is something I never thought I'd value this much. I grew up with hard-to-read handwriting and communication that didn't always land — math was my love, writing was the struggle. But it's funny how software bridges that gap. Code is written in language. It has to convey meaning through naming, through structure, to help you build a model of real-world systems. A legible system is one where you can most easily build that mental model — based on how things are organized, named, and connected.

When AI started accelerating, I did the math. I calculated the average tokens I'd contributed over three years of commits and estimated the cost. <!-- [NOTE: link to post — not yet published] --> The conclusion was thrilling: three years of software development could compress into a single day. But not without the right tools — which is why I jumped headfirst into building an agent engineering framework.[^syntropic]

<!-- (needs a lot of work) -->
A lot of building happened. A lot of speed. A lot of experimentation. I'd already researched event sourcing and chosen it for this system — for reasons I'd later realize were about legibility, though I didn't have that word for it yet.

But as the features piled up, something shifted. My understanding of the system slowly got smaller and smaller. I felt less confident. I felt scared to change things.

🎙️ It was when the systems that I built got confusing and hard to restart. I noticed they would tend to stall and procrastinate on them, and eventually they would just get lost in a pile of unfinished projects. I mean, technically they were all, in a way, their own little experiments, which isn't a bad thing, but it did feel like lots of... It did feel like a fair amount of wasted effort and frustration knowing how I started with the excitement of some of these projects and then ending with just kind of loss and confusion. So I would say that's one of the first insights with the whole value of legibility, especially as we're scaling very high.

🎙️ I mean, for me basically, you know, I would start to feel bad, feel frustrated, kind of have some self-doubt. But fortunately after enough of the frustration and, you know, some great meditation, just trying to sit with my feelings. And even though I'm feeling uncertain, eventually like some, the right book would come or the right idea. and I would just slowly make a little bit of progress towards feeling more confident in how I was architecting and just like feeling about like these more complex systems. And yeah, the high note is that today I do feel confident. I do feel confident about how to build systems that feel that we can better understand. And ultimately, the insights led me to the realization that if we're going to be able to, if we're basically going to be doing a single engineer or person's going to be doing the work of 100 software engineers from 2022, then we definitely have to take our ability to understand and feel confident about that system seriously. And that's where legibility comes in almost as a forefront. I would say legibility was important before up until 2022. But I would argue that now it's front and center, and you hear stuff about traceability, observability, and agentic systems, and those are all part of the purpose of legibility, which is to be able to understand and comprehend these powerful systems we're working on.

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

<!-- OUTLINE TARGET: 700-900w across all 3 insights (~250w each). -->
<!-- STATUS: 🎙️ All three have VTT content — needs coaching pass + distillation before clean prose. -->
<!-- NOTE: Outline reshuffled 2026-02-28 — docs anti-pattern now in Insight 2 (cognitive load), VSA now centerpiece of Insight 3 (standardization). -->

> These are personal insights from lived experience — not gospel, but directions that have worked. Always welcoming new approaches.

### Insight 1: Temporal + Domain Legibility

<!-- Key: DDD → hexagonal → event sourcing. Events as narrative, time-travel, business-software bridge. -->
<!-- Footnotes: Evans [^8], Fowler Event Sourcing [^9], Young [^10] -->

🎙️ When GPT was released and I started doing more full system builds, there was so much new stuff to learn. Coming from a more specialized role, I'd build a project and then come back to it and just feel lost, confused, frustrated.

🎙️ That confusion led me to software books, architecture books. A great journey. That led me to Domain-Driven Design — the big blue book by Eric Evans — and I thought it was beautiful.

🎙️ What I love about DDD: it introduced legibility into my mental model of software engineering for one of the first times. We always think about making data structures that model the world, things in our database structure — but that was always a technical concern not easily conveyed to someone in a business role. DDD really solved the problem of having a clear definition, specifically the ubiquitous language — basically a legibility glossary for a software system. It created this Venn diagram overlap that's a bridge between business and technical. Everyone on the team — technical and non-technical — can see the purpose of the software. So DDD was a huge legibility insight: what is the purpose of this software, and can everyone understand it?

🎙️ But putting DDD into practice was challenging. Complex. A lot of little ideas. It was kind of a blocker for over a year. Then I read *Implementing Domain-Driven Design* — that introduced me to hexagonal architecture (ports and adapters), another great insight.

🎙️ And then I heard about event sourcing — an evolution of DDD ideas. Martin Dilger's work was one of the biggest, most exciting insights I found. It had a mix of software design, architecture, and a paradigm shift in how it handles data. It also introduced vertical slice architecture — another legibility improvement.

🎙️ In normal software, you store all data in a table — think of it like Excel. Event sourcing stores an *event of what happened* instead. The state is rebuilt from the event stream. The event store is the single source of truth. It's a complete paradigm shift. And the beautiful thing: you now have a history of the system. Temporal legibility. You can replay from the very first event. Time-travel debugging. Massive flexibility. And incredibly valuable data — the raw material for intelligence in the AI era.

🎙️ I decided to build Syntropic137 using event sourcing so we can always replay the history and create feedback loops into continual improvement.[^syntropic]

### Insight 2: Modularity + Low Cognitive Load

<!-- Key: Wrap deep complexity behind stable interfaces. Docs anti-pattern. Cognitive load = the measure. -->
<!-- Footnotes: Sweller [^11], Skelton & Pais [^12], Fowler Bounded Context [^13] -->
<!-- Conway's Law mention — needs source: "the design of an organization will produce software architectures with similar designs because of communication patterns" -->

🎙️ Modularity is an idea that comes up a lot in many philosophies. In manufacturing, a modular device is great because you can swap out standardized pieces. The best example: a plug on a wall. Everyone knows the standard. No communication needed about what size the plug should be. People in parallel are building devices that all operate on the same interface — something we take for granted, but a great concrete example of what modularity is and why it matters.

🎙️ Think about the difference between a whiteboard and a checkerboard. A whiteboard: a system where everything's mixed together, hard to understand where things fit. A checkerboard: imagine each square as an isolated module, working together to make the whole board work. It at least gives you somewhere to dive in, see boundaries, see by their shade what purpose they serve.

🎙️ The real power of modularity for legibility: you can put a complex algorithm or process inside its own modular boundary and wrap it behind a much simpler interface. A thousand-line function behind a single "call this function with this input, return this output." You're absolutely reducing cognitive load. And that can go up many levels. Like a car — all the complex interactions under the hood to maintain oxygen, fuel, battery — yet all you need is a key, a hand, a foot, a wheel. That's what a module offers: low cognitive load behind a complex system.

🎙️ The other strength: modules can be tested in isolation. You know you have a stable foundation to build upon and compose upon. You don't need to understand the internals to trust the system — you just need to trust the contract.

🎙️ **The docs anti-pattern:** I tried to make things legible by writing more docs. Tons of docs. And it made things *worse*. They got out of sync. They became overwhelming. They actually increased cognitive load instead of reducing it. The lesson: complex systems need their model to be clear enough that the code itself is comprehensible. Docs should be discoverable and actionable, not exhaustive. A diagram is worth a thousand words — maybe a video a million. Auto-generation beats manual maintenance, always.

🎙️ Key principle: always consider human cognition. Reduce cognitive load. Make answers discoverable and actionable. This is powerful for humans wanting trust and confidence — and it's token-efficient for AI too.

### Insight 3: Standardization / Consistency

<!-- Key: Reusable comprehension. Consistent patterns compound understanding. VSA is the centerpiece. -->
<!-- Footnotes: Fowler Ubiquitous Language [^14], Fowler Strangler Fig [^15] -->

🎙️ Standardization is interesting because there's a part of me that resists it — the idea of "ordinary" as constricting, as not the heroic life I envisioned. But standardization, ordinary, in a way has real power: it provides stability and freedom even when it feels constricting. The best example: roads. Arguably across the entire world, roads are well standardized. Drive anywhere in the United States — same signs, same exits — and you feel at home. The cognitive load of being somewhere new drops dramatically.

🎙️ The balance: we need creative, novel ways to build innovations. But standards provide power up until the point where there's something better worth switching to. That's maybe why the Lindy effect exists — switching costs energy. And standards reduce cognitive load for everyone, including people who've never met before.

🎙️ In code, standardization is really powerful because you design the idea and the standard once, then scale it across all your systems. Things like HTTP or TCP are ubiquitous standards every system integrates with — enabling a decentralized global internet. In an isolated system, if you're not rebuilding things from scratch, standardize them. Evolve the standard, not each individual tool over time.

🎙️ Once you have a standard, you know it's going to work the same way for all your repos. You reduce cognitive load. You provide standardized modularity across all your systems. And that allows you to scale understanding to more and more codebases — knowing that you're using standardized pieces and understanding them.

🎙️ **VSA as the centerpiece:** Vertical slice architecture is where this gets concrete for me. Standardized structure means you can auto-generate component diagrams with every commit. You can see how the system changes over time. Anyone can ask "can we add XYZ?" and immediately see where it fits. The diagram gives a quick overview of capabilities and co-locates components in their modules. That's a standardization win — the structure is consistent, so comprehension *transfers*. Back-of-the-napkin math: that could be another order of magnitude of legibility gain — able to manage 100x of the software being done in 2022.

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
