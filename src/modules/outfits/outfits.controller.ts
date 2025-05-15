import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OutfitsService } from './outfits.service';
import { CreateOutfitDto } from './dto/create-outfit.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/types/authenticated-request';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { OutfitResponseDto } from './dto/outfit-response.dto';
import { GarmentSummaryDto } from '../garments/dto/garment-response.dto';

@ApiBearerAuth('accessToken')
@UseGuards(JwtAuthGuard)
@Controller('outfits')
export class OutfitsController {
  constructor(private readonly outfitsService: OutfitsService) {}

  @Post()
  @ApiOperation({ summary: "Add a new outfit to the user's outfits" })
  @ApiBody({ type: CreateOutfitDto })
  @ApiCreatedResponse({
    description: 'The created outfit',
    type: OutfitResponseDto,
  })
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() createOutfitDto: CreateOutfitDto,
  ): Promise<OutfitResponseDto> {
    return this.outfitsService.create(req.user.userId, createOutfitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all outfits of the user' })
  @ApiOkResponse({
    description: 'List of all outfits of the user',
    type: OutfitResponseDto,
    isArray: true,
  })
  async findAll(
    @Request() req: AuthenticatedRequest,
  ): Promise<OutfitResponseDto[]> {
    return this.outfitsService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: "Get a specific outfit's garments by ID" })
  @ApiOkResponse({
    description: "The outfit's garments with the specified ID",
    type: GarmentSummaryDto,
    isArray: true,
  })
  async findOne(
    @Request() req,
    @Param('id') id: string,
  ): Promise<GarmentSummaryDto[]> {
    return this.outfitsService.findOne(+id);
  }
}
