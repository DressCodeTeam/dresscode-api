import { Module } from '@nestjs/common';
import { GarmentsService } from './garments.service';
import { GarmentsController } from './garments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Garment } from './entities/garment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Garment])],
  controllers: [GarmentsController],
  providers: [GarmentsService],
})
export class GarmentsModule {}
