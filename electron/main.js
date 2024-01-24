const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('./src/quick-add.html')
}

app.whenReady().then(() => {
  // // Register a 'CommandOrControl+X' shortcut listener.
  // const ret = globalShortcut.register('CommandOrControl+X', () => {
  //   console.log('CommCoaCondOrControl+X is pressed')

  // })

  // if (!ret) {
  //   console.log('registration failed')
  // }

  // // Check whether a shortcut is registered.
  // console.log(globalShortcut.isRegistered('CommandOrControl+X'))
  createWindow()
})

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+X')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})
