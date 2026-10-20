import { app, BrowserWindow, Notification, ipcMain } from 'electron'
import path from 'path'

function CreateWindow(): void {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  })

  if (process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  ipcMain.handle('notification:show', () => {
    new Notification({
      title: 'My electron App',
      body: 'Hello from faiza!'
    }).show()
  })

  CreateWindow()

 
})

app.on('window-all-closed', () => {
  app.quit()
})
