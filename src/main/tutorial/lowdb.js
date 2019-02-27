import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
  workspace: {
    path: ''
  }
}).write()

const setData = (jsonPath, param) => {
  db.set(jsonPath, param).write()
}

const push = (path, param) => {
  db.get(path).push(param).write()
}

const findPush = (path, element, idx, param) => {
  // 파일을 새로 읽어드린다. 상용시에 필요할까?
  db.read()

  db.get(path).value()[idx] = param
  db.write()
}

const get = param => db.get(param).value()

export default {
  setData, get, push, findPush
}
