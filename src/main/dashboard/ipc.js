import { ipcMain, dialog } from 'electron'
import lowdb from './lowdb'

ipcMain.on('root-folder', (event, data) => {
  dialog.showOpenDialog({ properties: ['promptToCreate', 'openDirectory'] }, filePaths => {
    console.log('filePaths :', filePaths)
    console.log('typeof filePaths :', typeof filePaths)

    lowdb.setData('workspace.path', filePaths[0])
    event.sender.send('root-folder', filePaths[0] !== undefined ? filePaths[0] : '')
  })
})

export default {}
