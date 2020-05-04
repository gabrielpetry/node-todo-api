import bookController from '../controllers/bookController'
import { bookSchema } from '../schemas/book'
import { success } from '../schemas/success'
import errors from '../schemas/error'
import taskController from '../controllers/taskController'

export const CreateTaskRouter = (server) => {
  server.route({
    method: 'GET',
    url: '/api/books/:_id/tasks',
    handler: taskController.getTasks,
  })

  server.route({
    method: 'POST',
    url: '/api/books/:_id/tasks',
    handler: taskController.store,
  })
}
