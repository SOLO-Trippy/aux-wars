<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Aux Wars — How to Get Online</title>
<style>
  body { font-family: 'Segoe UI', sans-serif; background: #0a0a10; color: #f0f0f8; max-width: 700px; margin: 0 auto; padding: 30px 20px; line-height: 1.7; }
  h1 { font-size: 2.2rem; background: linear-gradient(120deg,#ff2d55,#ffc300,#00d4ff); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom: 4px; }
  h2 { color: #ffc300; font-size: 1.3rem; margin-top: 32px; border-left: 3px solid #ffc300; padding-left: 12px; }
  h3 { color: #00d4ff; font-size: 1rem; margin-top: 20px; }
  p { color: #b0b0c0; margin: 8px 0; }
  .step { background: #16161f; border: 1px solid #252535; border-radius: 12px; padding: 20px; margin: 12px 0; }
  .step-num { display: inline-block; background: #ff2d55; color: #fff; font-weight: 700; font-size: .8rem;
    border-radius: 50%; width: 26px; height: 26px; line-height: 26px; text-align: center; margin-right: 8px; }
  code { background: #0d0d18; border: 1px solid #252535; border-radius: 6px; padding: 2px 8px; color: #00d4ff; font-size: .9rem; }
  .note { background: rgba(0,212,255,.06); border: 1px solid rgba(0,212,255,.2); border-radius: 8px; padding: 12px 16px; color: #00d4ff; font-size: .85rem; margin: 10px 0; }
  .warn { background: rgba(255,195,0,.06); border: 1px solid rgba(255,195,0,.2); border-radius: 8px; padding: 12px 16px; color: #ffc300; font-size: .85rem; margin: 10px 0; }
  .file-tree { background: #0d0d18; border-radius: 10px; padding: 16px 20px; font-family: monospace; font-size: .9rem; color: #b0b0c0; margin: 10px 0; }
  .file-tree .folder { color: #ffc300; }
  .file-tree .file { color: #00d4ff; }
  a { color: #ff2d55; }
  hr { border: none; border-top: 1px solid #252535; margin: 30px 0; }
  .big-link { display: block; background: #ff2d55; color: #fff; text-align: center; border-radius: 10px;
    padding: 14px; font-weight: 700; font-size: 1.05rem; text-decoration: none; margin: 12px 0; }
  .big-link:hover { background: #ff4d6d; }
  .big-link-gold { background: #ffc300; color: #000; }
  .big-link-gold:hover { background: #ffd740; }
</style>
</head>
<body>

<h1>🎵 AUX WARS</h1>
<p style="color:#5a5a78;font-size:.8rem;letter-spacing:3px;text-transform:uppercase;">Online Multiplayer Setup Guide</p>

<div class="note">
  ⏱ This takes about <strong>10–15 minutes</strong> and costs nothing. You need a free GitHub account and a free Railway account.
</div>

<h2>What You'll Be Doing</h2>
<p>You'll upload the code to GitHub (like a save drive for code), then connect it to Railway (a free server host). Railway gives you a real website link you can share with anyone in the world.</p>

<hr/>

<!-- STEP 1 -->
<h2>Step 1 — Get the Files Ready</h2>
<div class="step">
  <p>Download the <strong>auxwars-online.zip</strong> file and unzip it. You'll see this folder structure:</p>
  <div class="file-tree">
    <span class="folder">auxwars-online/</span><br/>
    &nbsp;&nbsp;<span class="folder">public/</span><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="file">index.html</span> &nbsp;← the game everyone sees<br/>
    &nbsp;&nbsp;<span class="folder">src/</span><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="file">server.js</span> &nbsp;← the brain of the game<br/>
    &nbsp;&nbsp;<span class="file">package.json</span><br/>
    &nbsp;&nbsp;<span class="file">Procfile</span><br/>
    &nbsp;&nbsp;<span class="file">.gitignore</span>
  </div>
</div>

<!-- STEP 2 -->
<h2>Step 2 — Create a GitHub Account (if you don't have one)</h2>
<div class="step">
  <p><span class="step-num">1</span> Go to <a href="https://github.com" target="_blank">github.com</a> and sign up for free.</p>
  <p><span class="step-num">2</span> Verify your email.</p>
  <div class="note">Already have GitHub? Skip to Step 3.</div>
</div>

<!-- STEP 3 -->
<h2>Step 3 — Upload the Code to GitHub</h2>
<div class="step">
  <p><span class="step-num">1</span> After logging in to GitHub, click the <strong>+</strong> button (top right) → <strong>New repository</strong></p>
  <p><span class="step-num">2</span> Name it <code>aux-wars</code> — leave everything else as default — click <strong>Create repository</strong></p>
  <p><span class="step-num">3</span> On the next page, look for the link that says <strong>"uploading an existing file"</strong> and click it</p>
  <p><span class="step-num">4</span> <strong>Drag and drop all the files from your unzipped folder</strong> into the GitHub upload area. Make sure you upload the files AND folders (public/ and src/), not just the outer folder.</p>
  <p><span class="step-num">5</span> Scroll down and click <strong>Commit changes</strong></p>
  <div class="warn">⚠️ Make sure you see <code>src/server.js</code> and <code>public/index.html</code> in the repo after uploading — those are the key files.</div>
</div>

<!-- STEP 4 -->
<h2>Step 4 — Create a Free Railway Account</h2>
<div class="step">
  <p><span class="step-num">1</span> Go to <a href="https://railway.app" target="_blank">railway.app</a></p>
  <p><span class="step-num">2</span> Click <strong>Login</strong> → choose <strong>"Login with GitHub"</strong> — this connects them automatically</p>
  <p><span class="step-num">3</span> Authorize Railway to access your GitHub</p>
  <a href="https://railway.app" target="_blank" class="big-link">→ Go to Railway.app</a>
</div>

<!-- STEP 5 -->
<h2>Step 5 — Deploy on Railway</h2>
<div class="step">
  <p><span class="step-num">1</span> In Railway, click <strong>New Project</strong></p>
  <p><span class="step-num">2</span> Select <strong>"Deploy from GitHub repo"</strong></p>
  <p><span class="step-num">3</span> Find and select your <strong>aux-wars</strong> repo</p>
  <p><span class="step-num">4</span> Railway will automatically detect it's a Node.js app and start deploying</p>
  <p><span class="step-num">5</span> Wait about 1–2 minutes for the green ✅ "Deployed" status</p>
</div>

<!-- STEP 6 -->
<h2>Step 6 — Get Your Public Link</h2>
<div class="step">
  <p><span class="step-num">1</span> Click on your deployed project in Railway</p>
  <p><span class="step-num">2</span> Go to the <strong>Settings</strong> tab → scroll to <strong>Networking</strong></p>
  <p><span class="step-num">3</span> Click <strong>Generate Domain</strong></p>
  <p><span class="step-num">4</span> You'll get a link like: <code>aux-wars-production.up.railway.app</code></p>
  <p><span class="step-num">5</span> <strong>That's your game URL! Share it with your friends.</strong> 🎉</p>
  <div class="note">✅ Anyone with this link can open it on their phone or computer and play — no install needed.</div>
</div>

<hr/>

<h2>How to Play Online</h2>
<div class="step">
  <p>1. <strong>Host</strong> opens the link, types their name, clicks <strong>Create a Room</strong></p>
  <p>2. Host shares the <strong>6-letter room code</strong> (shown on screen) in your group chat</p>
  <p>3. <strong>Everyone else</strong> opens the same link, types their name, enters the room code, clicks <strong>Join</strong></p>
  <p>4. Once everyone's in, host clicks <strong>Start Game</strong></p>
  <p>5. Game runs fully online — each person submits their own song, hears songs in their browser, and votes from their own device!</p>
</div>

<hr/>

<h2>Free Tier Limits (Railway)</h2>
<div class="warn">
  Railway's free tier gives you <strong>$5 of free credit per month</strong> — enough for hundreds of game sessions. The server sleeps when nobody's playing (saves credits). If you want it always-on, their hobby plan is $5/month.
</div>

<h2>Troubleshooting</h2>
<div class="step">
  <h3>Build failed on Railway?</h3>
  <p>Make sure <code>package.json</code> is in the root of your repo (not inside a subfolder). Check that <code>src/server.js</code> exists.</p>
  <h3>Players can't connect?</h3>
  <p>Make sure everyone is using the <strong>exact same URL</strong> (the Railway domain). Don't mix http and https.</p>
  <h3>Songs not opening?</h3>
  <p>Some browsers block auto-opening tabs. Players can tap the "Open" button manually to open the song.</p>
</div>

<hr/>
<p style="text-align:center;color:#5a5a78;font-size:.8rem;">Built with Node.js + Socket.io • Hosted free on Railway</p>
</body>
</html>
