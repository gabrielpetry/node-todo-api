import * as fastify from 'fastify'
import * as fastifyHelmet from 'fastify-helmet'
import * as cors from 'fastify-cors'
import { CreateBookRouter } from './routes/bookRouter'
import { CreateTaskRouter } from './routes/taskRouter'
import { CreateUserRouter } from './routes/userRouter'
import auth from './middlewares/auth'
import 'reflect-metadata'
import './database'
import WebsocketServer from './services/websocketServer'
import ConnectedUsersRepository from './repositories/ConnectedUsersRepository'
import websocketNotifyMiddleware from './middlewares/websocketNotify'
const server = fastify()

server.register(fastifyHelmet)
server.register(cors, { origin: '*' })

// bookRouter.map((route) => server.route(route))

const websocketRouter = new WebsocketServer(server.server)
websocketRouter.startWebsocketServer().catch((err) => console.log(err))
const connectUsers = new ConnectedUsersRepository()

const websocketServerInstance = websocketRouter.getWebsocketServer()
CreateTaskRouter(server, {
  preHandler: auth.authenticate,
  onResponse: websocketNotifyMiddleware.notifyId(websocketServerInstance),
})

CreateBookRouter(server, auth.authenticate)

CreateUserRouter(server)

const PORT = parseInt(process.env.PORT) || 9000

server
  .listen(PORT, '0.0.0.0')
  .then((url) => {
    console.log(`listening on ${url}`)
  })
  .catch((err) => {
    if (err) throw err
  })
