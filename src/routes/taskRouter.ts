import bookController from '../controllers/bookController'
import { taskSchema } from '../schemas/task'
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

  server.route({
    method: 'PUT',
    url: '/api/books/:book_id/tasks/:task_id',
    schema: {
      body: {
        required: ['description'],
        ...taskSchema,
      },
      response: {
        200: {
          ...taskSchema,
        },
        ...errors,
      },
    },
    handler: taskController.updateOne,
  })

  server.route({
    method: 'DELETE',
    url: '/api/books/:book_id/tasks/:task_id',
    schema: {
      body: {
        type: 'null',
      },
      response: {
        200: {
          type: 'null',
        },
        ...errors,
      },
    },
    handler: taskController.delete,
  })
}
