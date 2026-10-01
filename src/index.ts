import { readConfig } from './config.js';
import { createApp } from './server.js';

const config = readConfig();
const server = createApp(config.appEnv);

server.on('error', (error) => {
  console.error(`Service failed to start: ${error.message}`);
  process.exitCode = 1;
});

server.listen(config.port, config.host, () => {
  console.log(`Environment: ${config.appEnv}`);
  console.log(`Health: http://${config.host}:${config.port}/health`);
});

function shutdown() {
  server.close((error) => {
    if (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  });
  const timer = setTimeout(() => process.exit(1), 10_000);
  timer.unref();
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
