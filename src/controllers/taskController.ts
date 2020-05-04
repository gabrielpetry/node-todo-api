import book from '../models/book'
import task from '../models/task'

export default {
  async getTasks(req, reply) {
    const todos = await task.find().populate('book')
    return reply.send({ todos })
  },

  async store(req, reply) {
    const { _id: book } = req.params
    const { description } = req.body

    await task.create({ description, book }, (err, todo) => {
      if (err) return reply.code(400).send({ err })
      reply.code(201).send({ todo })
    })
  },

  async delete(req, reply) {},
}
