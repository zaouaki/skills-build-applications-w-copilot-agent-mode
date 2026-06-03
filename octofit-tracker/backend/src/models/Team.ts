import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    weeklyGoalMinutes: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema);