const { app, BrowserWindow, globalShortcut } = require('electron')
const { Tray, Menu, nativeImage } = require('electron')
const appState = require('./src/appState')

const path = require('node:path')
let win;
const createWindow = () => {
  if (win && !win.isDestroyed()) {
    return
  }
  win = new BrowserWindow({
    width: 800,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('./src/quick-add.html')
}

app.whenReady().then(() => {
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+K', () => {
    console.log('CommandOrControl+K is pressed')
    createWindow()
  })

  if (!ret) {
    console.log('registration failed')
    createWindow()
    return;
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+K'))
  const icon = nativeImage.createFromPath(__dirname + '/assets/kuratus.png')
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open', type: 'normal' },
    { label: 'Options', type: 'normal' },
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
