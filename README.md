# AYLINBOOS — Website

A 5-page site: Home, Accounts, Rank Push, Popularity, and an Owner Login page.
Plain HTML/CSS/JS — no build step, no framework. Open any `.html` file in a
browser and it works.

```
aylinboss/
├── index.html          Home
├── accounts.html        Account marketplace (filters + pagination)
├── rank-push.html       Rank push pricing ladder
├── popularity.html      Popularity calculator
├── login.html           Owner login (UI — see "Making login live" below)
├── css/style.css        All styling
├── js/data.js            ← EDIT THIS to update accounts, prices, feedback
├── js/main.js            Page behavior (rendering, nav, chat, calculator)
└── images/proof/         Drop real screenshots here
```

## Editing content

Everything that changes often — account listings, rank-push prices,
testimonials, proof captions — lives in **`js/data.js`**. Open it in any text
editor, copy an existing entry inside the array you want to change, paste it
in as a new block, and edit the values. No other file needs to change.

To add real proof screenshots: save the image into `images/proof/` using the
filename already referenced in `data.js` (e.g. `account-1.jpg`), or edit the
`proofImage` / `image` path to match whatever you name the file. Until a real
image exists at that path, the site automatically shows a placeholder box
instead of a broken image, so it's safe to publish before every screenshot is
ready.

Site-wide stats (the "500+ Accounts Delivered" row) are plain text near the
top of `index.html` — edit them directly there.

## Deploying

This is a static site, so it runs on any static host:
**Netlify**, **Vercel**, **GitHub Pages**, or a normal cPanel/shared hosting
plan. Upload the whole `aylinboss` folder, keeping the `css/` and `js/`
folder structure intact, and point your domain at it.

---

## Important — two things I deliberately didn't hardcode

**1. The owner password.** Anything written into an HTML or JS file is sent
to every visitor's browser and is readable via "View Page Source" — there's
no way to hide it. So `login.html` is a complete, styled login flow, but it
doesn't check a real password itself. Right now, submitting it correctly
shows *"not connected to a server yet"* rather than silently pretending to
work.

**2. The Telegram bot token.** Same issue — a bot token in browser code can
be copied by anyone who visits the site, and gives full control of the bot
(read messages, send as you, etc.). So the floating chat button currently
opens a direct Telegram chat (`t.me/aylinboss`) instead of an embedded
widget. This is genuinely live chat and needs zero setup — it just isn't the
custom in-page widget look.

Because that password and bot token were shared in plain text in our chat,
I'd treat both as exposed: change the password, and regenerate the bot token
via **@BotFather → /revoke** before relying on either for anything real.

### Making login + chat fully live

Both need a small backend (a server that keeps secrets server-side and talks
to the browser over an API). Roughly:

```
POST /api/auth/login        → check username + hashed password, email an OTP
POST /api/auth/verify-otp   → check the OTP, start a session
POST /api/chat/send         → forward a website message to your Telegram via the Bot API
```

The frontend already calls the first two endpoints in `js/main.js` and just
needs them to exist. A minimal version, deployed somewhere like Render or
Railway, with secrets kept in environment variables (never in the code
itself):

```js
// server.js — conceptual starting point, not a complete server
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

const otpStore = new Map(); // swap for a real database in production

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const ok = username === process.env.OWNER_USERNAME
    && await bcrypt.compare(password, process.env.OWNER_PASSWORD_HASH);
  if (!ok) return res.status(401).end();

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  otpStore.set(username, { otp, expires: Date.now() + 5 * 60 * 1000 });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD }
  });
  await transporter.sendMail({
    to: process.env.OWNER_EMAIL,
    subject: 'AYLINBOOS login code',
    text: `Your code: ${otp}`
  });
  res.json({ sent: true });
});

app.post('/api/auth/verify-otp', (req, res) => {
  // compare req.body.code against otpStore, check expiry, then issue a session cookie
});
```

`.env` (never committed or shared publicly):
```
OWNER_USERNAME=...
OWNER_PASSWORD_HASH=...      # bcrypt hash, not the plain password
OWNER_EMAIL=...
GMAIL_USER=...
GMAIL_APP_PASSWORD=...       # Gmail App Password, not your normal password
TELEGRAM_BOT_TOKEN=...
```

For the chat bridge, `/api/chat/send` would `POST` to
`https://api.telegram.org/bot<TOKEN>/sendMessage` using
`TELEGRAM_BOT_TOKEN` from the environment — never sent to the browser.

**I can build this backend for you as a next step** if you want the fully
embedded version. A simpler alternative that needs no backend at all: a
free hosted live-chat tool like **Tawk.to** or **Crisp** — you paste one
script tag into the site, get a floating widget, and reply from their
mobile app. Either works; happy to set up whichever you'd rather have.

## Before you publish

- [ ] Replace sample accounts/prices/testimonials in `js/data.js` with real ones
- [ ] Add real proof screenshots to `images/proof/`
- [ ] Rotate the owner password and Telegram bot token (both were shared in chat)
- [ ] Decide: backend login/chat, or a hosted live-chat widget
