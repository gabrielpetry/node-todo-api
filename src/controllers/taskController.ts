import book from '../models/book'
import task from '../models/task'

export default {
  async getTasks(req, reply) {
    const tasks = await task.find({ book: req.params._id }).populate('book')
    return reply.send({ tasks })
  },

  async store(req, reply) {
    const { _id: book } = req.params
    const { description } = req.body

    await task.create({ description, book }, (err, task) => {
      if (err) return reply.code(400).send({ err })
      reply.code(201).send({ task })
    })
  },

  async update(req, reply) {},

  async delete(req, reply) {},
}
