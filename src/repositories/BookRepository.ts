import { Repository, getConnection, FindManyOptions, FindOneOptions } from 'typeorm'
import { Book } from '../entity/Book'

export default class BookRepository implements RepositoryInterface {
  private bookRepository: Repository<Book>

  public constructor() {
    this.bookRepository = getConnection().getRepository(Book)
  }

  public async save({ name, description, active, user }): Promise<Book> {
    return this.bookRepository.save({ name, description, active, user })
  }

  public async find(options?: FindManyOptions): Promise<Book[]> {
    return this.bookRepository.find(options)
  }

  public async findOne(options?: FindOneOptions): Promise<Book> {
    return this.bookRepository.findOneOrFail(options)
  }

  public async findByIdAndUpdate(id) {}
  public async findByIdAndDelete(id) {
    return this.bookRepository.delete({ id })
  }
}
