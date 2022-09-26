import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversationsModule } from "./features/conversations/conversations.module";
import { configuration } from "./configuration";

const value: { connectionString: string; dbName: string; } = configuration();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(
      value.connectionString,
      { dbName: value.dbName }
    ),
    ConversationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
