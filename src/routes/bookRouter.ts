import { bookSchema } from '../schemas/book'
import { success } from '../schemas/success'
import errors from '../schemas/error'
import auth from '../middlewares/auth'
import BookController from '../controllers/bookController'

export const CreateBookRouter = (server, middleware) => {
  const bookController = new BookController()

  server.route({
    method: 'GET',
    url: '/api/books',
    preHandler: middleware,
    handler: bookController.getBooks,
  })

  server.route({
    method: 'POST',
    preHandler: middleware,
    url: '/api/books',
    schema: {
      body: {
        required: ['name', 'description'],
        ...bookSchema,
      },
      response: {
        201: {
          type: 'null',
        },
        ...errors,
      },
    },
    handler: bookController.store,
  })

  server.route({
    method: 'DELETE',
    url: '/api/books/:id',
    preHandler: middleware,
    schema: {
      body: {
        type: 'null',
      },
      response: {
        204: {
          type: 'null',
        },
        ...errors,
      },
    },
    handler: bookController.delete,
  })
}
