# 🏎️ Pit Stop - Deployment Guide

## Quick Start for Advay

### Step 1: Download the Project

All files are ready in the `/pit-stop` folder. The complete structure is:

```
pit-stop/
├── server/
│   └── index.js (Express backend)
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/ (all React components)
│   │   ├── App.js & App.css
│   │   └── index.js
│   └── package.json
├── package.json (root dependencies)
├── README.md
└── .gitignore
```

### Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository called `pit-stop`
3. Do NOT initialize with README (we have one)

### Step 3: Push to GitHub

```bash
cd /path/to/pit-stop
git add .
git commit -m "Initial commit: Pit Stop - Gamified Activity Tracker for Advay"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pit-stop.git
git push -u origin main
```

### Step 4: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login (can use GitHub)
3. Click **"Import Project"**
4. Select **"Import Git Repository"**
5. Paste: `https://github.com/YOUR_USERNAME/pit-stop.git`
6. Click **"Import"**

### Step 5: Configure Vercel

In the Vercel dashboard:

**Build Settings:**
- Framework: `Create React App`
- Root Directory: `./`
- Build Command: `cd client && npm run build`
- Output Directory: `client/build`

**Environment Variables:** (Optional for now)
- Leave blank for demo version

Click **Deploy** and wait 2-3 minutes!

### Step 6: Access Your App

Once deployed, you'll get a URL like:
```
https://pit-stop-xxx.vercel.app
```

Share this with Advay! He can:
1. Open on phone or computer
2. Bookmark it
3. Use demo account to login

## Demo Accounts (Ready to Use)

**Player Account:**
- Username: `Advay`
- Password: `pit-stop-123`

**Parent Account:**
- Username: `Parent`  
- Password: `parent-pit-stop`

## Features Advay Can Access

✅ **Daily Quests**
- 35+ activities across all days
- Sketching, sports, mindfulness, study, music

✅ **Gamification**
- Points system (10-35 pts per quest)
- Level progression
- Weekly leaderboard
- Streak counter

✅ **Timers**
- Built-in timer for each activity
- Auto-calculates bonus points
- Logs duration

✅ **Rewards**
- In-app: Unlock cars (Ferrari, McLaren, Tesla, etc.)
- Real-world: PS5 time, movie night, keyboard games, F1 merch

✅ **Parent Dashboard**
- View Advay's progress real-time
- Activity logs
- Create custom rewards
- Approve quest completion

## After Deployment

### For Advay:
1. Open the Vercel URL
2. Click "Play as Advay"
3. Start completing quests!

### For You (Parent):
1. Open the same URL
2. Click "Play as Parent"
3. Monitor progress & set custom rewards

## Making Updates

After deployment, to make changes:

```bash
# Make edits to files
# Then push to GitHub:
git add .
git commit -m "Update: [description]"
git push

# Vercel auto-deploys within 2-3 minutes!
```

## Customization After Launch

### Change Rewards:
Edit `server/index.js`, search for `let rewards =` and update

### Add New Quests:
Edit `server/index.js`, search for `let quests =` and add new objects

### Adjust Points:
Find any quest's `points:` value and change

### Change Colors:
Edit `client/src/App.css` - gradient colors, accent colors

## Troubleshooting

**"Build failed" error?**
- Check GitHub has all files
- Ensure client/package.json exists
- Try redeploying from Vercel dashboard

**App won't load?**
- Check internet connection
- Clear browser cache (Cmd+Shift+Delete on Mac)
- Try incognito mode

**Login doesn't work?**
- Make sure you're using exact username/password from demo accounts
- Case-sensitive!

**Need help?**
- Check server/index.js for API routes
- Review React components in client/src/components/
- Check browser console (F12) for errors

## Next Steps

1. ✅ Deploy to Vercel (you're here!)
2. Share URL with Advay
3. Monitor his progress via parent dashboard
4. Create custom rewards as milestones
5. Celebrate wins! 🎉

---

**Questions?** The code is heavily commented. Every component explains what it does.

Good luck with Pit Stop! 🏎️
