# How to Host Your Workout Log Online
### A step-by-step guide — no coding required

---

## What you'll end up with

A personal website (like `yourname-workout.netlify.app`) that you can open from any phone or laptop. Your coach and family can open the same link and see your progress in real time.

**You'll need:**
- An email address
- The two files from this zip: `index.html` and `data.json`
- About 20 minutes

---

## Part 1 — Create a GitHub account
*(GitHub is a website for storing files online. Think of it like Google Drive, but built for code.)*

1. Open your browser and go to **[github.com](https://github.com)**

2. Click the green **"Sign up"** button in the top right corner

3. Enter your email, create a password, and choose a username
   - Pick something simple like your name: `johnsmith`

4. GitHub will send a verification email — open it and click the link to confirm

5. When it asks "How many team members will be working with you?" choose **Just me**

6. When asked what you want to use GitHub for, you can skip this — click **Continue**

7. You're in. You should see a mostly empty page. ✅

---

## Part 2 — Create a repository (your file storage folder)

*(A "repository" is just a folder on GitHub that holds your files.)*

1. On the GitHub homepage, click the **green "New"** button on the left side
   — or go to **[github.com/new](https://github.com/new)**

2. Under **"Repository name"**, type: `workout-log`

3. Under **"Public / Private"**, select **Public**
   *(This is required for free hosting — your workout data will be readable by anyone with the link, but they'd need to know the link to find it)*

4. Scroll down and check the box that says **"Add a README file"**

5. Click the green **"Create repository"** button at the bottom

6. You'll land on a page that looks like a file folder with one file in it (`README.md`). ✅

---

## Part 3 — Upload your two files

1. On the repository page, click **"Add file"** (near the top right), then click **"Upload files"**

2. A drag-and-drop area will appear. Open your Downloads folder (or wherever you saved the zip from this chat), **unzip it**, and drag both files into GitHub:
   - `index.html`
   - `data.json`

3. Scroll down to where it says **"Commit changes"**
   - In the first text box it says "Add files via upload" — you can leave that as is
   - Click the green **"Commit changes"** button

4. You'll be taken back to the file list page. You should now see three files:
   `README.md`, `index.html`, `data.json` ✅

---

## Part 4 — Create a Netlify account
*(Netlify takes your files from GitHub and turns them into a real website.)*

1. Go to **[netlify.com](https://netlify.com)**

2. Click **"Sign up"** in the top right

3. Click **"Sign up with GitHub"** — this connects your Netlify and GitHub accounts so they can talk to each other

4. A popup will appear asking you to authorize Netlify to access your GitHub. Click **"Authorize Netlify"**

5. Netlify may ask a few setup questions — click through them or skip them ✅

---

## Part 5 — Deploy your site

1. On the Netlify dashboard, click **"Add new site"**, then **"Import an existing project"**

2. Click **"GitHub"**

3. A list of your GitHub repositories will appear. Click **workout-log**

4. You'll see a settings page with fields like "Base directory", "Build command", etc.
   — **Leave everything blank.** Don't change anything.

5. Click the **"Deploy workout-log"** button at the bottom

6. Netlify will show a spinning animation for about 30 seconds

7. When it finishes, you'll see a green **"Published"** badge and a link that looks like:
   `https://jolly-sunshine-abc123.netlify.app`

8. Click that link. Your workout dashboard should open! ✅

---

## Part 6 — Give your site a better name (optional)

The default name like `jolly-sunshine-abc123` is random. You can change it:

1. In Netlify, go to **Site configuration → Site details → Change site name**
2. Type something like `johns-workout-log`
3. Click **Save** — your new URL will be `https://johns-workout-log.netlify.app`

---

## Part 7 — Share it

Copy the URL and send it to your coach and family. Anyone with the link can open it from any browser, phone or laptop — no login needed.

---

&nbsp;

---

## How to add a new workout session (after each gym visit)

Every time you go to the gym:

1. **Take a photo** of your diary page and **send it to Claude** in your workout chat

2. Claude reads your handwriting and gives you an **updated `data.json` file**

3. Go to your GitHub repository: **github.com/YOUR-USERNAME/workout-log**

4. Click on **`data.json`** in the file list

5. Click the **pencil icon ✏️** in the top right of the file view

6. A text editor opens showing all your workout data. **Select all the text** (Ctrl+A on Windows, Cmd+A on Mac) and **delete it**

7. **Paste** the new content Claude gave you

8. Click the green **"Commit changes"** button (leave the message as is)

9. **Wait about 30 seconds** — Netlify automatically detects the change and updates your website

10. Refresh your workout website — the new session appears ✅

---

## Troubleshooting

**The site shows an error / looks broken**
→ Make sure both `index.html` AND `data.json` are in the repository (Step 3)

**I uploaded the files but the site still looks old**
→ Netlify takes up to 60 seconds to redeploy. Wait and refresh.

**I can't find the link to my site**
→ Log in to netlify.com → click on your site → the URL is shown at the top

**The site opens but shows no data**
→ Make sure `data.json` is valid. You can check by going to **[jsonlint.com](https://jsonlint.com)**, pasting your data.json content, and clicking Validate.

**I want to change the URL**
→ See Part 6 above.

---

## Summary — Your ongoing routine

```
📸 Take diary photo
    ↓
💬 Send to Claude → get updated data.json
    ↓
🐙 Go to github.com → edit data.json → commit
    ↓
⏱  Wait 30 seconds
    ↓
✅ Your website updates automatically
```

---

## Part 8 — Enable the "Upload Workout" button (AI parsing)

The **📷 Upload Workout** button on your site uses Claude AI to read your handwriting. You need a free Anthropic API account for this.

### Step 1 — Get an Anthropic API key

1. Go to **[console.anthropic.com](https://console.anthropic.com)** and sign up
2. New accounts get free credits — enough for hundreds of diary page scans
3. Once logged in, click **API Keys** in the left sidebar
4. Click **Create Key**, give it a name like "workout-log", click **Create**
5. Copy the key — it starts with `sk-ant-`
   ⚠️ Save it somewhere — you can only see it once

### Step 2 — Add the key to Netlify

1. Log in to **[netlify.com](https://netlify.com)** and open your workout-log site
2. Click **Site configuration** → **Environment variables** → **Add a variable**
3. Key: `ANTHROPIC_API_KEY`
4. Value: paste your `sk-ant-...` key
5. Click **Save**
6. Go to **Deploys** → click **Trigger deploy** → **Deploy site**
   *(This is needed once so Netlify picks up the new environment variable)*

### Step 3 — Connect GitHub (if you haven't already)

On your live site, click **⚙ GitHub** in the top right and fill in:
- Your GitHub username
- Repository name (`workout-log`)
- A GitHub Personal Access Token with **repo** permission

See the one-time setup instructions above for how to create the token.

---

## Your new daily workflow

```
📸 Take photo of diary page
     ↓
🌐 Open your live site
     ↓
📷 Click "Upload Workout" → choose photo
     ↓
⏱  Wait ~10 seconds while AI reads handwriting
     ↓
✏️  Review extracted data, fix anything wrong
     ↓
✅ Click "Save & Push to GitHub"
     ↓
🚀 Site updates in 30 seconds — visible to coach & family
```

No more copying JSON manually. Everything happens inside your live website.
