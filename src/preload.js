const { contextBridge, ipcRenderer } = require('electron');

function EventWindow(typeEvent = 'minimize' || 'close' || 'restore') {
    ipcRenderer.send(typeEvent);
};

contextBridge.exposeInMainWorld(
    'admintools',
    {
        EventWindow
    }
);