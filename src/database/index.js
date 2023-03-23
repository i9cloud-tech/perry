const {createRxDatabase} = require('rxdb')
const {getRxStorageDexie} = require('rxdb/plugins/storage-dexie')
let collections

const createDatabase = async () => {
  return await createRxDatabase({
    name: 'exampledb',
    storage: getRxStorageDexie()
  });
}

const createCollections = async () => {
  const db = await createDatabase()
  return await db.addCollections({
    humans: {schema: 'perry'}
  });
}

const insertDocument = async ({id, name} = human) => {
  collections = await createCollections()
  await collections.humans.insert({id, name});
}

const queryBuilder = (args) => {
  const query = {}
  Object.keys(args).forEach((value) => {
    if (args[value]) {
      query[value] = args[value]
    }
  })
  return query
}

const execQuery = async ({id, name} = human) => {
  const query = queryBuilder({id, name})
  return await collections.humans.find({
    selector: query
  }).exec();
}

// observe a query
/*
await collections.humans.find({
  selector: {
    name: 'bar'
  }
}).$.subscribe(result => {});
*/

module.exports = {
  createDatabase,
  createCollections,
  insertDocument,
  execQuery
}
