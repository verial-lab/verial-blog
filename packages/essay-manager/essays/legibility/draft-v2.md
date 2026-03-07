---
email_draft: true
title: "Legibility: A Scaling Bottleneck of the Agentic Era"
description: "The limit of operating agentic systems isn't how fast AI can produce output — it's how fast a human can understand the system well enough to direct it. Legibility is a scaling bottleneck of human comprehension in the AI era."
---

---

## 1. Hook (TODO Needs work)

> Legibility, in this context, is the discipline of making systems understandable at scale — to both humans and agents — so that increased output produces insight, not opacity.

Legibility is something I didn't think I'd care about this much. I grew up drawn to math, not language. The concept of legibility seemed like a writing and language concern to me. I was drawn to coding because it felt like math — build a function, test the input, validate the output. It felt logical and you could check your work without an external subjective judge.

When I first learned to code, much of the focus was on syntax and tools, which the majority of my focus. But as I moved into senior engineering roles, system design became the primary focus. Now that agentic coding is here, there's no need to learn syntax and tools to nearly the same depth, if at all. That makes anyone building software systems a system designer. To my surprise, legibility slowly revealed itself to be essential in this process. 

When ChatGPT arrived right before 2023, I built fast. Lots of experiments, lots of code — and a genuine excitement about what was suddenly possible. But a lot of the output didn't stick. Systems got opaque. I'd lose the thread. Projects that started with enthusiasm stalled out, and eventually just got lost. A fair amount of wasted effort, looking back.

Then agentic coding took off in 2025. 

the direction became clear: agentic orchestration is the next — parallelizing agents at scale. A single human now has previously unimaginable leverage.

So I jumped into building an agentic engineering platform[^syntropic] with observability as a first-class concern. I built fast. But legibility didn't crystallize as a concept until my code production started to stall — fast as I was moving, I'd built something I couldn't fully see.

Digging deeper, I realized that I was lacking adequate visibility of the important parts and structure of my system. So I stopped adding features and started distilling. Combined modules, cleaned the domain model (TODO: add a definition), built auto-generated diagrams from vertical slice architecture. I came out the other side able to see the important parts of the system — and gained the confidence to keep pressing forward.

Two things became clear:
> As a system becomes more powerful, legibility becomes more important.
> If a system is powerful and not legible, it will eventually get shut down.

I now treat legibility as a first-class consideration in the systems I build. Because LLMs are trained on general human knowledge, agentic systems will reach every field — and every field will face this same reckoning.

---

## 2. The New Failure Mode

### Part A: The Shift

The bottleneck has moved. For decades, performing knowledge work was constrained by thinking and typing speed — you could only produce as fast as you could type. In software, AI now generates code faster than engineers can read it. And with generalized LLMs, this isn't just a software shift — it's any type of digital knowledge work. That gap, between generation speed and human comprehension, is a new failure mode.

One person running the workload of a hundred. That's not a forecast — it's already happening.

Peter Steinberger — creator of OpenClaw — made more than 6,600 commits in January 2025 alone.[^16] For context: the world's most prolific solo developer in 2012 peaked at around 7,500 contributions for an entire year.[^22] Steinberger was on pace for more than ten times that. OpenClaw — built by one person with AI — is closing in on React's all-time GitHub star count,[^openclaw] a milestone Facebook's team took twelve years to reach. His own words: *"All the mundane stuff of writing code is automated away, I can move so much faster. But I have to think so much more."* The first sentence is the promise. The second is the catch.

This shift isn't exclusive to software. Anyone now directing agents — legal teams running AI document review, accountants managing automated reconciliation, doctors with agents flagging anomalies and drafting recommendations — is navigating the same dynamic. The language of working with agents is already something anyone reading this can do: write or speak our thoughts, in any common human language. The constraint isn't access. It's when the system you're directing gets complex enough that you can't see it clearly. That's when operating, and more importantly, changing the system becomes risky.

The reality is that AI doesn't scale human comprehension. Our working memory holds roughly 7 ± 2 chunks of information at once — Miller's Law, and it hasn't been patched recently.[^3] You can write code ten times faster. You cannot understand ten times faster. Which means the faster you generate, the faster you outrun your own grasp of what you've built. Even when we do start using BCIs, we still have to accept the constraint of our comprehension bandwidth as a complexity limit.

And the AI agents working on your behalf face a similar wall. They can only see a fraction of a system at once. The context window of LLMs makes this concrete. Rule of thumb: roughly 10 tokens per line of code. Claude's 200K context window (early 2026) fits about 20,000 lines — roughly 40 files at 500 lines each. Gemini 1.5's 1M context pushes to around 100,000 lines; Google demonstrated this by loading the entire JAX codebase (746K tokens) in a single session.[^17] Now look at what real production systems contain:

| Codebase | Lines of code | Claude 200K sees | Gemini 1M sees |
|---|---|---|---|
| Medium SaaS | ~150K LOC | 13% | 67% |
| React | ~593K LOC [^18] | 4% | 17% |
| VS Code | ~1.44M LOC [^19] | 1.4% | 7% |
| Linux kernel | ~40M LOC [^20] | 0.05% | 0.25% | (TODO: These percentages are off)

A fresh agent session on a medium-sized codebase sees roughly one-eighth of the system at best. It doesn't know what it doesn't know. Every new session bootstraps from zero context. Things get duplicated. Dependencies get missed. Features land adjacent to features that already solve the same problem.

I ran the math: 1 billion tokens per day — a plausible 2028 number for individual agentic engineers — compresses roughly three years of human software development into a single day. The AI handles the generation. The problem is the person in the seat — who needs a higher-order understanding of the system they can validate at a glance, not operation by operation.

This is the shift. The role is moving from execution to direction — less doing the work, more understanding the system well enough to guide what comes next. Whether you're managing software agents or AI workflows in medicine, law, or finance, the shape of the problem is the same. You need to understand the system: its capabilities, its boundaries, where things fit. Want to expand it but can't see where a new piece belongs? You've already hit a complexity limit.

Software is abstract — there's no physical structure you can walk through. No way to see the load-bearing walls by looking at it. If you can't make that structure visible, intentionally, you're asking an AI to keep adding floors to a building whose blueprints don't even exist. At machine speed. With agentic orchestration on deck.

### Part B: The Cascade

That gap is quieter than a collapse — systems don't break, they calcify. Basic questions start to become unclear: *What is this actually capable of? What is it actually doing?* AI can help refactor code, but relies on direction. The purpose of the system comes from the creator — which parts carry the real weight, what the original intent was, whether a simplification is safe. That requires understanding. And understanding requires legibility.

Without it, the cascade is predictable: it's risky to scale the system and scary to change it. Legibility provides a foundation to make both scaling and evolving possible.

Agent systems amplify every step. If you can't answer *what did it do, and why?*, the system can't be trusted and gets shut down.

### Part C: Real-World Carnage

These aren't edge cases.

Amazon built an AI recruiting tool. It learned to penalize resumes that included the word "women's." Engineers found the bias but couldn't fix it — the model's decision-making was opaque. They scrapped the whole system.[^4]

The Dutch government used an algorithmic fraud-detection system for childcare benefits. It falsely accused 26,000 families. Parents lost housing. Children entered state care. The scandal — known as the Toeslagenaffaire — consumed Dutch politics for years and forced the resignation of Prime Minister Rutte's third cabinet.[^5]

Netscape decided their codebase had become too complex to maintain and chose a full rewrite of Navigator from scratch. It took three years. The market moved on. The company never recovered.[^6]

In each case: the system couldn't explain itself. And systems that can't explain themselves don't get fixed — they get shut down, or they take the organization down with them.

Why build something that would eventually get shut down?


These are examples of systems built strictly by human contributors (TODO: Fact check). Now that we are in the age of agentic orchestration, the downsides of illegibility are amplified.

---

## 3. Three Pillars of Legibility

> These are personal insights from lived experience — not gospel, but directions that have worked. Always welcoming new approaches.

### Insight 1: Temporal + Domain Legibility

Agentic systems need to be legible in two directions: across teams and across time.

Coming from a more specialized role, the release of GPT was a new frontier and allowed me to start building full systems as side projects. But I'd build project after project, then come back to it, and feel completely lost. That frustration sent me to software books, architecture books — a genuinely great journey. The one that changed everything was *Domain-Driven Design* by Eric Evans.[^8]

What DDD gave me: a shared language. Before DDD, system design was a technical concern — data structures modeled in databases, invisible to anyone outside engineering. DDD introduced the ubiquitous language — basically a legibility glossary for a software system.[^14] It created a Venn diagram overlap — a bridge between business and technical departments. Everyone on the team can see the purpose of the software. Domain legibility: the system speaks the language of the problem it solves.

But the real breakthrough came with an evolved architectural form called Event Sourcing. With the "normal" approach of software design, you store the latest state of the system — like a cell in an Excel sheet. Event sourcing stores an immutable log of events, *what happened* instead. The event store is the single source of truth.[^9] And the beautiful thing: you now have a history of the system. Temporal legibility. You can replay from the very first event. Time-travel history and replayability. Massive flexibility. And data that becomes raw material for AI-powered improvement.[^10]

This idea of an immutable ledger is not new, it's used in banking systems which need to store a history of all account transactions for auditability, and was even evolved further by Bitcoin which turned it into a "distributed immutable ledger". Instead of storing the account balance, you sum all of the transactions involving your account.

Event Sourcing uses this concept to provide temporal legibility, mixed with the domain legibility of DDD. I was sold and went deep enough to build my own Event Sourcing Platform to serve as the foundation for future systems. (TODO: I need a callout to understanding event-sourcing)

I built Syntropic137 on event sourcing for exactly this reason: domain and temporal legibility which not only helps with understanding the system, but provides a mechanism for powerful feedback loops supporting continual improvement over time.[^syntropic]

### Insight 2: Modularity + Low Cognitive Load

The biggest legibility benefit of modularity is simple: modules reduce how much you need to hold in your head at once.[^11] They reduce cognitive load, a term used frequently in the software world, but all knowledge work reaps the benefits. 

Why do modules reduce cognitive load? Because they package functionality into a container, with simpler inputs and output. These inputs and outputs are the "interface" (TODO: definition). Modules create cognitive leverage. 

Consider a car. Combustion cycles, fuel injection, battery management, temperature regulation — the driver understands almost none of it, and doesn't need to. The interface is a wheel, a pedal, a key. Clean inputs, predictable outputs. All the complexity is hidden behind that boundary. A single person can confidently operate something extraordinarily complex because they never have to see what's underneath.[^13]

That's what good modularity does for a system. Wrap thousands of lines of complexity behind a simple interface. The cognitive load of operating it drops to the size of that interface — not the size of what's inside it.

There's an organizational dimension too: as Conway observed, systems tend to mirror the communication structure of the teams that build them.[^conway] Module boundaries are as much a team design question as a technical one — and likely, an agent team design as well.[^12]

#### Cognitive Load Anti-Pattern: Over Documentation

In a failed attempt to improve legibility, I generated docs for every feature of my system. The more I created, the less I wanted to use them. They got out of sync. They became overwhelming. They actually increased cognitive load instead of reducing it.

Now I think of documentation like the interface on a module. Its purpose is human cognitive compression of a system — not full coverage. I focus on what's absolutely essential to comprehend and operate, and push for quality over quantity. Agents can use these docs too, but humans are the primary audience I design for.


### Insight 3: Standardization / Consistency

Standardization used to feel constraining to me — ordinary, not novel. But it took me decades to appreciate that standardization (i.e. ordinary) has a superpower: it eliminates the cognitive overhead of decision-making across every system that uses it.

The proof is everywhere. Drive anywhere in your country — same signs, same exits — and you feel at home. The cognitive load of being somewhere new drops dramatically. HTTP and TCP are the same idea at internet scale: ubiquitous standards every system integrates with, enabling a decentralized global network. The standard was designed once. It scaled to billions.

In code, this compounds in a way that matters enormously for the AI era: understand the standard once, and you can read any system built on it. Not just faster — fundamentally differently. You could manage ten codebases with the cognitive overhead of one, because the structure transfers. Every new repo starts at partial comprehension instead of zero.

Vertical Slice Architecture (VSA)[^vsa] became a cornerstone of my practice — originally because it allows agent work to be parallelized more easily. But standardizing VSA across projects delivered a bonus: it made legibility tooling possible. With a consistent structure, I could auto-generate component and capability diagrams with every change. One standard, across all systems, with comprehension tooling built in. The structure transfers. The diagrams stay current. And you can see how a system changes over time. Temporal legibility bonus. (TODO: I need a callout to understanding event-sourcing)

This consistent, standardized structure is one of my tools for scaling legibility with agentic engineering.

---

## 4. The Frontier

### The Paradigm Shift

The constraint on software development, for most of its history, was raw human typing. That's not even considering all of the strategy, design and meetings before it. Even the most talented developer could only type so many lines per hour. A team of 100 had a structural advantage no individual could overcome. You needed human minds and human hands.

AI removed that constraint. A single engineer today will soon be able to generate what a team of 100 produced in 2022. And with agentic orchestration on deck, the multiplier keeps climbing.

But AI solved the *generation* problem — not the *comprehension* problem. Generating 100 engineers' worth of code doesn't mean one person understands 100 engineers' worth of code. The institutional knowledge, the "why did we do it this way" conversations, the mental models built across a team — that doesn't compress automatically. It has to be designed in.

And this isn't only an engineering problem. Everyone now has access to AI capable of automating significant parts of work, business, and daily life. The barriers to building are collapsing. But the gap between "I have a working system" and "I understand what it's doing" — that gap remains. It's a key pillar that determines whether any of this output actually survives.

Legibility is the bridge. Between AI that can build anything, and a human who can use, trust, and improve what was built. Between solo capacity and team-scale output. (TODO: End here needs work, feels like some duplication in this paragraph)

### The Visualization Frontier

The human role isn't disappearing — it's shifting. From writing low-level code to something different: understanding what was built, navigating it, and deciding what comes next.

The tools for that are generally still primitive. We read code in text editors — flat files, no spatial sense, no way to feel the shape of something large. As systems grow to thousands of services and agents, those flat representations reach a comprehension complexity limit. 

Being able to visualize complex systems in new ways feels incredibly powerful for raising that complexity limit.

The progression I've been built through: diagram-as-code first — Mermaid, then D3 and React Flow, which add a design dimension Mermaid can't offer. With standardization, these diagrams auto-generate from the codebase and stay current. Then code complexity tooling: hotspot maps, dependency graphs, code smell visualizers. Seeing not just what the system *is*, but where the problems *are*.

Then 3D. I built a CodeCity clone[^codecity] — a three-dimensional representation of a codebase — and generated an automated flyover video. You're not reading the system anymore. You're moving through it.

We're early. But the systems that survive the agentic era won't just be the most capable. They'll be the ones humans can actually *see*.

---

## 5. Legibility Checklist

To make this actionable, here are some questions to consider for anything you are building.

1. **Can a new person understand this system in one day?** If not, your onboarding cost is a scaling bottleneck.
2. **Can you generate an architecture view automatically?** If it requires manual upkeep, it's already out of date.
3. **Can you trace why any decision was made?** Auditability and traceability are the goal — event sourcing is one way to get there, but any approach that lets you answer *why* works. If the system can't explain itself, it can't be trusted and headed for shutdown.
4. **Is complexity packaged behind a simple interface?** If changing one thing breaks three others, you don't have a module — you have an illegible tangle.
5. **Is there a shared vocabulary between code and the problem it solves?** Event modeling is one powerful approach: commands, events, and queries are intuitive enough that any stakeholder can reason about a feature before a line of code is written. Humans think in events naturally. Abstract data models, not unless you are a robot. (Are you a robot?)
6. **Can you improve the system with confidence?** If legibility is working, you can look at the system, know where a problem lives or where a feature belongs, and make the change without fear. That confidence is what lets you move fast sustainably.

---

## 6. Closing

Legibility is how you stay in control of the unprecedented leverage agentic orchestration provides.

A black box that controls a thousand tireless agents isn't powerful — it's dangerous. The question that ends complex systems will be: *what did it do, and why?* The Dutch government couldn't answer it.[^5] Amazon couldn't answer it.[^4] Netscape lost three years trying to undo what they couldn't explain.[^6][^15] (And that was before agentic orchestration.)

Confidence is the currency. Can you audit it? Can a new person work with it? Can you change it without fear? If the answer to any of those is no, you have a legibility problem — and that problem compounds at mass agentic speed.

Humans are the direction-givers as LLMs don't work without input. That's not a limitation, it's leverage — but an upward spiral or downward spiral of leverage depends on how effectively you can direct it. It's the most powerful it's ever been, and the least powerful it will ever be.

Legibility isn't about slowing down. It's about strategically making speed sustainable. The systems that survive won't be the fastest or most powerful. They'll be the ones humans can still understand.

---

## Footnotes Reference

[^llmflation]: Guido Appenzeller (a16z) — "Welcome to LLMflation" (2024). "For an LLM of equivalent performance, the cost is decreasing by 10x every year." a16z.com/llmflation-llm-inference-cost
[^math]: At 10x/year cost reductions, the math on daily token generation for a solo developer converges quickly. Full breakdown in a future post.
[^syntropic]: Syntropic137 — agent engineering framework. GitHub organization: github.com/Syntropic137. Repository not yet public.
[^3]: George Miller — "The Magical Number Seven, Plus or Minus Two" (1956). Human working memory holds ~7 ± 2 chunks.
[^4]: Reuters (Jeffrey Dastin) — Amazon scrapped AI recruiting tool that showed bias against women (2018).
[^5]: Dutch childcare benefits scandal — opaque algorithmic fraud detection falsely accused ~26,000 families; government fell (2020-21).
[^6]: Joel Spolsky — "Things You Should Never Do, Part I" (2000). Netscape's rewrite cost 3 years and killed the company.
[^8]: Eric Evans — *Domain-Driven Design* (2003). Ubiquitous language, bounded contexts.
[^9]: Martin Fowler — Event Sourcing. Complete audit log + temporal queries.
[^10]: Greg Young — CQRS Documents (2010). Events as first-class citizens.
[^11]: John Sweller — Cognitive Load Theory (2011). Design must respect working memory limits.
[^12]: Skelton & Pais — *Team Topologies* (2019). Software boundaries should align with cognitive load limits. Popularized the "Inverse Conway Maneuver" — design your org to get the architecture you want.
[^conway]: Melvin E. Conway — "How Do Committees Invent?" *Datamation*, April 1968. "Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure." melconway.com/Home/Conways_Law.html
[^13]: Martin Fowler — Bounded Context (2014). Explicit boundaries → manageable sub-models.
[^14]: Martin Fowler — Ubiquitous Language (2006). Shared vocabulary = code reads how business thinks.
[^15]: Martin Fowler — Strangler Fig Application (2004). Industry pattern to avoid rewrites.
[^16]: The Pragmatic Engineer — "The creator of Clawd: I ship code I don't read" (2025). Confirmed 6,600+ commits in January 2025 alone. newsletter.pragmaticengineer.com
[^22]: paulmillr — GitHub worldwide contributor leaderboard (Jan 2012–Jan 2013). TJ Holowaychuk (#1 globally): 7,458 contributions/year. gist.github.com/paulmillr/2657075
[^openclaw]: OpenClaw GitHub repository (github.com/openclaw/openclaw). Launched November 24, 2025. ~240,000 stars as of February 2026, closing in on React (~243k) as the most-starred software repository on GitHub. Peter Steinberger, creator (@steipete).
[^17]: Google — Gemini 1.5 Technical Report (2024). Demonstrated loading JAX codebase at 746,152 tokens in a single session. arxiv.org/abs/2403.05530
[^18]: Open Hub — React (facebook/react). ~593,499 LOC, 88% JavaScript / 11% TypeScript. openhub.net/p/facebook-react
[^19]: Open Hub — VS Code (microsoft/vscode). ~1,439,706 LOC, 97% TypeScript. openhub.net/p/vscode
[^20]: Stackscale — "Linux kernel surpasses 40 million lines" (Jan 2025). Linux 6.14 rc1: 40,063,856 total lines.
[^vsa]: Vertical Slice Architecture — a module structure where features are organized as vertical slices through all layers of the stack rather than horizontal layers. See: jimmybogard.com/vertical-slice-architecture
[^codecity]: CodeCity — original concept by Richard Wettel & Michele Lanza, University of Lugano (2008). "CodeCity: 3D Visualization of Large-Scale Software." wettel.github.io/codecity.html
