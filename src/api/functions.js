// Node Modules
const { readdirSync } = require('node:fs');
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
function getGlobalResources() {
    const files = readdirSync(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources'));

    let responce = {}

    for (let file of files) {
        responce[file] = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources', file);
    }

    return responce
}

module.exports = {
    getGlobalData,
    getGlobalResources
}