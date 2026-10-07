import app from './app.js';
import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';
import { Education } from './models/Education.js';
import { runSeed } from './seeds/runSeed.js';

const startServer = async () => {
  try {
    await connectDB();

    // Auto-seed if database is empty
    const educationCount = await Education.countDocuments();
    if (educationCount === 0) {
      console.log('[Server] Database is empty. Running initial development seed...');
      await runSeed();
    } else {
      console.log(`[Server] Database contains ${educationCount} education records. Ready.`);
    }

    const server = app.listen(ENV.PORT, '0.0.0.0', () => {
      console.log(`=======================================================`);
      console.log(`🚀 Future Path Server running on port ${ENV.PORT}`);
      console.log(`📡 Environment: ${ENV.NODE_ENV}`);
      console.log(`🧠 AI Model Provider: ${ENV.AI_API_KEY ? ENV.AI_MODEL : 'Knowledge-Graph Synthesis (Deterministic Fallback)'}`);
      console.log(`🔗 API Base: http://localhost:${ENV.PORT}/api`);
      console.log(`=======================================================`);
    });

    const shutdown = async (signal) => {
      console.log(`[Server] Received ${signal}. Gracefully shutting down...`);
      server.close(async () => {
        console.log('[Server] HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (err) {
    console.error('[Server] Fatal startup error:', err);
    process.exit(1);
  }
};

startServer();
