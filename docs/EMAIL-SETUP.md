# Email Setup Guide

Complete guide to setting up the Verial email newsletter system with Buttondown.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Buttondown Account Setup](#buttondown-account-setup)
3. [Sending Domain (DNS)](#sending-domain-dns)
4. [Environment Variables](#environment-variables)
5. [Email Pipeline Usage](#email-pipeline-usage)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- A [Buttondown](https://buttondown.com) account (free tier works)
- Access to DNS management for `verial.xyz` (Namecheap)
- `BUTTONDOWN_API_KEY` from [buttondown.com/requests](https://buttondown.com/requests)

---

## Buttondown Account Setup

### 1. General Settings

Go to [buttondown.com/settings/general](https://buttondown.com/settings/general):

- **Author name:** Your name (appears in "From" field)
- **Newsletter name:** Verial
- **Time zone:** America/Los_Angeles
- **Tint color:** `#d9d0c1` (warm off-white, matches site primary)
- **Icon:** Upload Verial logo (300×300 PNG)

### 2. Email Design

Go to [buttondown.com/settings/email](https://buttondown.com/settings/email):

- **Template:** Modern (branded with masthead)
- **Header/Footer:** Can leave default — our pipeline generates full email HTML

### 3. Tags

Go to [buttondown.com/tags](https://buttondown.com/tags) and create:

| Tag | Description |
|-----|-------------|
| `essays` | Long-form essay subscribers (all subscribers get this) |
| `posts` | Engineering posts & updates |
| `systems` | Systems/framework documentation updates |

These tags are automatically applied by the subscribe API when users check the "Also get posts & systems updates" checkbox.

### 4. Welcome Automation (Optional)

Go to [buttondown.com/automations](https://buttondown.com/automations):

- **Trigger:** Subscriber activated
- **Action:** Send welcome email
- **Content:** Welcome message introducing Verial

---

## Sending Domain (DNS)

**Why:** Without a custom sending domain, Buttondown sends from their shared domain. Emails are more likely to land in spam. Setting up `mail.verial.xyz` means emails come from `noreply@mail.verial.xyz`.

### Step 1: Add Domain in Buttondown

1. Go to [buttondown.com/settings/sending](https://buttondown.com/settings/sending)
2. Enter `mail.verial.xyz` as the sending subdomain
3. Buttondown will display **2 NS record values** — copy these

### Step 2: Add DNS Records in Namecheap

1. Log in to [Namecheap](https://www.namecheap.com/)
2. Go to **Domain List** → click **Manage** next to `verial.xyz`
3. Go to **Advanced DNS** tab
4. Add two NS records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| NS | `mail` | *(first NS value from Buttondown)* | Automatic |
| NS | `mail` | *(second NS value from Buttondown)* | Automatic |

> **Important:** The Host field is just `mail`, not `mail.verial.xyz`. Namecheap appends the domain automatically.

### Step 3: Verify

1. Go back to [buttondown.com/settings/sending](https://buttondown.com/settings/sending)
2. Click **Verify**
3. If it fails, wait 30 minutes and try again (DNS propagation can take up to 48h, but usually resolves in under an hour)

### Step 4: Confirm It Works

1. Subscribe with a test email on the blog
2. Check that the confirmation email arrives (check spam folder)
3. The "From" address should show `mail.verial.xyz`

> **Note:** Buttondown manages DKIM, SPF, DMARC, and return-path automatically when using the NS delegation approach. No additional DNS records needed.

---

## Environment Variables

Required in both local `.env` and Vercel dashboard:

```bash
# Buttondown API key — get from https://buttondown.com/requests
BUTTONDOWN_API_KEY=your-api-key-here

# GitHub feedback token (fine-grained PAT, Issues write only)
GITHUB_FEEDBACK_TOKEN=your-token-here
```

See `packages/blog-site/.env.example` for the full list.

For the email pipeline scripts, `BUTTONDOWN_API_KEY` must also be available in CI (GitHub Actions secret) for automated draft creation.

---

## Email Pipeline Usage

### Automatic (via GitHub Action)

When you merge content to `main` with `send_email: true` in frontmatter:

```yaml
---
title: "My New Essay"
date: 2026-02-15
type: essay          # essay | post | systems
send_email: true     # triggers the email pipeline
excerpt: "A brief preview..."
---
```

The GitHub Action:
1. Detects new/changed MDX files with `send_email: true`
2. Converts MDX → email-safe HTML
3. Creates a **draft** in Buttondown (does NOT auto-send)
4. You review the draft at [buttondown.com/emails](https://buttondown.com/emails)
5. One-click send when ready

### Manual

Create a draft from any MDX file:

```bash
pnpm email:draft packages/blog-site/content/essays/my-post.mdx
```

Preview email templates locally:

```bash
pnpm email:preview
```

This starts a local react-email dev server where you can see rendered templates.

### Tag Routing

Tags are automatically applied based on content type:

| Content Type | Tags Applied | Recipients |
|---|---|---|
| `essay` | `[essays]` | All subscribers |
| `post` | `[essays, posts]` | Subscribers who opted into posts |
| `systems` | `[essays, systems]` | Subscribers who opted into systems |

When sending from Buttondown dashboard, you can also manually filter by tag under **Audience**.

---

## Troubleshooting

### Confirmation emails not arriving
- **Most likely:** Sending domain not set up. Complete the DNS setup above.
- Check Buttondown's subscriber list — if status is "unactivated", the confirmation was sent but may be in spam.
- Verify DNS with: `dig NS mail.verial.xyz` (should return Buttondown's nameservers)

### Subscriber shows "unactivated"
- They haven't clicked the confirmation link
- Resend confirmation from Buttondown dashboard (Subscribers → click subscriber → Resend)
- Or bypass double opt-in via API by setting `type: "regular"` (not recommended for public signups)

### Email draft not created after merge
- Check GitHub Actions tab for workflow errors
- Verify `BUTTONDOWN_API_KEY` is set as a repository secret
- Ensure MDX file has `send_email: true` in frontmatter

### Tags not appearing on subscribers
- Tags are created automatically when a subscriber is tagged
- Verify the subscribe API route is sending the correct tags (check `packages/blog-site/app/api/subscribe/route.ts`)
