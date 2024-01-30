import { PartialType } from '@nestjs/mapped-types';
import { CreateWebsocketCrudDto } from './create-websocket-crud.dto';

export class UpdateWebsocketCrudDto extends PartialType(CreateWebsocketCrudDto) {
  id: number;
}
