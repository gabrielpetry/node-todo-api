import jwt from 'jsonwebtoken'
import user from '../models/user'

const appSecret = process.env.APP_SECRET

export default {
  async authenticate(req, reply, done) {
    // reply.send({ err: 1 })
    const authHeader = req.headers.authorization

    if (!authHeader) return reply.code(401).send({ error: 'Without token, withou access!' })

    const parts = authHeader.split(' ')

    if (!(parts.length === 2)) return reply.code(401).send({ error: 'Invalid token' })

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) return reply.status(401).send({ error: 'Malformed token' })

    jwt.verify(token, appSecret, async (error, decoded) => {
      if (error) return reply.code(401).send({ error: 'Invalid token' })

      let _id = decoded.id
      const userModel = await user.findOne({ _id })

      if (!userModel) return reply.code(401).send({ error: 'Invalid user' })

      req.user = userModel

      return done()
    })
    done()
  },
}
