var electron = require('electron');
var { app, BrowserWindow, ipcMain, Menu } = electron;

var createWindow = function(path, hide, showDevTools) {
    var win = new BrowserWindow({
        show: !hide
    });
    win.loadURL(`file://${__dirname}/${path}`);
    if (showDevTools == true) {
        win.webContents.openDevTools();
    }
    return win;
};

app.on('ready', function() {
    var memberIndexWindow = createWindow("./member/index.html", false, false);
});