import { createConnection, getConnection, Repository } from 'typeorm'
import { User } from './entity/User'
import { Book } from './entity/Book'
import { Task } from './entity/Task'

createConnection({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'docker',
  password: process.env.DB_PASSWD || 'example',
  database: process.env.DB_DATABASE || 'docker',
  synchronize: true,
  logging: false,
  entities: [User, Book, Task],
})
  .then((connection) => {
    // here you can start to work with your entities
    console.log('Connection is ok ;)')
  })
  .catch((error) => console.log(error))
