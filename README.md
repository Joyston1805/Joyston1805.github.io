# Joyston Fernandes — Data Analyst Portfolio

Personal portfolio built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, statically exported and deployed to **GitHub Pages**. Includes auto-fetched GitHub projects, live GitHub stats, a blog, dark/light mode, and two QR codes (site link + save-contact vCard).

![screenshot placeholder](public/profile.jpg)
<!-- Replace the line above with a real screenshot of the deployed site once it's live -->

**Tech:** ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-purple)

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build the static site locally (same thing GitHub Actions does):

```bash
npm run build
```

Output lands in `/out` — you can open `out/index.html` directly or serve it with any static server.

---

## Updating content

Content is split across three config files. Between them they cover everything on the site — you should almost never need to open a component.

| File | What it holds |
|---|---|
| **`lib/content.ts`** | The facts about you: name, tagline, resumes, KPIs, skills, timeline, leadership, awards, flagship project, Lossdog link |
| **`lib/site.ts`** | The shape of the site: section order, section headings and blurbs, nav links |
| **`lib/creator.ts`** | Travels of Joy, Prints of Joy, and the shop |

| To change...                     | Edit...                                  |
|-----------------------------------|-------------------------------------------|
| Name, bio, links, skills, timeline | `lib/content.ts`                          |
| Resume PDFs                       | Upload to `public/`, list in `lib/content.ts` → `resumes` |
| Section headings and eyebrows     | `lib/site.ts` → `copy`                    |
| Order of homepage sections        | `lib/site.ts` → `homeSections`            |
| Nav bar links                     | `lib/site.ts` → `navLinks`                |
| Accent colours                    | `tailwind.config.ts` → `signal.amber` / `signal.teal` |
| Profile photo                     | Replace `public/profile.jpg`              |
| Projects                          | Nothing — auto-pulled from your public GitHub repos on every build |
| Blog posts                        | Add/edit `.mdx` files in `content/blog/`, or use the [Blog Studio](#blog-studio) at `/studio` |
| YouTube channels, Instagram, Facebook, shop | `lib/creator.ts`                |
| Lossdog career profile card       | `lib/content.ts` → `lossdog`              |
| Contact form destination          | `components/Contact.tsx` → set your real Formspree form ID (see below) |
| Phone number on vCard             | `lib/content.ts` → set `phone: '+1 774-701-4162'` (blank by default) |

### Contact form setup (Formspree)
1. Create a free form at [formspree.io](https://formspree.io).
2. Copy the form ID they give you.
3. In `components/Contact.tsx`, replace `YOUR_FORM_ID` in the `action` URL.

---

## Customizing the site

### Reordering or hiding sections

`lib/site.ts` has a single list that *is* the homepage:

```ts
export const homeSections: SectionKey[] = [
  'hero', 'about', 'skills', 'timeline', 'career', 'leadership',
  'featured', 'projects', 'rpubs', 'github', 'beyond', 'resume',
  'blog', 'contact',
];
```

Move a line to move that section. Delete a line (or comment it out with `//`) to hide it. Nothing else needs changing — `app/page.tsx` renders whatever this list says, in this order.

### Changing the words

Every eyebrow, heading, and blurb lives in `copy` in the same file. Change `copy.contact.heading` and the Contact section's heading changes. Set any `blurb` to `''` to hide that paragraph.

The About section takes an array of paragraphs — add or remove strings to add or remove paragraphs.

### Changing the colours

Two hex values in `tailwind.config.ts`, under `signal.amber` and `signal.teal`, drive every accent on the site: buttons, chips, links, timeline dots, chart highlights. Change those two and everything recolours together.

---

## Resumes

`lib/content.ts` holds a `resumes` list. The first entry is the primary one — it's what the navbar button, the hero button, and the About section link to. Every entry appears as a card in the Resume section on the homepage, with a download button and an in-browser view.

**To replace your resume with no code change:** in GitHub, open the `public` folder → **Add file → Upload files** → drop in a PDF with the same filename (`resume.pdf`). It overwrites the old one. Bump the `updated` field so visitors see the right date.

**To add a second tailored version:** upload it under a new filename (say `resume-analytics.pdf`), then add an entry to `resumes`. There's a commented-out example in the file showing the shape.

---

## Beyond the Data — channels and socials

The `/beyond` page and the matching homepage section are driven entirely by **`lib/creator.ts`**.

Each entry is a **brand**, not just a channel — one YouTube channel plus whatever Instagram, Facebook, and shop links belong with it. Currently:

| Brand | YouTube | Also |
|---|---|---|
| Travels of Joy | [@TravelsofJoyTV](https://www.youtube.com/@TravelsofJoyTV) | Instagram, Facebook, music on homeofjoy.net |
| Prints of Joy | [@PrintsofJoy](https://www.youtube.com/@PrintsofJoy) | Instagram, print files on homeofjoy.net |

To add a third, copy one of the blocks in `lib/creator.ts` and fill it in — the layouts adapt to however many there are.

### Latest videos

Both channel IDs are already filled in, so the site reads each channel's public RSS feed at build time (`lib/youtube.ts`) and shows the three most recent uploads. No API key, no quota, nothing secret in the repo.

Find a channel ID at <https://www.youtube.com/account_advanced> while signed in to that channel — it starts with `UC`.

If a channel ID is missing or YouTube is unreachable, the brand still renders and the video strip is simply skipped, so a bad ID can never break the build.

Because uploads are baked in at build time, the deploy workflow runs **every Monday at 06:00 UTC** so the video lists stay current on their own. You can also hit **Actions → Deploy to GitHub Pages → Run workflow** any time you post something you want featured immediately.

---

## Career profile (Lossdog)

A small card under Experience links to your Lossdog profile. Configure it in `lib/content.ts` under `lossdog`.

**Check this before relying on it:** open the URL in a private/incognito window. `app.lossdog.com/conversation/...` links are tied to your signed-in session, so if it shows a blank page or a login screen there, visitors won't see anything either. If Lossdog offers a public/share profile URL, use that. To hide the card entirely, set `enabled: false`.

---

## Blog

### Front matter

Every post is an `.mdx` file in `content/blog/`. See `content/blog/_template.mdx` for a fully commented reference (files starting with `_` are ignored by the site).

| Field | What it does |
|---|---|
| `title` | Required |
| `date` | Required, `YYYY-MM-DD`. Controls sort order |
| `updated` | Optional. Shows "Updated ..." on the post |
| `excerpt` | Shows on cards, in search, and in link previews |
| `tags` | Become the filter chips on `/blog` and drive "Related reading" |
| `category` | A short label shown above the title |
| `cover` / `coverAlt` | Cover image (put the file in `public/blog/`) |
| `draft: true` | Built but unlisted, `noindex`, and visible only in `npm run dev` |
| `featured: true` | Gets the large hero card at the top of `/blog` |
| `pinned: true` | Always sorts first, regardless of date |

Drafts still get a real URL, so you can deploy one and send the link to someone for feedback before it appears anywhere on the site.

### Blog Studio

Visit **`/studio`** on the live site (or `localhost:3000/studio`) for a browser-based editor: front-matter form, formatting toolbar, live preview, and a word count. It runs entirely client-side and saves nothing — it just produces the `.mdx` file, three ways:

- **Publish via GitHub** — opens GitHub's new-file screen with the filename and content pre-filled. Commit, and the site rebuilds itself. This is the one to use from a phone.
- **Copy MDX** — clipboard, paste wherever.
- **Download** — saves the `.mdx` to drag into the repo later.

Published posts also carry an **Edit on GitHub** link at the bottom, which opens that exact file in GitHub's editor for quick fixes.

The page is `noindex` and excluded in `robots.ts`. It's a convenience tool, not a login — publishing still requires write access to the repo.

---

## Deployment to GitHub Pages

This repo is set up as a **GitHub user site**, which must be named exactly:

```
Joyston1805.github.io
```

User sites are served from the domain root, so `next.config.js` intentionally has **no `basePath`**.

**Steps:**
1. Create a new GitHub repo named exactly `Joyston1805.github.io`.
2. Push this code to the `main` branch.
3. In the repo, go to **Settings → Pages → Source**, and select **"GitHub Actions"**.
4. Push again (or re-run the workflow) — `.github/workflows/deploy.yml` will build and publish automatically.
5. Your site goes live at **https://joyston1805.github.io**.

Every future push to `main` redeploys automatically — including picking up any new GitHub repos in the Projects section.

### Custom domain (optional, later)
Add a `CNAME` file to `/public` containing your domain, then point your domain's DNS at GitHub Pages per [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

---

## Features

- **Auto-fetched projects** — pulled from the GitHub API at build time (`lib/github.ts`), so visitors never hit GitHub's rate limit.
- **Live GitHub stats** — embedded via the community `github-readme-stats` image service; these update on their own, no rebuild needed.
- **Blog** — MDX-based, in `content/blog/`, with reading-time estimates and tags.
- **Dark/light mode** — via `next-themes`, respects system preference, persists across visits.
- **QR codes** — one encodes the live site URL (for print), the other encodes a vCard so scanning it offers to save your contact directly. Toggle between them in the Contact section.
- **Beyond the Data** — Travels of Joy and Prints of Joy, with latest uploads pulled from public YouTube RSS at build time, plus Instagram, Facebook, and the Home of Joy shop.
- **Blog Studio** — client-side post editor at `/studio` that writes MDX and pushes it through GitHub.
- **SEO** — per-page metadata, JSON-LD Person schema (including channel, social, and shop URLs), sitemap.xml and robots.txt generated at build time.

---

## A note on dependency security

`npm audit` will flag a few advisories in Next.js's own server/middleware/image-optimization code. Those apply to **self-hosted Next.js servers** — this project uses a **fully static export** (`output: 'export'`) deployed to GitHub Pages, which has no Node server, middleware, or image optimization API at runtime, so that attack surface doesn't apply here. `postcss` and `next-mdx-remote` are pinned to patched versions.

---

## Checklist — things still worth doing

- [ ] Decide whether to add your phone number to the vCard (`lib/content.ts`)
- [ ] Set your real Formspree form ID in `components/Contact.tsx`
- [ ] Write real content for the two draft blog posts in `content/blog/` (or delete them)
- [ ] Add `homepage` URLs to your GitHub repos so the "Live" badge shows up on project cards
- [ ] Once deployed, generate the site-link QR code from the live site and get it printed on a business card/resume
- [ ] Optional: swap the placeholder favicon for a real one
- [ ] Review the "Currently Learning" skills group in `lib/content.ts` — it lists Docker, FastAPI, MLflow, CI/CD, monitoring, and cloud deployment. Cut anything you haven't actually touched yet
- [ ] Bump `updated` in `resumes` when you upload a new PDF
- [ ] Add your third YouTube channel to `lib/creator.ts` (a commented slot is waiting for it)
- [ ] Open the Lossdog link in an incognito window to confirm visitors can actually see it
- [ ] homeofjoy.net still shows the template's "Your Artist Name" placeholder — worth fixing before driving traffic to it

## License

MIT
