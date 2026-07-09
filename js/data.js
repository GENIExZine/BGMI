/* ==========================================================================
   AYLINBOOS — EDITABLE CONTENT
   --------------------------------------------------------------------------
   Everything on the site that changes often (accounts for sale, rank-push
   pricing, feedback, proof screenshots) lives in this one file.

   You do NOT need to touch any .html file to update these — just edit the
   values below and re-upload this file.

   To add a new entry: copy an existing block inside the [ ] array, paste it
   right after, give it a new unique "id", and change the details.
   ========================================================================== */


/* ---- ACCOUNT LISTINGS (used on accounts.html) --------------------------
   tier must be exactly one of: "budget", "mid", "luxury"
   proofImage: path to a screenshot in images/proof/ — if the file doesn't
   exist yet, the site automatically shows a placeholder box instead, so
   it's safe to leave these pointing at images you haven't uploaded yet.
------------------------------------------------------------------------- */
const accountListings = [
  {
    id: 1,
    title: "Conqueror Account — S20, Level 68",
    tier: "luxury",
    price: 3499,
    highlights: [
      "Conqueror rank, current season",
      "14 Mythic outfits, 3 Mythic guns",
      "No ban history, original email access"
    ],
    proofImage: "images/proof/account-1.jpg"
  },
  {
    id: 2,
    title: "Ace Dominator Account — Level 55",
    tier: "mid",
    price: 1299,
    highlights: [
      "Ace Dominator, pushed manually",
      "6 rare outfits, 2 X-Suits",
      "Linked to fresh Gmail"
    ],
    proofImage: "images/proof/account-2.jpg"
  },
  {
    id: 3,
    title: "Starter Grind Account — Level 30",
    tier: "budget",
    price: 349,
    highlights: [
      "Platinum rank, clean history",
      "Season 1–3 exclusive items",
      "Great for a second/practice ID"
    ],
    proofImage: "images/proof/account-3.jpg"
  },
  {
    id: 4,
    title: "Crown Account — Level 48",
    tier: "budget",
    price: 599,
    highlights: [
      "Crown rank, solo-pushed",
      "Season 5 Mythic crate items",
      "No suspensions, clean report card"
    ],
    proofImage: "images/proof/account-4.jpg"
  },
  {
    id: 5,
    title: "Conqueror + Full Mythic Vault",
    tier: "luxury",
    price: 5999,
    highlights: [
      "Conqueror, top 500 lobby history",
      "22 Mythic outfits, full emote set",
      "UC wallet linked, no ban flags"
    ],
    proofImage: "images/proof/account-5.jpg"
  },
  {
    id: 6,
    title: "Diamond Account — Level 41",
    tier: "mid",
    price: 899,
    highlights: [
      "Diamond rank, active this season",
      "Season 4 & 7 exclusive outfits",
      "Original owner, single previous user"
    ],
    proofImage: "images/proof/account-6.jpg"
  },
  {
    id: 7,
    title: "Budget Fresh Start — Level 18",
    tier: "budget",
    price: 199,
    highlights: [
      "Gold rank, brand-new account",
      "No items, pure blank slate",
      "Good base for your own grind"
    ],
    proofImage: "images/proof/account-7.jpg"
  },
  {
    id: 8,
    title: "Ace Master + X-Suit Bundle",
    tier: "mid",
    price: 1599,
    highlights: [
      "Ace Master, pushed this season",
      "4 X-Suits, 8 skins",
      "Clean, no ban history"
    ],
    proofImage: "images/proof/account-8.jpg"
  }
];


/* ---- RANK PUSH LADDER (used on rank-push.html) --------------------------
   Shown top-to-bottom in the order given — keep these in real rank order
   so the ladder graphic on the page makes sense.
------------------------------------------------------------------------- */
const rankPushTiers = [
  { id: 1, from: "Platinum", to: "Diamond", price: 199, eta: "1 day" },
  { id: 2, from: "Diamond", to: "Crown", price: 349, eta: "1–2 days" },
  { id: 3, from: "Crown", to: "Ace", price: 599, eta: "2–3 days" },
  { id: 4, from: "Ace", to: "Ace Master", price: 999, eta: "3 days" },
  { id: 5, from: "Ace Master", to: "Conqueror", price: 1799, eta: "4–6 days" },
  { id: 6, from: "Any rank", to: "Legend", price: 2499, eta: "5–7 days" }
];


/* ---- TESTIMONIALS / FEEDBACK (used on index.html and accounts.html) ----
   rating is out of 5.
------------------------------------------------------------------------- */
const testimonials = [
  {
    name: "Rohit_99",
    rating: 5,
    text: "Got my account pushed from Ace to Conqueror in 5 days, exactly as promised. Smooth communication the whole time.",
    date: "May 2026"
  },
  {
    name: "ShadowGrind",
    rating: 5,
    text: "Bought a luxury account, everything matched the listing — outfits, level, clean history. Handover was quick over Telegram.",
    date: "Apr 2026"
  },
  {
    name: "Priya.exe",
    rating: 4,
    text: "Sold my old account through them, fair price and payment came right after the ID transfer. Would use again.",
    date: "Mar 2026"
  },
  {
    name: "KunalOP",
    rating: 5,
    text: "Popularity top-up landed within the hour. Cheapest rate I found and no issues with the account afterward.",
    date: "Feb 2026"
  }
];


/* ---- PROOF GALLERY (used on accounts.html and rank-push.html) ----------
   Same auto-placeholder behaviour as account images above.
------------------------------------------------------------------------- */
const proofGallery = [
  { image: "images/proof/proof-1.jpg", caption: "Conqueror push completed — June 2026" },
  { image: "images/proof/proof-2.jpg", caption: "Account handover confirmation" },
  { image: "images/proof/proof-3.jpg", caption: "Legend push, before / after rank" },
  { image: "images/proof/proof-4.jpg", caption: "Popularity top-up receipt" },
  { image: "images/proof/proof-5.jpg", caption: "Customer payment confirmation" },
  { image: "images/proof/proof-6.jpg", caption: "Ace → Conqueror season proof" }
];


/* ---- SITE-WIDE CONTACT INFO ---------------------------------------------
   Change these once and they update everywhere they're used.
------------------------------------------------------------------------- */
const siteContact = {
  telegramHandle: "@aylinboss",
  telegramUrl: "https://t.me/aylinboss",
  email: "Nandan.zine.nps@gmail.com",
  sinceYear: 2022
};
