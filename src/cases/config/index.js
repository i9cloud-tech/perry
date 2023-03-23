const runQuery = async (event, data, db) => {
  const r = await db.execQuery(data)
  console.log(r)
}

const run = async (db, ipcMain) => {
  await db.insertDocument({id: 1, name: 'john wick'})
  ipcMain.handle('query', (event, data) => runQuery(event, data, db))
  return
}

module.exports = {
  run
}
