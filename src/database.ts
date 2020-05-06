import mongoose from 'mongoose'

class Database {
  private db_host = 'mongo'
  private db_database = 'todo'
  private db_user = 'root'
  private db_password = 'example'

  constructor() {}

  private SetupDb(): any {
    mongoose.connect(`mongodb://${this.db_host}:27017/${this.db_database}?authSource=admin`, {
      user: this.db_user,
      pass: this.db_password,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log(this.db_user)
    console.log(this.db_password)
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB Connection error'))
    return db
  }
}

export default Database
