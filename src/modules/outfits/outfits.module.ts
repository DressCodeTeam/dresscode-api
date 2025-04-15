import { Module } from '@nestjs/common';
import { OutfitsService } from './outfits.service';
import { OutfitsController } from './outfits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outfit } from './entities/outfit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Outfit])],
  controllers: [OutfitsController],
  providers: [OutfitsService],
})
export class OutfitsModule {}
