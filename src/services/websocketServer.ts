import * as io from 'socket.io'
import UserRepository from '../repositories/UserRepository'
import auth from '../middlewares/auth'
import ConnectedUsersRepository from '../repositories/ConnectedUsersRepository'

export default class websocketServer {
  private websocketServer
  private connectedUsers

  constructor(server) {
    this.websocketServer = io(server, { origins: '*:*' })
    this.connectedUsers = new ConnectedUsersRepository()
  }

  public getWebsocketServer() {
    return this.websocketServer
  }

  public async startWebsocketServer() {
    return await this.websocketServer.on('connection', async (socket) => {
      const { userToken } = socket.handshake.query
      const userRepo = new UserRepository()
      const [error, user] = await auth.decryptUser(userToken)
      if (error || !user) {
        console.log('no user')
        return
      }
      this.connectedUsers.save(user.id, socket.id)
      // this.connectUsers[user.id] = socket.id
      console.log(`User connect to websocket server ${user.id} - ${user.username}`)
      socket.on('message', function (message) {})
      socket.on('disconnect', () => {
        this.connectedUsers.save(user.id, null)
      })
    })
  }
}
