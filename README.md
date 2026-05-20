# Sloppy Games

A small family-run website for free-to-play browser games, built by Marley (age 8) and his dad.

## What's here

A simple static site — pure HTML, CSS and a sprinkle of JS. No build step, no framework, easy to host anywhere.

```
SloppyGames/
├── index.html       Main page
├── styles.css       All the styles (color scheme from the logo)
├── script.js        Tiny bit of JS (just the footer year for now)
├── assets/
│   └── logo.png     The Sloppy Games logo
└── games/           Future games will live here, one folder per game
```

## Run it locally

Just open `index.html` in a browser. Or, if you'd rather have a tiny local server:

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Adding a new game

1. Create a folder in `games/`, e.g. `games/snake/`
2. Put the game's `index.html` + assets in there
3. Add a new `<article class="game-card">` block to the games grid in `index.html`, linking the title to `games/snake/`

## Hosting

Drop the folder on any static host:

- **GitHub Pages**: enable Pages on the `main` branch, root folder
- **Netlify / Cloudflare Pages / Vercel**: connect the repo, no build command needed, publish directory is the repo root

## Colours (from the logo)

| Name        | Hex       |
|-------------|-----------|
| Purple      | `#9333ea` |
| Lime green  | `#84cc16` |
| Ink (black) | `#1a1a1a` |
| Cream       | `#fff8ec` |
