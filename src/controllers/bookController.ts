import { Book } from '../entity/Book'
import BookRepository from '../repositories/BookRepository'
import { User } from '../entity/User'

export default class BookController {
  public async getBooks(req, reply) {
    // const books = await book.find()
    const bookRepository = new BookRepository()
    const books = await bookRepository.find({ where: { user: req.user } })
    return { success: true, books, count: books.length }
  }

  public async store(req, reply) {
    const { name, description, active = true } = req.body
    const bookRepository = new BookRepository()

    const book = await bookRepository.save({ name, description, active, user: req.user })

    return reply.code(201).send(book)
  }

  public async delete(req, reply) {
    const { id } = req.params
    const bookRepository = new BookRepository()
    await bookRepository
      .findByIdAndDelete(id)
      .then((book) => {
        console.log(id, book)
        reply.code(204).send()
        // return book
      })
      .catch((err) => reply.code(500).send(err))
  }
}
