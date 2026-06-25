"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker backend is running' });
});
const startServer = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db');
        console.log('MongoDB connected');
    }
    catch (error) {
        console.error('MongoDB connection failed', error);
    }
    app.listen(port, '0.0.0.0', () => {
        console.log(`Backend listening on http://0.0.0.0:${port}`);
    });
};
startServer();
