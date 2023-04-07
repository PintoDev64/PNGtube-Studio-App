// Imports
const { getGlobalData, getGlobalResources } = require('../functions');

function public(ipcMain) {
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
    })
}

module.exports = {
    public
}