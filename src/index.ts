import fastify from 'fastify'
import fastifyHelmet from 'fastify-helmet'
import cors from 'fastify-cors'

const server = fastify()

server.register(fastifyHelmet)
server.register(cors, { origin: '*' })

import bookRouter from './routes/bookRouter'
bookRouter.map((route) => server.route(route))

server
  .listen(3000, '0.0.0.0')
  .then((url) => {
    console.log(`listening on ${url}`)
  })
  .catch((err) => {
    if (err) throw err
  })
