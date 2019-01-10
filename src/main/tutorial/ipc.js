import { ipcMain, dialog } from 'electron'
import lowdb from './lowdb'

ipcMain.on('send-workspace-path-save', (event, data) => {
  console.log('11111111')
  dialog.showOpenDialog({ properties: ['promptToCreate', 'openDirectory'] }, (workspacePaths) => {
    let workspacePath = ''

    console.log(`[debug]ipcMain > send-workspace-path-save > data={${data}}`)

    if (workspacePaths !== undefined) {
      [workspacePath] = workspacePaths
      lowdb.setData('workspace.path', workspacePath)
    }

    event.sender.send('recv-workspace-path-save', 'pong')
    // event.returnValue = workspacePath

    console.log(`[debug]ipcMain > send-workspace-path-save > result={${workspacePath}}`)
  })
})

export default {}
