"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboard = void 0;
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    streak: { type: Number, default: 0 },
}, { timestamps: true });
exports.Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
