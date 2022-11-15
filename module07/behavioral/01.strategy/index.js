import MongoDBStrategy from './src/strategies/mongoDBStrategy.js'
import PostgresStrategy from './src/strategies/postgresStrategy.js'
import ContextStrategy from './src/base/contextStrategy.js'

const postgresConnectionString = "postgres://csevero:senha1234@localhost:5432/heroes"
const postgreContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString));
await postgreContext.connect()

const mongoDBConnectionString = 'mongodb://csevero:severo1234@localhost:27017/heroes';
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))
await mongoDBContext.connect()

const data = [{
  name: 'csevero',
  type: 'transaction'
}, {
  name: 'erickwendel',
  type: 'activityLog'
}]

const contextTypes = {
  transaction: postgreContext,
  activityLog: mongoDBContext
}
for (const { type, name } of data) {
  const context = contextTypes[type]

  await context.create({ name: name + Date.now() })

  console.log(type, context.dbStrategy.constructor.name)
  console.log(await context.read())
}