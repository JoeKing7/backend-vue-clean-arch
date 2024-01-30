import { Module } from '@nestjs/common';
import { WebsocketCrudService } from './websocket-crud.service';
import { WebsocketCrudGateway } from './websocket-crud.gateway';

@Module({
  providers: [WebsocketCrudGateway, WebsocketCrudService],
})
export class WebsocketCrudModule {}
