import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '../../config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('database.type'),
        url: configService.get<string>('database.url'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false, // Do not auto-create tables
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
