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

ipcMain.on('sendSync-workspace-path', (event) => {
  event.returnValue = lowdb.get('workspace.path')
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

ipcMain.on('send-create-directory', (event, arg) => {
  const { wNode, treeIndex } = arg
  let result = ''
  let message = ''

  // TODO: 디렉토리, db에 저장을 어떤 방식으로 처리할지 고민 필요
  fs.mkdir(wNode.path, { recursive: true }, (err) => {
    if (!err) {
      lowdb.push('workspace.wTreeView', wNode, treeIndex)
      lowdb.updateNextWNodeId('workspace.nextWNodeId')

      result = 'success'
      message = ''
    } else {
      result = 'fail'
      message = ''
    }

    event.sender.send(
      'on-create-directory',
      {
        result,
        message,
        data: {
          nextWNodeId: lowdb.get('workspace.nextWNodeId')
        }
      }
    )
  })
})

export default {}
