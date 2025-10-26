const { spawn } = require('child_process');
const path = require('path');

// Set environment to production to disable dev tools
process.env.NODE_ENV = 'production';

// Start the Electron app
const electron = spawn('npx', ['electron', '.'], {
  stdio: 'inherit',
  shell: true
});

electron.on('close', (code) => {
  console.log(`Uygulama kapandi. Cikis kodu: ${code}`);
});

electron.on('error', (error) => {
  console.error('Uygulama baslatilirken hata olustu:', error);
});