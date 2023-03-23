const {app, BrowserWindow, ipcMain} = require('electron')
const db = require('./database')
const config = require('./cases/config')

config.run(db, ipcMain)

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('./src/frontend/index.html')
  win.setMenu(null)
}

(async () => {
  await app.whenReady()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
})()
