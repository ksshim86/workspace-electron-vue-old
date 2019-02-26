import { ipcMain, dialog } from 'electron'
import lowdb from './lowdb'

const fs = require('fs')

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

ipcMain.on('send-directory-create', (event, arg) => {
  console.log(arg)

  fs.mkdir(arg.path, { recursive: true }, (err) => {
    if (err) throw err
  })
})

export default {}
