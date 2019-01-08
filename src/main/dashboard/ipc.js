import { ipcMain, dialog } from 'electron'
import lowdb from './lowdb'

ipcMain.on('send-workspace-path-save', (event, data) => {
  dialog.showOpenDialog({ properties: ['promptToCreate', 'openDirectory'] }, workspacePaths => {
    let workspacePath = ''

    console.log(`[debug]ipcMain > send-workspace-path-save > data={${data}}`)

    if (workspacePaths !== undefined) {
      workspacePath = workspacePaths[0]
      lowdb.setData('workspace.path', workspacePath)
    }

    event.returnValue = workspacePath

    console.log(`[debug]ipcMain > send-workspace-path-save > result={${workspacePath}}`)
  })
})

export default {}
