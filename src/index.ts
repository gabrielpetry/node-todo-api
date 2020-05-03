import fastify from 'fastify'
import fastifyHelmet from 'fastify-helmet'
import cors from 'fastify-cors'
import Database from './database'
import bookRouter from './routes/bookRouter'

const server = fastify()
const db = new Database()
db.SetupDb()

server.register(fastifyHelmet)
server.register(cors, { origin: '*' })

bookRouter.map((route) => server.route(route))

server
  .listen(3000, '0.0.0.0')
  .then((url) => {
    console.log(`listening on ${url}`)
  })
  .catch((err) => {
    if (err) throw err
  })
