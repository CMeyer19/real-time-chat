import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversationsModule } from "./features/conversations/conversations.module";
import { configuration } from "./configuration";
import { MessagesModule } from "./features/messages/messages.module";
import { UsersModule } from "./features/users/users.module";

const value: { connectionString: string; dbName: string; } = configuration();

const featureModules = [
  ConversationsModule,
  MessagesModule,
  UsersModule
];

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
    ...featureModules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
