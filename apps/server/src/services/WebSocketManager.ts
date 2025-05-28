import { Server, Socket } from 'socket.io';
import { logger } from '../utils/logger';

export class WebSocketManager {
  constructor(
    private io: Server,
    private governorService: any,
    private taskManager: any
  ) {
    logger.info('WebSocketManager instantiated');
  }

  handleConnection(socket: Socket) {
    logger.info(`WebSocket client connected: ${socket.id}`);

    socket.on('disconnect', () => {
      logger.info(`WebSocket client disconnected: ${socket.id}`);
    });

    socket.on('get-status', () => {
      socket.emit('status', {
        governor: this.governorService.getStatus(),
        tasks: this.taskManager.getStatus()
      });
    });

    // Send initial status
    socket.emit('status', {
      governor: this.governorService.getStatus(),
      tasks: this.taskManager.getStatus()
    });
  }
}