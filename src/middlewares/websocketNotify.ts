import ConnectedUsersRepository from '../repositories/ConnectedUsersRepository'

export default {
  notifyId(websocketServer) {
    return async (req, reply, done) => {
      if (!req.websocketOptions || !req.websocketOptions.emitMessage1) return
      const connectedUsers = new ConnectedUsersRepository()
      const socketId = await connectedUsers.find(req.user.id)
      console.log(`notifing ${socketId} - ${req.user.username}`)
      const { emitMessage, emitBody } = req.websocketOptions
      websocketServer.to(socketId).emit(emitMessage, emitBody)
    }
  },
}
