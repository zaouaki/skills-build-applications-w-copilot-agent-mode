"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const models_1 = require("./models");
const server_1 = require("./server");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', baseUrl: server_1.baseUrl });
});
app.get('/api/users/', async (_req, res, next) => {
    try {
        const users = await models_1.User.find().sort({ displayName: 1 });
        res.json({ users, apiUrl: `${server_1.baseUrl}/api/users/` });
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/teams/', async (_req, res, next) => {
    try {
        const teams = await models_1.Team.find().sort({ name: 1 });
        res.json({ teams, apiUrl: `${server_1.baseUrl}/api/teams/` });
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
        res.json({ activities, apiUrl: `${server_1.baseUrl}/api/activities/` });
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
        res.json({ leaderboard, apiUrl: `${server_1.baseUrl}/api/leaderboard/` });
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/workouts/', async (_req, res, next) => {
    try {
        const workouts = await models_1.Workout.find().sort({ difficulty: 1, title: 1 });
        res.json({ workouts, apiUrl: `${server_1.baseUrl}/api/workouts/` });
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
        app.listen(server_1.port, () => {
            // Keep the startup log explicit so the expected backend port is always visible.
            console.log(`OctoFit backend running on ${server_1.baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
void startServer();
