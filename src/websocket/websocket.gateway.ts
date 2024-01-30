import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { WebsocketService } from './websocket.service';
import { NewMessageDto } from './dtos/new-message.dto';
import { Body } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly websocketService: WebsocketService) { }

  @WebSocketServer() wss: Server;

  async handleConnection(client: Socket, ...args: any[]) {
    const userId = client.handshake.query.userId as string;

    try {
      console.log(`client connected: ${userId}`);

      this.websocketService.registerClient(client, userId);
    } catch (error) {
      console.error(error);

      client.disconnect();
      return;
    }


    this.wss.emit('clients-updated', this.websocketService.getConnectedClients());
    // console.log('Client connected ', client.id);

  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);
    this.websocketService.removeClient(client.id);
    this.wss.emit('clients-updated', this.websocketService.getConnectedClients());
  }

  @SubscribeMessage('message-to-client')
  handleMessageToClient(@ConnectedSocket() client: Socket, @MessageBody() data: Object) {
    console.log(data);
    client.broadcast.emit('message-from-server', data);
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) { // puede ser async

    // -------- emite unicamente al cliente que envía
    // client.emit('message-from-server', {
    //   fullname: client.id,
    //   message: payload.message || 'No message'
    // })

    // ---------- emite a todos menos al cliente que envía
    // client.broadcast.emit('message-from-server', {
    //   fullname: client.id,
    //   message: payload.message || 'No message'
    // })

    // ---------- emite a todos incluyendo al cliente que envía
    this.wss.emit('message-from-server', {
      fullname: this.websocketService.getUserFullNameBySocketId(client.id),
      message: payload.message || 'No message'
    })
  }

}
