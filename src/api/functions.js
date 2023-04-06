// Node Modules
const { homedir } = require('node:os');
const { join } = require('node:path');

// Resources
const { appBackground, wallpapersPath } = require(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings.json'));

function getGlobalData() {
    const { type, colorBackground, wallpaper } = appBackground;

    return {
        type: type,
        colorBackground: colorBackground,
        wallpaper: join(wallpapersPath, `${wallpaper}.png`)
    }
}

module.exports = {
    getGlobalData
}