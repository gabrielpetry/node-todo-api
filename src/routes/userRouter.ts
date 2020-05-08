import { success } from '../schemas/success'
import errors from '../schemas/error'
import userController from '../controllers/userController'

export const CreateUserRouter = (server) => {
  server.route({
    method: 'POST',
    url: '/api/users',
    handler: userController.store,
  })
}
