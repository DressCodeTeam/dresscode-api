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
import { OutfitsService } from './outfits.service';
import { CreateOutfitDto } from './dto/create-outfit.dto';
import { UpdateOutfitDto } from './dto/update-outfit.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('outfits')
export class OutfitsController {
  constructor(private readonly outfitsService: OutfitsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) // Protect this route
  create(@Request() req, @Body() createOutfitDto: CreateOutfitDto) {
    return this.outfitsService.create(req.user.userId, createOutfitDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt')) // Protect this route
  findAll(@Request() req) {
    return this.outfitsService.findAll(req.user.userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt')) // Protect this route
  findOne(@Request() req, @Param('id') id: string) {
    return this.outfitsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOutfitDto: UpdateOutfitDto) {
  //   return this.outfitsService.update(+id, updateOutfitDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.outfitsService.remove(+id);
  // }
}
