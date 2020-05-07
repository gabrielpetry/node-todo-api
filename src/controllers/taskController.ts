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

  async updateOne(req, reply) {
    const { book_id, task_id } = req.params
    const { description, completed } = req.body
    const taskUpdate = await task
      .updateOne(
        { _id: task_id },
        {
          $set: {
            description,
            completed,
          },
        }
      )
      .catch((err) => err)

    if (!taskUpdate) {
      return reply.code(400).send({ err: taskUpdate })
    }

    return reply.code(200).send({ task: taskUpdate })
  },

  async delete(req, reply) {
    const { book_id, task_id } = req.params
    const deletedTask = await task.deleteOne({ _id: task_id }).catch((err) => err)

    if (!deletedTask) {
      return reply.code(400).send({ err: deletedTask })
    }

    return reply.code(200).send()
  },
}
