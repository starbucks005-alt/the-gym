# CC Handoff — The Gym (2026-06-18)

**Give this folder to Claude Code.** Everything CCW built for The Gym this session, with the cast
decisions, design system, and the build/integration to-do. The Gym is the sister site to **The Dose**
(same engine, same "verify before you believe" promise, re-skinned for fitness/supplements/fuel).

## Files in this folder
| File | What it is | Status |
|---|---|---|
| `workout-library.html` | **The Workout Library** | Built, self-contained, JS-validated |
| `dehydrator.html` | **The Drying Bench** (dehydrator) | Built, self-contained, JS-validated |
| `THE_GYM_Map.md` | The platform map: full cast, page map, audio program, safety | Reference (pre-existing) |
| `CC-HANDOFF_gym_2026-06-18.md` | This file | — |

Both pages are **standalone HTML** (inline CSS/JS, Google Fonts only). They drop in and run with no
build step. Fonts: **Fraunces** (headings), **Inter** (body), **Lora** (labels) — same as The Dose.

---

## 1) workout-library.html — The Workout Library
- **Host:** Coach Dom Castellanos (CSCS), rendered as a **cast card** matching the live roster cards.
- **Two modes (tabs):**
  - *Single Move* — pulldown Body Part → Move. **33 moves across 7 body parts** (Arms, Shoulders, Back, Chest, Legs, Abs, Full body).
  - *Full Workout* — pick a session; Coach Dom **narrates the whole routine aloud** with rest countdowns and a highlighted "now" move. **5 routines** (Full Body, Upper, Lower, Core, 5-Min Wake-Up).
- Each move: fun verbal **script** (read aloud via browser **Web Speech API**), a form-fix, and a **Myth-Check Stoplight** (green/amber/red verdict + named citation).
- **Palette:** volt-orange accent `#e0552e` on ink/cream.

## 2) dehydrator.html — The Drying Bench
- **Host:** **Reece Ashford** (cast card). Reece is **in-framework**, so her card has **no MCP backpack badge** (accuracy on purpose).
- **The bench crew** (credited around Reece, all carry backpacks): **Jax Rivera** (18, Gen Z SEO, *Trend Scout*, hired by Reece), **Zara Cole** (social-media fun goddess — runs the smoothies, poses everyone for selfies), **Nadia Hassan** (nutrition), **Dr. Sana Qureshi** (recovery), **Eli Adler** (Stoplight).
- **23 foods across 6 categories** (Fruits, Vegetables, Herbs & Tea, Jerky & Protein, Raw Crackers & Leathers, More). Each: prep script (read-aloud), temp/time/storage, and a **Myth-Check Stoplight** + citation.
- **Dr. O house recipes** featured: Cherry Tomatoes Italian (Excalibur), Mango + San Pellegrino in the Vitamix, dried-blueberry blender jam.
- **"Keep them on the counter"** lifestyle callout (glass jars, smoothies/yogurt/rehydrate/snack, "better than chips").
- Safety calls front and center: **jerky must hit 160°F** (poultry 165°F); **never store garlic/tomatoes in oil at room temp** (botulism).
- **Palette:** berry accent `#c0356f` (distinct from the Workout Library's orange and the Dose's teal). Branded **THE GYM**.

---

## Cast & canon decisions (please keep)
- **MJ (the Gardener) was pulled off the Drying Bench front-of-house** — too "country" for this modern crowd. Keep her for the *growing & drying craft* only; Reece fronts the lifestyle.
- **Reece hosts the Drying Bench; Coach Dom hosts the Workout Library.**
- **Jax Rivera and Zara Cole now work part-time at The Gym** (like Reece is Dose-full / Gym-part). Roster note: Jax's Gym role = **Trend Scout**; add the **Reece ↔ Jax** pairing ("Reece gave him the job"). *This roster/JSON edit is NOT yet committed — please apply when you sync the roster.*
- **Judge Roz (The Court) is in-framework, not MCP.** She routes to witnesses who carry backpacks; build her as an in-framework router, never give the comedy judge a live factual backpack of her own.
- **Diets/nutrition authority stays at The Dose.** The Gym **links out** to the Dose for diet content rather than duplicating it (avoid stepping on the Dose's Mythbuster / diets pages).

## Design system (so new Gym pages stay consistent)
- **Cast card** (`.cc-*`): slate-gradient avatar with serif monogram, green **🎒 MCP** badge (omit for in-framework agents like Reece), blue role caps, italic tagline, skill chips, MCP/Full-time pills, black **Hire** button. Mirrors the deployed roster cards.
- **Stoplight** = green (checks out) / amber (it depends) / red (myth), always with a **named source**. This is the brand; keep it on every claim.
- **No em dashes** anywhere (house voice; Selene flags them).

---

## Build / integration to-do (for CC)
1. **Stand up The Gym as its own repo / Netlify site** (per `THE_GYM_Map.md`): copy The Dose scaffold, reskin palette + imagery, point at a fresh remote.
2. **Wire these two pages into the Gym nav + home tiles** (Workout Library, The Drying Bench).
3. **Swap monogram avatars for real portraits** (Dr. O is making them): Coach Dom, Reece, Jax, Zara, Dr. Sana, Nadia. One `<img>` swap per `.cc-photo` (replace the `.cc-mono` monogram).
4. **Replace the browser read-aloud with ElevenLabs host voices** (Coach Dom on workouts, Reece on the bench), matching The Dose `_hosts.js` pattern.
5. **Wire the live Stoplight (Eli)** so myth-check verdicts pull real, current citations instead of the baked-in deck. Nadia/Henry/Sana/Amara carry their own backpacks so a verdict can cite even when Eli is not in the room.
6. **Roster sync:** mark Jax + Zara part-time at the Gym; Jax = Trend Scout; backpacks — Jax `market-intel`/`social-trends`-style discovery, Zara `social-trends`, Reece in-framework.
7. Cross-link the shared cast both ways (Dose ↔ Gym), per the design rule that backpacks travel with the character.

## Validation done this session
- Both pages pass `node --check` on their inline JS; HTML tags balanced; every routine reference in the Workout Library resolves to a real move.

> Note: a partial `.git` folder exists here from a sandbox attempt that could not complete (the bridge
> blocks git's file locking). On your machine, run `rm -rf ".git"` then `git init && git add -A && git commit`
> for a clean first commit.
