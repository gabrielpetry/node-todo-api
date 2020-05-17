import { Repository, getConnection, FindManyOptions, FindOneOptions } from 'typeorm'
import { Task } from '../entity/Task'

export default class TaskRepository implements RepositoryInterface {
  private taskRepository: Repository<Task>

  public constructor() {
    this.taskRepository = getConnection().getRepository(Task)
  }

  public async save({ description, completed, book }): Promise<Task> {
    return this.taskRepository.save({ description, completed, book })
  }

  public async find(options?: FindManyOptions): Promise<Task[]> {
    return this.taskRepository.find(options)
  }

  public async findOne(options?: FindOneOptions): Promise<Task> {
    return this.taskRepository.findOneOrFail()
  }

  public async findByIdAndUpdate(id, newDocument) {
    return this.taskRepository.update({ id: id }, newDocument)
  }
  public async findByIdAndDelete(id) {
    return this.taskRepository.delete({ id })
  }
}
