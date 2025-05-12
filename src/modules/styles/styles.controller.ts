import { Controller, Get } from '@nestjs/common';
import { StylesService } from './styles.service';
import { StyleResponseDto } from './dto/style-response.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('styles')
export class StylesController {
  constructor(private readonly stylesService: StylesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all garment styles',
  })
  @ApiOkResponse({
    description: 'List of all garment styles available',
    type: StyleResponseDto,
    isArray: true,
  })
  async findAll(): Promise<StyleResponseDto[]> {
    return this.stylesService.findAll();
  }
}
