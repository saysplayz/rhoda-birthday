# 💜 Rhoda's Birthday Website

A luxury, mobile-first birthday website for **Rhoda Eyram Abla Agbevanu** — built with love.

---

## ✨ Features

- **Cinematic loading screen** with floating hearts & glowing orbs
- **Animated hero** with live relationship day counter
- **Typewriter love letter** that reveals itself on scroll
- **Interactive timeline** of your story
- **Masonry gallery** — drop in your own photos & videos
- **Netflix-style video section**
- **Animated reasons I love you** cards
- **Floating message wall**
- **Surprise button** — fireworks, confetti & heart explosion
- **Emotional closing section**
- **Custom purple cursor** with heart trail
- **Starry night sky** particle system
- **Background music** toggle
- **Fully mobile-first** & responsive

---

## 🚀 How to Put It on GitHub Pages (Free Hosting)

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** button → **New repository**
3. Name it anything, e.g. `rhoda-birthday`
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Upload the Files

**Option A — Drag & Drop (Easiest)**
1. Open your new repository on GitHub
2. Click **uploading an existing file**
3. Drag the entire `rhoda-birthday` folder contents
4. Commit the files

**Option B — Git (Command Line)**
```bash
cd rhoda-birthday
git init
git add .
git commit -m "💜 Rhoda's birthday website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rhoda-birthday.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repository → **Settings**
2. Scroll to **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch → **/ (root)**
5. Click **Save**
6. Wait ~2 minutes, then your site is live at:
   ```
   https://YOUR_USERNAME.github.io/rhoda-birthday/
   ```

---

## 📸 Adding Your Photos & Videos

### 1. Add media files

Put your files in the right folders:
```
rhoda-birthday/
├── photos/
│   ├── memory1.jpg
│   ├── smile.jpg
│   └── vacation.png
└── videos/
    ├── clip1.mp4
    └── reel.mp4
```

### 2. Register them in `js/media-config.js`

```javascript
window.PHOTOS = [
  { src: 'photos/memory1.jpg',  label: 'Our first selfie' },
  { src: 'photos/smile.jpg',    label: 'That beautiful smile' },
  { src: 'photos/vacation.png', label: 'Vacation 2023' },
  // Add as many as you want...
];

window.VIDEOS = [
  { src: 'videos/clip1.mp4', label: 'A beautiful memory' },
];
```

---

## 🎵 Adding Background Music

1. Create a `music/` folder
2. Add your audio file as `music/birthday.mp3`
3. That's it — the music toggle button will work automatically

---

## ✏️ Personalizing the Content

| What to change | Where to find it |
|---|---|
| Love letter text | `js/main.js` → `const letterText = ...` |
| Timeline entries | `index.html` → `#timeline-section` |
| Reasons I love you | `index.html` → `#reasons-section` |
| Message wall | `index.html` → `#messages-section` |
| Surprise message | `index.html` → `#surprise-message` |
| Relationship start date | `js/main.js` → `const start = new Date(...)` |

---

## 🎨 Color Customization

All colors are CSS variables in `css/style.css`:

```css
:root {
  --primary:   #7B2CBF;  /* Deep purple */
  --primary-2: #9D4EDD;  /* Medium purple */
  --primary-3: #C77DFF;  /* Light purple */
  --secondary: #E0AAFF;  /* Lavender */
  --accent:    #FFD6FF;  /* Blush pink */
}
```

---

## 📁 Project Structure

```
rhoda-birthday/
├── index.html          ← Main website file
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── main.js         ← All animations & interactions
│   └── media-config.js ← Add your photos & videos here
├── photos/             ← Drop your photos here
├── videos/             ← Drop your videos here
├── music/              ← Add birthday.mp3 here (optional)
└── README.md           ← This file
```

---

## 💡 Tips

- **Compress photos** before uploading for faster loading (use [squoosh.app](https://squoosh.app))
- **For videos**, use `.mp4` format for best browser support
- GitHub Pages has a **1 GB** repository limit — more than enough for photos
- The website works best on **Chrome, Safari, Firefox** (latest versions)

---

Made with 💜 — because she deserves the world.
