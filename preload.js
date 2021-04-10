const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld(
    'electron',
    {
        getNotesForItem: (itemId) => ipcRenderer.send('db-get-notes-for-item', itemId),
        getNotesForItemResponse: (callback) => ipcRenderer.on('db-get-notes-for-item-response', callback),
        getItemByID: (itemId) => ipcRenderer.send('db-get-item-by-id', itemId),
        getItemByIDResponse: (callback) => ipcRenderer.on('db-get-item-by-id-response', callback),
        getItemsForCategories: (categoryIds) => ipcRenderer.send('db-get-items-for-categories', categoryIds),
        getItemsForCategoriesResponse: (callback) => ipcRenderer.on('db-get-items-for-categories-response', callback),
        getCategoriesForWorld: (worldId) => ipcRenderer.send('db-get-categories-for-world', worldId),
        getCategoriesForWorldResponse: (callback) => ipcRenderer.on('db-get-categories-for-world-response', callback),
        getWorlds: () => ipcRenderer.send('db-get-worlds'),
        getWorldsResponse: (callback) => ipcRenderer.on('db-get-worlds-response', callback),
        addNote: (note) => ipcRenderer.send('db-add-note', note),
        addNoteResponse: (callback) => ipcRenderer.on('db-add-note-response', callback),
        addItem: (item) => ipcRenderer.send('db-add-item', item),
        addItemResponse: (callback) => ipcRenderer.on('db-add-item-response', callback),
        addCategory: (category) => ipcRenderer.send('db-add-category', category),
        addCategoryResponse: (callback) => ipcRenderer.on('db-add-category-response', callback),
        addWorld: (world) => ipcRenderer.send('db-add-world', world),
        addWorldResponse: (callback) => ipcRenderer.on('db-add-world-response', callback),
        updateNote: (note) => ipcRenderer.send('db-update-note', note),
        updateNoteResponse: (callback) => ipcRenderer.on('db-update-note-response', callback),
        updateItem: (item) => ipcRenderer.send('db-update-item', item),
        updateCategory: (category) => ipcRenderer.send('db-update-category', category),
        updateWorld: (world) => ipcRenderer.send('db-update-world', world),
    }
);