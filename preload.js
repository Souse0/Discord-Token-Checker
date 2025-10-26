const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  checkToken: (token) => ipcRenderer.invoke('check-token', token),
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath)
});