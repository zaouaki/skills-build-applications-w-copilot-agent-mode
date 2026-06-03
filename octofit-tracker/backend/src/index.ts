import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});

async function startServer(): Promise<void> {
  try {
    await mongoose.connect(mongoUri);
    app.listen(port, () => {
      // Keep the startup log explicit so the expected backend port is always visible.
      console.log(`OctoFit backend running on ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

void startServer();
