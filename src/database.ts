import { createConnection, getConnection, Repository } from 'typeorm'
import { User } from './entity/User'
import { Book } from './entity/Book'
import { Task } from './entity/Task'

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'docker',
  password: 'example',
  database: 'docker',
  synchronize: true,
  logging: false,
  entities: [User, Book, Task],
})
  .then((connection) => {
    // here you can start to work with your entities
    console.log('Connection is ok ;)')
  })
  .catch((error) => console.log(error))
