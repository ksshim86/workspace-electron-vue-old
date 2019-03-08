import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const adapter = new FileSync('db.json')
const db = low(adapter)

function sortWNode(wNode) {
  wNode.sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') {
      return -1
    }
    if (a.type !== 'folder' && b.type === 'folder') {
      return 1
    }

    return a.name > b.name
  })
}

db.defaults({
  workspace: {
    path: ''
  }
}).write()

const setData = (jsonPath, param) => {
  db.set(jsonPath, param).write()
}

const updateNextWNodeId = (jsonPath) => {
  db.update(jsonPath, n => n + 1).write()
}

// const push = (path, param) => {
//   db.get(path).push(param).write()
// }

const push = (path, param, treeIndex) => {
  // 파일을 새로 읽어드린다. 상용시에 필요할까?
  db.read()

  const len = treeIndex.length
  let node = db.get(path).value()

  for (let i = 0; i < len; i += 1) {
    const idx = treeIndex[i]

    if (i !== len - 1) {
      node = node[idx].children
    } else {
      node.push(param)
    }
  }

  sortWNode(node)

  db.write()
}

const get = param => db.get(param).value()

export default {
  setData, get, push, updateNextWNodeId
}
