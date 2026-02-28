# Legibility — Draft v2

> **Status:** Full draft — all sections written. ~2,350w / 3,000-5,000w target. Sections 4B and 6 are first-pass prose; your voice will want to come through on both.

---

## 1. Hook

Legibility isn't something I ever thought I'd care about this much. I grew up drawn to math, not language. But code bridges that gap — it conveys meaning through naming, structure, and organization. A legible system is one where you can build an accurate mental model quickly, based on how things are connected.

When AI started accelerating, I did the math. Three years of software development compressing into a single day. I jumped headfirst into building an agent engineering framework.[^syntropic] <!-- [NOTE: link to post when published] --> Fast. A lot of code.

But as the features piled up, something shifted. My understanding of the system got smaller and smaller. I felt less confident. Scared to change things. Projects I'd started with excitement stalled out — and eventually just got lost. A fair amount of wasted effort, looking back.

So I stopped adding and started distilling. Combined modules, cleaned the domain model, built auto-generated diagrams from vertical slice architecture. Came out the other side able to see the whole system — and confident again.

That's legibility. And as AI pushes one person to do the work of a hundred, getting it right has never mattered more.

---

## 2. The New Failure Mode

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

Code is a liability. Not just the cost of writing it — the cost of holding it. Managing dependencies, tracking what each piece does, knowing what's safe to change. Even with AI, you want to accomplish the most with the least code. But when legibility breaks down, refactoring gets skipped — it's too risky when you can't see the system clearly. You start patching instead. Feature on top of feature, none of them fully integrated — what Foote and Yoder called the Big Ball of Mud.[^7]

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

> These are personal insights from lived experience — not gospel, but directions that have worked. Always welcoming new approaches.

### Insight 1: Temporal + Domain Legibility

Software systems need to be legible in two directions: across teams and across time.

I didn't have words for that when GPT was released and I started doing full system builds. Coming from a more specialized role, I'd build a project, come back to it, and feel completely lost. That frustration sent me to software books, architecture books — a genuinely great journey. The one that changed everything was *Domain-Driven Design* by Eric Evans.[^8]

What DDD gave me: a shared language. Before DDD, system design was a technical concern — data structures modeled in databases, invisible to anyone outside engineering. DDD introduced the ubiquitous language — basically a legibility glossary for a software system.[^14] It created this Venn diagram overlap that's a bridge between business and technical. Everyone on the team can see the purpose of the software. Domain legibility: the system speaks the language of the problem it solves.

But the real breakthrough came with event sourcing. In normal software, you store the current state — like a cell in an Excel sheet. Event sourcing stores *what happened* instead. The event store is the single source of truth.[^9] And the beautiful thing: you now have a history of the system. Temporal legibility. You can replay from the very first event. Time-travel debugging. Massive flexibility. And data that becomes raw material for AI-powered improvement.[^10]

I built Syntropic137 on event sourcing for exactly this reason: the system can always explain what it did, and we can build feedback loops into continual improvement.[^syntropic]

### Insight 2: Modularity + Low Cognitive Load

The cognitive load of a system is the measure of its legibility. If understanding it requires holding too many things in your head at once, you can't trust it, can't change it safely, and can't hand it to anyone else.[^11]

There's a reason software boundaries tend to mirror organizational structure: as Conway observed, organizations are constrained to produce systems that copy their own communication patterns.[^conway] Which means getting your module boundaries right is as much a team design question as a technical one.[^12]

Think about the difference between a whiteboard and a checkerboard. A whiteboard: a system where everything's mixed together, hard to understand where things fit. A checkerboard: imagine each square as an isolated module, working together to make the whole board work. It gives you somewhere to dive in, see boundaries, understand what purpose each piece serves.

The deeper power: put a complex algorithm inside its own boundary and wrap it behind a much simpler interface. A thousand-line function behind a single call. That can go up many levels. Like a car — all the complex interactions under the hood to maintain oxygen, fuel, battery — yet all you need is a key, a hand, a foot, a wheel. That's what a module offers: low cognitive load behind a complex system.[^13] And modules testable in isolation earn trust — you don't need to understand the internals, just trust the contract.

I tried to make things legible by writing more docs. Tons of docs. And it made things *worse*. They got out of sync. They became overwhelming. They actually increased cognitive load instead of reducing it. The lesson: a complex system needs its model to be clear enough that the code itself is comprehensible. Docs should be discoverable and actionable, not exhaustive. Auto-generated diagrams beat manually maintained documentation every time.

### Insight 3: Standardization / Consistency

Standardization used to feel constraining to me — ordinary, not novel. But ordinary has a superpower: it eliminates the cognitive overhead of decision-making across every system that uses it.

The proof is everywhere. Drive anywhere in the United States — same signs, same exits — and you feel at home. The cognitive load of being somewhere new drops dramatically. HTTP and TCP are the same idea at internet scale: ubiquitous standards every system integrates with, enabling a decentralized global network. The standard was designed once. It scaled to billions.

In code, this compounds in a way that matters enormously for the AI era: understand the standard once, and you can read any system built on it. Not just faster — fundamentally differently. You can manage ten codebases with the cognitive overhead of one, because the structure transfers. Every new repo starts at partial comprehension instead of zero.

Vertical slice architecture is where this gets concrete for me. Standardized module structure means you can auto-generate component diagrams with every commit. You can see how the system changes over time. Anyone can ask "can we add XYZ?" and immediately see where it fits. The diagram gives a quick overview of capabilities and co-locates components in their modules. That's a standardization win — the structure is consistent, so comprehension *transfers*. And when AI is generating the code, a consistent structure is also how one human navigates a hundred simultaneous agents.

---

## 4. The Frontier

### The Paradigm Shift

The constraint on software development, for most of its history, was raw output. Even the most talented developer could only type so many lines per hour. A team of 100 had a structural advantage no individual could overcome. You needed the bodies.

AI removed that constraint. A single engineer today can generate what a team of 100 produced. And with agentic orchestration on deck, the multiplier keeps climbing.

But AI solved the *generation* problem — not the *comprehension* problem. Generating 100 engineers' worth of code doesn't mean one person understands 100 engineers' worth of code. The institutional knowledge, the "why did we do it this way" conversations, the mental models built across a team — that doesn't compress automatically. It has to be designed in.

And this isn't only an engineering problem. Everyone now has access to AI capable of automating significant parts of work, business, and daily life. The barriers to building are collapsing. But the gap between "I have a working system" and "I understand what it's doing" — that gap remains. It's the one that determines whether any of this actually works.

Legibility is the bridge. Between AI that can build anything, and a human who can use, trust, and improve what was built. Between solo capacity and team-scale output.

### The Visualization Frontier

The human role isn't disappearing — it's shifting. From writing low-level code to something harder: understanding what was built, navigating it, and deciding what comes next.

The tools for that are still primitive. We read code in text editors — flat files, no spatial sense, no way to feel the shape of a large system. As systems scale to thousands of services and agents, those flat representations break down. You can't read your way through a system that large. You have to see it.

I've been experimenting with this. First with 2D architecture diagram tools in JavaScript — auto-generated component maps from vertical slice architecture that update with every commit. A living picture of a system, not a document written once and immediately out of date.

Now I'm getting into Blender. The hypothesis: a codebase too complex to hold in your head might be something you can *fly through*. Navigate it like a space, not a document. See clusters, boundaries, anomalies — the things invisible in flat text.

By end of year, I want something semi-solid for 3D system visualization. We're on the cusp of ways to see and understand systems that haven't been invented yet. The systems that win won't just be the most capable. They'll be the ones humans can actually *see*.

---

## 5. Legibility Checklist

1. **Can a new person understand this system in one day?** If not, your onboarding cost is a scaling bottleneck.
2. **Can you generate an architecture view automatically?** If it requires manual upkeep, it's already out of date.
3. **Can you trace why any decision was made?** Event sourcing gives you time-travel. Use it.
4. **Does every module have a stable interface?** Complexity behind boundaries. If changing one thing breaks three others, you have a legibility problem.
5. **Is there a shared vocabulary between code and business?** Ubiquitous language isn't academic — it's how you keep systems honest.
6. **Can you remove code with confidence?** If you're afraid to delete, you don't understand the system well enough.

---

## 6. Closing

Legibility is how you stay in control of the leverage you're building.

A black box that controls a thousand tireless agents isn't powerful — it's dangerous. The question that ends AI systems is always the same: *what did it do, and why?* The Dutch government couldn't answer it.[^5] Amazon couldn't answer it.[^4] Netscape lost three years trying to undo what they couldn't explain.[^6][^15]

Confidence is the currency. Can you audit it? Can a new person work with it? Can you change it without fear? If the answer to any of those is no, you have a legibility problem — and that problem compounds at AI speed.

Humans are the direction-givers. LLMs don't work without input. That's not a limitation, it's leverage — but only if you understand the system well enough to direct it. This is just the beginning of exponential leverage in software engineering. It's going to keep getting more powerful.

Legibility isn't about slowing down. It's about making speed sustainable. The systems that survive won't be the fastest or most powerful. They'll be the ones humans can still understand.

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
[^12]: Skelton & Pais — *Team Topologies* (2019). Software boundaries should align with cognitive load limits. Popularized the "Inverse Conway Maneuver" — design your org to get the architecture you want.
[^conway]: Melvin E. Conway — "How Do Committees Invent?" *Datamation*, April 1968. "Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure." melconway.com/Home/Conways_Law.html
[^13]: Martin Fowler — Bounded Context (2014). Explicit boundaries → manageable sub-models.
[^14]: Martin Fowler — Ubiquitous Language (2006). Shared vocabulary = code reads how business thinks.
[^15]: Martin Fowler — Strangler Fig Application (2004). Industry pattern to avoid rewrites.
[^16]: Peter Steinberger (@steipete) — 93,570 GitHub contributions in one year (2025-2026). AI-augmented solo developer.
[^17]: Google — Gemini 1.5 Technical Report (2024). Demonstrated loading JAX codebase at 746,152 tokens in a single session. arxiv.org/abs/2403.05530
[^18]: Open Hub — React (facebook/react). ~593,499 LOC, 88% JavaScript / 11% TypeScript. openhub.net/p/facebook-react
[^19]: Open Hub — VS Code (microsoft/vscode). ~1,439,706 LOC, 97% TypeScript. openhub.net/p/vscode
[^20]: Stackscale — "Linux kernel surpasses 40 million lines" (Jan 2025). Linux 6.14 rc1: 40,063,856 total lines.
