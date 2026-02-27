# Supporting Sources: "Legibility" in AI-Era Software Systems

Research compiled 2026-02-13.

---

## 1. AI Code Generation Outpacing Human Comprehension

### Source 1a: Peng et al. — "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot"
- **Authors:** Sida Peng, Eirini Kalliamvakou, Peter Cihon, Mert Demirer
- **Year:** 2023
- **URL:** https://arxiv.org/abs/2302.06590
- **Summary:** Controlled experiment with 95 professional developers. The Copilot group completed tasks **55.8% faster**, demonstrating massive generation speed increases that widen the gap between code production and human review capacity.

### Source 1b: Google DORA Report 2024 — AI Adoption Decreases Delivery Stability
- **Authors:** DORA team (Google Cloud)
- **Year:** 2024
- **URL:** https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report
- **Summary:** Found that a 25% increase in AI adoption correlated with a **7.2% decrease in delivery stability** and a **1.5% decrease in delivery throughput**. Suggests AI-generated code volume creates downstream quality problems faster than teams can absorb.

### Source 1c: CodeRabbit — "State of AI vs Human Code Generation Report"
- **Authors:** CodeRabbit
- **Year:** 2025
- **URL:** https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report
- **Summary:** Analysis of 470 open-source GitHub PRs found AI-generated code produces **1.7× more issues** per PR (10.83 vs 6.45), meaning the review burden per unit of AI code is significantly higher than for human code.

### Source 1d: GitHub Blog — "Quantifying GitHub Copilot's Impact on Developer Productivity and Happiness"
- **Authors:** GitHub (Eirini Kalliamvakou et al.)
- **Year:** 2024
- **URL:** https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/
- **Summary:** GitHub's own research showing Copilot users report higher productivity and satisfaction, but the focus on speed metrics reveals the asymmetry: code is generated far faster than it can be reviewed and understood.

### Source 1e: LogRocket — "Why AI Coding Tools Shift the Real Bottleneck to Review"
- **Authors:** LogRocket Blog
- **Year:** 2025
- **URL:** https://blog.logrocket.com/ai-coding-tools-shift-bottleneck-to-review/
- **Summary:** Reports that nearly half of developers say debugging AI output takes longer than fixing human-written code. Argues AI has shifted the bottleneck from writing to reviewing/understanding code.

---

## 2. Agent Observability / Explainability

### Source 2a: IBM — "Why Observability Is Essential for AI Agents"
- **Authors:** IBM Think
- **Year:** 2025
- **URL:** https://www.ibm.com/think/insights/ai-agent-observability
- **Summary:** Argues that multi-agent systems create exponentially more potential for unpredictable behavior, and that observability is critical for understanding interactions between autonomous AI agents in production.

### Source 2b: IEEE Computer Society — "Autonomous Observability: AI Agents That Debug AI"
- **Authors:** IEEE Computer Society
- **Year:** 2025
- **URL:** https://www.computer.org/publications/tech-news/community-voices/autonomous-observability-ai-agents
- **Summary:** Emphasizes the need for step-by-step reasoning explanations from agents to promote trust and adoption. Highlights that high-fidelity metrics, logs, and traces from all critical systems are required for explainability.

### Source 2c: N-iX — "AI Agent Observability: A Practical Framework for Reliable and Governed Agentic Systems"
- **Authors:** N-iX
- **Year:** 2025
- **URL:** https://www.n-ix.com/ai-agent-observability/
- **Summary:** Defines AI agent observability as monitoring every reasoning step, tool call, memory reference, and decision an autonomous agent makes — from initial request to final output. Makes the case that without this, agentic systems are ungovernable.

### Source 2d: Kore.ai — "AI Observability: Monitoring and Governing AI Agents"
- **Authors:** Kore.ai
- **Year:** 2025
- **URL:** https://www.kore.ai/blog/what-is-ai-observability
- **Summary:** Describes how semantic analysis layers detect drift, hallucinations, and guardrail violations, arguing that observability transforms AI agents "from opaque automation to explainable intelligence."

---

## 3. Systems Shut Down Due to Illegibility / Black-Box Nature

### Source 3a: Amazon AI Recruiting Tool — Scrapped for Uncontrollable Bias
- **Authors:** Jeffrey Dastin (Reuters)
- **Year:** 2018
- **URL:** https://www.reuters.com/article/world/insight-amazon-scraps-secret-ai-recruiting-tool-that-showed-bias-against-women-idUSKCN1MK0AG/
- **Summary:** Amazon developed an AI recruiting system starting in 2014, but scrapped it in 2017 after discovering it penalized women. The system's learned biases were opaque and couldn't be reliably corrected — a classic case of an illegible system being abandoned.

### Source 3b: UK A-Level Grading Algorithm (Ofqual) — Abandoned After Public Outcry
- **Authors:** CNBC / multiple outlets
- **Year:** 2020
- **URL:** https://www.cnbc.com/2020/08/21/computer-algorithm-caused-a-grading-crisis-in-british-schools.html
- **Summary:** When COVID cancelled exams, Ofqual used an algorithm to assign grades that systematically downgraded students from disadvantaged schools. The algorithm's logic was opaque and perceived as unjust; the government performed a historic U-turn and reverted to teacher-assessed grades.

### Source 3c: Dutch Childcare Benefits Scandal (SyRI) — Algorithm Caused Government to Fall
- **Authors:** Wikipedia / multiple sources
- **Year:** 2020–2021
- **URL:** https://en.wikipedia.org/wiki/Dutch_childcare_benefits_scandal
- **Summary:** The Dutch tax authority used opaque algorithmic fraud detection that falsely accused ~26,000 families. A court ruled the SyRI system violated human rights. The scandal ultimately brought down the Dutch government in January 2021 — arguably the most dramatic consequence of an illegible system in modern history.

### Source 3d: MIT Technology Review — "The UK Exam Debacle Reminds Us That Algorithms Can't Fix Broken Systems"
- **Authors:** MIT Technology Review
- **Year:** 2020
- **URL:** https://www.technologyreview.com/2020/08/20/1007502/uk-exam-algorithm-cant-fix-broken-system/
- **Summary:** Analysis of the Ofqual failure arguing the fundamental error was deploying an opaque algorithmic system that couldn't be explained to or challenged by the people it affected.

---

## 4. The Rewrite Cycle

### Source 4a: Joel Spolsky — "Things You Should Never Do, Part I"
- **Author:** Joel Spolsky
- **Year:** 2000
- **URL:** https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/
- **Summary:** The canonical essay arguing that rewriting software from scratch is the "single worst strategic mistake" a company can make. Uses Netscape's decision to rewrite Navigator (which cost 3 years and effectively killed the company) as the primary cautionary tale. Argues that ugly, complex code contains hard-won bug fixes and domain knowledge.

### Source 4b: Herb Caudill — "Lessons from 6 Software Rewrite Stories"
- **Author:** Herb Caudill
- **Year:** 2019
- **URL:** https://medium.com/@herbcaudill/lessons-from-6-software-rewrite-stories-635e4c8f7c22
- **Summary:** Revisits Spolsky's thesis with six case studies (Netscape, Basecamp, Visual Studio, Gmail, FogBugz, etc.), finding that rewrites can succeed under specific conditions but confirming that the Netscape-style "big bang" rewrite is almost always catastrophic.

### Source 4c: Foote & Yoder — "Big Ball of Mud"
- **Authors:** Brian Foote, Joseph Yoder
- **Year:** 1999
- **URL:** https://www.laputan.org/mud/
- **Summary:** Seminal pattern language paper describing how software systems inevitably accumulate into "big balls of mud" — haphazardly structured systems where expediency beats design. Notably observes that inscrutable code has a "survival advantage" over clean code because it's harder to replace.

### Source 4d: Martin Fowler — "Strangler Fig Application"
- **Author:** Martin Fowler
- **Year:** 2004
- **URL:** https://martinfowler.com/bliki/StranglerFigApplication.html
- **Summary:** Fowler's influential pattern for incrementally replacing legacy systems instead of doing big-bang rewrites. The pattern's existence and widespread adoption is itself evidence of how dangerous full rewrites are — the industry developed a whole architectural pattern to avoid them.

### Source 4e: programmingisterrible — "Getting Away with Rewriting Code from Scratch"
- **Author:** tef (programmingisterrible)
- **Year:** 2014
- **URL:** https://programmingisterrible.com/post/73023853878/getting-away-with-rewriting-code-from-scratch
- **Summary:** A nuanced counterpoint to Spolsky, arguing that rewrites sometimes succeed but acknowledging the enormous risks. Useful as a source showing the debate is still active 20+ years later.
