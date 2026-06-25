import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, required: true },
    members: { type: Number, required: true },
    captain: { type: String, required: true },
    city: { type: String, default: 'Seattle' },
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema);
