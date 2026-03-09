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

- **Setup:** Add TXT record to DNS (`google-site-verification=...`)
- **URL:** [search.google.com/search-console](https://search.google.com/search-console)
- **Cost:** Free

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
