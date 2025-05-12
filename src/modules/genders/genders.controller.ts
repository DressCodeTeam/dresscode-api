import { Controller, Get } from '@nestjs/common';
import { GendersService } from './genders.service';
import { GenderResponseDto } from './dto/gender-reponse.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all genders',
  })
  @ApiOkResponse({
    description: 'List of all genrders available',
    type: GenderResponseDto,
    isArray: true,
  })
  async findAll(): Promise<GenderResponseDto[]> {
    return this.gendersService.findAll();
  }
}
