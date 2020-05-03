// export const getBooks = async (req, res) => {
// return { ok: true }
// }
import book from '../models/book'

export default {
  async getBooks(req, reply) {
    return { ok: true }
  },

  async store(req, reply) {
    const books = await book.create({}, (err, book) => {
      if (err) return reply.code(400).send(err)
      return reply.code(201).send()
    })
    // return books
  },
}
