import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from './shared/logger/logger.module';
import { GendersModule } from './modules/genders/genders.module';
import { GarmentsModule } from './modules/garments/garments.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { StylesModule } from './modules/styles/styles.module';
import { OutfitsModule } from './modules/outfits/outfits.module';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [appConfig, databaseConfig, jwtConfig],
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    LoggerModule,
    GendersModule,
    GarmentsModule,
    CategoriesModule,
    StylesModule,
    OutfitsModule,
  ],
})
export class AppModule {}
