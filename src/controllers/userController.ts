import user from '../models/user'
import jwt from 'jsonwebtoken'

const appSecret = process.env.APP_SECRET

export default {
  async store(req, reply) {
    const { username, email, password } = req.body
    user.create({ username, email, password }, (err, user) => {
      if (err) return reply.code(400).send({ err })
      reply.code(201).send({ user })
    })
  },

  async getJwt(req, reply) {
    const { username, password } = req.body
    const userModel = await user.findOne({ username })
    if (!user || user.length < 1) {
      return reply.code(400).send({ err: 'User not found' })
    }
    await userModel.comparePassword(password, (err, isMatch) => {
      if (err) return reply.code(400).send({ err })

      // if password not matching return error
      if (!isMatch) return reply.code(400).send({ err: 'Incorrect password' })
      userModel.password = undefined
      // if ok return the information + token
      return reply.code(200).send({
        userModel,
        token: jwt.sign({ id: userModel._id }, appSecret),
      })
    })
  },
}
