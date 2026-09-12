# St Joseph's Catholic Church, Millfield, Sunderland

Parish website for St Joseph's, a Roman Catholic church in Millfield, Sunderland, in the Diocese of Hexham & Newcastle.

The 2017 repository did not contain a public parish website. It held a Maven / Selenium test suite (see [What was here before](#what-was-here-before)). This project adds a simple, mobile-first site that people can actually use.

## How to run

You need [Node.js](https://nodejs.org/) 20 or newer.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other commands:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # Next.js lint
```

After a build you can host the site on any host that runs a Node Next.js server. Volunteer edits are saved to a JSON file on disk (see [Parish login](#parish-login)). Serverless hosts may not keep that file between deploys.

## Pages

- **Welcome** — greeting, published weekend Mass times, and links into the site
- **Who we are** — parish history, clergy names, school, and diocesan cluster
- **Mass times** — Saturday Vigil 5.30pm and Sunday 9.30am, as published by the diocese
- **Find us** — Paxton Terrace, Millfield, with an OpenStreetMap pin on the church
- **Notices** — placeholders until the parish adds real news
- **Contact** — published telephone and email
- **Parish login** (`/admin`) — shared-password editor for volunteers; not in the main nav

## Parish login

Volunteers can update the public site from `/admin` without editing source files.

1. Copy [`.env.example`](.env.example) to `.env.local`.
2. Set a shared password:

   ```bash
   PARISH_ADMIN_PASSWORD=choose-a-long-shared-password
   ```

3. Restart `npm run dev` so Next.js picks up the variable.
4. Open [http://localhost:3000/admin](http://localhost:3000/admin) and sign in.
5. Edit weekend Mass times, weekday/Confession notes, telephone, email, the homepage welcome blurb, and notices (add, edit, remove, or mark a notice as a placeholder).
6. Save, then open the public pages. In `npm run dev` the homepage updates on the next load — no rebuild.
7. Use **Log out**. The session is an httpOnly cookie (about 12 hours).

If `PARISH_ADMIN_PASSWORD` is unset, `/admin` explains that the password must be set and refuses login. There is no public registration and no user accounts — one parish password only.

Never commit `.env.local` or a real password. Saved edits go to `data/parish.json`, which is gitignored. If that file is missing, the site falls back to [`src/content/parish.ts`](src/content/parish.ts) and [`src/content/notices.ts`](src/content/notices.ts).

A tiny **Parish login** link sits in the footer. It is not in the main navigation.

## How to edit content in the source files

The TypeScript files remain the default if nobody has saved from `/admin`:

- [`src/content/parish.ts`](src/content/parish.ts) — name, address, telephone, email, clergy, Mass times, school, map pin, welcome blurb
- [`src/content/notices.ts`](src/content/notices.ts) — newsletters and notices

Change the wording, save the file, and refresh the site. For a notice that is ready to publish, set `isPlaceholder` to `false` and add a date if you have one — or do the same from `/admin`.

## What the parish still needs to fill in

These items are shown on the site as **“For the parish to complete”**. Please do not leave invented times or names in their place.

- Weekday Mass times
- Confession / Reconciliation times
- Holy Day of Obligation times
- How to arrange baptism, marriage, and funerals
- Parish office hours and a dedicated parish email, if the cluster address should not be the public contact
- Clergy roles (Parish Priest, and so on)
- Parking, bus routes, and step-free access notes
- Current newsletter and real notices (no made-up event dates)
- A short seasonal welcome, ministries, and any livestream or accessibility note

Weekend Mass times, telephone, cluster email, clergy names, address, school details, and the building history are taken from public official sources. Please check them before treating the site as the parish’s last word, especially around Christmas, Easter, and holiday periods.

### Sources used

- [Diocese of Hexham & Newcastle — St Joseph, Sunderland](https://diocesehn.org.uk/church/st-joseph-6/)
- [Taking Stock — Sunderland, St Joseph](https://taking-stock.org.uk/building/sunderland-st-joseph/)
- [St Joseph’s Catholic Primary School — Our Parish](https://stjs.org.uk/our-parish)
- OpenStreetMap, which maps the church as *St Joseph’s RC Church*, Paxton Terrace (SR4 6HS). The diocesan directory lists SR4 6HP.

## What was modernised

| Before | After |
| --- | --- |
| Java / Maven project named `StJosephChurch` | Next.js (App Router), React, and Tailwind CSS |
| Selenium tests aimed at a billing login, not a parish homepage | Public pages for welcome, Mass times, directions, and contact |
| No visitor-facing content | UK English copy, phone-first layout, keyboard navigation, and readable type |
| Project at repository root | New site at the repository root; old tree moved to [`legacy/`](legacy/) |

The old tests did not contain Mass times, clergy names, or the Sunderland address. Those facts were taken from the public listings above, not invented.

## What was here before

[`legacy/StJosephChurch/`](legacy/StJosephChurch/) is the 2017 Maven project. It is a Selenium / TestNG suite (login, product list, billing links) pointed at `stgeorgechurchperumbavoor.com/billing/`. It is not a complete parish CMS and it is not this church’s public website. It was kept so the repository history is not deleted.

## Design notes

The site is meant to be calm and readable on a phone: cream and wine colours, serif headings, large tap targets, a skip link, and visible focus styles. It is a parish noticeboard, not a marketing landing page.
