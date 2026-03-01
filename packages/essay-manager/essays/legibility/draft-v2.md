---
email_draft: true
title: "Legibility: A Scaling Bottleneck of the Agentic Era"
description: "The limit of operating agentic systems isn't how fast AI can produce output — it's how fast a human can understand the system well enough to direct it. Legibility is a scaling bottleneck of human comprehension in the AI era."
---

---

## 1. Hook

> Legibility is the discipline of making systems understandable at scale — to both humans and agents — so that increased output produces insight, not opacity.

Legibility is something I didn't think I'd care about this much. The concept of legibility seemed like a writing and language concern to me. I grew up drawn to math, not language. Code felt like math — build a function, test the input, validate the output. You could check your work. But over the years building software systems, legibility revealed itself to be essential in the development and management of these systems.  

When GPT arrived in 2022, I built fast. Lots of experiments, lots of code — and a genuine excitement about what was suddenly possible. But a lot of it didn't stick. Systems got opaque. I'd lose the thread. Projects I'd started with enthusiasm stalled out, and eventually just got lost. A fair amount of wasted effort, looking back.

As agentic coding took the world by storm in 2025, it was clear we were heading towards agentic orchestration, a move that has no intelligence limit, mainly hardware and energy limits. This is due to being able to parallelize agents on a mass scale.

With this in mind I jumped into building an agentic engineering framework <Footnote about Syntropic137> with observability of all agentic actions as a firt class citizen. 

I started with obervability in mind, but the concept of legibility didn't appear until I realized that while I had built an initial MVP <definition> faster than I ever could have before, my production was starting to stall.

Digging deeper, I realized that I was lacking adequate visibility of the important parts and structure of my system. It felt risky, but I stopped adding new features and started distilling. Combined modules, cleaned the domain model (add definition in context of domain driven design), built auto-generated diagrams from vertical slice architecture (add definition in the context of understanding event sourcing book). I came out the other side able to see the important parts of the system — and gained confidence to keep pressing forward.

The primary insight in all of this is: 
> 1. As a system becomes more powerful, legibility becomes more important. 
> 2. Is a system is powerful and not legible, it will eventually get shut down. 

I now treat legibility as a first class consideration when building and operating agentic systems. Because LLM models are generally <Footnote about GPT meaning> trained, these new agentic systems can and likely will be used in every field.

<deprecated>
(TODO: Move to the bottom)In 2025, I did the math. AI inference costs have been dropping roughly 10x per year.[^llmflation] Soon generating a billion tokens a day — three years of software output compressed into twenty-four hours — becomes accessible to a solo developer for around $1,000 a month.[^math] (TODO: This isn't accurate, that was like a projection that we need to do the math on.) I knew code editors and terminals wouldn't allow for that type of scale and a paradigm shift was needed to address this foundational paradaigm shift. I jumped into builing an agent engineering framework focused on orchestration and observability.[^syntropic] Fast. A lot of code. And ran straight into the same illegibility wall.
</deprecated>

---

## 2. The New Failure Mode

### Part A: The Shift

The bottleneck has moved. For decades, performing knowledge work was constrained by thinking and typing speed — you could only produce as fast as you could type. In software AI generates code faster than engineers can read it. And with generalized LLMs, this isn't just a software shift, it's any type of digital knowedge work. That gap, between generation speed and human comprehension, is a new failure mode.

One person running the workload of a hundred. That's not a forecast — it's already happening.

Peter Steinberger — creator of OpenClaw — made more than 6,600 commits in January 2025 alone.[^16] For context: the world's most prolific solo developer in 2012 peaked at around 7,500 contributions for an entire year.[^22] Steinberger was on pace for more than ten times that. OpenClaw — built by one person with AI — is closing in on React's all-time GitHub star count,[^openclaw] a milestone Facebook's team took twelve years to reach. His own words: *"All the mundane stuff of writing code is automated away, I can move so much faster. But I have to think so much more."* The first sentence is the promise. The second is the catch.

This shift isn't exclusive to software. Anyone now directing agents — legal teams running AI document review, accountants managing automated reconciliation, doctors with agents flagging anomalies and drafting recommendations — is navigating the same dynamic. The language of working with agents is already something we can do: write or speak our thoughts, in any common human language. The constraint isn't access. It's when the system you're directing gets complex enough that you can't see it clearly. That's when operating, and more importantly, changing the system becomes risky.

The reality is that AI doesn't scale human comprehension. Our working memory holds roughly 7 ± 2 chunks of information at once — Miller's Law, and it hasn't been patched recently.[^3] You can write code ten times faster. You cannot understand ten times faster. Which means the faster you generate, the faster you outrun your own grasp of what you've built. Even when we do start using BCIs, we still have to accept the constraint of our comprehension bandwidth as a complexity limit.

And the AI agents working on your behalf face a similar wall. It can only see a fraction of the system at once. The context window of LLMs make this concrete. Rule of thumb: roughly 10 tokens per line of code. Claude's 200K context window fits about 20,000 lines — roughly 40 files at 500 lines each. Gemini 1.5's 1M context pushes to around 100,000 lines; Google demonstrated this by loading the entire JAX codebase (746K tokens) in a single session.[^17] Now look at what real production systems contain:

| Codebase | Lines of code | Claude 200K sees | Gemini 1M sees |
|---|---|---|---|
| Medium SaaS | ~150K LOC | 13% | 67% |
| React | ~593K LOC [^18] | 4% | 17% |
| VS Code | ~1.44M LOC [^19] | 1.4% | 7% |
| Linux kernel | ~40M LOC [^20] | 0.05% | 0.25% |

A fresh agent session on a medium-sized codebase sees roughly one-eighth of the system at best. It doesn't know what it doesn't know. Every new session bootstraps from zero context. Things get duplicated. Dependencies get missed. Features land adjacent to features that already solve the same problem.

I ran the math: 1 billion tokens per day — a plausible 2028 number for individual developers — converts to roughly three years of software development in a single day. The AI handles the generation. The problem is the person in the seat — who needs a higher-order understanding of the system they can validate at a glance, not operation by operation.

This is the shift. The role is moving from execution to direction — less doing the work, more understanding the system well enough to guide what comes next. Whether you're managing software agents or AI workflows in medicine, law, or finance, the shape of the problem is the same. You need to understand the system: its capabilities, its boundaries, where things fit. Want to expand it but can't see where a new piece belongs? You've already hit a complexity limit.

Software is abstract — there's no physical structure you can walk through. No way to see the load-bearing walls by looking at it. If you can't make that structure visible, intentionally, you're asking an AI to keep adding floors to a building whose blueprints don't even exist. At machine speed. With agentic orchestration on deck.

### Part B: The Cascade

That gap is quieter than a collapse — systems don't break, they calcify. Basic questions start to become unclear: *What is this actually capable of? What is it actually doing?* While AI can help refactor a system, harder is to have it tell you what matters — which parts carry the real weight, what the original intent was, whether a simplification is safe. That requires understanding. And understanding is greatly assisted by legibility.

Without it, the cascade is predictable: it's risky to scale the system and scary to change it. Legibility provides a foundation to make both scaling and evolving possible.

Agent systems amplify every step. If you can't answer *what did it do, and why?*, the system can't be trusted and gets shut down.

### Part C: Real-World Carnage

These aren't edge cases.

Amazon built an AI recruiting tool. It learned to penalize resumes that included the word "women's." Engineers found the bias but couldn't fix it — the model's decision-making was opaque. They scrapped the whole system.[^4]

The Dutch government used an algorithmic fraud-detection system for childcare benefits. It falsely accused 26,000 families. Parents lost housing. Children entered state care. The scandal brought down the entire government.[^5] (TODO: Expand on "brought down the government)

Netscape decided their codebase had become too complex to maintain and chose a full rewrite of Navigator from scratch. It took three years. The market moved on. The company never recovered.[^6]

In each case: the system couldn't explain itself. And systems that can't explain themselves don't get fixed — they get shut down, or they take the organization down with them.

Why build something that would eventually get shut down?

---

## 3. Three Pillars of Legibility

> These are personal insights from lived experience — not gospel, but directions that have worked. Always welcoming new approaches.

### Insight 1: Temporal + Domain Legibility

Agentic/Software systems need to be legible in two directions: across teams and across time.

Coming from a more specialized role, the release of GPT was a new frontier and allowed me to start building full systems as side projects. But I'd build project after project, then come back to it, and feel completely lost. That frustration sent me to software books, architecture books — a genuinely great journey. The one that changed everything was *Domain-Driven Design* by Eric Evans.[^8]

What DDD gave me: a shared language. Before DDD, system design was a technical concern — data structures modeled in databases, invisible to anyone outside engineering. DDD introduced the ubiquitous language — basically a legibility glossary for a software system.[^14] It created this Venn diagram overlap bridges between business and technical departments. Everyone on the team can see the purpose of the software. Domain legibility: the system speaks the language of the problem it solves.

But the real breakthrough came with event sourcing. In normal software, you store the current state — like a cell in an Excel sheet. Event sourcing stores *what happened* instead. The event store is the single source of truth.[^9] And the beautiful thing: you now have a history of the system. Temporal legibility. You can replay from the very first event. Time-travel history and replayability. Massive flexibility. And data that becomes raw material for AI-powered improvement.[^10]

I built Syntropic137 on event sourcing for exactly this reason: the system has the history to explain what it did, and now can build feedback loops into continual improvement.[^syntropic]

### Insight 2: Modularity + Low Cognitive Load

The biggest legibility benefit of modularity is simple: it reduces how much you need to hold in your head at once.[^11]

Consider a car. Combustion cycles, fuel injection, battery management, temperature regulation — the driver understands almost none of it, and doesn't need to. The interface is a wheel, a pedal, a key. Clean inputs, predictable outputs. All the complexity is hidden behind that boundary. A single person can confidently operate something extraordinarily complex because they never have to see what's underneath.[^13]

That's what good modularity does for a system. Wrap thousands of lines of complexity behind a simple interface. The cognitive load of operating it drops to the size of that interface — not the size of what's inside it.

There's an organizational dimension too: as Conway observed, systems tend to mirror the communication structure of the teams that build them.[^conway] Module boundaries are as much a team design question as a technical one — and likely, an agent team design question as well.[^12]

#### Cognitive Load Anti-Pattern: Over Documentation

In a failed attempt to put legibility in action, I decided to generate docs for every inch of my system, but I realized the more docs I created, the less I wanted to use them. 

I created tons of docs. They got out of sync. They became overwhelming. They actually increased cognitive load instead of reducing it. This is a critical situation because docs are key to providing legibility of a system. 

Now instead of using documentation to cover the entire system, I now think of them like an interface on a module. It's purpose is an interface for human compression of the system. I think more in terms of what is absolutely essential for humans to comprehend and operate a system while pushing for quality over quantity. These docs can and should be leveraged by agents too, but humans are the primary user I keep in mind.


### Insight 3: Standardization / Consistency

Standardization used to feel constraining to me — ordinary, not novel. But it took me decades to appreciate that standardization (i.e. ordinary) has a superpower: it eliminates the cognitive overhead of decision-making across every system that uses it.

The proof is everywhere. Drive anywhere in your country — same signs, same exits — and you feel at home. The cognitive load of being somewhere new drops dramatically. HTTP and TCP are the same idea at internet scale: ubiquitous standards every system integrates with, enabling a decentralized global network. The standard was designed once. It scaled to billions.

In code, this compounds in a way that matters enormously for the AI era: understand the standard once, and you can read any system built on it. Not just faster — fundamentally differently. You could manage ten codebases with the cognitive overhead of one, because the structure transfers. Every new repo starts at partial comprehension instead of zero.

In my software architecture journey I came to love Vertical Slice Architecture (VSA) <add a reference to Understanding Eventsourcing> because it allows work to be parallelized more easily. As this is a structure that spans multiple software projects I decided to standardize the structure. <link to event-sourcing vsa> This standardization provided more benefits than just providing a common structure for my software systems, it also allowed me to build legibility tools which help me visualize the structure and capabilities of my systems. One standard for all systems I built in the near future, with legibility tooling to help me comprehend systems at scale. Now I can generate component and capability diagrams with every commit, giving a further legibility boost providing comprehension over time.

This consistent, standardized structure is one of my tools for scaling legibility with agentic engineering.

---

## 4. The Frontier

### The Paradigm Shift

The constraint on software development, for most of its history, was raw output. Even the most talented developer could only type so many lines per hour. A team of 100 had a structural advantage no individual could overcome. You needed human minds and human hands.

AI removed that constraint. A single engineer today will soon be able to generate what a team of 100 produced in 2022. And with agentic orchestration on deck, the multiplier keeps climbing.

But AI solved the *generation* problem — not the *comprehension* problem. Generating 100 engineers' worth of code doesn't mean one person understands 100 engineers' worth of code. The institutional knowledge, the "why did we do it this way" conversations, the mental models built across a team — that doesn't compress automatically. It has to be designed in.

And this isn't only an engineering problem. Everyone now has access to AI capable of automating significant parts of work, business, and daily life. The barriers to building are collapsing. But the gap between "I have a working system" and "I understand what it's doing" — that gap remains. It's a key pillar that determines whether any of this output actually survives.

Legibility is the bridge. Between AI that can build anything, and a human who can use, trust, and improve what was built. Between solo capacity and team-scale output.

### The Visualization Frontier
(TODO: Needs a lot of work. So what I have played around with is like, you know, mermaid diagrams were great. Anything that can be put into code for diagrams, so diagram as code. Mermaid was a great start. Now it's like D3 and React Flow. I don't necessarily need to list all these, but just an example. And one of the standards in the Agent Paradise standard system was a code complexity, like visualizer tools, so through hotspots and diagrams, code dependency graphs, And then there's also the vertical slice architecture, which is an architectural visualization and capability tool. And the other one's about code complexity and quality and code smells. So those are kind of like the visualizers that I've been working on. And 3D is definitely something where I want to get to even though I haven't really said it. I don't necessarily want to fly through it. But I think Code City is one of the best 3D examples I've built so far. I built a three-dimensional Code City off of an inspiration from a guy that made Code City. So we built our own and then I created a, used an automated video generation to like fly over the city. So that is actually something that we actually built. And I might make a post about that just to show.)

The human role isn't disappearing — it's shifting. From writing low-level code to something harder: understanding what was built, navigating it, and deciding what comes next.

The tools for that are still primitive. We read code in text editors or terminals — flat files, no spatial sense, no way to feel the shape of a large system. As systems scale to thousands of services and agents, those flat representations break down. You can't read your way through a system that large. You have to see it.

I've been experimenting with this. First with 2D architecture diagram tools in JavaScript — auto-generated component maps from vertical slice architecture that update with every commit. A living picture of a system, not a document written once and immediately out of date.

Now I'm getting into Blender. The hypothesis: a codebase too complex to hold in your head might be something you can *fly through*. Navigate it like a space, not a document. See clusters, boundaries, anomalies — the things invisible in flat text.

By end of year, I want something semi-solid for 3D system visualization. We're on the cusp of ways to see and understand systems that haven't been invented yet. The systems that win won't just be the most capable. They'll be the ones humans can actually *see*.

---

## 5. Legibility Checklist

1. **Can a new person understand this system in one day?** If not, your onboarding cost is a scaling bottleneck.
2. **Can you generate an architecture view automatically?** If it requires manual upkeep, it's already out of date.
3. **Can you trace why any decision was made?** Event sourcing gives you time-travel. Use it. (TODO: Now we're talking about things like traceability, observability, stuff like that. Event sourcing is just one tool that I chose. There's one architecture design that I chose to give us the ability for auditability and traceability. But ultimately it's about being able to ask the question, can I understand why a decision was made?)
4. **Does every module have a stable interface?** Complexity behind boundaries. If changing one thing breaks three others, you have a legibility problem. (TODO: I would update this to like is complexity properly packaged in a module and hidden behind a simple interface. I want to talk about stability because we can evolve module interfaces that just need to be backwards compatible, but that's not something we need to talk about.)
5. **Is there a shared vocabulary between code and business?** Ubiquitous language isn't academic — it's how you keep systems legible accross teams (TODO: We You can talk about how event modeling is a way where all stakeholders, non-technical and technical, can talk about adding features to a system because it just uses base language like commands, events, and queries. So anyone can say, like once you have the model defined, you can easily say user creates email, create email, and then that would emit the event email created. And I think it helps with legibility also because it's easy for us as humans to think in events versus kind of more technical or abstract data models, which I would say aren't always easy to intuitive for humans to think about because we kind of think in linear thought and events in general.).
6. **Can you improve systems with confidence?** (TODO: Being able to approach a system and know where there's a problem or whether the feature that needs to be added or a feature that needs to be removed, being able to have the confidence to change that and understand where it fits in is going to help you. Having that legibility and understanding is going to help give you the confidence to make that change and move faster too.)

---

## 6. Closing

Legibility is how you stay in control of the leverage you're building.

A black box that controls a thousand tireless agents isn't powerful — it's dangerous. The question that ends AI systems is always the same: *what did it do, and why?* The Dutch government couldn't answer it.[^5] Amazon couldn't answer it.[^4] Netscape lost three years trying to undo what they couldn't explain.[^6][^15]

Confidence is the currency. Can you audit it? Can a new person work with it? Can you change it without fear? If the answer to any of those is no, you have a legibility problem — and that problem compounds at AI speed.

Humans are the direction-givers. LLMs don't work without input. That's not a limitation, it's leverage — but only if you understand the system well enough to direct it. This is just the beginning of exponential leverage in knowledge work. It's going to keep getting more powerful.

Legibility isn't about slowing down. It's about making speed sustainable. The systems that survive won't be the fastest or most powerful. They'll be the ones humans can still understand.

---

## Footnotes Reference

[^llmflation]: Guido Appenzeller (a16z) — "Welcome to LLMflation" (2024). "For an LLM of equivalent performance, the cost is decreasing by 10x every year." a16z.com/llmflation-llm-inference-cost
[^math]: At 10x/year cost reductions, the math on daily token generation for a solo developer converges quickly. Full breakdown in a future post.
[^syntropic]: Syntropic137 — agent engineering framework. GitHub organization: github.com/Syntropic137. Repository not yet public.
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
[^16]: The Pragmatic Engineer — "The creator of Clawd: I ship code I don't read" (2025). Confirmed 6,600+ commits in January 2025 alone. newsletter.pragmaticengineer.com
[^22]: paulmillr — GitHub worldwide contributor leaderboard (Jan 2012–Jan 2013). TJ Holowaychuk (#1 globally): 7,458 contributions/year. gist.github.com/paulmillr/2657075
[^openclaw]: OpenClaw GitHub repository (github.com/openclaw/openclaw). Launched November 24, 2025. ~240,000 stars as of February 2026, closing in on React (~243k) as the most-starred software repository on GitHub. Peter Steinberger, creator (@steipete).
[^17]: Google — Gemini 1.5 Technical Report (2024). Demonstrated loading JAX codebase at 746,152 tokens in a single session. arxiv.org/abs/2403.05530
[^18]: Open Hub — React (facebook/react). ~593,499 LOC, 88% JavaScript / 11% TypeScript. openhub.net/p/facebook-react
[^19]: Open Hub — VS Code (microsoft/vscode). ~1,439,706 LOC, 97% TypeScript. openhub.net/p/vscode
[^20]: Stackscale — "Linux kernel surpasses 40 million lines" (Jan 2025). Linux 6.14 rc1: 40,063,856 total lines.
