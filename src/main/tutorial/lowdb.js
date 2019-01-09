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

const get = param => db.get(param).value()

export default { setData, get }
