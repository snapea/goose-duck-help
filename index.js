const {app, BrowserWindow, dialog, globalShortcut, clipboard, ipcMain, Menu, MenuItem} = require('electron')
const path = require("path");


const createWindow = () => {

    const win = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        width: 1930,
        height: 1176
    })

    const menu = Menu.buildFromTemplate([
        {
            label: app.name,
            submenu: [
                {
                    click: () => {
                        const img = clipboard.readImage()
                        img.resize({
                            width: 1936,
                            height: 1119
                        })
                        const base64 = img.toDataURL()
                        win.webContents.send('set-background', base64)
                    },
                    label: '插入图片',
                },
                {
                    click: () => win.webContents.send('update-counter', -1),
                    label: 'Decrement',
                }
            ]
        }

    ])

    win.webContents.openDevTools()
    Menu.setApplicationMenu(menu)
    win.loadFile('index.html')

    // globalShortcut.register('ctrl+i', () => {
    //     console.log('ctrl + v is loading')
    //     const img = clipboard.readImage()
    //
    //     img.resize({
    //         width: 1930,
    //         height:1110
    //     })
    //     console.log(img)
    //
    //     img.toJPEG(90)
    //     mainWindow.setBackgroundColor('')
    // })
}


app.whenReady().then(() => {
    // ipcMain.handle('dialog:openFile', handleFileOpen)

    ipcMain.on('counter-value', (event, value) => {
        console.log(value)
    })
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})