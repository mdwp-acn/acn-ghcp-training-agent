import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    fitnessGoal: { type: String, default: 'Improve endurance' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);
