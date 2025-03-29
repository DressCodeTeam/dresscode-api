import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { LoggerModule } from './modules/shared/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('database.type'),
        url: configService.get('database.url'),
        // host: configService.get('database.host'),
        // port: configService.get('database.port'),
        // username: configService.get('database.username'),
        // password: configService.get('database.password'),
        // database: configService.get('database.database'),
        synchronize: true,
        // synchronize: configService.get('database.synchronize'),
        logging: configService.get('database.logging'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),

    // UsersModule,
    // LoggerModule
  ],
})
export class AppModule {}
