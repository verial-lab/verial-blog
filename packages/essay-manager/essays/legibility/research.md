# Legibility Essay — Supporting Evidence & Footnotes

Research compiled 2026-02-13. Sources rated by credibility tier.
**Rule: Only Tier 1 and Tier 2 sources used as footnotes in the essay.**

---

## Credibility Tiers

### Tier 1 — Gold Standard (peer-reviewed, canonical, unimpeachable)

| # | Source | Year | Why It's Tier 1 | Supports |
|---|--------|------|-----------------|----------|
| 1 | **George Miller — "The Magical Number Seven, Plus or Minus Two"** | 1956 | One of the most cited papers in psychology history | Cognitive load limits — why legibility matters |
| 2 | **Eric Evans — *Domain-Driven Design*** | 2003 | The foundational text. Industry canon. | DDD as legibility, ubiquitous language, bounded contexts |
| 3 | **John Sweller — Cognitive Load Theory** | 2011 | Peer-reviewed, widely cited in education + design research | Working memory limits applied to system design |
| 4 | **Peng et al. — "The Impact of AI on Developer Productivity"** (Copilot study) | 2023 | Peer-reviewed, arXiv, rigorous controlled experiment (95 devs) | AI generates 55.8% faster → review gap widens |
| 5 | **Joel Spolsky — "Things You Should Never Do, Part I"** | 2000 | Universally recognized industry canon, cited everywhere | Rewrite cycle — Netscape lost 3 years and died |
| 6 | **Reuters (Jeffrey Dastin) — Amazon AI Recruiting Tool Scrapped** | 2018 | Major wire service, investigative journalism | Illegible system shut down — couldn't fix opaque bias |
| 7 | **Dutch Childcare Benefits Scandal** | 2020-21 | Documented government collapse, extensively sourced | Opaque algorithm → 26,000 false accusations → government fell |

### Tier 2 — Very Strong (respected industry authorities)

| # | Source | Year | Why It's Tier 2 | Supports |
|---|--------|------|-----------------|----------|
| 8 | **DORA 2024 Report (Google)** | 2024 | Annual DevOps report, large sample, respected methodology | 25% more AI adoption → 7.2% decrease in delivery stability |
| 9 | **Martin Fowler — Event Sourcing** | 2005 | Most respected voice in software architecture | Event sourcing as audit trail + temporal queries |
| 10 | **Martin Fowler — "What do you mean by Event-Driven?"** | 2017 | Same authority, clarifies event sourcing vs other patterns | Distinguishes event sourcing from event-driven |
| 11 | **Martin Fowler — Ubiquitous Language** | 2006 | Same authority | Shared language = legibility between devs and business |
| 12 | **Martin Fowler — Bounded Context** | 2014 | Same authority | Explicit boundaries → manageable, legible sub-models |
| 13 | **Martin Fowler — Strangler Fig Application** | 2004 | Same authority, widely adopted pattern | Industry developed a whole pattern to avoid rewrites |
| 14 | **Greg Young — CQRS Documents** | 2010 | Creator of modern CQRS/event sourcing, primary source | Events as first-class citizens, system becomes its own narrative |
| 15 | **Vaughn Vernon — *Implementing Domain-Driven Design*** | 2013 | Canonical DDD practitioner reference | Strategic DDD patterns for legibility |
| 16 | **Skelton & Pais — *Team Topologies*** | 2019 | Widely adopted, connects DDD to cognitive load | Software boundaries should align with team cognitive load limits |
| 17 | **Foote & Yoder — "Big Ball of Mud"** | 1999 | Academic pattern language paper, widely cited | How systems accumulate into illegible messes |
| 18 | **Microsoft Azure — Event Sourcing Pattern** | 2023 | Enterprise-grade, well-maintained | Validates event sourcing at production scale |
| 19 | **UK Ofqual Grading Algorithm (CNBC)** | 2020 | Major outlet covering documented policy reversal | Opaque algorithm → public outcry → historic U-turn |

### Tier 3 — Not Used as Footnotes (blogs, vendor content)

Kept for reference only. Not cited in essay.

- CodeRabbit "State of AI vs Human Code" (2025) — vendor research, potential bias (but 1.7× issues stat is interesting)
- IBM Think — "Why Observability Is Essential for AI Agents" (2025) — vendor content
- IEEE Computer Society — "Autonomous Observability" (2025) — trade publication
- N-iX / Kore.ai — agent observability pieces — vendor blogs
- LogRocket — "AI Coding Tools Shift Bottleneck to Review" (2025) — dev blog
- Herb Caudill — "6 Rewrite Stories" (2019) — Medium post
- thevaluable.dev — Cognitive Load in Software Dev (2022) — dev blog
- programmingisterrible — rewrite counterpoint (2014) — niche blog
- Sweller & Paas 2019 update — strong but redundant with Sweller 2011
- GitHub Blog Copilot research (2024) — redundant with Peng et al.

---

## Source Details

### 1. George Miller — "The Magical Number Seven, Plus or Minus Two"
- **Publication:** *Psychological Review*, 63(2), 81–97
- **URL:** https://psycnet.apa.org/record/1957-02914-001
- **PDF:** https://labs.la.utexas.edu/gilden/files/2016/04/MagicNumberSeven-Miller1956.pdf
- Human working memory holds ~7 ± 2 chunks. Any system exceeding this becomes illegible by definition.

### 2. Eric Evans — *Domain-Driven Design: Tackling Complexity in the Heart of Software*
- **Publisher:** Addison-Wesley
- **URL:** https://www.oreilly.com/library/view/domain-driven-design-tackling/0321125215/
- Primary source of complexity is the domain. Rich model + ubiquitous language = legibility for devs and stakeholders.

### 3. John Sweller — Cognitive Load Theory
- **Publication:** *Psychology of Learning and Motivation*, Vol. 55
- **URL:** https://www.sciencedirect.com/topics/psychology/cognitive-load-theory
- Distinguishes intrinsic, extraneous, and germane cognitive load. Design must respect working memory limits.

### 4. Peng et al. — Copilot Productivity Study
- **URL:** https://arxiv.org/abs/2302.06590
- 95 professional devs. Copilot group completed tasks 55.8% faster. Demonstrates code production outpacing review capacity.

### 5. Joel Spolsky — "Things You Should Never Do, Part I"
- **URL:** https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/
- Netscape rewrote Navigator from scratch → cost 3 years → killed the company. Ugly code contains hard-won bug fixes.

### 6. Reuters — Amazon AI Recruiting Tool
- **Author:** Jeffrey Dastin
- **URL:** https://www.reuters.com/article/world/insight-amazon-scraps-secret-ai-recruiting-tool-that-showed-bias-against-women-idUSKCN1MK0AG/
- Built 2014, scrapped 2017. Penalized women. Opaque biases couldn't be reliably corrected.

### 7. Dutch Childcare Benefits Scandal
- **URL:** https://en.wikipedia.org/wiki/Dutch_childcare_benefits_scandal
- Opaque algorithmic fraud detection falsely accused ~26,000 families. Court ruled SyRI violated human rights. Government fell Jan 2021.

### 8. DORA 2024 Report (Google)
- **URL:** https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report
- 25% increase in AI adoption → 7.2% decrease in delivery stability, 1.5% decrease in throughput.

### 9-13. Martin Fowler (collected)
- Event Sourcing: https://martinfowler.com/eaaDev/EventSourcing.html
- Event-Driven: https://martinfowler.com/articles/201701-event-driven.html
- Ubiquitous Language: https://martinfowler.com/bliki/UbiquitousLanguage.html
- Bounded Context: https://martinfowler.com/bliki/BoundedContext.html
- Strangler Fig: https://martinfowler.com/bliki/StranglerFigApplication.html

### 14. Greg Young — CQRS Documents
- **URL:** https://cqrs.files.wordpress.com/2010/11/cqrs_documents.pdf
- Storing events = complete audit trail + time-travel debugging. System's history becomes first-class.

### 15. Vaughn Vernon — *Implementing Domain-Driven Design*
- **URL:** https://www.amazon.com/Implementing-Domain-Driven-Design-Vaughn-Vernon/dp/0321834577
- Strategic DDD patterns: bounded contexts, context maps, ubiquitous language → legibility at scale.

### 16. Skelton & Pais — *Team Topologies*
- **URL:** https://teamtopologies.com/book
- Team structures should minimize cognitive load. If software is too complex for the team to reason about, the architecture must change.

### 17. Foote & Yoder — "Big Ball of Mud"
- **URL:** https://www.laputan.org/mud/
- Systems inevitably accumulate into haphazard messes. Inscrutable code has "survival advantage" because it's harder to replace.

### 18. Microsoft Azure — Event Sourcing Pattern
- **URL:** https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing
- Enterprise validation: audit trail, state reconstruction, scalability.

### 19. UK Ofqual Grading Algorithm
- **URL:** https://www.cnbc.com/2020/08/21/computer-algorithm-caused-a-grading-crisis-in-british-schools.html
- Opaque algorithm systematically downgraded disadvantaged students. Historic government U-turn.
