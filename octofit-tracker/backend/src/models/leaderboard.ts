import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    name: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);
