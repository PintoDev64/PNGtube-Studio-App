// Node Modules
const { readdirSync, writeFileSync } = require('node:fs');
const { homedir } = require('node:os');
const { join } = require('node:path');

// Resources
const currentConfig = require(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings.json'));

const { appBackground, wallpapersPath } = currentConfig;

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
function setConfig({ action, value }) {

    let functions = {
        type: () => {
            writeFileSync(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings.json'), JSON.stringify({
                ...currentConfig,
                appBackground: value
            }))
        }
    }

    functions[action];
}

module.exports = {
    getGlobalData,
    getGlobalResources,
    setConfig
}