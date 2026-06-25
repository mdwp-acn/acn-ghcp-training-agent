import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    intensity: { type: String, required: true },
    date: { type: Date, default: Date.now },
    userId: { type: String, required: true },
  },
  { timestamps: true },
);

export const Activity = model('Activity', activitySchema);
