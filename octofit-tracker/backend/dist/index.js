"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});
app.get('/api/users/', async (_req, res, next) => {
    try {
        const users = await models_1.User.find().sort({ displayName: 1 });
        res.json({ users, apiUrl: `${baseUrl}/api/users/` });
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/teams/', async (_req, res, next) => {
    try {
        const teams = await models_1.Team.find().sort({ name: 1 });
        res.json({ teams, apiUrl: `${baseUrl}/api/teams/` });
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/activities/', async (_req, res, next) => {
    try {
        const activities = await models_1.Activity.find()
            .populate('user', 'username displayName')
            .populate('team', 'name')
            .sort({ activityDate: -1 });
        res.json({ activities, apiUrl: `${baseUrl}/api/activities/` });
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/leaderboard/', async (_req, res, next) => {
    try {
        const leaderboard = await models_1.LeaderboardEntry.find()
            .populate('user', 'username displayName')
            .populate('team', 'name')
            .sort({ rank: 1 });
        res.json({ leaderboard, apiUrl: `${baseUrl}/api/leaderboard/` });
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/workouts/', async (_req, res, next) => {
    try {
        const workouts = await models_1.Workout.find().sort({ difficulty: 1, title: 1 });
        res.json({ workouts, apiUrl: `${baseUrl}/api/workouts/` });
    }
    catch (error) {
        next(error);
    }
});
app.use((error, _req, res, _next) => {
    console.error('API request failed:', error);
    res.status(500).json({ error: 'Internal server error' });
});
async function startServer() {
    try {
        await (0, database_1.connectDatabase)();
        app.listen(port, () => {
            // Keep the startup log explicit so the expected backend port is always visible.
            console.log(`OctoFit backend running on ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
void startServer();
