import bookController from '../controllers/bookController'
import { taskSchema } from '../schemas/task'
import { success } from '../schemas/success'
import errors from '../schemas/error'
import TaskController from '../controllers/taskController'
import websocketNotify from '../middlewares/websocketNotify'

type RouteOptions = {
  preHandler: CallableFunction
  onResponse: CallableFunction
}

export const CreateTaskRouter = (server, options: RouteOptions) => {
  const taskController = new TaskController()

  server.route({
    method: 'GET',
    preHandler: options.preHandler,
    url: '/api/books/:book_id/tasks',
    handler: taskController.getTasks,
  })

  server.route({
    method: 'POST',
    preHandler: options.preHandler,
    url: '/api/books/:book_id/tasks',
    handler: taskController.store,
    onResponse: options.onResponse,
  })

  server.route({
    method: 'PUT',
    preHandler: options.preHandler,
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
    onResponse: options.onResponse,
    handler: taskController.updateOne,
  })

  server.route({
    method: 'DELETE',
    preHandler: options.preHandler,
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
    onResponse: options.onResponse,
    handler: taskController.delete,
  })
}
