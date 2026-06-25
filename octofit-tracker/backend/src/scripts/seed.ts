import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

// Seed the octofit_db database with test data
const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
  await mongoose.connect(uri);
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
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

  const teams = await Team.insertMany([
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

  await Activity.insertMany([
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

  await Leaderboard.insertMany([
    { name: users[0].name, points: 980, rank: 1, streak: 6 },
    { name: users[1].name, points: 910, rank: 2, streak: 4 },
    { name: users[2].name, points: 875, rank: 3, streak: 3 },
  ]);

  await Workout.insertMany([
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
  await mongoose.disconnect();
};

seedDatabase().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
