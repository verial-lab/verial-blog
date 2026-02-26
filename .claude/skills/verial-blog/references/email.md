# Email System Reference (Buttondown)

## Architecture

```
Content MDX (send_email: true)
  → GitHub Action detects on merge
  → send-draft.ts converts MDX → email HTML
  → Creates Buttondown draft with tags
  → NeuralE reviews + one-click send
```

## Sending Domain

- Domain: `mail.verial.xyz` (Buttondown managed)
- NS records in Namecheap → Buttondown DNS
- Verified and working

## Subscription Flow

1. User enters email on site → `POST /api/subscribe`
2. API calls Buttondown with tags based on signup source
3. Buttondown sends double opt-in confirmation email
4. User confirms → subscriber activated
5. (Planned) Welcome email automation triggers

## Tag Routing

| Content type | Buttondown tags | Recipients |
|---|---|---|
| essay | `[essays]` | All subscribers |
| post | `[essays, posts]` | Subscribers who opted into posts |
| systems | `[essays, systems]` | Subscribers who opted into systems |

## Brand Constants

All email branding sourced from `lib/brand.ts`:
- Newsletter name, author, tagline, description
- Subscribe CTA text, confirmation messaging
- Tint color: `#d9d0c1`

## Key Files

- `packages/blog-site/app/api/subscribe/route.ts` — signup endpoint
- `packages/blog-site/lib/brand.ts` — centralized brand constants
- `packages/email-templates/` — react-email templates + send script
- `docs/EMAIL-SETUP.md` — full setup documentation

## GitHub Issues

- #15 — Buttondown integration (tag-filtered sends + sending domain)
- #16 — Email automation pipeline (design tokens + react-email + GitHub Action)
- #20 — End-to-end setup checklist
