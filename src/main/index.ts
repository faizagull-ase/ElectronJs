import { app, BrowserWindow, Notification, ipcMain, Tray, Menu } from 'electron'
import path from 'path'

let mainWindow: BrowserWindow | null = null;
let isQuitting = false;

function CreateWindow(): void {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  })
  // listener on clicking close button

  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow?.hide();
    }
  });

  if (process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}
// Make an icon in system-tray
let tray: Tray | null = null;

function createTray() {

  const iconPath = path.join(app.getAppPath(), 'resources', 'icon.png');
  tray = new Tray(iconPath);
  tray.setToolTip('Test icon');
  // making menu
  const menu = Menu.buildFromTemplate([{
    label: 'option 1',
    click: () => {
      if (mainWindow) {
        mainWindow.show();
        mainWindow.focus();
      }
    },
  },
  {
    label: 'Quit',
    click: () => {
      app.quit();
    }
  }
  ]);
  // set the menu on tray 
  tray.setContextMenu(menu);
  // Make the icon clickable
  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}
function ShowNotification() {
  ipcMain.handle('notification:show', () => {
    new Notification({
      title: 'My electron App',
      body: 'Hello from faiza!'
    }).show()
  })
}


app.whenReady().then(() => {
  ShowNotification();
  CreateWindow()
  createTray();
})

app.on('before-quit', () => {
  isQuitting = true;
});

app.on('window-all-closed', () => {
  app.quit()
})
