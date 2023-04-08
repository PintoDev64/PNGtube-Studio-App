// Imports
const { getGlobalData, getGlobalResources, setConfig } = require('../functions');

function public(ipcMain) {
    // Get Content
    ipcMain.on('getPublicData', (event) => {
        const { colorBackground, type, wallpaper } = getGlobalData();
        event.returnValue = {
            colorBackground: colorBackground,
            wallpaperBackground: wallpaper,
            typeBackground: type
        }
    });
    ipcMain.on('getPublicResources', (event) => {
        const files = getGlobalResources();
        event.returnValue = files
    });
    // Set Content
    ipcMain.on('setConfig', (event, data) => {
        setConfig(data);
    })
}

module.exports = {
    public
}