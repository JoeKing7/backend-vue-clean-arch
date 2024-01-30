import { Injectable } from '@nestjs/common';
import { CreateWebsocketCrudDto } from './dto/create-websocket-crud.dto';
import { UpdateWebsocketCrudDto } from './dto/update-websocket-crud.dto';

@Injectable()
export class WebsocketCrudService {
  create(createWebsocketCrudDto: CreateWebsocketCrudDto) {
    return 'This action adds a new websocketCrud';
  }

  findAll() {
    return `This action returns all websocketCrud`;
  }

  findOne(id: number) {
    return `This action returns a #${id} websocketCrud`;
  }

  update(id: number, updateWebsocketCrudDto: UpdateWebsocketCrudDto) {
    return `This action updates a #${id} websocketCrud`;
  }

  remove(id: number) {
    return `This action removes a #${id} websocketCrud`;
  }
}
