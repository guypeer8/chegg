const { join } = require('path');
require('dotenv').config({ path: join(__dirname, '.env') });

const { createApp, runApp } = require('./server');

const app = createApp();

const frontendRoutes = ['/'];
const frontendHTML = join(__dirname, 'build', 'index.html');

app.get(frontendRoutes, (_, res) => {
  res.sendFile(frontendHTML);
});

app.get('/service-check', (_, res) => {
  res.end('I am alive!');
});

runApp(app);
