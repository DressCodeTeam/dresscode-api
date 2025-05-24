import { Module } from '@nestjs/common';
import { GarmentsService } from './garments.service';
import { GarmentsController } from './garments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Garment } from './entities/garment.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { AiModule } from '../ai/ai.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Garment]), AiModule, CategoriesModule],
  controllers: [GarmentsController],
  providers: [GarmentsService, CloudinaryService],
  exports: [GarmentsService],
})
export class GarmentsModule {}
