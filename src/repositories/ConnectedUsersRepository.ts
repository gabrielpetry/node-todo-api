// This is temporary, i sear
// redis or something else is comming one day
const connectUsers = new Map()

export default class ConnectedUsersRepository implements RepositoryInterface {
  private connectedUsersRepository: Map<Number, String>

  public constructor() {
    this.connectedUsersRepository = connectUsers
  }
  public async save(user_id, socket): Promise<Map<Number, String>> {
    return this.connectedUsersRepository.set(user_id, socket)
  }

  public async find(user_id: Number): Promise<String> {
    return this.connectedUsersRepository.get(user_id)
  }

  public async findOne(options?) {}
  public async findByIdAndUpdate(id) {}
  public async findByIdAndDelete(id) {}
}
