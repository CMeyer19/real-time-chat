import { WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IMessageEvent } from "@real-time-chat/util-api/gateways/message-event.interface";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  public sendMessageEvent(event: IMessageEvent): void {
    this.server.emit('messages', event);
  }
}
