import { Repository, getConnection, FindManyOptions, FindOneOptions } from 'typeorm'
import { User } from '../entity/User'

export default class UserRepository implements RepositoryInterface {
  private userRepository: Repository<User>

  public constructor() {
    this.userRepository = getConnection().getRepository(User)
  }

  public async save({ username, password, email }): Promise<User> {
    return this.userRepository.save({ username, password, email })
  }

  public async find(options?: FindManyOptions): Promise<User[]> {
    return this.userRepository.find(options)
  }

  public async findOne(options?: FindOneOptions): Promise<User> {
    return this.userRepository.findOne(options)
  }

  public async findByIdAndUpdate(id) {}
  public async findByIdAndDelete(id) {}
}
