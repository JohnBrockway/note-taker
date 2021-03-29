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
    db.serialize(function () {
        db.run('CREATE TABLE IF NOT EXISTS Worlds (Name TEXT, SessionCount INTEGER)');
        db.run('CREATE TABLE IF NOT EXISTS Sessions (Name TEXT, Number INTEGER)');
        db.run('CREATE TABLE IF NOT EXISTS Items (Name TEXT, Alias INTEGER, World INTEGER)');
        db.run('CREATE TABLE IF NOT EXISTS Notes (Text TEXT, Session INTEGER, RelatedItems TEXT)');
        db.run('INSERT INTO Notes (Text, Session, RelatedItems) VALUES ("This is a note",1,"/1/3/")');
    });
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
