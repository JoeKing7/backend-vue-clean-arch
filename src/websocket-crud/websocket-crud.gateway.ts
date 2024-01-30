import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { WebsocketCrudService } from './websocket-crud.service';
import { CreateWebsocketCrudDto } from './dto/create-websocket-crud.dto';
import { UpdateWebsocketCrudDto } from './dto/update-websocket-crud.dto';

@WebSocketGateway()
export class WebsocketCrudGateway {
  constructor(private readonly websocketCrudService: WebsocketCrudService) {}

  @SubscribeMessage('createWebsocketCrud')
  create(@MessageBody() createWebsocketCrudDto: CreateWebsocketCrudDto) {
    return this.websocketCrudService.create(createWebsocketCrudDto);
  }

  @SubscribeMessage('findAllWebsocketCrud')
  findAll() {
    return this.websocketCrudService.findAll();
  }

  @SubscribeMessage('findOneWebsocketCrud')
  findOne(@MessageBody() id: number) {
    return this.websocketCrudService.findOne(id);
  }

  @SubscribeMessage('updateWebsocketCrud')
  update(@MessageBody() updateWebsocketCrudDto: UpdateWebsocketCrudDto) {
    return this.websocketCrudService.update(updateWebsocketCrudDto.id, updateWebsocketCrudDto);
  }

  @SubscribeMessage('removeWebsocketCrud')
  remove(@MessageBody() id: number) {
    return this.websocketCrudService.remove(id);
  }
}
