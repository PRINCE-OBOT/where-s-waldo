# Where's Waldo — A Photo Tagging App

A full-stack implementation of [The Odin Project's "Where's Waldo" assignment](https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app):
a busy illustration, a handful of hidden characters, and a backend that
validates every click so a player can't fake their result client-side.

[Live Preview]()

## What the assignment asks for

Paraphrasing the brief:

- Show a large illustration containing several findable characters.
- Store each character's pixel position server-side ahead of time.
- On click, surface the candidate character(s) near that click and let the
  player pick one.
- Check the pick against the backend; give correct/incorrect feedback,
  drop a marker on a correct hit, and clear the interaction until the next
  click.
- Normalize click coordinates across screen sizes, since raw pixel clicks
  differ between a large and small viewport.
- Track completion time **server-side** (so it can't be tampered with),
  and once every character is found, prompt for a name and record it to a
  high-score table.
- Extra credit: let the player choose from multiple images before starting.

## Current status against that spec

| Requirement | Status |
|---|---|
| Illustration with hidden characters | ✅ |
| Server-stores each character's pixel position | ✅ (`Coordinate` model, seeded in `/game-start`) |
| Click validated server-side, with tolerance | ✅ (`/hit-coordinate`, ±10px box) |
| Correct/incorrect feedback per click | ✅ (hit/miss stamp on the image) |
| Marker placed on confirmed hit | ✅ |
| Coordinates normalized across screen sizes | ✅ (click position is rescaled to the image's natural pixel size before it's sent) |
| Targeting box + dropdown of nearby candidates | ⚠️ Simplified — the player pre-selects a character from a roster sidebar, then clicks their location, rather than clicking first and choosing from a dropdown of nearby names. Functionally equivalent (still one backend round-trip per guess, still one active character at a time), but not the exact UI described |
| "All characters found" state | ✅ |
| Server-side timer | ❌ Not implemented yet |
| Name entry + high-score table on completion | ❌ Not implemented yet |
| Multiple selectable images (extra credit) | ⚠️ Frontend supports picking from 4 images, but the backend doesn't yet accept an image identifier — see [Known gaps](#known-gaps) |

## Tech stack

- **Backend:** Node, Express, Prisma
- **Frontend:** React, TypeScript, Tailwind CSS, React Router v6 (data router)

## How it works

1. Player picks an illustration on the home page.
2. Frontend loads the image, reads its natural pixel dimensions, and POSTs
   them to `/game-start`. The backend creates a `GameSession` and seeds one
   `Coordinate` row per character (position = fraction × natural size).
3. Frontend stores the returned `gameSessionId` and builds a roster of
   character names from the response (never rendering their `x`/`y`, since
   that would give the answer away).
4. Player selects a name from the roster, then clicks the illustration.
   The click position is rescaled from on-screen pixels to the image's
   natural size and sent to `/hit-coordinate` along with the character name
   and session id.
5. The backend checks for an unfound `Coordinate` of that name within a
   10px box of the click, marks it found if there's a match, and reports
   back whether every character in the session has now been found.
6. When `allCharacterFound` is `true`, the frontend shows a completion
   modal with a "start a new search" action, which just calls
   `/game-start` again.

## Getting started

### Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # set VITE_API_URL to your backend's URL
npm run dev
```

## Extra credit

Multiple images to choose from is implemented on the frontend (4 case
files on the home page).