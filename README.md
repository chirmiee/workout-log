# Workout Progress Log

A self-hosted workout tracker with a data/frontend split — host it once, update data without touching the code.

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | The entire frontend — visualisations, filters, muscle map, volume chart |
| `data.json` | Your workout sessions — the only file you ever update |

---

## One-time setup (~15 minutes)

### 1. Create a GitHub repo

1. Go to [github.com](https://github.com) → **New repository**
2. Name it `workout-log` (or anything you like), set it to **Public**
3. Upload both `index.html` and `data.json`

### 2. Deploy on Netlify (free)

1. Go to [netlify.com](https://netlify.com) → **Sign up** (use your GitHub account)
2. Click **Add new site → Import an existing project → GitHub**
3. Pick your `workout-log` repo
4. Leave all build settings blank (it's a static site)
5. Click **Deploy** — you get a URL like `https://your-name.netlify.app`

**That's it.** Share the URL with your coach and family.

Netlify automatically redeploys in ~30 seconds whenever you update `data.json` on GitHub.

---

## Adding a new workout session

### Option A — Using Claude (recommended)

1. Take a photo of your diary page
2. Send it to Claude in your workout conversation
3. Claude reads the handwriting and gives you the updated `data.json`
4. Go to your GitHub repo → click `data.json` → click the ✏️ pencil icon → paste the new content → **Commit changes**
5. Netlify redeploys automatically — done

### Option B — Manually editing data.json

Each session follows this structure:

```json
{
  "date": "YYYY-MM-DD",
  "muscle": "Chest, Tri",
  "satisfaction": 78,
  "type": "Coach",
  "notes": "",
  "exercises": [
    {
      "name": "Incline DB Press",
      "sets": [["15", "7.5x2"], ["12", "10x2"], ["10", "12.5x2"]]
    }
  ]
}
```

**Weight notation rules:**
- Single weight (machine/cable): `"20"` → 20 kg
- Dumbbell pair: `"10x2"` → 10 kg each hand
- Bodyweight: `"-"` or omit
- Bar only: `"Bar"`

**Session type:** `"Coach"` or `"Self"` (blue vs green in the chart)

---

## Adding a new exercise

1. Add the exercise to a session in `data.json`
2. Open `index.html` in a text editor, find the `muscleMap` object (search for `"Leg Curl"`)
3. Add your exercise: `"New Exercise Name": "Chest"` (or whichever muscle group)
4. Push both files to GitHub

Available muscle groups: `Hamstrings`, `Glutes`, `Back`, `Back (Traps)`, `Quads`, `Shoulders`, `Biceps`, `Chest`, `Triceps`, `Core`

---

## PR detection logic

A session is automatically marked as a **★ PR** if:
- The top-set weight is heavier than any previous session for that exercise, **OR**
- The top-set weight matches the all-time best AND the reps at that weight exceed the best reps ever logged at that weight

No manual flagging needed — it's computed from your data.

---

## Local preview (optional)

You can't just open `index.html` in a browser directly (the `fetch()` call is blocked locally). To preview:

```bash
# Python 3
cd workout-log
python3 -m http.server 8080
# Open http://localhost:8080
```

---

## Adapting for someone else

1. Replace `data.json` with a fresh empty array: `[]`
2. In `index.html`, update the `muscleMap` object to match their exercises
3. Deploy as above — the PR logic, charts, and filters all work from whatever sessions are in `data.json`
