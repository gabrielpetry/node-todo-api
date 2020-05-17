import { success } from '../schemas/success'
import errors from '../schemas/error'
import UserController from '../controllers/userController'

export const CreateUserRouter = (server) => {
  const userController = new UserController()

  server.route({
    method: 'POST',
    url: '/api/users',
    handler: userController.store,
  })

  server.route({
    method: 'POST',
    url: '/api/users/auth',
    handler: userController.getJwt,
  })
}
