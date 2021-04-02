const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld(
    'electron',
    {
        getNotesForItem: (itemId) => ipcRenderer.send('db-get-notes-for-item', itemId),
        getNotesForItemResponse: (callback) => ipcRenderer.on('db-get-notes-for-item-response', callback),
        getItemsForCategory: (categoryId) => ipcRenderer.send('db-get-items-for-category', categoryId),
        getItemsForCategoryResponse: (callback) => ipcRenderer.on('db-get-items-for-category-response', callback),
        getItemByID: (itemId) => ipcRenderer.send('db-get-item-by-id', itemId),
        getItemByIDResponse: (callback) => ipcRenderer.on('db-get-item-by-id-response', callback),
        getCategoriesForWorld: (worldId) => ipcRenderer.send('db-get-categories-for-world', worldId),
        getCategoriesForWorldResponse: (callback) => ipcRenderer.on('db-get-categories-for-world-response', callback),
        getWorlds: () => ipcRenderer.send('db-get-worlds'),
        getWorldsResponse: (callback) => ipcRenderer.on('db-get-worlds-response', callback),
        addNote: (note) => ipcRenderer.send('db-add-note', note),
        addItem: (item) => ipcRenderer.send('db-add-item', item),
        addCategory: (category) => ipcRenderer.send('db-add-category', category),
        addWorld: (world) => ipcRenderer.send('db-add-world', world),
        updateNote: (note) => ipcRenderer.send('db-update-note', note),
        updateItem: (item) => ipcRenderer.send('db-update-item', item),
        updateCategory: (category) => ipcRenderer.send('db-update-category', category),
        updateWorld: (world) => ipcRenderer.send('db-update-world', world),
    }
);