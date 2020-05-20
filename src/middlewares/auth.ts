import * as jwt from 'jsonwebtoken'
import UserRepository from '../repositories/UserRepository'
import { User } from '../entity/User'

const appSecret = process.env.APP_SECRET || `batmanIsOurSavior42`

const decryptUser = (token: String): Promise<[Boolean | null, User | null]> => {
  return jwt.verify(token, appSecret, async (error, decoded) => {
    if (error) {
      console.log(error)
      return [true, null]
    }
    const id: Number = decoded.id
    const userRepository = new UserRepository()

    const user = await userRepository.findOne({ where: { id } })
    if (!user) return [true, null]
    user.clearPassword()
    return [null, user]
  })
}

export default {
  authenticate(req, reply, done) {
    // reply.send({ err: 1 })
    const authHeader = req.headers.authorization

    if (!authHeader) return reply.code(401).send({ error: 'Without token, withou access!' })

    const parts = authHeader.split(' ')

    if (!(parts.length === 2)) return reply.code(401).send({ error: 'Invalid token' })

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) return reply.status(401).send({ error: 'Malformed token' })

    return decryptUser(token).then((item) => {
      const [error, userModel] = item
      if (error) return reply.code(401).send({ error: 'Invalid token' })
      req.user = userModel
    })
  },
  decryptUser,
}
