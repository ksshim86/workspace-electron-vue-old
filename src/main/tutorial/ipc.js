import { ipcMain, dialog } from 'electron'
import lowdb from './lowdb'

ipcMain.on('send-workspace-path-save', (event) => {
  dialog.showOpenDialog({ properties: ['promptToCreate', 'openDirectory'] }, (workspacePaths) => {
    let workspacePath = ''

    if (workspacePaths !== undefined) {
      [workspacePath] = workspacePaths
      lowdb.setData('workspace.path', workspacePath)
    }

    event.returnValue = workspacePath
  })
})

export default {}
