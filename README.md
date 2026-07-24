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

Everything personal lives in **`lib/content.ts`** — name, tagline, KPIs, skills, timeline, leadership, and awards. Edit that one file to update the whole site.

| To change...                     | Edit...                                  |
|-----------------------------------|-------------------------------------------|
| Name, bio, links, skills, timeline | `lib/content.ts`                          |
| Resume PDF                        | Replace `public/resume.pdf`               |
| Profile photo                     | Replace `public/profile.jpg`              |
| Projects                          | Nothing — auto-pulled from your public GitHub repos on every build |
| Blog posts                        | Add/edit `.mdx` files in `content/blog/`  |
| Contact form destination          | `components/Contact.tsx` → set your real Formspree form ID (see below) |
| Phone number on vCard             | `lib/content.ts` → set `phone: '+1 774-701-4162'` (blank by default) |

### Contact form setup (Formspree)
1. Create a free form at [formspree.io](https://formspree.io).
2. Copy the form ID they give you.
3. In `components/Contact.tsx`, replace `YOUR_FORM_ID` in the `action` URL.

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
- **SEO** — per-page metadata, JSON-LD Person schema, sitemap.xml and robots.txt generated at build time.

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

## License

MIT
