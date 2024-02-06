const { app, BrowserWindow, globalShortcut, ipcMain, safeStorage } = require('electron')
const { Tray, Menu, nativeImage } = require('electron')
const Store = require('electron-store');
const Parser = require('parse5');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const store = new Store();

const appState = require('./appState')

const path = require('node:path')

app.whenReady().then(() => {
  app.dock?.hide(); // hide icon in taskbar/dock, we want app run in background with icon on Tray
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+K', () => {
    console.log('CommandOrControl+K is pressed')
    createWindow('./dist/pages/create-item/index.html', 800, 600)
  })

  if (!ret) {
    console.log('registration failed')
    createWindow('./dist/pages/create-item/index.html')
    return;
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+K'))
  const icon = nativeImage.createFromPath(__dirname + '/assets/kuratus.png')
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open', type: 'normal' },
    {
      label: 'Options', type: 'normal', click: () => {
        createWindow('./dist/pages/options/index.html');
      }
    },
    { label: '', type: 'separator' },
    {
      label: 'Quit', type: 'normal', click: () => {
        appState.userQuit();
        app.quit()
      }
    }
  ])

  tray.setContextMenu(contextMenu)
  tray.setToolTip('Command+K to curate your item.')
  tray.setTitle('') // use icon only
  ipcMain.handle('options:save', saveOptions)
  ipcMain.handle('options:load', loadOptions);
  ipcMain.handle('utils:getUrlTitle', getUrlTitle)
  ipcMain.handle('utils:closeWindow', closeWindow)

})

app.on('will-quit', (e) => {
  if (!appState.forceQuit()) {
    e.preventDefault();
    return;
  }

  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+K')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})

async function saveOptions(event, options) {
  console.log(options)
  if (!safeStorage.isEncryptionAvailable()) {
    return false;
  }
  store.set('username', safeStorage.encryptString(options.username));
  store.set('password', safeStorage.encryptString(options.password));
  return true;
}

async function loadOptions() {
  const username = store.get('username');
  const password = store.get('password');

  return {
    username: safeStorage.decryptString(Buffer.from(username || '')),
    password: safeStorage.decryptString(Buffer.from(password || ''))
  };
}

async function getUrlTitle(event, url) {
  console.log(url)
  const page = await fetch(url);
  const body = await page.text();

  const html = new JSDOM(body);
  console.log(html)
  const title = html.window.document.getElementsByTagName('title').item(0).textContent
  console.log(title)
  return title;
}

function createWindow(windowSrc, width = 800, height = 500) {
  const win = new BrowserWindow({
    width: width,
    height: height,
    icon: 'assets/kuratus@2x.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile(windowSrc)
  win.webContents.openDevTools();

  win.on('closed', () => {
    app.dock?.hide();

  })
  app.dock?.show();
}

function closeWindow() {
  for (window of BrowserWindow.getAllWindows()) {
    console.log(`Closing ${window}`)
    window.close();
  }
}