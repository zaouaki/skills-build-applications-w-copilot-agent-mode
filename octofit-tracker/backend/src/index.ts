import express from 'express';

import { connectDatabase } from './database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const port = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});

app.get('/api/users/', async (_req, res, next) => {
  try {
    const users = await User.find().sort({ displayName: 1 });
    res.json({ users, apiUrl: `${baseUrl}/api/users/` });
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams/', async (_req, res, next) => {
  try {
    const teams = await Team.find().sort({ name: 1 });
    res.json({ teams, apiUrl: `${baseUrl}/api/teams/` });
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities/', async (_req, res, next) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'username displayName')
      .populate('team', 'name')
      .sort({ activityDate: -1 });
    res.json({ activities, apiUrl: `${baseUrl}/api/activities/` });
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find()
      .populate('user', 'username displayName')
      .populate('team', 'name')
      .sort({ rank: 1 });
    res.json({ leaderboard, apiUrl: `${baseUrl}/api/leaderboard/` });
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts/', async (_req, res, next) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, title: 1 });
    res.json({ workouts, apiUrl: `${baseUrl}/api/workouts/` });
  } catch (error) {
    next(error);
  }
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error);
  res.status(500).json({ error: 'Internal server error' });
});

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(port, () => {
      // Keep the startup log explicit so the expected backend port is always visible.
      console.log(`OctoFit backend running on ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

void startServer();
