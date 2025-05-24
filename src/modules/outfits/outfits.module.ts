import { Module } from '@nestjs/common';
import { OutfitsService } from './outfits.service';
import { OutfitsController } from './outfits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outfit } from './entities/outfit.entity';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [TypeOrmModule.forFeature([Outfit]), AiModule],
  controllers: [OutfitsController],
  providers: [OutfitsService],
})
export class OutfitsModule {}
