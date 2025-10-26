const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Create the main window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#1a1a2e',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the index.html file
  mainWindow.loadFile('index.html').then(() => {
    console.log('Index.html loaded successfully');
  }).catch(err => {
    console.log('Failed to load index.html:', err);
  });

  // Show window when it's ready
  mainWindow.once('ready-to-show', () => {
    console.log('Window is ready to show');
    mainWindow.show();
    mainWindow.focus();
  });

  // Handle window errors
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.log('Failed to load window:', errorDescription);
  });

  // Handle window close
  mainWindow.on('closed', () => {
    console.log('Window closed');
  });

  // Disable DevTools completely - never open in production
  // Remove the condition to open DevTools entirely
  // mainWindow.webContents.openDevTools(); // This line is commented out or removed
  
  return mainWindow;
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  console.log('App is ready');
  const window = createWindow();
  
  // Log window state
  window.once('show', () => {
    console.log('Window shown');
  });

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      console.log('Creating new window on activate');
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
  console.log('All windows closed');
  if (process.platform !== 'darwin') app.quit();
});

// Handle app termination
app.on('before-quit', () => {
  console.log('App is about to quit');
});

app.on('quit', () => {
  console.log('App quit');
});

// IPC handler for token checking
ipcMain.handle('check-token', async (event, token) => {
  try {
    const axios = require('axios');
    
    // Make request to Discord API to validate token
    const response = await axios.get('https://discord.com/api/v9/users/@me', {
      headers: {
        'Authorization': token
      }
    });
    
    if (response.status === 200) {
      const userData = response.data;
      
      // Check for Nitro
      let hasNitro = "No Nitro";
      if (userData.premium_type === 1) {
        hasNitro = "Nitro Classic";
      } else if (userData.premium_type === 2) {
        hasNitro = "Nitro Boost";
      }
      
      // Format creation date
      const createdAt = new Date((userData.id / 4194304) + 1420070400000);
      
      return {
        valid: true,
        username: userData.username,
        discriminator: userData.discriminator,
        id: userData.id,
        email: userData.email || "Not available",
        phone: userData.phone || "Not available",
        verified: userData.verified ? "Yes" : "No",
        createdAt: createdAt.toISOString().split('T')[0],
        hasNitro: hasNitro,
        avatar: userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` : null
      };
    }
  } catch (error) {
    return {
      valid: false,
      error: error.response?.statusText || "Invalid Token"
    };
  }
});

// IPC handler for reading file
ipcMain.handle('read-file', async (event, filePath) => {
  const fs = require('fs').promises;
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return { success: true, content: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
});