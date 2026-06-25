"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
// Seed the octofit_db database with test data
const seedDatabase = async () => {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
    await mongoose_1.default.connect(uri);
    console.log('Connected to MongoDB for seeding');
    await Promise.all([
        user_1.User.deleteMany({}),
        team_1.Team.deleteMany({}),
        activity_1.Activity.deleteMany({}),
        leaderboard_1.Leaderboard.deleteMany({}),
        workout_1.Workout.deleteMany({}),
    ]);
    const users = await user_1.User.insertMany([
        {
            name: 'Ava Chen',
            email: 'ava.chen@example.com',
            role: 'captain',
            fitnessGoal: 'Run a half marathon',
            active: true,
        },
        {
            name: 'Liam Ortiz',
            email: 'liam.ortiz@example.com',
            role: 'member',
            fitnessGoal: 'Improve strength',
            active: true,
        },
        {
            name: 'Mina Patel',
            email: 'mina.patel@example.com',
            role: 'coach',
            fitnessGoal: 'Increase mobility',
            active: true,
        },
    ]);
    const teams = await team_1.Team.insertMany([
        {
            name: 'North Stars',
            sport: 'Running',
            members: 8,
            captain: users[0].name,
            city: 'Seattle',
        },
        {
            name: 'River Riders',
            sport: 'Cycling',
            members: 6,
            captain: users[1].name,
            city: 'Portland',
        },
    ]);
    await activity_1.Activity.insertMany([
        {
            type: 'Run',
            duration: 35,
            intensity: 'High',
            date: new Date('2026-06-20'),
            userId: users[0]._id.toString(),
        },
        {
            type: 'Cycling',
            duration: 50,
            intensity: 'Medium',
            date: new Date('2026-06-21'),
            userId: users[1]._id.toString(),
        },
        {
            type: 'Yoga',
            duration: 25,
            intensity: 'Low',
            date: new Date('2026-06-22'),
            userId: users[2]._id.toString(),
        },
    ]);
    await leaderboard_1.Leaderboard.insertMany([
        { name: users[0].name, points: 980, rank: 1, streak: 6 },
        { name: users[1].name, points: 910, rank: 2, streak: 4 },
        { name: users[2].name, points: 875, rank: 3, streak: 3 },
    ]);
    await workout_1.Workout.insertMany([
        {
            title: 'HIIT Sprint Circuit',
            duration: 20,
            difficulty: 'Intermediate',
            focus: 'Cardio',
            equipment: ['mat', 'timer'],
        },
        {
            title: 'Core Stability Flow',
            duration: 15,
            difficulty: 'Beginner',
            focus: 'Core',
            equipment: ['mat'],
        },
        {
            title: 'Endurance Ride',
            duration: 40,
            difficulty: 'Advanced',
            focus: 'Cycling',
            equipment: ['bike'],
        },
    ]);
    console.log('Seeded sample data for users, teams, activities, leaderboard, and workouts');
    await mongoose_1.default.disconnect();
};
seedDatabase().catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
});
