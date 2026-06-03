import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    weeklyMinutes: { type: Number, required: true, min: 0 },
  },
  { collection: 'leaderboard', timestamps: true },
);

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);