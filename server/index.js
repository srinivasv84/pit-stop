const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock database (replace with MongoDB in production)
let users = {
  advay: {
    id: 'advay',
    username: 'Advay',
    password: 'pit-stop-123', // In production: hashed
    role: 'player',
    level: 1,
    xp: 0,
    totalPoints: 0,
    currentStreak: 0,
    carCollection: ['Ferrari F40'],
    unlockedAchievements: [],
    weeklyStats: {
      pointsEarned: 0,
      questsCompleted: 0,
      consistency: 0
    },
    activityLog: []
  },
  parent: {
    id: 'parent',
    username: 'Parent',
    password: 'parent-pit-stop', // In production: hashed
    role: 'parent',
    childId: 'advay'
  }
};

let quests = [
  // Monday
  { id: 'mon-1', day: 'monday', name: 'Morning Meditation', desc: '10 min breathing', time: '6:30 AM', points: 10, category: 'mindfulness', duration: 10 },
  { id: 'mon-2', day: 'monday', name: 'Car Sketching', desc: 'Draw & experiment', time: '4:45 PM', points: 20, category: 'sketching', duration: 45 },
  { id: 'mon-3', day: 'monday', name: 'Homework', desc: 'Math, Science, English', time: '5:30 PM', points: 25, category: 'study', duration: 90 },
  { id: 'mon-4', day: 'monday', name: 'Kannada Classes', desc: 'Active participation', time: '7:00 PM', points: 15, category: 'study', duration: 60 },
  { id: 'mon-5', day: 'monday', name: 'School', desc: 'Focus & participate', time: '7:20 AM - 4:15 PM', points: 30, category: 'study', duration: 480 },
  
  // Tuesday
  { id: 'tue-1', day: 'tuesday', name: 'Morning Meditation', desc: '10 min session', time: '6:30 AM', points: 10, category: 'mindfulness', duration: 10 },
  { id: 'tue-2', day: 'tuesday', name: 'Tennis Class', desc: 'Full energy!', time: '6:00 PM', points: 25, category: 'sports', duration: 60 },
  { id: 'tue-3', day: 'tuesday', name: 'Car Sketching', desc: 'New angles', time: '4:45 PM', points: 20, category: 'sketching', duration: 45 },
  { id: 'tue-4', day: 'tuesday', name: 'Homework', desc: 'Pending work', time: '5:30 PM', points: 20, category: 'study', duration: 30 },
  { id: 'tue-5', day: 'tuesday', name: 'School', desc: 'Classes & notes', time: '7:20 AM - 4:15 PM', points: 30, category: 'study', duration: 480 },
  
  // Wednesday
  { id: 'wed-1', day: 'wednesday', name: 'Morning Meditation', desc: '10 min visualization', time: '6:30 AM', points: 10, category: 'mindfulness', duration: 10 },
  { id: 'wed-2', day: 'wednesday', name: 'Car Sketching', desc: 'Deep session', time: '4:45 PM', points: 25, category: 'sketching', duration: 45 },
  { id: 'wed-3', day: 'wednesday', name: 'Homework', desc: 'Pomodoro method', time: '5:30 PM', points: 25, category: 'study', duration: 90 },
  { id: 'wed-4', day: 'wednesday', name: 'Kannada Classes', desc: 'Active participation', time: '7:00 PM', points: 15, category: 'study', duration: 60 },
  { id: 'wed-5', day: 'wednesday', name: 'School', desc: 'Full focus day', time: '7:20 AM - 4:15 PM', points: 30, category: 'study', duration: 480 },
  
  // Thursday
  { id: 'thu-1', day: 'thursday', name: 'Morning Meditation', desc: 'Stretch & breathe', time: '6:30 AM', points: 10, category: 'mindfulness', duration: 10 },
  { id: 'thu-2', day: 'thursday', name: 'Tennis Class', desc: 'Skill building', time: '6:00 PM', points: 25, category: 'sports', duration: 60 },
  { id: 'thu-3', day: 'thursday', name: 'Car Sketching', desc: 'New designs', time: '4:45 PM', points: 20, category: 'sketching', duration: 45 },
  { id: 'thu-4', day: 'thursday', name: 'Homework', desc: 'Pending work', time: '5:30 PM', points: 20, category: 'study', duration: 30 },
  { id: 'thu-5', day: 'thursday', name: 'School', desc: 'Classes & focus', time: '7:20 AM - 4:15 PM', points: 30, category: 'study', duration: 480 },
  
  // Friday
  { id: 'fri-1', day: 'friday', name: 'Morning Meditation', desc: '10 min', time: '6:30 AM', points: 10, category: 'mindfulness', duration: 10 },
  { id: 'fri-2', day: 'friday', name: 'Extended Sketching', desc: 'Long session', time: '4:45 PM', points: 30, category: 'sketching', duration: 60 },
  { id: 'fri-3', day: 'friday', name: 'Homework Review', desc: 'Complete pending', time: '5:45 PM', points: 25, category: 'study', duration: 75 },
  { id: 'fri-4', day: 'friday', name: 'Week Reflection', desc: 'What I achieved', time: '7:45 PM', points: 15, category: 'mindfulness', duration: 10 },
  { id: 'fri-5', day: 'friday', name: 'School', desc: 'End of week push!', time: '7:20 AM - 4:15 PM', points: 30, category: 'study', duration: 480 },
  
  // Saturday
  { id: 'sat-1', day: 'saturday', name: 'Morning Meditation', desc: 'Full stretch', time: '6:30 AM', points: 10, category: 'mindfulness', duration: 10 },
  { id: 'sat-2', day: 'saturday', name: 'Swimming Class', desc: 'Physical fun', time: '9:00 AM', points: 25, category: 'sports', duration: 60 },
  { id: 'sat-3', day: 'saturday', name: 'Deep Sketching', desc: 'Advanced techniques', time: '10:45 AM', points: 35, category: 'sketching', duration: 90 },
  { id: 'sat-4', day: 'saturday', name: 'Homework/Study', desc: 'Catch-up if needed', time: '1:15 PM', points: 20, category: 'study', duration: 90 },
  { id: 'sat-5', day: 'saturday', name: 'Keyboard Class', desc: 'Trinity practice', time: '7:00 PM', points: 25, category: 'music', duration: 60 },
  
  // Sunday
  { id: 'sun-1', day: 'sunday', name: 'Morning Meditation', desc: 'Full body', time: '6:30 AM', points: 10, category: 'mindfulness', duration: 10 },
  { id: 'sun-2', day: 'sunday', name: 'Swimming Class', desc: 'Water fun', time: '9:00 AM', points: 25, category: 'sports', duration: 60 },
  { id: 'sun-3', day: 'sunday', name: 'Extended Sketching', desc: 'Master session', time: '10:45 AM', points: 35, category: 'sketching', duration: 90 },
  { id: 'sun-4', day: 'sunday', name: 'Week Prep', desc: 'Plan & homework', time: '1:15 PM', points: 25, category: 'study', duration: 90 },
  { id: 'sun-5', day: 'sunday', name: 'Keyboard Class', desc: 'Week practice', time: '7:00 PM', points: 25, category: 'music', duration: 60 }
];

let rewards = [
  { id: 1, name: 'Extra PS5 Time', description: '+1 hour gaming', pointsCost: 500, category: 'real', icon: '🎮' },
  { id: 2, name: 'Movie Night Out', description: 'Pick a movie & go out', pointsCost: 750, category: 'real', icon: '🍿' },
  { id: 3, name: 'New Keyboard Game', description: 'Buy a new music game', pointsCost: 1000, category: 'real', icon: '🎹' },
  { id: 4, name: 'F1 Merch', description: 'F1 t-shirt or cap', pointsCost: 1200, category: 'real', icon: '🏎️' },
  { id: 5, name: 'Design Course', description: '1-month design course', pointsCost: 1500, category: 'real', icon: '🎨' },
  { id: 6, name: 'Ferrari Badge', description: 'Unlock Ferrari F8', pointsCost: 300, category: 'in-app', icon: '🏆' },
  { id: 7, name: 'Platinum Driver', description: 'Unlock Platinum tier', pointsCost: 500, category: 'in-app', icon: '⭐' },
  { id: 8, name: 'Custom Paint Job', description: 'Customize car color', pointsCost: 200, category: 'in-app', icon: '🎨' }
];

let cars = [
  { id: 1, name: 'Ferrari F40', brand: 'Ferrari', year: 1987, pointsRequired: 0, icon: '🔴' },
  { id: 2, name: 'McLaren F1', brand: 'McLaren', year: 1993, pointsRequired: 100, icon: '🟠' },
  { id: 3, name: 'Ferrari F8', brand: 'Ferrari', year: 2019, pointsRequired: 300, icon: '🔴' },
  { id: 4, name: 'Mercedes AMG', brand: 'Mercedes', year: 2021, pointsRequired: 400, icon: '⚪' },
  { id: 5, name: 'Red Bull Racing RB18', brand: 'Red Bull', year: 2022, pointsRequired: 600, icon: '🔵' },
  { id: 6, name: 'Lamborghini Revuelto', brand: 'Lamborghini', year: 2023, pointsRequired: 800, icon: '🟡' },
  { id: 7, name: 'Tesla Roadster', brand: 'Tesla', year: 2023, pointsRequired: 500, icon: '⚫' }
];

// Routes

// Auth
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = Object.values(users).find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  res.json({
    id: user.id,
    username: user.username,
    role: user.role,
    token: `token-${user.id}`
  });
});

// Get quests for a day
app.get('/api/quests/:day', (req, res) => {
  const dayQuests = quests.filter(q => q.day === req.params.day);
  res.json(dayQuests);
});

// Get all quests
app.get('/api/quests', (req, res) => {
  res.json(quests);
});

// Complete a quest
app.post('/api/quests/:questId/complete', (req, res) => {
  const { userId, duration } = req.body;
  const quest = quests.find(q => q.id === req.params.questId);
  
  if (!quest) {
    return res.status(404).json({ message: 'Quest not found' });
  }
  
  const user = users[userId];
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Calculate bonus points if completed in time
  let bonusPoints = 0;
  if (duration && duration <= quest.duration) {
    bonusPoints = Math.floor(quest.points * 0.2); // 20% bonus for completing in time
  }
  
  const totalPoints = quest.points + bonusPoints;
  user.totalPoints += totalPoints;
  user.xp += totalPoints;
  user.weeklyStats.pointsEarned += totalPoints;
  user.weeklyStats.questsCompleted += 1;
  
  // Add to activity log
  user.activityLog.push({
    questId: quest.id,
    questName: quest.name,
    pointsEarned: totalPoints,
    bonusPoints: bonusPoints,
    completedAt: new Date(),
    duration: duration
  });
  
  // Level up system (1000 XP = 1 level)
  const newLevel = Math.floor(user.xp / 1000) + 1;
  if (newLevel > user.level) {
    user.level = newLevel;
  }
  
  res.json({
    pointsEarned: totalPoints,
    bonusPoints: bonusPoints,
    newLevel: user.level,
    totalPoints: user.totalPoints
  });
});

// Get user dashboard
app.get('/api/user/:userId/dashboard', (req, res) => {
  const user = users[req.params.userId];
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json({
    username: user.username,
    level: user.level,
    xp: user.xp,
    totalPoints: user.totalPoints,
    currentStreak: user.currentStreak,
    carCollection: user.carCollection,
    weeklyStats: user.weeklyStats,
    availableCars: cars.filter(c => c.pointsRequired <= user.totalPoints)
  });
});

// Get rewards
app.get('/api/rewards', (req, res) => {
  res.json(rewards);
});

// Redeem reward
app.post('/api/rewards/:rewardId/redeem', (req, res) => {
  const { userId } = req.body;
  const reward = rewards.find(r => r.id === req.params.rewardId);
  const user = users[userId];
  
  if (!reward || !user) {
    return res.status(404).json({ message: 'Reward or user not found' });
  }
  
  if (user.totalPoints < reward.pointsCost) {
    return res.status(400).json({ message: 'Not enough points' });
  }
  
  user.totalPoints -= reward.pointsCost;
  
  res.json({
    message: `Redeemed ${reward.name}!`,
    remainingPoints: user.totalPoints,
    reward: reward
  });
});

// Get all users (parent view)
app.get('/api/users/leaderboard/weekly', (req, res) => {
  const leaderboard = Object.values(users)
    .filter(u => u.role === 'player')
    .map(u => ({
      username: u.username,
      level: u.level,
      totalPoints: u.totalPoints,
      weeklyPoints: u.weeklyStats.pointsEarned,
      questsCompleted: u.weeklyStats.questsCompleted,
      streak: u.currentStreak
    }))
    .sort((a, b) => b.weeklyPoints - a.weeklyPoints);
  
  res.json(leaderboard);
});

// Parent: Get child progress
app.get('/api/parent/:parentId/child-progress', (req, res) => {
  const parent = users[req.params.parentId];
  if (!parent || parent.role !== 'parent') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  
  const child = users[parent.childId];
  res.json({
    childName: child.username,
    level: child.level,
    totalPoints: child.totalPoints,
    weeklyStats: child.weeklyStats,
    recentActivity: child.activityLog.slice(-10),
    carCollection: child.carCollection
  });
});

// Parent: Approve custom reward
app.post('/api/parent/:parentId/approve-reward', (req, res) => {
  const { childId, rewardName, pointsCost, description } = req.body;
  const parent = users[req.params.parentId];
  
  if (!parent || parent.role !== 'parent') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  
  const customReward = {
    id: Date.now(),
    name: rewardName,
    description: description,
    pointsCost: pointsCost,
    category: 'custom-real',
    icon: '🎁'
  };
  
  rewards.push(customReward);
  
  res.json({
    message: 'Reward approved',
    reward: customReward
  });
});

// Parent: Send challenge
app.post('/api/parent/:parentId/send-challenge', (req, res) => {
  const { childId, questName, pointsReward, deadline } = req.body;
  
  const challenge = {
    id: Date.now(),
    name: questName,
    points: pointsReward,
    deadline: deadline,
    status: 'active'
  };
  
  res.json({
    message: 'Challenge sent',
    challenge: challenge
  });
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../client/build')));

// Fallback to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🏎️ Pit Stop server running on port ${PORT}`);
});
