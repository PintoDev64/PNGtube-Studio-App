const { contextBridge, ipcRenderer } = require('electron');

function EventWindow(typeEvent = 'minimize' || 'close' || 'restore') {
    ipcRenderer.send(typeEvent);
};
// Gets
function appConfig() {
    return ipcRenderer.sendSync('getPublicData');
};
function getAllConfig() {
    return ipcRenderer.sendSync('getAllData')
};
function appResources() {
    return ipcRenderer.sendSync('getPublicResources');
};
function getWallpapers() {
    return ipcRenderer.sendSync('getWallpapers');
};
// Sets
function setConfig(configObject) {
    return ipcRenderer.send('setConfig', configObject);
};
// Functions
function compareAppConfig() {
    return ipcRenderer.sendSync('compareAppConfig');
};
function uploadBackground(wallpaper, name) {
    ipcRenderer.send('uploadWallpaper', {
        wallpaper,
        name
    });
};
function getModels() {
    return ipcRenderer.sendSync('getModelsSafe');
};
function getSelectModel() {
    // Function Content
};

contextBridge.exposeInMainWorld(
    'pngtubeAPI',
    {
        EventWindow,
        appConfig,
        appResources,
        setConfig,
        compareAppConfig,
        getWallpapers,
        getAllConfig,
        uploadBackground,
        getModels
    }
);