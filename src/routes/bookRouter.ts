import * as bookController from '../controllers/bookController'

const routes = [
  {
    method: 'GET',
    url: '/api/books',
    handler: bookController.getBooks,
  },
]

export default routes
