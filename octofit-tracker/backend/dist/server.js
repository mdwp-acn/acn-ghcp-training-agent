"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.getApiBaseUrl = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const team_1 = require("./models/team");
const user_1 = require("./models/user");
const workout_1 = require("./models/workout");
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const getApiBaseUrl = () => codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
exports.getApiBaseUrl = getApiBaseUrl;
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker backend is running',
        apiUrl: getApiBaseUrl(),
    });
});
app.get('/api/config', (_req, res) => {
    res.json({ apiUrl: getApiBaseUrl(), port });
});
app.get('/api/users/', async (_req, res) => {
    const data = await user_1.User.find({}).lean();
    res.json({ apiUrl: getApiBaseUrl(), data });
});
app.post('/api/users/', async (req, res) => {
    const user = await user_1.User.create(req.body);
    res.status(201).json({ apiUrl: getApiBaseUrl(), data: user });
});
app.get('/api/teams/', async (_req, res) => {
    const data = await team_1.Team.find({}).lean();
    res.json({ apiUrl: getApiBaseUrl(), data });
});
app.post('/api/teams/', async (req, res) => {
    const team = await team_1.Team.create(req.body);
    res.status(201).json({ apiUrl: getApiBaseUrl(), data: team });
});
app.get('/api/activities/', async (_req, res) => {
    const data = await activity_1.Activity.find({}).lean();
    res.json({ apiUrl: getApiBaseUrl(), data });
});
app.post('/api/activities/', async (req, res) => {
    const activity = await activity_1.Activity.create(req.body);
    res.status(201).json({ apiUrl: getApiBaseUrl(), data: activity });
});
app.get('/api/leaderboard/', async (_req, res) => {
    const data = await leaderboard_1.Leaderboard.find({}).lean();
    res.json({ apiUrl: getApiBaseUrl(), data });
});
app.post('/api/leaderboard/', async (req, res) => {
    const entry = await leaderboard_1.Leaderboard.create(req.body);
    res.status(201).json({ apiUrl: getApiBaseUrl(), data: entry });
});
app.get('/api/workouts/', async (_req, res) => {
    const data = await workout_1.Workout.find({}).lean();
    res.json({ apiUrl: getApiBaseUrl(), data });
});
app.post('/api/workouts/', async (req, res) => {
    const workout = await workout_1.Workout.create(req.body);
    res.status(201).json({ apiUrl: getApiBaseUrl(), data: workout });
});
const startServer = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db');
        console.log('MongoDB connected');
    }
    catch (error) {
        console.error('MongoDB connection failed', error);
    }
    app.listen(port, '0.0.0.0', () => {
        console.log(`Backend listening on http://0.0.0.0:${port}`);
        console.log(`API base URL: ${getApiBaseUrl()}`);
    });
};
exports.startServer = startServer;
startServer();
