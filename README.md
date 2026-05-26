# 🏎️ Pit Stop - Gamified Activity Tracker

A full-stack web application for Advay to track daily activities and quests with gamification, rewards, and car-themed progression system.

## Features

✨ **Gamified Dashboard**
- Daily quests with point system
- Timer functionality for activities
- Real-time progress tracking
- Level-up system (based on XP)
- Car collection unlocks

🏆 **Rewards & Achievements**
- In-app rewards (unlock cars, badges)
- Real-world rewards (PS5 time, movie night, keyboard games, F1 merch)
- Point-based redemption
- Custom reward creation by parents

🚗 **Car Theme**
- Unlock F1 cars and dream cars
- Ferrari, McLaren, Mercedes, Tesla, Lamborghini, etc.
- Progression visualization

👨‍👩‍👧 **Parent Dashboard**
- View child's progress in real-time
- Activity logs
- Create custom rewards
- Send challenges
- Track weekly stats

## Tech Stack

**Frontend:**
- React 18
- CSS3 (Gradient, animations, responsive)
- Local storage for client-side state

**Backend:**
- Node.js + Express
- Mock database (ready for MongoDB)
- RESTful API

**Deployment:**
- Vercel (frontend + backend)
- GitHub (version control)

## Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/pit-stop.git
cd pit-stop
```

2. Install dependencies
```bash
npm install
cd client && npm install
```

3. Start development server
```bash
npm run dev
```

The app will run at `http://localhost:3000` (client) and `http://localhost:5000` (server).

### Demo Accounts

**Player:**
- Username: Advay
- Password: pit-stop-123

**Parent:**
- Username: Parent
- Password: parent-pit-stop

## API Endpoints

### Auth
- `POST /api/auth/login` - Login user

### Quests
- `GET /api/quests` - Get all quests
- `GET /api/quests/:day` - Get quests for specific day
- `POST /api/quests/:questId/complete` - Complete a quest

### Dashboard
- `GET /api/user/:userId/dashboard` - Get user dashboard data

### Rewards
- `GET /api/rewards` - Get all rewards
- `POST /api/rewards/:rewardId/redeem` - Redeem a reward

### Leaderboard
- `GET /api/users/leaderboard/weekly` - Get weekly leaderboard

### Parent
- `GET /api/parent/:parentId/child-progress` - Get child progress
- `POST /api/parent/:parentId/approve-reward` - Create custom reward
- `POST /api/parent/:parentId/send-challenge` - Send challenge to child

## Project Structure

```
pit-stop/
├── server/
│   └── index.js           # Express server & API routes
├── client/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Login.js
│       │   ├── PlayerDashboard.js
│       │   ├── ParentDashboard.js
│       │   ├── QuestCard.js
│       │   ├── TimerModal.js
│       │   ├── RewardsSection.js
│       │   ├── LeaderboardSection.js
│       │   └── DaySelector.js
│       ├── App.js
│       ├── App.css
│       └── index.js
├── package.json
└── README.md
```

## Deployment to Vercel

### 1. Connect to GitHub
```bash
git add .
git commit -m "Initial commit: Pit Stop app"
git push origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Set up environment variables (if needed)
5. Deploy!

### 3. Vercel Configuration
Create `vercel.json` in root:
```json
{
  "buildCommand": "cd client && npm run build",
  "outputDirectory": "client/build",
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" },
    { "source": "/:path*", "destination": "/index.html" }
  ]
}
```

## Customization

### Adding More Quests
Edit `server/index.js` and add to the `quests` array:
```javascript
{ id: 'day-1', day: 'monday', name: 'Quest Name', desc: 'Description', time: '6:30 AM', points: 10, category: 'mindfulness', duration: 10 }
```

### Changing Rewards
Edit the `rewards` array in `server/index.js`

### Adjusting Point Values
Modify `points` in quest objects or reward `pointsCost`

## Future Enhancements

- [ ] MongoDB integration for persistent storage
- [ ] Real push notifications
- [ ] Social sharing
- [ ] Mobile app (React Native)
- [ ] Mini-games (Rocket League style)
- [ ] AI-powered suggestions
- [ ] Video recording of activities
- [ ] Streak animations & celebrations

## License

MIT License - feel free to use and modify!

## Support

For issues or feature requests, open a GitHub issue.

---

Built with ❤️ for Advay's automotive design dreams 🏎️✨
