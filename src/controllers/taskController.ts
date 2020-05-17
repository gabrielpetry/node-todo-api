import TaskRepository from '../repositories/TaskRepository'
import BookRepository from '../repositories/BookRepository'

export default class TaskController {
  async getTasks(req, reply) {
    const bookRepository = new BookRepository()
    const taskRepository = new TaskRepository()
    // const book = new Book()
    const { book_id } = req.params
    const book = await bookRepository.findOne(book_id)

    if (!book) {
      return reply.code(404).send({ err: 'Book does not exists' })
    }

    const tasks = await taskRepository.find({ where: { book } })
    return reply.send({ tasks })
  }

  async store(req, reply) {
    const { description, completed = false } = req.body

    const { book_id } = req.params

    const bookRepository = new BookRepository()
    const taskRepository = new TaskRepository()

    // check book exsits
    console.log(book_id)
    const book = await bookRepository.findOne(book_id)
    console.log(book)

    if (!book) {
      return reply.code(404).send({ err: 'Book does not exists' })
    }

    await taskRepository
      .save({ description, completed, book })
      .then((task) => {
        reply.code(201).send({ task })
      })
      .catch((err) => {
        if (err) return reply.code(400).send({ err })
      })
  }

  async updateOne(req, reply) {
    const { book_id, task_id } = req.params
    const updateObject = req.body
    console.log(updateObject)
    const taskRepository = new TaskRepository()

    taskRepository
      .findByIdAndUpdate(task_id, updateObject)
      .then((task) => {
        return reply.code(204).send()
      })
      .catch((err) => reply.code(500).send(err))
  }

  async delete(req, reply) {
    const taskRepository = new TaskRepository()

    const { book_id, task_id } = req.params

    taskRepository
      .findByIdAndDelete(task_id)
      .then((task) => {
        return reply.code(204).send()
      })
      .catch((err) => {
        return reply.code(500).send(err)
      })
  }
}
