import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { GendersModule } from './modules/genders/genders.module';
import { GarmentsModule } from './modules/garments/garments.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { StylesModule } from './modules/styles/styles.module';
import { OutfitsModule } from './modules/outfits/outfits.module';
import { CloudinaryService } from './modules/cloudinary/cloudinary.service';
import { AiModule } from './modules/ai/ai.module';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import aiConfig from './config/ai.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [appConfig, databaseConfig, jwtConfig, aiConfig],
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    GendersModule,
    GarmentsModule,
    CategoriesModule,
    StylesModule,
    OutfitsModule,
    AiModule,
  ],
  providers: [CloudinaryService],
})
export class AppModule {}
