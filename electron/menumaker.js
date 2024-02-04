const { app, Menu, BrowserWindow } = require('electron')
const isMac = process.platform === 'darwin'

const template = [
    // role : 'appMenu'
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role : 'about'},
            { type : 'separator'},
            { role : 'quit'}
        ]
    }] : []),
    {
        label: 'File',
        submenu: [
            {
                label: 'Open File',
                click: async () => {
                    //doOpenFile();
                }
            }
        ]
    },//role editMenu
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator'},
            { role: 'cut'},
            { role: 'copy'},
            { role: 'paste'},
            ...isMac ? [
                { role: 'pasteAndMatchStyle'},
                { role: 'delete'},
                { role: 'selectAll'},
                { type: 'separator'},
                {
                    label: 'Speech',
                    submenu: [
                        { role: 'startSpeaking'},
                        { role: 'stopSpeaking'}
                    ]
                }
            ] : [
                { role: 'delete'},
                { type: 'separator'},
                { role: 'selectAll'}
            ]
        ]
    },
    //role viewMenu
    {
        label: 'View',
        submenu: [
            { role: 'reload'},
            { role: 'forceReload'}
        ]
    },
    //role windowMenu
    {
        label: 'My Menu',
        submenu: [
            { role: 'minimize'},
            { role: 'zoom'},
            ...(isMac ? [
                { type: 'separator'},
                { type: 'front'},
                { type: 'separator'},
                { role: 'window'}
            ] : [
                { role: 'close'}
            ])
        ]
    }
]

const contextTemplate = [
    {
        label: 'Options',
        submenu: [
            {
                label: "Do something wild",
                click: () => {createOptionWindow()}
            }
        ]
    },
    {
        label: 'More'
    }
]

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
    optionWin.loadFile('../dist/pages/options/index.html')
}

module.exports.mainMenu = Menu.buildFromTemplate(template);
module.exports.popUpMenu = Menu.buildFromTemplate(contextTemplate);

