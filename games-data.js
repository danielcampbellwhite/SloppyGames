// Sloppy Games — shared site data and render helpers.
// Used by index.html, all/, and each category page.

const CATEGORIES = [
  { slug: 'all',     label: 'All Games', path: '/all/' },
  { slug: 'arcade',  label: 'Arcade',    path: '/arcade/' },
  { slug: 'puzzles', label: 'Puzzles',   path: '/puzzles/' },
  { slug: 'maths',   label: 'Maths',     path: '/maths/' },
  { slug: 'learn',   label: 'Learn',     path: '/learn/' },
  { slug: 'create',  label: 'Create',    path: '/create/' },
];

// Games are ordered oldest → newest. "Newest" features pulls from the end.
const GAMES = [
  {
    slug: 'memory',
    title: 'Sloppy Memory',
    description: 'Watch the colours light up, then repeat the sequence. Gets trickier every round!',
    href: '/games/memory/',
    category: 'puzzles',
    thumb: 'memory',
  },
  {
    slug: 'whack',
    title: 'Whack-a-Splat',
    description: '60 seconds, 9 holes, lots of sloppy splats. Whack them quick — but watch out for bombs!',
    href: '/games/whack/',
    category: 'arcade',
    thumb: 'whack',
  },
  {
    slug: 'snake',
    title: 'Sloppy Snake',
    description: 'Steer the snake, gobble up splats, grow longer. Don’t bite yourself!',
    href: '/games/snake/',
    category: 'arcade',
    thumb: 'snake',
  },
  {
    slug: 'maths-sprint',
    title: 'Maths Sprint',
    description: 'Race the Splat Bot by answering quick maths questions. Every right answer makes you sprint forward!',
    href: '/games/maths/',
    category: 'maths',
    thumb: 'maths',
  },
  {
    slug: 'paint',
    title: 'Sloppy Paint',
    description: 'Brushes, splats and stamps. Pick a colour, drag to paint, then save your masterpiece.',
    href: '/games/paint/',
    category: 'create',
    thumb: 'paint',
  },
  {
    slug: 'flap',
    title: 'Splat Flap',
    description: 'Tap to flap. Fly through gaps in growing slime towers. Easy to learn, ruthless to master.',
    href: '/games/flap/',
    category: 'arcade',
    thumb: 'flap',
  },
  {
    slug: 'blaster',
    title: 'Splat Blaster',
    description: 'A space shooter — blast waves of enemy splats, grab powerups and beat the boss every 5 waves.',
    href: '/games/blaster/',
    category: 'arcade',
    thumb: 'blaster',
  },
  {
    slug: 'speller',
    title: 'Splat Speller',
    description: 'Guess the hidden word one letter at a time. Six wrong letters and the splat appears!',
    href: '/games/speller/',
    category: 'puzzles',
    thumb: 'speller',
  },
  {
    slug: 'wordhunt',
    title: 'Word Hunt',
    description: 'Drag across letters to find every hidden word in the grid. Three difficulty modes.',
    href: '/games/wordhunt/',
    category: 'puzzles',
    thumb: 'wordhunt',
  },
  {
    slug: 'pizza',
    title: 'Fraction Pizza',
    description: 'Add toppings to pizza slices until the topped fraction matches the target. Hands-on fractions.',
    href: '/games/pizza/',
    category: 'maths',
    thumb: 'pizza',
  },
  {
    slug: 'make24',
    title: 'Number Splash',
    description: 'Use four numbers with + − × ÷ to hit the target. Builds mental arithmetic.',
    href: '/games/make24/',
    category: 'maths',
    thumb: 'make24',
  },
  {
    slug: 'code',
    title: 'Code the Splat',
    description: 'Program the splat with arrow commands to reach the star. A first taste of coding logic.',
    href: '/games/code/',
    category: 'puzzles',
    thumb: 'code',
  },
  {
    slug: 'patterns',
    title: 'Splat Patterns',
    description: 'Spot the pattern and pick what comes next — colours, shapes and numbers.',
    href: '/games/patterns/',
    category: 'puzzles',
    thumb: 'patterns',
  },
  {
    slug: 'tunes',
    title: 'Splat Tunes',
    description: 'Watch the notes light up, then play the melody back. Each round adds one more note.',
    href: '/games/tunes/',
    category: 'learn',
    thumb: 'tunes',
  },
];

// ---------- Render helpers ----------

function rel(path) {
  // Page lives at depth d below site root. Compute path prefix to reach root.
  // We rely on a data-depth attribute set on <body>: 0 for root, 1 for /category/, 2 for /games/x/
  const body = document.body;
  const depth = Number(body && body.dataset && body.dataset.depth ? body.dataset.depth : 0);
  let prefix = '';
  for (let i = 0; i < depth; i++) prefix += '../';
  // Trim leading slash because we now prefix relatively
  return prefix + path.replace(/^\//, '');
}

function svgSlug(slug) { return slug; }

function thumbHTML(slug) {
  // Per-game custom thumbnail markup. Reuses CSS classes defined in styles.css.
  switch (slug) {
    case 'memory': return `
      <span class="memory-pad memory-pad--purple"></span>
      <span class="memory-pad memory-pad--lime"></span>
      <span class="memory-pad memory-pad--pink"></span>
      <span class="memory-pad memory-pad--cyan"></span>`;
    case 'whack': return `
      <span class="whack-hole whack-hole--1"></span>
      <span class="whack-hole whack-hole--2"></span>
      <span class="whack-hole whack-hole--3"></span>
      <span class="whack-splat" aria-hidden="true">${splatSVG('#9333ea')}</span>`;
    case 'snake': return `
      <span class="snake-body snake-body--1"></span>
      <span class="snake-body snake-body--2"></span>
      <span class="snake-body snake-body--3"></span>
      <span class="snake-head" aria-hidden="true">${snakeHeadSVG()}</span>
      <span class="snake-food" aria-hidden="true">${splatSVG('#9333ea')}</span>`;
    case 'maths': return `
      <span class="maths-question">7 × 8 = ?</span>
      <span class="maths-splat maths-splat--player" aria-hidden="true">${splatSVG('#9333ea')}</span>
      <span class="maths-splat maths-splat--bot" aria-hidden="true">${botSplatSVG()}</span>
      <span class="maths-flag" aria-hidden="true"></span>`;
    case 'paint': return `
      <span class="paint-canvas">
        <span class="paint-stroke paint-stroke--1"></span>
        <span class="paint-stroke paint-stroke--2"></span>
        <span class="paint-stamp paint-stamp--star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2 L14.5 9 L22 9 L16 13.5 L18.5 21 L12 16.5 L5.5 21 L8 13.5 L2 9 L9.5 9 Z" fill="#facc15" stroke="#1a1a1a" stroke-width="1.5" stroke-linejoin="round"/></svg></span>
        <span class="paint-stamp paint-stamp--heart" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 21 C 4 14, 2 8, 6 5 C 9 3, 12 5, 12 8 C 12 5, 15 3, 18 5 C 22 8, 20 14, 12 21 Z" fill="#ec4899" stroke="#1a1a1a" stroke-width="1.5"/></svg></span>
        <span class="paint-stamp paint-stamp--splat" aria-hidden="true">${splatSVG('#9333ea')}</span>
      </span>`;
    case 'flap': return `
      <span class="flap-tower flap-tower--top"></span>
      <span class="flap-tower flap-tower--bottom"></span>
      <span class="flap-splat" aria-hidden="true">${flapSplatSVG()}</span>`;
    case 'blaster': return `
      <span class="blaster-stars"></span>
      <span class="blaster-enemy blaster-enemy--1" aria-hidden="true"><svg viewBox="0 0 100 100"><g transform="rotate(180 50 50)">${splatPath('#22c55e')}</g></svg></span>
      <span class="blaster-enemy blaster-enemy--2" aria-hidden="true"><svg viewBox="0 0 100 100"><g transform="rotate(180 50 50)">${splatPath('#ef4444')}</g></svg></span>
      <span class="blaster-bullet"></span>
      <span class="blaster-ship" aria-hidden="true">${blasterShipSVG()}</span>`;
    case 'speller': return `<span class="thumb-blanks">_ A _ _ _ </span><span class="thumb-mood">${splatSVG('#9333ea')}</span>`;
    case 'wordhunt': return `<span class="thumb-grid"></span>`;
    case 'pizza': return `<span class="thumb-pizza"></span>`;
    case 'make24': return `<span class="thumb-target">= 24</span><span class="thumb-nums">3 8 4 6</span>`;
    case 'code': return `<span class="thumb-board"></span><span class="thumb-splat-code" aria-hidden="true">${splatSVG('#9333ea')}</span><span class="thumb-star-code">★</span>`;
    case 'patterns': return `<span class="thumb-pattern">
      <span class="pp pp--purple"></span><span class="pp pp--lime"></span><span class="pp pp--purple"></span><span class="pp pp--lime"></span><span class="pp pp--q">?</span>
    </span>`;
    case 'tunes': return `<span class="thumb-tunes">
      <span class="pk pk--c"></span><span class="pk pk--d"></span><span class="pk pk--e"></span><span class="pk pk--f"></span><span class="pk pk--g"></span><span class="pk pk--a"></span><span class="pk pk--b"></span>
    </span>`;
    default: return '';
  }
}

function splatSVG(color) { return `<svg viewBox="0 0 100 100">${splatPath(color)}<circle cx="38" cy="44" r="8" fill="#fff" stroke="#1a1a1a" stroke-width="3"/><circle cx="62" cy="44" r="8" fill="#fff" stroke="#1a1a1a" stroke-width="3"/><circle cx="39" cy="46" r="3.5" fill="#1a1a1a"/><circle cx="63" cy="46" r="3.5" fill="#1a1a1a"/><path d="M 36 62 Q 50 76, 64 62" stroke="#1a1a1a" stroke-width="4.5" fill="none" stroke-linecap="round"/></svg>`; }
function splatPath(color) { return `<path d="M 50 6 C 70 6, 78 18, 80 30 C 92 32, 96 46, 90 56 C 96 66, 90 80, 78 80 C 74 92, 56 96, 50 88 C 42 96, 26 90, 22 80 C 10 80, 4 66, 10 56 C 4 46, 8 32, 20 30 C 22 18, 30 6, 50 6 Z" fill="${color}" stroke="#1a1a1a" stroke-width="5" stroke-linejoin="round"/>`; }
function snakeHeadSVG() { return `<svg viewBox="0 0 100 100"><rect x="6" y="6" width="88" height="88" rx="26" fill="#a855f7" stroke="#1a1a1a" stroke-width="5"/><circle cx="68" cy="40" r="11" fill="#fff" stroke="#1a1a1a" stroke-width="3"/><circle cx="68" cy="68" r="11" fill="#fff" stroke="#1a1a1a" stroke-width="3"/><circle cx="72" cy="40" r="5" fill="#1a1a1a"/><circle cx="72" cy="68" r="5" fill="#1a1a1a"/><path d="M 94 54 L 110 54" stroke="#ec4899" stroke-width="5" stroke-linecap="round"/></svg>`; }
function botSplatSVG() { return `<svg viewBox="0 0 100 100">${splatPath('#84cc16')}<rect x="48" y="-2" width="4" height="10" fill="#1a1a1a"/><circle cx="50" cy="-4" r="4" fill="#ec4899" stroke="#1a1a1a" stroke-width="2"/><circle cx="38" cy="44" r="8" fill="#fff" stroke="#1a1a1a" stroke-width="3"/><circle cx="62" cy="44" r="8" fill="#fff" stroke="#1a1a1a" stroke-width="3"/><circle cx="39" cy="46" r="3.5" fill="#1a1a1a"/><circle cx="63" cy="46" r="3.5" fill="#1a1a1a"/><path d="M 36 62 Q 50 70, 64 62" stroke="#1a1a1a" stroke-width="4.5" fill="none" stroke-linecap="round"/></svg>`; }
function flapSplatSVG() { return `<svg viewBox="0 0 100 100">${splatPath('#9333ea')}<ellipse cx="22" cy="50" rx="14" ry="7" fill="#c084fc" stroke="#1a1a1a" stroke-width="3" transform="rotate(-20 22 50)"/><circle cx="58" cy="44" r="9" fill="#fff" stroke="#1a1a1a" stroke-width="3"/><circle cx="62" cy="46" r="4" fill="#1a1a1a"/><path d="M 46 62 Q 56 70, 66 62" stroke="#1a1a1a" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`; }
function blasterShipSVG() { return `<svg viewBox="0 0 100 100">${splatPath('#9333ea')}<circle cx="50" cy="42" r="14" fill="#a3e635" stroke="#1a1a1a" stroke-width="4"/><circle cx="45" cy="42" r="3" fill="#1a1a1a"/><circle cx="55" cy="42" r="3" fill="#1a1a1a"/></svg>`; }

function gameCardHTML(game) {
  return `
    <a class="game-card game-card--live" href="${rel(game.href)}">
      <div class="game-thumb game-thumb--${game.thumb}" aria-hidden="true">${thumbHTML(game.thumb)}</div>
      <h3>${game.title}</h3>
      <p>${game.description}</p>
      <span class="badge badge--play">Play Now ▶</span>
    </a>`;
}

function navHTML(activeCat) {
  const links = CATEGORIES.map(cat => {
    const cls = (activeCat === cat.slug) ? 'site-nav__link active' : 'site-nav__link';
    return `<a class="${cls}" href="${rel(cat.path)}" role="menuitem">${cat.label}</a>`;
  }).join('');
  return `
    <a href="${rel('/')}" class="site-nav__home" aria-label="Sloppy Games home">
      <img src="${rel('/assets/logo.png')}" alt="Sloppy Games" class="site-nav__logo" />
    </a>
    <div class="site-menu" id="site-menu">
      <button class="site-menu__btn" type="button" id="site-menu-btn"
              aria-haspopup="true" aria-expanded="false" aria-controls="site-menu-list">
        <span class="site-menu__bars" aria-hidden="true"><span></span><span></span><span></span></span>
        <span class="site-menu__text">Menu</span>
      </button>
      <nav class="site-menu__list" id="site-menu-list" role="menu" aria-label="Game categories">${links}</nav>
    </div>`;
}

function renderHeader(activeCat) {
  const el = document.getElementById('site-header');
  if (!el) return;
  el.innerHTML = navHTML(activeCat);
  // wire up the menu toggle
  const wrap = document.getElementById('site-menu');
  const btn = document.getElementById('site-menu-btn');
  const list = document.getElementById('site-menu-list');
  if (!wrap || !btn || !list) return;
  function close() {
    wrap.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
  function open() {
    wrap.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (wrap.classList.contains('open')) close(); else open();
  });
  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function renderNewest(count = 6) {
  const el = document.getElementById('newest-grid');
  if (!el) return;
  const newest = GAMES.slice().reverse().slice(0, count);
  el.innerHTML = newest.map(gameCardHTML).join('');
}

function renderCategory(cat) {
  const el = document.getElementById('category-grid');
  if (!el) return;
  const list = GAMES.filter(g => g.category === cat);
  el.innerHTML = list.map(gameCardHTML).join('');
}

function renderAllGrouped() {
  const root = document.getElementById('all-grouped');
  if (!root) return;
  root.innerHTML = '';
  const catsOrdered = CATEGORIES.filter(c => c.slug !== 'all');
  for (const cat of catsOrdered) {
    const list = GAMES.filter(g => g.category === cat.slug);
    if (!list.length) continue;
    const section = document.createElement('section');
    section.className = 'cat-section';
    section.id = 'cat-' + cat.slug;
    section.innerHTML = `
      <h2 class="cat-section__title"><a href="${rel(cat.path)}">${cat.label}</a></h2>
      <div class="game-grid">${list.map(gameCardHTML).join('')}</div>
    `;
    root.appendChild(section);
  }
}

// Footer year (idempotent — runs everywhere)
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
