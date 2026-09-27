# Chirag Kathuria — Portfolio

A self-contained static site: `index.html`, `script.js`, `assets/profile.jpg`. No build step, no dependencies.

## Host it on GitHub Pages

1. Create a new repo on GitHub — e.g. `chirag-kathuria-009.github.io` (this exact name, using your GitHub username, gives you a site at the root domain) or any other name like `portfolio`.
2. Push these three files (`index.html`, `script.js`, `assets/profile.jpg`) to the repo's root (or to a `docs/` folder — your choice, set in step 3).
   ```bash
   git init
   git add index.html script.js assets
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: go to the repo's **Settings → Pages**. Under "Build and deployment", set Source to "Deploy from a branch", pick `main` and `/ (root)`, then Save.
4. GitHub gives you a live URL within a minute or two:
   - `https://<your-username>.github.io/` if the repo is named `<your-username>.github.io`
   - `https://<your-username>.github.io/<repo-name>/` otherwise

## Notes

- The accent color is a single CSS variable (`--accent` in `index.html`'s `<style>` block) — change it there to restyle the whole site.
- The typewriter role text, project carousel data, and animated stat counters are all in `script.js`.
- All logos/icons are original SVGs (no third-party trademarks), so there's nothing to worry about license-wise.
