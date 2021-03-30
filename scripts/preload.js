const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld(
    'electron',
    {
        getNotesForItem: (itemId) => ipcRenderer.send('db-get-notes-for-item', itemId),
        getNotesForItemResponse: (callback) => ipcRenderer.on('db-get-notes-for-item-response', callback),
        getItemsForWorld: (worldId) => ipcRenderer.send('db-get-items-for-world', worldId),
        getItemsForWorldResponse: (callback) => ipcRenderer.on('db-get-items-for-world-response', callback),
        getWorlds: () => ipcRenderer.send('db-get-worlds'),
        getWorldsResponse: (callback) => ipcRenderer.on('db-get-worlds-response', callback),
        addNote: (note) => ipcRenderer.send('db-add-note', note),
        addItem: (item) => ipcRenderer.send('db-add-item', item),
        addSession: (session) => ipcRenderer.send('db-add-session', session),
        addWorld: (world) => ipcRenderer.send('db-add-world', world),
        updateNote: (note) => ipcRenderer.send('db-update-note', note),
        updateItem: (item) => ipcRenderer.send('db-update-item', item),
        updateSession: (session) => ipcRenderer.send('db-update-session', session),
        updateWorld: (world) => ipcRenderer.send('db-update-world', world),
    }
);

window.addEventListener('DOMContentLoaded', () => {
    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type]);
    }
});

function replaceText (selector, text) {
    const element = document.getElementById(selector);
    if (element) {
        element.innerText = text;
    }
}