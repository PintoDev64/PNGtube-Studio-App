// Imports
const { getGlobalData, getGlobalResources, setConfig, compareConfig, getGlobalWallpapers } = require('../functions');

function public(ipcMain) {
    // Get Content
    ipcMain.on('getPublicData', (event) => {
        const { colorBackground, type, wallpaper, name, brightness} = getGlobalData();
        event.returnValue = {
            colorBackground: colorBackground,
            wallpaperBackground: wallpaper,
            typeBackground: type,
            wallpaperName: name,
            brightness: brightness
        }
    });
    ipcMain.on('getPublicResources', (event) => {
        const files = getGlobalResources();
        event.returnValue = files;
    });
    ipcMain.on('getWallpapers', (event) => {
        const wallpapers = getGlobalWallpapers();
        event.returnValue = wallpapers;
    });
    // Set Content
    ipcMain.on('setConfig', (event, data) => {
        setConfig(data);
    });
    // Compares
    ipcMain.on('compareAppConfig', (event) => {
        event.returnValue = compareConfig();
    })
}

module.exports = {
    public
}