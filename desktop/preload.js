const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  saveOptions: (options) => ipcRenderer.invoke('options:save', options),
  loadOptions: () => ipcRenderer.invoke('options:load'),
  getUrlTitle: (url) => ipcRenderer.invoke('utils:getUrlTitle', url),
  closeWindow: (name) => ipcRenderer.invoke('utils:closeWindow', name),
})