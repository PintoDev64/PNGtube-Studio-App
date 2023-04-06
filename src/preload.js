const { contextBridge, ipcRenderer } = require('electron');

function EventWindow(typeEvent = 'minimize' || 'close' || 'restore') {
    ipcRenderer.send(typeEvent);
};

function appConfig() {
    return ipcRenderer.sendSync('getPublicData');
}

contextBridge.exposeInMainWorld(
    'pngtubeAPI',
    {
        EventWindow,
        appConfig
    }
);