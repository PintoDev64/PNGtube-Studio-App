// Node Modules
const { mkdirSync, writeFileSync, existsSync, copyFileSync, readdirSync } = require("node:fs");
const { homedir } = require("node:os");
const { join } = require("node:path");

function InitProcess() {
    let baseConfig = {
        imagesPath: `${join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources')}`,
        wallpapersPath: `${join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Wallpapers')}`,
        userModel: 'Ookami',
        models: `${join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Models')}`,
        appConfig: {
            hardwareAcceleration: true,
            trayMenu: true
        },
        appBackground: {
            type: 'Color', // Color | Image
            colorBackground: '#00ff00', // Hex
            wallpaper: 'Default', // Wallpaper File Name
            brightness: 100
        }
    };
    let modelsConfig = [
        {
            modelId: 1,
            modelName: "Ookami",
            modelOwner: "PintoGamer64",
            modelDate: "2023-03-15T05:00:00.000Z",
            modelImage: "C:\\Users\\JoanCardozo\\AppData\\Roaming\\PNGtubeSettings\\Models\\Ookami\\Ookami.png",
            modelData: {
                default: [],
                States: [
                ]
            },
            modelURL: ""
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