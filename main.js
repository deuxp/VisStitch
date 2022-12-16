const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = _ => {
  // creates instance of our app BrowserWindow
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'js', 'preload.js')
    }
  })

  // loads the html into the BrowserWindow instance
  win.loadFile('index.html')

}

// when the app is ready load the window with our init window function: createWindow
// This resolves as a promise
// All event listeners must exist in the 'when ready callback'
app.whenReady().then(_ => {
  createWindow()

  // if no window open on runtime, call createWindow
  app.on('activate', _ => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  // cross platform quit app when all windows are closed
  app.on('window-all-closed', _ => {
    if (process.platform !== 'darwin') qpp.quit()
  })
})

