# Verial Blog

**Truth-seeking. Applied.** Deep essays on engineering philosophy, systems thinking, and the exponential age.

🌐 [verial.xyz](https://verial.xyz)

## Stack

- **Framework:** Next.js + FumaDocs (MDX)
- **Monorepo:** Turborepo
- **Deploy:** Vercel
- **Styling:** Tailwind CSS

## Packages

| Package | Description |
|---------|-------------|
| `blog-site` | Main Next.js site |
| `design` | Design system components |
| `design-tokens` | Brand tokens and theme |
| `email-templates` | Newsletter email templates |
| `essay-manager` | Essay workflow tooling |
| `model-generator` | Diagram/model generation |
| `writing-pipeline` | Content pipeline and ideas |

## SEO & Distribution

Built-in, fully automatic — no manual steps needed after setup.

### Sitemap (`/sitemap.xml`)
Auto-generated from all FumaDocs content sources on every build. Google Search Console references this to discover pages.
- **See it:** [verial.xyz/sitemap.xml](https://verial.xyz/sitemap.xml)
- **Code:** `app/sitemap.ts`

### RSS Feed (`/feed.xml`)
Includes all essays and posts. Auto-updates on build. Use for syndication tools (dlvr.it, Feedly, etc.).
- **See it:** [verial.xyz/feed.xml](https://verial.xyz/feed.xml)
- **Code:** `app/feed.xml/route.ts`

### robots.txt (`/robots.txt`)
Tells search engine crawlers what to index. Points to sitemap.
- **See it:** [verial.xyz/robots.txt](https://verial.xyz/robots.txt)
- **Code:** `app/robots.ts`

### OG Images (`/og`)
Dynamic Open Graph image generator. Creates branded preview cards (Verial palette: dark bg, blue accent) when links are shared on Twitter, Discord, LinkedIn, iMessage, etc. Each page gets a unique image based on its title and description.
- **Test it:** [verial.xyz/og?title=Hello&description=Test](https://verial.xyz/og?title=Hello&description=Test)
- **Code:** `app/og/route.tsx` (edge runtime)

### Twitter/X Cards
`summary_large_image` cards configured on all pages. Uses the same OG images. No separate setup needed.

### RSS Auto-Discovery
`<link rel="alternate" type="application/rss+xml">` in `<head>` so browsers and feed readers auto-detect the feed.

---

## Integrations

### Vercel Analytics
Web Vitals + page views. Enabled via Vercel dashboard — no code changes needed.

- **Setup:** Vercel Dashboard → Project → Analytics → Enable
- **Cost:** Free on Hobby (2.5k events/day), unlimited on Pro ($20/mo)

### Buttondown (Newsletter)
Email signup and essay distribution. Subscribers get notified when new essays with `email_draft: true` are published.

- **Setup:** API key in Vercel env vars (`BUTTONDOWN_API_KEY`)
- **Trigger:** GitHub Action on merge to `main` when essay frontmatter has `email_draft: true`

### Google Search Console
SEO tracking — search queries, click-through rates, indexing status. Shows what search terms bring readers to the site.

- **Setup:** Add a TXT record in Namecheap (Advanced DNS → host `@` → value from Google)
- **URL:** [search.google.com/search-console](https://search.google.com/search-console)
- **Cost:** Free

## Distribution Strategy

When a new essay is published (merged to `main`), distribution happens in layers:

### Automatic (zero effort)
1. **Buttondown** — sends email to subscribers (triggered by `email_draft: true` in frontmatter)
2. **dlvr.it** — auto-posts to Twitter/X, LinkedIn, and Reddit from the RSS feed
3. **Sitemap + RSS** — update on build, Google re-crawls automatically
4. **OG images** — generated on-demand for link previews everywhere

### Manual (per essay)
5. **Hacker News** — submit manually, best Tue–Thu 8–10am ET. Craft the title for the HN audience.
6. **Substack** — optional cross-post with canonical URL pointing back to verial.xyz

### Workflow
```
Write essay → Open PR → Review → Merge to main
                                    ↓
                        Vercel builds + deploys
                                    ↓
                    ┌───────────────┼───────────────┐
                    ↓               ↓               ↓
              Buttondown        dlvr.it         Sitemap/RSS
              (email)      (Twitter/LinkedIn/   (Google index)
                            Reddit)
                                    ↓
                            Manual: HN, Substack
```

## Analytics & Monitoring

Three tools, each answering a different question:

| Tool | Question it answers | URL |
|------|-------------------|-----|
| **Vercel Analytics** | How fast is the site? (Web Vitals, page views, top pages) | Vercel Dashboard → Analytics |
| **Google Search Console** | How do people *find* the site? (queries, CTR, impressions, index coverage) | [search.google.com/search-console](https://search.google.com/search-console) |
| **Buttondown** | How does the newsletter perform? (subscribers, open rate, click rate) | [buttondown.com/emails](https://buttondown.com) |

### Review Cadence

| When | What to check |
|------|--------------|
| **After each publish** | OG image renders correctly, Buttondown email sent, page appears in sitemap |
| **Weekly** | Vercel Analytics (top pages, vitals regressions), Search Console (new queries, crawl errors) |
| **Monthly** | Search Console (index coverage trends, CTR by page), Buttondown (subscriber growth, open rates), Lighthouse CI scores over time |

### Key Metrics to Watch
- **Search Console:** Total impressions trending up, CTR > 3%, no index coverage errors
- **Vercel Analytics:** LCP < 2.5s, CLS < 0.1, top pages align with distribution efforts
- **Buttondown:** Open rate > 40%, unsubscribe rate < 1%

### Future Considerations
- **PostHog / Plausible** — if we need event tracking, funnels, or privacy-first analytics beyond Vercel's built-in
- **Grafana / Checkly** — uptime monitoring and synthetic checks
- **dlvr.it analytics** — track which social channels drive the most traffic back

## CI

GitHub Actions runs on every PR:

- **Security Audit** — `npm audit`
- **Build** — full production build (cached via Next.js + artifacts)
- **Playwright E2E** — end-to-end browser tests (Chromium)
- **Lighthouse** — performance, accessibility, best practices, SEO scores
- **Quality Gate** — blocks merge if tests or Lighthouse thresholds fail

## Development

```bash
npm install
npm run dev
```

Site runs at `http://localhost:3000`.
