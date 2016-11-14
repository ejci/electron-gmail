const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
//const ipc = electron.ipc;
const {ipcMain} = require('electron')
const {shell} = require('electron')

const notifier = require('node-notifier');
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let modalWindow

function createWindow() {
  // Create the browser window.
  // mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'gmail.png'),
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'load.js'),
      webSecurity: false,
      plugins: true
    },
    //titleBarStyle: 'hidden',
    //frame: false,
  });
  mainWindow.maximize();
  // and load the index.html of the app.
  mainWindow.loadURL('https://gmail.com');
  /*mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'credentials.html'),
      protocol: 'file:',
      slashes: true
    }));
  */
  // Open the DevTools.
  //mainWindow.webContents.openDevTools()


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })


  modalWindow = new BrowserWindow({ parent: mainWindow, modal: true, show: false });

  let page = mainWindow.webContents;
  // Open links in default browser
  page.on('new-window', function (e, url) {
    console.log(url);
    if (url.match('https://www.gmail.com') || url.match('https://mail.google.com/mail')) {
      //do nothing
    }
    else {
      e.preventDefault();
      shell.openExternal(url);
    }
  });


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
app.setBadgeCount(0);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

app.on('login', function (event, webContents, request, authInfo, callback) {
  event.preventDefault();
  modalWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'credentials.html'),
    protocol: 'file:',
    slashes: true
  }));
  modalWindow.once('ready-to-show', () => {
    modalWindow.show()
  });
  ipcMain.on('modal-login', function (event, arg) {
    arg = JSON.parse(arg);
    modalWindow.close()
    callback(arg.user, arg.password);
    //callback('xxx', 'xxx');
  })

})

ipcMain.on('gmail-poll', function (event, arg) {
  console.log('gmail-poll', arg);
  app.setBadgeCount(arg.inbox);
})

ipcMain.on('gmail-new_email', function (event, arg) {
  console.log('gmail-new_email', arg);
  notifier.notify({
    title: 'New mail',
    message: arg.subject,
    icon: path.join(__dirname, 'gmail.png'),
    sound: true
  });
})

