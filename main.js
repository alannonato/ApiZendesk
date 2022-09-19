//Módulos para controlar a vida útil do aplicativo e criar janela nativa do navegador
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  // Cria a janela do navegador.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  //carrga o index.html do aplicativo.
  mainWindow.loadFile('index.html')

  // Abra o DevTools/Inspecionar elemento.
  //mainWindow.webContents.openDevTools()
}

// Este método será chamado quando o Electron terminar
// inicialização e está pronto para criar janelas do navegador.
// Algumas APIs só podem ser usadas após a ocorrência deste evento.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // No macOS é comum recriar uma janela no aplicativo quando o
    // ícone dock é clicado e não há outras janelas abertas.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Sai quando todas as janelas estão fechadas, exceto no macOS. Aí é comum
// para que os aplicativos e sua barra de menu permaneçam ativos até que o usuário saia
// explicitamente com Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// Neste arquivo você pode incluir o resto do processo principal específico do seu aplicativo
// código. Você também pode colocá-los em arquivos separados e exigi-los aqui.
