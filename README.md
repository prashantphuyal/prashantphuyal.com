# prashantphuyal.com

One-page personal site for Prashant Phuyal (Co-founder & CEO, Blanxer).
Single conversion goal: the free-consultation form.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 — tokens live in `app/globals.css`, there is no `tailwind.config`
- `motion` for animation, `lucide-react` for icons, `next-themes` for dark mode
- Deployed to **Cloudflare Workers** via `@opennextjs/cloudflare`
- Form notifications sent through **Amazon SES**

## Run it

```bash
npm install
npm run dev      # http://localhost:3210
```

Stop the dev server before running `npm run build` or `npm run cf:build` —
both write to `.next`, and a build while dev is live corrupts that directory.

## Editing content

**All copy lives in `lib/content.ts`.** Change it there, not in the components.

| Thing | Where |
|---|---|
| Name, role, tagline, email, WhatsApp | `site` |
| Social links | `socials` |
| Hero capability pills | `heroTags` |
| Scrolling amber band | `marquee` |
| Hero stats | `heroStats`, `heroSecondStat` |
| "What I Can Help With" accordion | `services` |
| Consultation copy + bullet lists | `offer` |
| Venture cards | `ventures` |
| About paragraphs and fact grid | `aboutParas`, `aboutFacts` |
| Client names, metric tiles | `clients`, `metrics` |
| Form dropdown + checkboxes | `companySizeOptions`, `helpOptions` |
| Hero photo | `portraitSrc` → a file in `/public` |

## The form

`app/actions.ts` is a server action. It validates, drops honeypot spam, then:

1. **Emails via SES** (`lib/email.ts`) if the AWS vars are set — this is the
   primary channel. `Reply-To` is the lead's own address, so replying from the
   inbox goes straight to them.
2. **Falls back to `LEAD_WEBHOOK_URL`** as a JSON POST if SES fails.
3. **If every configured channel fails**, the visitor is shown the direct email
   address rather than a silent success.
4. **If nothing is configured** (local dev), the lead is written to the server
   log so it isn't dropped unnoticed.

SES is called over its HTTPS API signed with `aws4fetch` (SigV4 over Web
Crypto) rather than the AWS SDK — the SDK depends on Node built-ins and is far
too heavy for the Workers runtime.

### SES setup

1. `MAIL_FROM` must be an identity verified in SES — either the address itself
   or its whole domain. (`blanxer.com` is verified, so `prashant@blanxer.com`
   works.) `MAIL_FROM_NAME` is the display name and is optional.
2. `AWS_REGION` must be the region the identity is verified in — currently
   `ap-south-1`.
3. The IAM key needs one permission: `ses:SendEmail`.
4. If the account is in the SES sandbox it can only send to verified addresses,
   so verify `LEAD_NOTIFY_EMAIL` too or request production access. (This account
   already has production access.)

`SES_FROM_EMAIL` is accepted as an alias for `MAIL_FROM` if you prefer it.

## Deploying to Cloudflare

```bash
npx wrangler login          # once
npm run cf:deploy
```

`npm run cf:preview` runs the built worker locally in workerd first — worth
doing, since it catches runtime problems `next build` cannot.

Set the secrets before or after the first deploy:

```bash
npx wrangler secret put AWS_ACCESS_KEY_ID
npx wrangler secret put AWS_SECRET_ACCESS_KEY
npx wrangler secret put AWS_REGION
npx wrangler secret put MAIL_FROM
npx wrangler secret put MAIL_FROM_NAME
npx wrangler secret put LEAD_NOTIFY_EMAIL
```

For local runs, wrangler reads the same values from `.dev.vars` (gitignored).
`.env.local` covers `npm run dev`. Neither file is ever committed.

Config notes:

- `nodejs_compat` is required by the OpenNext adapter — don't remove it.
- `images.unoptimized` is **on** in `next.config.ts`. The Workers runtime has no
  sharp, so Next's optimizer there needs a Cloudflare `IMAGES` binding and
  otherwise passes the original file straight through. The single photo on this
  site is already a 128 KB WebP, so the optimizer buys nothing. If you add many
  images later, add an `images` binding in `wrangler.jsonc` and turn this back
  off.
- `assets/prashant-master.png` is the lossless master (1.2 MB). It is **not** in
  `public/`, so it never ships. Re-export `public/prashant.webp` from it after
  any recrop: `magick assets/prashant-master.png -quality 86 public/prashant.webp`

## Design tokens

Semantic tokens are defined once on `:root` in `app/globals.css` and remapped
under `.dark`, so components only reference `surface`, `fg`, `line` and so on.
Brand palette: warm cream (`cream-*`), amber (`amber-brand` / `amber-deep`), warm
near-black (`ink-*`).

When adding a dark element, check it in dark mode — `bg-ink-900` disappears
there, so pair it with a `dark:` variant unless it sits on amber.

## Before going live

- [ ] Set the SES secrets in Cloudflare, then submit the form once and confirm it lands
- [ ] Confirm every URL in `socials`
- [ ] Point `site.url` at the real domain (drives canonical + OG tags)
- [ ] Add an OG share image (`app/opengraph-image.png`, 1200×630)
- [ ] Add a favicon (`app/icon.png`)
