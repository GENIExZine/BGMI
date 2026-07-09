/* ==========================================================================
   AYLINBOOS — shared behavior
   Runs on every page. Every function checks whether its target element
   exists before doing anything, so one file safely covers all pages.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initChatWidget();
  renderAccounts();
  renderProofGallery();
  renderTestimonials();
  renderLadder();
  initPopularityCalculator();
  initLoginForm();
  setActiveNavLink();
});

/* ---- Mobile nav toggle -------------------------------------------------- */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });
}

/* ---- Floating chat widget ------------------------------------------------
   Opens a direct Telegram chat — works immediately with no backend.
   (See README for how to upgrade this to a fully embedded live chat.)
--------------------------------------------------------------------------- */
function initChatWidget() {
  const mount = document.getElementById('chat-widget-mount');
  if (!mount || typeof siteContact === 'undefined') return;

  mount.innerHTML = `
    <div class="chat-panel" id="chat-panel">
      <div class="chat-panel-header">
        <div class="name">AYLINBOSS</div>
        <span class="badge badge-live"><span class="live-dot"></span>Usually replies fast</span>
      </div>
      <div class="chat-panel-body">
        <p>Questions about an account, a rank push, or popularity? Message us directly on Telegram.</p>
        <div class="chat-quick">
          <a class="btn btn-primary btn-block" href="${siteContact.telegramUrl}" target="_blank" rel="noopener">Chat on Telegram</a>
          <a class="btn btn-outline btn-block" href="mailto:${siteContact.email}">Email us instead</a>
        </div>
      </div>
    </div>
    <button class="chat-fab" id="chat-fab" aria-label="Open chat">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    </button>
  `;

  const fab = document.getElementById('chat-fab');
  const panel = document.getElementById('chat-panel');
  fab.addEventListener('click', () => panel.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!mount.contains(e.target)) panel.classList.remove('open');
  });
}

/* ---- Star rating helper -------------------------------------------------- */
function starString(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

/* ---- Proof image with automatic placeholder fallback --------------------- */
function proofImageHTML(src, alt) {
  return `
    <div class="proof-image-wrap" data-fallback>
      <img src="${src}" alt="${alt}" onerror="this.parentElement.classList.add('img-fallback')">
      <span class="proof-fallback-label">${alt}<br>— add screenshot at<br><code>${src}</code></span>
    </div>
  `;
}

/* ---- Render: account listings (accounts.html) with filter + pagination --- */
const ACCOUNTS_PER_PAGE = 6;
let currentAccountFilter = 'all';
let currentAccountPage = 1;

function renderAccounts() {
  const grid = document.getElementById('accounts-grid');
  if (!grid || typeof accountListings === 'undefined') return;

  const filterBar = document.getElementById('accounts-filter');
  if (filterBar && !filterBar.dataset.bound) {
    filterBar.dataset.bound = 'true';
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentAccountFilter = btn.dataset.filter;
        currentAccountPage = 1;
        renderAccounts();
      });
    });
  }

  const filtered = currentAccountFilter === 'all'
    ? accountListings
    : accountListings.filter(a => a.tier === currentAccountFilter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ACCOUNTS_PER_PAGE));
  currentAccountPage = Math.min(currentAccountPage, totalPages);
  const start = (currentAccountPage - 1) * ACCOUNTS_PER_PAGE;
  const pageItems = filtered.slice(start, start + ACCOUNTS_PER_PAGE);

  grid.innerHTML = pageItems.map(acc => `
    <div class="tac-card account-card">
      <div class="account-top">
        <span class="badge badge-${acc.tier}">${acc.tier}</span>
      </div>
      <h3>${acc.title}</h3>
      <div class="account-price mono">₹${acc.price.toLocaleString('en-IN')}</div>
      <ul class="account-highlights">
        ${acc.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
      <a class="btn btn-outline btn-block" href="${typeof siteContact !== 'undefined' ? siteContact.telegramUrl : '#'}" target="_blank" rel="noopener">Ask about this ID</a>
    </div>
  `).join('') || `<p style="color:var(--brass)">No accounts in this category right now — check back soon.</p>`;

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const wrap = document.getElementById('accounts-pagination');
  if (!wrap) return;
  if (totalPages <= 1) { wrap.innerHTML = ''; return; }

  let html = `<button class="page-btn" data-page="prev" ${currentAccountPage === 1 ? 'disabled' : ''}>‹</button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === currentAccountPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }
  html += `<button class="page-btn" data-page="next" ${currentAccountPage === totalPages ? 'disabled' : ''}>›</button>`;
  wrap.innerHTML = html;

  wrap.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = btn.dataset.page;
      if (p === 'prev') currentAccountPage -= 1;
      else if (p === 'next') currentAccountPage += 1;
      else currentAccountPage = parseInt(p, 10);
      renderAccounts();
      document.getElementById('accounts-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ---- Render: proof gallery (accounts.html, rank-push.html) --------------- */
function renderProofGallery() {
  const grid = document.getElementById('proof-grid');
  if (!grid || typeof proofGallery === 'undefined') return;
  grid.innerHTML = proofGallery.map(p => `
    <div class="proof-card">
      ${proofImageHTML(p.image, p.caption)}
      <div class="proof-caption">${p.caption}</div>
    </div>
  `).join('');
}

/* ---- Render: testimonials (index.html, accounts.html) -------------------- */
function renderTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid || typeof testimonials === 'undefined') return;
  grid.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="stars">${starString(t.rating)}</div>
      <p class="testimonial-text">${t.text}</p>
      <div class="testimonial-meta"><span>${t.name}</span><span>${t.date}</span></div>
    </div>
  `).join('');
}

/* ---- Render: rank push ladder (rank-push.html) ---------------------------- */
function renderLadder() {
  const ladder = document.getElementById('rank-ladder');
  if (!ladder || typeof rankPushTiers === 'undefined') return;
  ladder.innerHTML = rankPushTiers.map(t => `
    <div class="ladder-rung">
      <div class="ladder-node">${t.to}</div>
      <div class="ladder-body">
        <div>
          <div class="ladder-name">${t.from} → ${t.to}</div>
          <div class="ladder-meta">Turnaround: ${t.eta}</div>
        </div>
        <div class="ladder-price">₹${t.price.toLocaleString('en-IN')}</div>
      </div>
    </div>
  `).join('');
}

/* ---- Popularity calculator (popularity.html) ------------------------------
   Rate: 1000 popularity = ₹4
--------------------------------------------------------------------------- */
function initPopularityCalculator() {
  const input = document.getElementById('popularity-qty');
  const output = document.getElementById('popularity-price');
  if (!input || !output) return;

  const RATE_PER_1000 = 4;
  const calc = () => {
    const qty = Math.max(0, parseInt(input.value, 10) || 0);
    const price = (qty / 1000) * RATE_PER_1000;
    output.textContent = '₹' + price.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };
  input.addEventListener('input', calc);
  calc();
}

/* ---- Owner login flow (login.html) -----------------------------------------
   This UI is ready to connect to a real backend. It intentionally does NOT
   check a password or send an OTP itself — that must never happen in
   browser-side code, since anyone can read it via "View Source". See
   README.md for the small backend needed to make this fully live.
--------------------------------------------------------------------------- */
function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  const step1 = document.getElementById('login-step-1');
  const step2 = document.getElementById('login-step-2');
  const msg = document.getElementById('login-msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    if (!username || !password) return;

    showMsg('Connecting…', 'info');
    try {
      // Expects a backend route at /api/auth/login — see README.md.
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('not-connected');
      showMsg('OTP sent to your registered email.', 'info');
      step1.classList.remove('active');
      step2.classList.add('active');
    } catch (err) {
      showMsg('This login isn\'t connected to a server yet — see README.md ("Making login live") to enable it.', 'error');
    }
  });

  function showMsg(text, type) {
    if (!msg) return;
    msg.textContent = text;
    msg.className = `form-msg show ${type}`;
  }

  const otpForm = document.getElementById('otp-form');
  if (!otpForm) return;
  otpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = document.getElementById('login-otp').value.trim();
    if (!code) return;
    showMsg('Verifying…', 'info');
    try {
      // Expects a backend route at /api/auth/verify-otp — see README.md.
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      if (!res.ok) throw new Error('not-connected');
      showMsg('Signed in.', 'info');
      window.location.href = '/admin.html';
    } catch (err) {
      showMsg('This step isn\'t connected to a server yet — see README.md ("Making login live") to enable it.', 'error');
    }
  });
}
