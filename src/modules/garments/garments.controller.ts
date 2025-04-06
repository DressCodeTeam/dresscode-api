import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GarmentsService } from './garments.service';
import { CreateGarmentDto } from './dto/create-garment.dto';
import { UpdateGarmentDto } from './dto/update-garment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('garments')
export class GarmentsController {
  constructor(private readonly garmentsService: GarmentsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) // Protect this route
  create(@Request() req, @Body() createGarmentDto: CreateGarmentDto) {
    return this.garmentsService.create(req.user.userId, createGarmentDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt')) // Protect this route
  findAll(@Request() req) {
    return this.garmentsService.findAll(req.user.userId); // Pass the user ID to the service
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.garmentsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGarmentDto: UpdateGarmentDto) {
  //   return this.garmentsService.update(+id, updateGarmentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.garmentsService.remove(+id);
  // }
}
