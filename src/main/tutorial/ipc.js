import { ipcMain, dialog } from 'electron'
import lowdb from './lowdb'

const fs = require('fs')

ipcMain.on('send-wTreeView', (event) => {
  event.sender.send(
    'on-wTreeView',
    {
      wTreeView: lowdb.get('workspace.wTreeView'),
      nextWNodeId: lowdb.get('workspace.nextWNodeId')
    }
  )
})

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
  const { wNode, treeIndex } = arg

  // TODO: 디렉토리, db에 저장을 어떤 방식으로 처리할지 고민 필요
  fs.mkdir(wNode.path, { recursive: true }, (err) => {
    if (err) throw err

    lowdb.push('workspace.wTreeView', wNode, treeIndex)
    lowdb.updateNextWNodeId('workspace.nextWNodeId')
  })
})

export default {}
