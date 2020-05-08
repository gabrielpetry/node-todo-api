import user from '../models/user'
import jwt from 'jsonwebtoken'

export default {
  async store(req, reply) {
    const { username, email, password } = req.body
    user.create({ username, email, password }, (err, user) => {
      if (err) return reply.code(400).send({ err })
      reply.code(201).send({ user })
    })
  },
}
