import * as jwt from 'jsonwebtoken'
import { User } from '../entity/User'
import UserRepository from '../repositories/UserRepository'

const appSecret = process.env.APP_SECRET || `batmanIsOurSavior42`

export default class UserController {
  public async store(req, reply) {
    const { username, email, password } = req.body

    const user = new User()

    user.username = username
    user.email = email
    user.password = password

    const userRepo = new UserRepository()

    return userRepo
      .save(user)
      .then((post) => post)
      .catch((err) => err)
  }

  async get(req, reply) {
    return 'me'
  }

  public async getJwt(req, reply) {
    const { username, password } = req.body
    const userRepo = new UserRepository()

    const user = await userRepo.findOne({ where: { username } })

    if (!user) {
      return reply.code(400).send({ err: 'User not found' })
    }

    const token = jwt.sign({ id: user.id }, appSecret)

    return user
      .comparePasswords(password)
      .then((isMatch) => {
        user.clearPassword()
        return reply.code(200).send({
          user,
          token,
        })
      })
      .catch((err) => {
        return reply.code(400).send(err)
      })

    return 2
  }
}
