import * as jwt from 'jsonwebtoken'
import UserRepository from '../repositories/UserRepository'

const appSecret = process.env.APP_SECRET || `batmanIsOurSavior42`

export default {
  authenticate(req, reply, done) {
    // reply.send({ err: 1 })
    const authHeader = req.headers.authorization

    if (!authHeader) return reply.code(401).send({ error: 'Without token, withou access!' })

    const parts = authHeader.split(' ')

    if (!(parts.length === 2)) return reply.code(401).send({ error: 'Invalid token' })

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) return reply.status(401).send({ error: 'Malformed token' })

    return jwt.verify(token, appSecret, async (error, decoded) => {
      if (error) return reply.code(401).send({ error: 'Invalid token' })

      const id: number = decoded.id
      const userRepository = new UserRepository()

      const user = await userRepository.findOne({ where: { id } })

      if (!user) return reply.code(401).send({ error: 'Invalid user' })
      user.clearPassword()
      req.user = user
      return
    })
  },
}
