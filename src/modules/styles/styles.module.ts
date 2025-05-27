import { Module } from '@nestjs/common';
import { StylesService } from './styles.service';
import { StylesController } from './styles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Style } from './entities/style.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Style])], // Add your entities here
  controllers: [StylesController],
  providers: [StylesService],
  exports: [StylesService],
})
export class StylesModule {}
