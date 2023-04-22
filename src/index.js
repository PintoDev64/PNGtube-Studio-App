const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const { join } = require('path');
const electron_dev = require('electron-is-dev');
require('dotenv').config();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const { InitProcess } = require('./init');

// Definitions
const { __Init__ } = InitProcess();

// Inits
__Init__()

// Imports
const { public } = require('./api/shared/public')

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    minWidth: 1200,
    minHeight: 720,
    titleBarStyle: 'hidden',
    frame: false,
    webPreferences: {
      contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline';",
      preload: join(__dirname, 'preload.js'),
    },
  });

  if (electron_dev) {
    mainWindow.loadFile(process.env.URLSystemFrontend)
  } else {
    mainWindow.loadFile(join(__dirname, 'index.html'));
  }
};

app.on('ready', () => {
  // Create Window
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

//Window Events
ipcMain.on('restore', () => {
  if (mainWindow.isMaximized()) return mainWindow.restore();
  return mainWindow.maximize();
});
ipcMain.on('minimize', () => {
  mainWindow.minimize();
});
ipcMain.on('close', () => {
  app.quit();
});

// Expose API
public(ipcMain, mainWindow)