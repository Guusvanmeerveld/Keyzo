const {
  app,
  BrowserWindow,
  globalShortcut,
  shell,
  autoUpdater,
} = require("electron");

const electronLocalshortcut = require("electron-localshortcut");
const Store = require("electron-store");
const store = new Store();

function initApp() {
  store.set("init", true);

  store.set("minimize", true);
  store.set("startup", true);
}

const AutoLaunch = require("auto-launch");

// const server = 'https://cdn.g-vm.nl'
// const url = `${server}/update/${process.platform}/${app.getVersion()}`

// autoUpdater.setFeedURL({ url })

let loadingScreen;
function createLoadingScreen() {
  loadingScreen = new BrowserWindow({
    width: 200,
    height: 400,
    frame: false,
    icon: "public/icon/icon.png",
    backgroundColor: "#212121",
  });

  loadingScreen.setResizable(false);
  loadingScreen.on("closed", () => (loadingScreen = null));
  loadingScreen.loadFile("public/pages/loadscreen.html");
}

function createWindow() {
  let win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      // enableBlinkFeatures: false,
      enableRemoteModule: true,
    },
    frame: false,
    show: false,
    titleBarStyle: "hidden",
    backgroundColor: "#212121",
    minWidth: 600,
    minHeight: 600,
    icon: "public/icon/icon.png",
  });

  // autoUpdater.checkForUpdates()
  win.loadFile("public/index.html");

  win.webContents.on("new-window", function (e, url) {
    e.preventDefault();
    shell.openExternal(url);
  });

  electronLocalshortcut.register(win, "Ctrl+R", () => {
    win.reload();
    // app.relaunch()
    // app.exit()
  });

  electronLocalshortcut.register(win, "Ctrl+Shift+I", () => {
    win.webContents.openDevTools();
  });

  win.on("close", (e) => {
    if (store.get("minimize")) {
      e.preventDefault();
      if (!app.isQuiting) {
        win.hide();
      }
    }
  });

  win.once("ready-to-show", () => {
    if (loadingScreen) {
      loadingScreen.close();
    }
    win.show();
  });
}

app.on("ready", () => {
  createLoadingScreen();
  createWindow();

  if (!store.get("init")) {
    initApp();
  }

  let autoLaunch = new AutoLaunch({
    name: "Keyzo",
    path: app.getPath("exe"),
  });

  if (store.get("startup")) {
    autoLaunch.enable();
  } else {
    autoLaunch.disable();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
