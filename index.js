const { app, BrowserWindow, globalShortcut, shell } = require('electron');
const { autoUpdater, dialog } = require('electron')
const AutoLaunch = require('auto-launch');

var autoLaunch = new AutoLaunch({
    name: 'MasterKey',
    path: '/Applications/MasterKey.app',
});

let loadingScreen;
const createLoadingScreen = () => {
    loadingScreen = new BrowserWindow({
        width: 200,
        height: 400,
        frame: false,
        backgroundColor: '#212121'
    });
    loadingScreen.setResizable(false);
    loadingScreen.on('closed', () => (loadingScreen = null));
    loadingScreen.loadFile('public/pages/loadscreen.html')
};

function createWindow() {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            enableRemoteModule: true
        },
        frame: false,
        backgroundColor: '#212121',
        'minWidth': 600,
        'minHeight': 600,
    })

    win.loadFile('public/index.html')

    globalShortcut.register('CommandOrControl+I+Shift', () => {
        if (win.isFocused()) {
            win.webContents.openDevTools()
        }
    })

    win.webContents.on('new-window', function (e, url) {
        e.preventDefault();
        shell.openExternal(url);
    });

    win.removeMenu()
    win.webContents.on('dom-ready', () => {
        if (loadingScreen) {
            loadingScreen.close();
        }
        win.show()
    })
}

app.whenReady().then(() => {
    createLoadingScreen()
    createWindow()
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})