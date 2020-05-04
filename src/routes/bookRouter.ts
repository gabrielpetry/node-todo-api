import bookController from '../controllers/bookController'
import { bookSchema } from '../schemas/book'
import { success } from '../schemas/success'
import errors from '../schemas/error'

export const CreateBookRouter = (server) => {
  server.route({
    method: 'GET',
    url: '/api/books',
    handler: bookController.getBooks,
  })

  server.route({
    method: 'POST',
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
    url: '/api/books/:_id',
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
