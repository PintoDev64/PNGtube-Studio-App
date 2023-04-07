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

contextBridge.exposeInMainWorld(
    'pngtubeAPI',
    {
        EventWindow,
        appConfig,
        appResources
    }
);