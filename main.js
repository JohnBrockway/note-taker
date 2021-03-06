const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

const dbFile = path.join(__dirname, 'storage.db')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbFile);

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    //win.removeMenu();
    win.loadFile('client/index.html');
}

function maybeSetUpDatabase() {
    // TODO send 'ready' ping when these are all set up, block app function until ping
    db.run('CREATE TABLE IF NOT EXISTS Worlds (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS Categories (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, World INTEGER)');
    db.run('CREATE TABLE IF NOT EXISTS Items (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Alias INTEGER, Category INTEGER)');
    db.run('CREATE TABLE IF NOT EXISTS Notes (ID INTEGER PRIMARY KEY AUTOINCREMENT, Text TEXT, RelatedItems TEXT)');
}

app.whenReady().then(() => {
    maybeSetUpDatabase();
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('db-get-notes-for-item', (event, itemId) => {
    const stmt = db.prepare('SELECT * FROM Notes WHERE RelatedItems LIKE "%/" || ? || "/%"');
    stmt.all([itemId], function(err, rows) {
        event.sender.send('db-get-notes-for-item-response', JSON.stringify(rows));
    });
});

ipcMain.on('db-get-items-for-categories', (event, categoryIds) => {
    // A list of comma separated question marks, the same length as categoryIds
    const listOfPlaceholders = categoryIds.map(() => '?').join(',');
    const stmt = db.prepare('SELECT * FROM Items WHERE Category IN (' + listOfPlaceholders + ')');
    stmt.all(categoryIds, function(err, rows) {
        event.sender.send('db-get-items-for-categories-response', JSON.stringify(rows));
    });
});

ipcMain.on('db-get-item-by-id', (event, itemId) => {
    const stmt = db.prepare('SELECT * FROM Items WHERE ID=? LIMIT 1');
    stmt.get([itemId], function(err, rows) {
        event.sender.send('db-get-item-by-id-response', JSON.stringify(rows));
    });
});

ipcMain.on('db-get-categories-for-world', (event, worldId) => {
    const stmt = db.prepare('SELECT * FROM Categories WHERE World=?');
    stmt.all([worldId], function(err, rows) {
        event.sender.send('db-get-categories-for-world-response', JSON.stringify(rows));
    });
});

ipcMain.on('db-get-worlds', (event) => {
    db.all('SELECT * FROM Worlds', function(err, rows) {
        event.sender.send('db-get-worlds-response', JSON.stringify(rows));
    });
});

ipcMain.on('db-add-note', (event, note) => { 
    const stmt = db.prepare('INSERT INTO Notes (Text, RelatedItems) VALUES (?,?)');
    stmt.run([note.Text, note.RelatedItems], function(err) {
        if (!err) {
            note.ID = this.lastID;
            event.sender.send('db-add-note-response', JSON.stringify(note));
        } else {
            event.sender.send('db-add-note-response', JSON.stringify(null));
        }
    });
});

ipcMain.on('db-add-item', (event, item) => { 
    const stmt = db.prepare('INSERT INTO Items (Name, Alias, Category) VALUES (?,?,?)');
    stmt.run([item.Name, item.Alias, item.Category], function(err) {
        if (!err) {
            item.ID = this.lastID;
            event.sender.send('db-add-item-response', JSON.stringify(item));
        } else {
            event.sender.send('db-add-item-response', JSON.stringify(null));
        }
    });
});

ipcMain.on('db-add-category', (event, category) => { 
    const stmt = db.prepare('INSERT INTO Categories (Name, World) VALUES (?,?)');
    stmt.run([category.Name, category.World], function(err) {
        if (!err) {
            category.ID = this.lastID;
            event.sender.send('db-add-category-response', JSON.stringify(category));
        } else {
            event.sender.send('db-add-category-response', JSON.stringify(null));
        }
    });
});

ipcMain.on('db-add-world', (event, world) => { 
    const stmt = db.prepare('INSERT INTO Worlds (Name) VALUES (?)');
    stmt.run([world.Name], function(err) {
        if (!err) {
            world.ID = this.lastID;
            event.sender.send('db-add-world-response', JSON.stringify(world));
        } else {
            event.sender.send('db-add-world-response', JSON.stringify(null));
        }
    });
});

ipcMain.on('db-update-note', (event, note) => {
    const stmt = db.prepare('UPDATE Notes SET Text=?, RelatedItems=? WHERE ID=?');
    stmt.run([note.Text, note.RelatedItems, note.ID], function(err) {
        if (!err) {
            event.sender.send('db-update-note-response', JSON.stringify(note));
        } else {
            event.sender.send('db-update-note-response', JSON.stringify(null));
        }
    });
});

ipcMain.on('db-update-item', (event, item) => { 
    const stmt = db.prepare('UPDATE Items SET Name=?, Alias=?, Category=? WHERE ID=?');
    stmt.run([item.Name, item.Alias, item.Category, item.ID]);
});

ipcMain.on('db-update-category', (event, category) => {
    const stmt = db.prepare('UPDATE Categories SET Name=?, World=? WHERE ID=?');
    stmt.run([category.Name, category.World, category.ID]);
});

ipcMain.on('db-update-world', (event, world) => { 
    const stmt = db.prepare('UPDATE Worlds SET Name=? WHERE ID=?');
    stmt.run([world.Name, world.ID]);
});
