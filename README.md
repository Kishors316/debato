# Debato — official website

Static site for the [Debato](https://play.google.com/store/apps/details?id=com.debato)
Android app. Plain HTML, CSS and a few lines of JavaScript — no build step, no
framework, no backend.

**Live URLs**

| Page | URL |
|------|-----|
| Home | `https://kishors316.github.io/debato/` |
| Terms & Conditions | `https://kishors316.github.io/debato/terms.html` |
| Privacy Policy | `https://kishors316.github.io/debato/privacy.html` |

---

## First-time deployment

The repository **must be named `debato`** (lowercase) for those URLs to work. A
different name changes the path, and the canonical tags baked into the pages
would then point at the wrong place.

### 1. Create the repository

On GitHub, create a new **public** repository named `debato`. Do not add a
README, .gitignore or licence — this folder already has what it needs.

### 2. Push these files

From inside this folder:

```bash
git init
git add .
git commit -m "Debato official website"
git branch -M main
git remote add origin https://github.com/Kishors316/debato.git
git push -u origin main
```

If you would rather not use the command line: on the empty repository page
choose **uploading an existing file**, then drag in everything from this folder.
Make sure hidden files come too — `.nojekyll` matters (see below).

### 3. Turn on GitHub Pages

Repository → **Settings** → **Pages** → under *Build and deployment*:

- **Source:** Deploy from a branch
- **Branch:** `main`, folder `/ (root)`
- **Save**

The first build takes a minute or two. GitHub serves it over HTTPS
automatically, with a certificate it manages — there is nothing to configure
for that.

### 4. Check it

Open all three URLs from the table above. Then paste the home page URL into
[the Facebook sharing debugger](https://developers.facebook.com/tools/debug/)
or just send it to yourself on WhatsApp to confirm the preview card renders.

### 5. Add the URLs to Play Console

- **Privacy Policy** → *Policy → App content → Privacy policy*
- **Website** → *Store presence → Main store listing → Contact details*
- **Support email** → `debato.appsupport@gmail.com`

---

## Updating the site later

Edit the file, commit, push. Pages redeploys in under a minute.

```bash
git add .
git commit -m "Update privacy policy"
git push
```

Or edit directly on github.com — click the file, then the pencil icon, then
**Commit changes**. Same result.

If an update does not appear, it is almost always browser cache rather than a
failed deploy. Hard-reload with <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>,
and check the **Actions** tab for the build.

### Changing the legal pages

Both legal pages carry a `Last updated:` line near the top. Change it when you
change the content — Play reviewers and users both look at it, and a policy
whose date never moves looks unmaintained.

---

## Layout

```
.
├── index.html              Home
├── terms.html              Terms & Conditions
├── privacy.html            Privacy Policy
├── 404.html                Not-found page (absolute paths — see note below)
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── .nojekyll
└── assets/
    ├── css/style.css       Entire stylesheet
    ├── js/main.js          Footer year + anchor offset. The site works without it.
    └── img/
        ├── logo.png, icon-512.png, apple-touch-icon.png, favicon-*.png
        ├── og-image.png    1200×630 social preview card
        └── screens/        7 screenshots, WebP with JPEG fallback
```

### Things that will bite you if changed carelessly

- **`.nojekyll` must stay.** Without it GitHub runs the files through Jekyll,
  which ignores any folder beginning with an underscore and adds build time for
  no benefit. It is an empty file, easy to lose when uploading through the web
  interface — which hides dotfiles in the drag-and-drop picker.
- **Paths in the three main pages are relative** (`assets/...`) because the site
  lives under `/debato/`, not at the domain root. A leading slash would break
  every asset.
- **`404.html` is the exception** and uses absolute `/debato/...` paths on
  purpose: GitHub serves it for a URL at any depth, and relative paths would
  resolve against whatever folder the visitor guessed at.
- **Canonical and Open Graph URLs are absolute** and hardcoded to
  `kishors316.github.io/debato`. If the repository or account name ever changes,
  find and replace that string across `index.html`, `terms.html`,
  `privacy.html`, `robots.txt` and `sitemap.xml`.

## Replacing the screenshots

Drop new images into `assets/img/screens/` keeping the same filenames, or edit
the `<picture>` blocks in `index.html`. Each one ships as a WebP with a JPEG
fallback; the browser picks. Keep them around 1100px tall — the originals were
1.4 MB each and the whole set now weighs about 345 KB.

## Custom domain

If you buy a domain later: add a `CNAME` file containing just the domain,
point a DNS `CNAME` record at `kishors316.github.io`, then enable *Enforce
HTTPS* in Settings → Pages. Remember to update the hardcoded absolute URLs
listed above, and to change the URLs in Play Console.
