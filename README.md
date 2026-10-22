# Zubair Shah — Professional Portfolio

A premium, editorial single-page portfolio for **Zubair Shah, Internal Quality**
(Manufacturing Quality). Built as a fast, static site with a clean separation
between content and presentation, so it can be updated without touching the
design code.

It ships with a built-in **content manager** at `/admin` (Decap CMS). Once set
up (one-time, below), you log in from a web browser, edit any section, upload
your photo and supplier images, and click **Publish** — changes save
permanently and the live site updates on its own. No code editing needed.

---

## A. ONE-TIME SETUP — turn on the admin login

The admin editor needs your site to live on **GitHub** (free) and be connected
to **Netlify** (free). This is a one-time setup. After it, you just go to
`your-site.netlify.app/admin`, log in, and edit.

> If you prefer not to do this setup, the site still works perfectly as-is —
> you (or someone helping you) can edit `content/data.json` directly and
> re-upload the folder. The `/admin` login is only needed for editing from the
> browser with permanent saving.

**Step 1 — Put the site on GitHub**
1. Create a free account at github.com.
2. Create a new repository (e.g. `zubair-portfolio`), set it to **Public**.
3. Upload all the files in this folder to that repository (GitHub's website has
   an "uploading an existing file" / drag-and-drop option), keeping the folder
   structure (`admin/`, `assets/`, `css/`, `js/`, `content/`, `index.html`).

**Step 2 — Connect Netlify to that GitHub repo**
1. At app.netlify.com, choose **Add new site → Import an existing project**.
2. Pick GitHub and select your `zubair-portfolio` repository.
3. Leave build settings empty (no build command; publish directory is the root).
   Deploy. You now have a live URL.

**Step 3 — Turn on Identity (the login system)**
1. In your Netlify site: **Site configuration → Identity → Enable Identity**.
2. Under **Identity → Registration**, set it to **Invite only** (so only you can
   get in).
3. Under **Identity → Services → Git Gateway**, click **Enable Git Gateway**.
   (This is what lets the editor save your changes back to GitHub.)

**Step 4 — Invite yourself**
1. In Netlify: **Identity → Invite users**, enter your email, send.
2. Check your email, click the invite link, set a password.

**Step 5 — Update the site address in the config (once)**
Open `admin/config.yml` and set the two URL lines to your real Netlify address:
```yml
site_url: https://YOUR-SITE.netlify.app
display_url: https://YOUR-SITE.netlify.app
```
Re-upload that file to GitHub (or edit it directly on GitHub's website).

**Done.** Go to `https://YOUR-SITE.netlify.app/admin`, log in with the password
you set, and you'll see every section ready to edit.

### Using the admin editor (day-to-day)
- Go to `your-site.netlify.app/admin` and log in.
- Click **Portfolio Content → All Portfolio Content**.
- Edit any section. To add your photo, open **Portrait & Résumé** and upload it.
  To add a supplier image, open **Supplier Audits**, pick the supplier, upload
  its image, and fill the location/date when you have them.
- Click **Publish** (top right). Your live site updates within about a minute.

Lists (jobs, suppliers, skills) have an **Add** button, and each can be
reordered by dragging. Fields that say "one per line" mean press Enter between
items.

---

## 1. Project overview

A one-page portfolio with nine sections: Overview (hero), About, Career History,
Selected Contributions & Quality Improvements, Supplier Quality Audit Experience,
Technical Competencies, Selected Projects & Work Samples, Education &
Certifications, and Contact.

All text and data live in a single file, **`content/data.json`**, which the
admin editor (section A) writes to. The site reads from it and renders the page.
`js/content.js` is only a built-in fallback used if `data.json` cannot be
loaded; you normally never touch it.

> The manual-editing steps below (sections 7–11) describe editing
> `content/data.json` directly, for anyone who isn't using the `/admin` editor.
> If you use the admin editor, you can ignore the exact file paths — the editor
> gives you a form for every one of these.

## 2. Technology stack

- Semantic HTML5
- Modern CSS (custom properties, grid, flexbox) — no framework
- Vanilla JavaScript (no dependencies, no build step)
- Google Fonts: *Fraunces* (serif) and *Inter* (sans-serif)

No backend, no database, no tracking scripts.

## 3. Installation requirements

None to view the files. To run it locally you only need a way to serve static
files. Any of the following works:

- Python 3 (bundled on most systems)
- Node.js (optional, only if you prefer `npx serve`)
- Any static web host

## 4. How to run locally

From inside the project folder:

```bash
# Option A — Python (no install needed)
python3 -m http.server 8000
# then open http://localhost:8000

# Option B — Node
npx serve .
```

> Open the site through a local server (not by double-clicking `index.html`).
> The page loads `content.js` and `main.js` as separate files, which browsers
> restrict when opened directly from disk.

## 5. How to build for production

There is no build step. The files in this folder **are** the production site.
To deploy, upload the whole folder as-is (see *Deployment* below).

## 6. How to replace the portrait

There is **one** portrait placeholder (in the hero section).

1. Prepare a vertical portrait — white formal shirt, clean white background,
   roughly **900 × 1200px** (3:4 ratio), sharp and well-lit.
2. Save it as:
   ```
   assets/portrait/zubair-shah.jpg
   ```
   (Keep this exact name, or update the path in `js/content.js` → `assets.portrait`.)
3. In `js/content.js`, set:
   ```js
   assets: {
     portrait: "assets/portrait/zubair-shah.jpg",
     portraitAvailable: true,   // change false → true
     ...
   }
   ```
4. Refresh. The real photo replaces the placeholder automatically.

The site never generates or substitutes a face. Until you set
`portraitAvailable: true`, a clean labelled placeholder is shown.

## 7. How to add an employment record

Edit the `career` array in `js/content.js`. Entries display **most-recent
first**, so add new current roles at the top. Copy this shape:

```js
{
  id: "unique-id",
  company: "Company Name",
  title: "Job Title",
  period: "2026 – Present",
  context: "Industry or context",
  current: true,              // shows the "Current" marker; use false for past roles
  responsibilities: [
    "First responsibility",
    "Second responsibility"
  ]
}
```

## 8. How to add an audit record

There are eight supplier audit records. To add a ninth, append to the `audits`
array in `js/content.js`:

```js
{
  id: "a09",
  company: "New Supplier Sdn Bhd",
  purpose: "Quality Audit",
  image: "assets/suppliers/new-supplier.jpg", // optional; leave "" for none
  location: "",   // fill when confirmed
  date: "",       // fill when confirmed
  scope: "",      // fill when confirmed
  role: "",       // fill when confirmed
  status: ""      // fill when confirmed
}
```

**Adding the eight supplier images.** Each supplier has one image slot. Drop
your files into `assets/suppliers/` using these exact names (already wired up):

| # | Supplier | Image file |
|---|----------|------------|
| 01 | LSK Napure Latex Sdn Bhd | `assets/suppliers/lsk-napure-latex.jpg` |
| 02 | Hin Trading Company Sdn Bhd | `assets/suppliers/hin-trading.jpg` |
| 03 | Multipack Industrial Supplies Sdn Bhd | `assets/suppliers/multipack-industrial.jpg` |
| 04 | Maus Industries Sdn Bhd | `assets/suppliers/maus-industries.jpg` |
| 05 | Lian Ngoi Industry Sdn Bhd | `assets/suppliers/lian-ngoi-industry.jpg` |
| 06 | Sleep Matic Asia Sdn Bhd | `assets/suppliers/sleep-matic-asia.jpg` |
| 07 | CHL Foam Industries Sdn Bhd | `assets/suppliers/chl-foam-industries.jpg` |
| 08 | Kis Wire Sdn Bhd | `assets/suppliers/kis-wire.jpg` |

Recommended image size: about **1200 × 900px** (4:3). The moment a correctly
named file exists, it replaces that supplier's placeholder — no code change
needed. Each image is matched only to its own supplier.

**Adding supplier locations.** The eight location fields are intentionally
empty. Fill the `location` string for a supplier in `js/content.js` when you
have confirmed it. Until then, the detail view shows a neutral
"To be provided" label. No addresses or maps are invented.

Click any supplier card (or a row in the Register view) to open its detail
panel, where location, date, scope, role, and status appear.

## 9. How to update professional contributions

Edit the `contributions` array in `js/content.js`. Each entry:

```js
{
  id: "unique-id",
  ref: "L",                    // the letter label shown on the card
  title: "Contribution title",
  context: "One line of context.",
  involvement: "What you were involved in.",
  objective: "The quality objective.",
  link: "#audits"              // optional; only if it should link elsewhere
}
```

Keep wording factual — describe involvement and responsibilities, not invented
results. Add verified outcomes only when you have supporting evidence.

## 10. How to update contact information

Edit the `contact` block in `js/content.js`:

```js
contact: {
  email: "zubairshah0095@gmail.com",
  phone: "0173242151",
  phoneHref: "tel:0173242151",
  emailHref: "mailto:zubairshah0095@gmail.com"
}
```

If you change the email or phone, update the matching `...Href` value too.

## 11. How to add a résumé

1. Save your PDF as:
   ```
   assets/resume/zubair-shah-resume.pdf
   ```
2. In `js/content.js`, set:
   ```js
   assets: {
     resume: "assets/resume/zubair-shah-resume.pdf",
     resumeAvailable: true,   // change false → true
     ...
   }
   ```
3. A "Download résumé" button appears in the hero, and a résumé row appears in
   the Contact section. Until then, **no résumé button is shown** (no fake link).

## 12. Deployment instructions

This is a static site — host it anywhere that serves files:

- **Netlify / Vercel / Cloudflare Pages:** drag-and-drop the folder, or connect
  a Git repo. No build command; publish directory is the project root.
- **GitHub Pages:** push the folder to a repo and enable Pages on the branch.
- **Any web server / shared hosting:** upload the folder contents to your public
  web directory (e.g. `public_html`).

Make sure the `assets/`, `css/`, and `js/` folders keep their relative
positions next to `index.html`.

## 13. Remaining limitations / notes

- **Portrait:** placeholder until you add the photo and set `portraitAvailable: true`.
- **Supplier images (8):** placeholders until you add the files listed above.
- **Supplier locations/details:** empty until you fill them in `content.js`;
  shown as "To be provided", never invented.
- **Projects & Education:** intentionally empty, with an honest "nothing published
  yet" state. Add entries to `projects.items` / `education.items` in `content.js`
  when materials are ready and approved.
- **Fonts** load from Google Fonts over the network. If you need fully offline
  rendering, download the two font families and self-host them, then update the
  `<link>` in `index.html`.
- **Verified in this environment:** section rendering, all four employment
  records, all eight audit records, email/phone links, the audit detail dialog,
  gallery/register toggle, mobile navigation, reduced-motion behaviour, keyboard
  focus order, and no horizontal overflow at 320 / 375 / 768 / 1440px widths.
- **Not auto-deployed.** Publishing is left to you.

---

## File structure

```
portfolio/
├── index.html              # Page shell + all section markup + SEO meta
├── admin/
│   ├── index.html          # The /admin content editor (Decap CMS)
│   └── config.yml          # Defines every editable field
├── content/
│   └── data.json           # ← ALL content lives here (the editor writes this)
├── css/
│   └── styles.css          # Design system and all styles
├── js/
│   ├── main.js             # Renderer (reads content/data.json, builds the page)
│   └── content.js          # Fallback content (only used if data.json fails)
├── assets/
│   ├── portrait/           # Portrait (or upload via /admin)
│   ├── suppliers/          # Supplier images (or upload via /admin)
│   ├── resume/             # Résumé PDF (or upload via /admin)
│   └── uploads/            # Where the /admin editor saves uploaded files
└── README.md
```

**Two ways to update content:**
1. **Recommended — the admin editor** at `your-site.netlify.app/admin`
   (see section A). A form for every field; uploads and permanent saving built in.
2. **Manual** — edit **`content/data.json`** directly and re-upload (sections 7–11).
