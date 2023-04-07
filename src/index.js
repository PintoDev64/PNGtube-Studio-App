const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const { join } = require('path');
const electron_dev = require('electron-is-dev');
require('dotenv').config()

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Imports
const { InitProcess } = require('./init');
const { public } = require('./api/shared/public')

// Definitions
const { __Init__ } = InitProcess();
let mainWindow;

// Inits
__Init__()

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
  createWindow();
  /* let tray = new Tray('C:/Users/JoanCardozo/Descargas/337908400_200451969349133_5922490492596232774_n.jpg')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'normal', icon: 'C:/Users/JoanCardozo/Descargas/FsXcvZRaEAAXKiz.jpg' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu) */
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
public(ipcMain)