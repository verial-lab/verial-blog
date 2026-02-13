# Content Distribution Pipeline

## Overview

Blog-first distribution. Verial is the source of truth. Every other platform is a derivative — same idea, different packaging.

**You write. Everything else is automated.**

Full process spec: `PARA/Projects/career-strategy-2026/content-principles.md`

## Distribution Stack

| Platform | Tool | Cost | Purpose |
|----------|------|------|---------|
| Twitter/X | Typefully | $12/mo | Primary social |
| LinkedIn | Typefully | (included) | Professional mirror |
| Threads | Typefully | (included) | Free extra reach |
| Bluesky | Typefully | (included) | Free extra reach |
| Email | Buttondown | Free/cheap | Newsletter for subscribers |

## Typefully Integration

- **API:** v2 REST API (released Dec 2025)
- **Docs:** https://typefully.com/docs/api
- **Auth:** API key in request header (Settings → API)
- **Capabilities:** Create drafts, schedule posts, publish, webhooks
- **Webhooks:** Can trigger on publish events

### Creating a Draft via API

```bash
curl -X POST https://api.typefully.com/v2/drafts \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Your tweet text here",
    "platforms": ["twitter", "linkedin"],
    "status": "draft"
  }'
```

(Confirm exact schema against API docs when implementing)

### Flow: Blog Publish → Social Drafts

```
Blog post published on Verial
    → NeuralClaw detects (webhook, cron check, or manual trigger)
    → Generates platform-specific derivatives:
       - Twitter: punchy thread (hook + insights + link)
       - LinkedIn: 200 words, professional framing + link
       - Threads/Bluesky: same as Twitter
    → Pushes all as drafts to Typefully via API
    → NeuralE reviews in Typefully → one-click approve
```

## Platform Voice Templates

### Twitter/X
- **Tone:** Sharp, direct, slightly provocative
- **Length:** 1 tweet or 3-5 tweet thread
- **Hook:** Contrarian take or surprising insight
- **Hashtags:** None

### LinkedIn
- **Tone:** Authoritative, reflective, professional
- **Length:** 150-300 words
- **Hook:** "I've been thinking about..." or bold claim
- **Hashtags:** 2-3 relevant

### Email (Buttondown)
- **Tone:** Personal, slightly more casual than blog
- **Format:** Brief intro → key takeaway → link to full piece
- **Exclusive:** 1-2 sentences of context not in blog post
- **Tags:** essays, systems, posts, everything (subscribers choose what they get)

## Email Subscriber Tags

Subscribers can opt into:
- `essays` — long-form only (1-2 months)
- `systems` — frameworks + essays
- `everything` — posts + systems + essays

Each content type triggers emails only to the matching tag group.

## Implementation Checklist

- [ ] Typefully account + API key
- [ ] NeuralClaw Typefully API integration script
- [ ] Blog-publish detection (webhook or cron)
- [ ] Buttondown email PR (tag routing: essays/systems/everything)
- [ ] Buttondown draft generation from blog posts
- [ ] End-to-end test: publish → approve all derivatives
