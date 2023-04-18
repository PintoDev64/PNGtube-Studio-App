// Imports
const { getGlobalData, getGlobalResources, setConfig, compareConfig, getGlobalWallpapers, getAllConfig, uploadWallpaper, getModelsData } = require('../functions');

function public(ipcMain) {
    // Get Content
    ipcMain.on('getPublicData', (event) => {
        const { colorBackground, type, wallpaper, name, brightness, hardwareAcceleration, trayMenu, wallpapersPath } = getGlobalData();
        event.returnValue = {
            colorBackground: colorBackground,
            wallpaperBackground: wallpaper,
            typeBackground: type,
            wallpaperName: name,
            brightness: brightness,
            hardwareAcceleration,
            trayMenu,
            wallpapersPath
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
    ipcMain.on('getModelsSafe', (event) => {
        const Data = getModelsData();
        event.returnValue = Data;
    });
    // Set Content
    ipcMain.on('setConfig', (event, data) => {
        setConfig(data);
    });
    // Compares
    ipcMain.on('compareAppConfig', (event) => {
        event.returnValue = compareConfig();
    });
    ipcMain.on('uploadWallpaper', (event, { wallpaper, name }) => {
        uploadWallpaper(wallpaper, name);
    });
}

module.exports = {
    public
}