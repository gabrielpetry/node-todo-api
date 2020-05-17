interface RepositoryInterface {
  save: CallableFunction
  find: CallableFunction
  findOne: CallableFunction
  findByIdAndUpdate: CallableFunction
  findByIdAndDelete: CallableFunction
}
