import express from 'express';
import morgan from 'morgan';
import winston from 'winston';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] ${message}`;
    })
  ),
  transports: [new winston.transports.Console()]
});
const morganStream = {
  write: message => logger.info(message.trim())
};
app.use(morgan('tiny', { stream: morganStream }));

// Change this based on your astro.config.mjs, `base` option.
// They should match. The default value is "/".
const base = '/';
app.use(base, express.static('dist/client/'));
app.use(ssrHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

// Handle server errors
server.on('error', error => {
  logger.error(`Server error: ${error.message}`, { error });
  process.exit(1);
});

// Graceful shutdown
const gracefulShutdown = signal => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(err => {
    if (err) {
      logger.error('Error during shutdown', { error: err });
      process.exit(1);
    } else {
      logger.info('Closed out remaining connections.');
      process.exit(0);
    }
  });

  // Forcefully shut down after 10 seconds
  setTimeout(() => {
    logger.error(
      'Could not close connections in time, forcefully shutting down'
    );
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
