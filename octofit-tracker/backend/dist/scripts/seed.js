"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const models_1 = require("../models");
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectDatabase)();
    await Promise.all([
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.User.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    const [trailBlazers, coreCrew, summitSeekers] = await models_1.Team.insertMany([
        {
            name: 'Trail Blazers',
            description: 'Outdoor runners building endurance one route at a time.',
            city: 'Seattle',
            weeklyGoalMinutes: 900,
        },
        {
            name: 'Core Crew',
            description: 'Strength-focused teammates balancing mobility and power.',
            city: 'Austin',
            weeklyGoalMinutes: 720,
        },
        {
            name: 'Summit Seekers',
            description: 'Hybrid athletes training for hikes, climbs, and long weekends.',
            city: 'Denver',
            weeklyGoalMinutes: 840,
        },
    ]);
    const [maya, jordan, priya, theo] = await models_1.User.insertMany([
        {
            username: 'maya_runs',
            email: 'maya.rivera@example.com',
            displayName: 'Maya Rivera',
            fitnessGoal: 'Run a half marathon under two hours',
            level: 'intermediate',
        },
        {
            username: 'jordan_lifts',
            email: 'jordan.lee@example.com',
            displayName: 'Jordan Lee',
            fitnessGoal: 'Build consistent strength training habits',
            level: 'beginner',
        },
        {
            username: 'priya_moves',
            email: 'priya.shah@example.com',
            displayName: 'Priya Shah',
            fitnessGoal: 'Improve mobility and daily activity streaks',
            level: 'advanced',
        },
        {
            username: 'theo_trails',
            email: 'theo.martin@example.com',
            displayName: 'Theo Martin',
            fitnessGoal: 'Prepare for a mountain backpacking trip',
            level: 'intermediate',
        },
    ]);
    await models_1.Activity.insertMany([
        {
            user: maya._id,
            team: trailBlazers._id,
            type: 'Run',
            durationMinutes: 52,
            caloriesBurned: 510,
            activityDate: new Date('2026-06-01T07:15:00Z'),
        },
        {
            user: jordan._id,
            team: coreCrew._id,
            type: 'Strength Training',
            durationMinutes: 45,
            caloriesBurned: 360,
            activityDate: new Date('2026-06-01T18:30:00Z'),
        },
        {
            user: priya._id,
            team: coreCrew._id,
            type: 'Yoga Flow',
            durationMinutes: 40,
            caloriesBurned: 180,
            activityDate: new Date('2026-06-02T06:45:00Z'),
        },
        {
            user: theo._id,
            team: summitSeekers._id,
            type: 'Hike',
            durationMinutes: 95,
            caloriesBurned: 720,
            activityDate: new Date('2026-06-02T14:00:00Z'),
        },
    ]);
    await models_1.LeaderboardEntry.insertMany([
        { user: theo._id, team: summitSeekers._id, points: 1880, rank: 1, weeklyMinutes: 265 },
        { user: maya._id, team: trailBlazers._id, points: 1640, rank: 2, weeklyMinutes: 230 },
        { user: priya._id, team: coreCrew._id, points: 1325, rank: 3, weeklyMinutes: 190 },
        { user: jordan._id, team: coreCrew._id, points: 1090, rank: 4, weeklyMinutes: 155 },
    ]);
    await models_1.Workout.insertMany([
        {
            title: 'Tempo Builder Run',
            category: 'Cardio',
            difficulty: 'intermediate',
            durationMinutes: 35,
            focusAreas: ['endurance', 'pace control'],
            recommendationReason: 'Ideal for runners preparing for longer race efforts.',
        },
        {
            title: 'Foundational Strength Circuit',
            category: 'Strength',
            difficulty: 'beginner',
            durationMinutes: 30,
            focusAreas: ['legs', 'core', 'posture'],
            recommendationReason: 'Builds full-body strength with approachable movements.',
        },
        {
            title: 'Trail-Ready Conditioning',
            category: 'Hybrid',
            difficulty: 'advanced',
            durationMinutes: 45,
            focusAreas: ['balance', 'climbing endurance', 'stability'],
            recommendationReason: 'Supports hikers and climbers training for uneven terrain.',
        },
    ]);
    console.log('Seed complete: users, teams, activities, leaderboard, and workouts inserted.');
}
seedDatabase()
    .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await (0, database_1.disconnectDatabase)();
});
