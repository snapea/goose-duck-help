const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
        // setBackground: (img) => ipcRenderer.on('set-background', img)
        setBackground: (img) => ipcRenderer.on('set-background', img)
    }
)

