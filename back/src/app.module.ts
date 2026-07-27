import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config.js';
import { ClientModule } from './modules/client/client.module.js';
import { TurnModule } from './modules/turn/turn.module.js';
import { SalonModule } from './modules/salon/salon.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ClientModule,
    TurnModule,
    SalonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
