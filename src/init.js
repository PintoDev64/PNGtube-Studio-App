// Node Modules
const { mkdirSync, writeFileSync, existsSync, copyFileSync, readdirSync } = require("node:fs");
const { homedir } = require("node:os");
const { join } = require("node:path");

function InitProcess() {
    let baseConfig = {
        imagesPath: `${join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources')}`,
        wallpapersPath: `${join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Wallpapers')}`,
        userModel: {
            model: 'Ookami', // Folder Name With JSON File [ index.json ]
            effect: 'None'
        },
        appConfig: {
            hardwareAcceleration: true,
            trayMenu: true,
            menuHideStyle: 'None', // None | Hover
        },
        appBackground: {
            visible: true,
            type: 'Color', // Color | Image
            colorBackground: '#00ff00', // Hex
            wallpaper: 'Default' // Wallpaper File Name
        },
        appMenus: {
            modelOptionsHide: true,
            modelSelectHide: true,
            windowOptionsHide: true
        }
    };
    let modelsConfig = [
        {
            modelId: 1,
            modelName: 'Ookami',
            modelOwner: 'PintoGamer64',
            modelDate: new Date(2023, 2, 15),
            modelURL: ''
        }
    ];
    let resources = readdirSync(join(__dirname, '\\resources'));
    let pathsConfig = [
        {
            data: join(homedir(), 'AppData\\Roaming\\PNGtubeSettings')
        },
        {
            data: join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Models')
        },
        {
            data: join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources')
        },
        {
            data: join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Wallpapers')
        }
    ]
    // Create the main directories to set the app config
    function CreateConfigDirectories() {
        for (let paths of pathsConfig) {
            if (!existsSync(paths.data)) {
                mkdirSync(paths.data);
            }
        }
    };
    function CreateConfigBase() {
        if (!existsSync(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings.json'))) {
            writeFileSync(
                join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings.json'),
                JSON.stringify(baseConfig, null, 4),
                { encoding: "utf-8" }
            );
        }
    };
    function CreateConfigModels() {
        if (!existsSync(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Models\\models.json'))) {
            writeFileSync(
                join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Models\\models.json'),
                JSON.stringify(modelsConfig, null, 4),
                { encoding: "utf-8" }
            );
        }
    }
    function CreateResources() {
        for (let file of resources) {
            if (!existsSync(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources', file))) {
                copyFileSync(
                    join(__dirname, '\\resources', file),
                    join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources', file)
                );
            }
        }
    }
    function __Init__() {
        CreateConfigDirectories();
        CreateConfigBase();
        CreateConfigModels();
        CreateResources();
    }
    return {
        __Init__
    }
}

module.exports = {
    InitProcess
}