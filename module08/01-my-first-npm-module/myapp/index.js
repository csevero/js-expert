import FluentSQLBuilder from '@csevero/fluentsql'

import database from './database/data.json'

const result = FluentSQLBuilder.for(database).where({ registered: /^(2020|2019)/ }).select(['category']).limit(3).groupCount('category').build()

console.log(result)