import * as fastify from 'fastify'
import * as fastifyHelmet from 'fastify-helmet'
import * as cors from 'fastify-cors'
import Database from './database'
import { CreateBookRouter } from './routes/bookRouter'
import { CreateTaskRouter } from './routes/taskRouter'
import { CreateUserRouter } from './routes/userRouter'
import auth from './middlewares/auth'

const server = fastify()
const db = new Database()
db.SetupDb()

server.register(fastifyHelmet)
server.register(cors, { origin: '*' })

// bookRouter.map((route) => server.route(route))

CreateTaskRouter(server, auth.authenticate)

CreateBookRouter(server, auth.authenticate)

CreateUserRouter(server)

server
  .listen(3000, '0.0.0.0')
  .then((url) => {
    console.log(`listening on ${url}`)
  })
  .catch((err) => {
    if (err) throw err
  })
