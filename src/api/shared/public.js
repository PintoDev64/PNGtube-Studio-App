// Imports
const { getGlobalData, getGlobalResources, setConfig, compareConfig, getGlobalWallpapers, getAllConfig } = require('../functions');

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
    ipcMain.on('getAllData', (event) => {
        const configFileJSON = getAllConfig();
        event.returnValue = configFileJSON;
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