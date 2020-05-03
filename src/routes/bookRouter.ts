import bookController from '../controllers/bookController'
import { bookSchema } from '../schemas/book'
import { success } from '../schemas/success'
import errors from '../schemas/error'

const routes = [
  {
    method: 'GET',
    url: '/api/books',
    handler: bookController.getBooks,
  },
  {
    method: 'POST',
    url: '/api/books',
    schema: {
      body: bookSchema,
    },
    handler: bookController.store,
  },
]

export default routes
