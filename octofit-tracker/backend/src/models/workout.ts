import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, required: true },
    focus: { type: String, default: 'Full body' },
    equipment: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);
