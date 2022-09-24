import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationsModule } from "./features/conversations/conversations.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017',
      { dbName: 'real-time-chat' }
    ),
    ConversationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
