# Seek & Find — frontend

React + TypeScript + Tailwind + React Router v6 (data router) frontend for
the Where's Waldo backend.

## Setup

```bash
npm install
cp .env.example .env   # point VITE_API_URL at your Express server
npm run dev
```

Drop your 4 scene images into `public/images/` (see the README in that
folder for filenames), or edit `src/data/caseFiles.ts`.

Your Express server needs CORS enabled for the dev origin, e.g.:

```ts
import cors from "cors";
app.use(cors({ origin: "http://localhost:5173" }));
```

## How it's wired to your two endpoints

- **`POST /game-start`** — called once per case, right after the image
  loads. We send the image's *natural* pixel dimensions as `clientX`/`clientY`
  (not the on-screen rendered size), since that's the space your controller
  multiplies each character's fractional position against. The response's
  `coordinates` array is used only to build the roster of character names —
  we never render `x`/`y` from it.
- **`POST /hit-coordinate`** — called on every click, with the click
  converted from on-screen pixels back into that same natural-size space.
  `hitCharacter` (present or `null`) drives the hit/miss stamp; when
  `allCharacterFound` comes back `true` we show the "case closed" modal and
  offer a restart, which just calls `/game-start` again.

## ⚠️ One gap in the backend as given

`gameStartController.ts` doesn't accept an image/case identifier — it always
builds coordinates from the same hardcoded `getCharacterOtherData()` list,
regardless of which of the 4 case files the player picked. So right now
**every case will place the same characters at the same relative spots**.

The frontend already sends an `imageId` field in the `/game-start` request
body in anticipation of this (see `src/lib/api.ts`), it's just ignored
server-side today. To fix it for real, `getCharacterOtherData()` (and the
`Coordinate` rows it seeds) need to vary per image — e.g. accept `imageId`
in the controller and look up that image's character layout instead of a
single hardcoded one.

## Persistence

Since there's no "get session" endpoint, a page refresh can't re-fetch game
state from the backend. To survive refreshes, the roster + found state is
also cached in `localStorage` per case (`src/lib/storage.ts`) and only
re-synced with the server on each hit.
