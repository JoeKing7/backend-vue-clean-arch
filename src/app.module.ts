import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { WebsocketModule } from './websocket/websocket.module';
import { WebsocketCrudModule } from './websocket-crud/websocket-crud.module';

@Module({
  imports: [LoginModule, WebsocketModule, WebsocketCrudModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
