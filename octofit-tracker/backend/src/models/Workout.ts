import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    focusAreas: [{ type: String, required: true, trim: true }],
    recommendationReason: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);