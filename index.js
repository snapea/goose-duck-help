const {app, BrowserWindow, globalShortcut, clipboard } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {

    globalShortcut.register('ctrl+v', () => {
        console.log('ctrl + v is loading')
        //
        // clipboard.writeText('Example string', 'selection')
        // const text = clipboard.readText('selection')
        //
        // console.log(text)

        const img = clipboard.readImage()

        console.log(img)
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