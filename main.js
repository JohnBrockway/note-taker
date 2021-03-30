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
            preload: path.join(__dirname, 'scripts/preload.js')
        }
    });

    //win.removeMenu();
    win.loadFile('index.html');
}

function maybeSetUpDatabase() {
    // TODO send 'ready' ping when these are all set up, block app function until ping
    db.run('CREATE TABLE IF NOT EXISTS Worlds (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS Items (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Alias INTEGER, World INTEGER, IsSession INTEGER, SessionOrder INTEGER)');
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

ipcMain.on('db-get-items-for-world', (event, worldId) => {
    const stmt = db.prepare('SELECT * FROM Items WHERE World=?');
    stmt.all([worldId], function(err, rows) {
        event.sender.send('db-get-items-for-world-response', JSON.stringify(rows));
    });
});

ipcMain.on('db-get-worlds', (event) => {
    db.all('SELECT * FROM Worlds', function(err, rows) {
        event.sender.send('db-get-worlds-response', JSON.stringify(rows));
    });
});

ipcMain.on('db-add-note', (event, note) => { 
    const stmt = db.prepare('INSERT INTO Notes (Text, RelatedItems) VALUES (?,?,?)');
    stmt.run([note.text, note.relatedItems]);
});

ipcMain.on('db-add-item', (event, item) => { 
    const stmt = db.prepare('INSERT INTO Items (Name, Alias, World, IsSession) VALUES (?,?,?,?)');
    stmt.run([item.name, item.alias, item.world, 0]);
});

ipcMain.on('db-add-session', (event, session) => { 
    const stmt = db.prepare('INSERT INTO Items (Name, Alias, World, IsSession, SessionOrder) VALUES (?,?,?,?,?)');
    stmt.run([session.name, session.alias, session.world, 1, session.sessionOrder]);
});

ipcMain.on('db-add-world', (event, world) => { 
    const stmt = db.prepare('INSERT INTO Worlds (Name) VALUES (?)');
    stmt.run([world.name]);
});

ipcMain.on('db-update-note', (event, note) => {
    const stmt = db.prepare('UPDATE Notes SET Text=?, RelatedItems=? WHERE ID=?');
    stmt.run([note.text, note.relatedItems, note.id]);
});

ipcMain.on('db-update-item', (event, item) => { 
    const stmt = db.prepare('UPDATE Items SET Name=?, Alias=?, World=?, IsSession=? WHERE ID=?');
    stmt.run([item.name, item.alias, item.world, 0, item.id]);
});

ipcMain.on('db-update-session', (event, session) => { 
    const stmt = db.prepare('UPDATE Items SET Name=?, Alias=?, World=?, IsSession=?, SessionOrder=? WHERE ID=?');
    stmt.run([session.name, session.alias, session.world, 1, session.sessionOrder, session.id]);
});

ipcMain.on('db-update-world', (event, world) => { 
    const stmt = db.prepare('UPDATE Worlds SET Name=? WHERE ID=?');
    stmt.run([world.name, world.id]);
});
