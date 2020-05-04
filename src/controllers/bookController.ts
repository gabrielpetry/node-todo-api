// export const getBooks = async (req, res) => {
// return { ok: true }
// }
import book from '../models/book'

export default {
  async getBooks(req, reply) {
    const books = await book.find()
    return { success: true, books }
  },

  async store(req, reply) {
    const { name, description, active = true } = req.body

    const books = await book.create({ name, description, active }, (err, book) => {
      if (err) return reply.code(400).send(err)
      return reply.code(201).send()
    })
  },

  async delete(req, reply) {
    const { _id } = req.params
    await book.deleteOne({ _id })
    return reply.code(204).send()
  },
}
