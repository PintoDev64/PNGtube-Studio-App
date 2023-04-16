const { contextBridge, ipcRenderer } = require('electron');

function EventWindow(typeEvent = 'minimize' || 'close' || 'restore') {
    ipcRenderer.send(typeEvent);
};
function appConfig() {
    return ipcRenderer.sendSync('getPublicData');
};
function appResources() {
    return ipcRenderer.sendSync('getPublicResources');
};
function getWallpapers() {
    return ipcRenderer.sendSync('getWallpapers');
};
function setConfig(configObject) {
    return ipcRenderer.send('setConfig', configObject);
};
function compareAppConfig() {
    return ipcRenderer.sendSync('compareAppConfig');
};
function name(params) {
    
}

contextBridge.exposeInMainWorld(
    'pngtubeAPI',
    {
        EventWindow,
        appConfig,
        appResources,
        setConfig,
        compareAppConfig,
        getWallpapers
    }
);