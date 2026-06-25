import express, { type Request, type Response } from 'express';
import { Activity } from './models/activity';
import { connectToDatabase } from './config/database';
import { Leaderboard } from './models/leaderboard';
import { Team } from './models/team';
import { User } from './models/user';
import { Workout } from './models/workout';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

const codespaceName = process.env.CODESPACE_NAME;
const getApiBaseUrl = () =>
  codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker backend is running',
    apiUrl: getApiBaseUrl(),
  });
});

app.get('/api/config', (_req: Request, res: Response) => {
  res.json({ apiUrl: getApiBaseUrl(), port });
});

app.get('/api/users/', async (_req: Request, res: Response) => {
  const data = await User.find({}).lean();
  res.json({ apiUrl: getApiBaseUrl(), data });
});

app.post('/api/users/', async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json({ apiUrl: getApiBaseUrl(), data: user });
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  const data = await Team.find({}).lean();
  res.json({ apiUrl: getApiBaseUrl(), data });
});

app.post('/api/teams/', async (req: Request, res: Response) => {
  const team = await Team.create(req.body);
  res.status(201).json({ apiUrl: getApiBaseUrl(), data: team });
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  const data = await Activity.find({}).lean();
  res.json({ apiUrl: getApiBaseUrl(), data });
});

app.post('/api/activities/', async (req: Request, res: Response) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({ apiUrl: getApiBaseUrl(), data: activity });
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  const data = await Leaderboard.find({}).lean();
  res.json({ apiUrl: getApiBaseUrl(), data });
});

app.post('/api/leaderboard/', async (req: Request, res: Response) => {
  const entry = await Leaderboard.create(req.body);
  res.status(201).json({ apiUrl: getApiBaseUrl(), data: entry });
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  const data = await Workout.find({}).lean();
  res.json({ apiUrl: getApiBaseUrl(), data });
});

app.post('/api/workouts/', async (req: Request, res: Response) => {
  const workout = await Workout.create(req.body);
  res.status(201).json({ apiUrl: getApiBaseUrl(), data: workout });
});

const startServer = async () => {
  try {
    await connectToDatabase();
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed', error);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Backend listening on http://0.0.0.0:${port}`);
    console.log(`API base URL: ${getApiBaseUrl()}`);
  });
};

startServer();

export { app, getApiBaseUrl, startServer };
