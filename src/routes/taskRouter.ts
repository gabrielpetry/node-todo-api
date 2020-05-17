import bookController from '../controllers/bookController'
import { taskSchema } from '../schemas/task'
import { success } from '../schemas/success'
import errors from '../schemas/error'
import TaskController from '../controllers/taskController'

export const CreateTaskRouter = (server, middleware) => {
  const taskController = new TaskController()

  server.route({
    method: 'GET',
    preHandler: middleware,
    url: '/api/books/:book_id/tasks',
    handler: taskController.getTasks,
  })

  server.route({
    method: 'POST',
    preHandler: middleware,
    url: '/api/books/:book_id/tasks',
    handler: taskController.store,
  })

  server.route({
    method: 'PUT',
    preHandler: middleware,
    url: '/api/books/:book_id/tasks/:task_id',
    schema: {
      body: {
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
    preHandler: middleware,
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
