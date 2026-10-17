# BrainGEN Workshop website

Static site (HTML/CSS/vanilla JS, no build step) for the BrainGEN workshop,
1–3 March 2027, University of Luxembourg.

## Preview locally
```
python -m http.server 8000
```
then open http://localhost:8000

## Deploy on GitHub Pages
1. Push this folder to a GitHub repository (branch `main`).
2. Repo **Settings → Pages → Build and deployment → Deploy from a branch**, select `main` and `/ (root)`.
3. The site is served at `https://<user>.github.io/<repo>/`. All paths are relative, so sub-path hosting works.

## Editing
- Text: `index.html`.
- Experts: the `PEOPLE` array at the top of `assets/js/main.js` (set `confirmed: false` to hide someone).
- Agenda: the `#day1`–`#day3` panels in `index.html` (currently marked *Provisional*).
- Colours: CSS variables at the top of `assets/css/style.css`.
- Social preview: `og:image` uses an SVG; some platforms (e.g. LinkedIn, X) need a PNG, so export `assets/img/og.svg` to `og.png` and update the meta tag.
