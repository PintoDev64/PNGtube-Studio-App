// Imports
const { getGlobalData } = require('../functions');

function public(ipcMain) {
    ipcMain.on('getPublicData', (event) => {
        const { colorBackground, type, wallpaper } = getGlobalData();
        event.returnValue = {
            colorBackground: colorBackground,
            wallpaperBackground: wallpaper,
            typeBackground: type
        }
    })
}

module.exports = {
    public
}