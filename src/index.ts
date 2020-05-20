import * as fastify from 'fastify'
import * as fastifyHelmet from 'fastify-helmet'
import * as cors from 'fastify-cors'
import * as io from 'socket.io'
import { CreateBookRouter } from './routes/bookRouter'
import { CreateTaskRouter } from './routes/taskRouter'
import { CreateUserRouter } from './routes/userRouter'
import auth from './middlewares/auth'
import 'reflect-metadata'
import './database'
import UserRepository from './repositories/UserRepository'

const connectUsers = {}

const server = fastify()

server.register(fastifyHelmet)
server.register(cors, { origin: '*' })

// bookRouter.map((route) => server.route(route))

CreateTaskRouter(server, auth.authenticate)

CreateBookRouter(server, auth.authenticate)

CreateUserRouter(server)

const ws = io(server.server)

ws.on('connection', async (socket) => {
  const { userToken } = socket.handshake.query
  const userRepo = new UserRepository()
  const [error, user] = await auth.decryptUser(userToken)

  if (error || !user) {
    console.log('no user')
    return
  }

  connectUsers[user.id] = socket.id

  socket.on('message', function (message) {
    console.log(`User connect to websocket server ${user.id} - ${user.username}`)
  })

  socket.on('disconnect', function () {
    connectUsers[user.id] = null
  })
})

const PORT = parseInt(process.env.PORT) || 9000

server
  .listen(PORT, '0.0.0.0')
  .then((url) => {
    console.log(`listening on ${url}`)
  })
  .catch((err) => {
    if (err) throw err
  })
