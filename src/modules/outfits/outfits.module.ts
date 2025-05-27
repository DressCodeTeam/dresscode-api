import { Module } from '@nestjs/common';
import { OutfitsService } from './outfits.service';
import { OutfitsController } from './outfits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outfit } from './entities/outfit.entity';
import { AiModule } from '../ai/ai.module';
import { GarmentsModule } from '../garments/garments.module';
import { UsersModule } from '../users/users.module';
import { StylesModule } from '../styles/styles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Outfit]),
    AiModule,
    GarmentsModule,
    UsersModule,
    StylesModule,
  ],
  controllers: [OutfitsController],
  providers: [OutfitsService],
})
export class OutfitsModule {}
