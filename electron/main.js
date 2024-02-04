const { app, BrowserWindow, globalShortcut} = require('electron')
const { mainMenu } = require('./menumaker')
const { Tray, Menu, nativeImage } = require('electron')
const appState = require('./appState')

const path = require('node:path')
let win;
const createWindow = () => {
  if (win && !win.isDestroyed()) {
    return
  }
  win = new BrowserWindow({
    width: 800,
    height: 550,
    icon: 'assets/kuratus@2x.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    useContentSize: true
  })
  win.loadFile('./dist/pages/create-item/index.html')

  //resize to update window height and width depend on content
  win.on('resize',() => {
    const [width, height] = win.getContentSize();
    //do something with new size
    console.log('Resized, new window size:',width,height);
  })

  //custom menu
  Menu.setApplicationMenu(mainMenu);
  win.webContents.on("context-menu",() => {
    contextTemplate.popup(win.webContents);
  })

  win.on('closed', () => {
    app.dock?.hide();

  })
  app.dock?.show();
}



app.whenReady().then(() => {
  app.dock?.hide(); // hide icon in taskbar/dock, we want app run in background with icon on Tray
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
    { label: 'Open', type: 'normal', click: () => {
      createWindow();
    }},
    { label: 'Options', type: 'normal', click: () => {
      createOptionWindow();
    } },
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

  //create short cut for option Page
  const short = globalShortcut.register('CommandOrControl+O', () => {
    console.log('CommandOrControl+O is pressed'),
    createOptionWindow()
  })
})

app.on('will-quit', (e) => {
  if (!appState.forceQuit()) {
    e.preventDefault();
    return;
  }

  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+K')
  globalShortcut.unregister('CommandOrControl+O')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})

//create Option window
let optionWin
  const createOptionWindow = () => {
    if (optionWin && !optionWin.isDestroyed()) {
      return
    }
    optionWin = new BrowserWindow({
      width: 1000,
      height: 600,
      title: 'Options',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
    optionWin.loadFile('./dist/pages/options/index.html')
  }
//Open options page method (right click)
const contextTemplate = Menu.buildFromTemplate([
  {
      label: 'Options',
      click: () => {createOptionWindow()},
      accelerator: "CmdOrCtrl+O"
  },
  {
      label: 'More'
  }
])

