import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GarmentsService } from './garments.service';
import { CreateGarmentDto } from './dto/create-garment.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/types/authenticated-request';
import { GarmentResponseDto } from './dto/garment-response.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('garments')
export class GarmentsController {
  constructor(private readonly garmentsService: GarmentsService) {}

  // TODO: Implement image upload on cloudinary
  @Post()
  @ApiOperation({ summary: "Add a new garment to the use's garment" })
  @ApiBody({ type: CreateGarmentDto })
  @ApiCreatedResponse({
    description: 'The created garment',
    type: GarmentResponseDto,
  })
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() createGarmentDto: CreateGarmentDto,
  ): Promise<GarmentResponseDto> {
    return this.garmentsService.create(req.user.userId, createGarmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all garments of the user' })
  @ApiOkResponse({
    description: 'List of all garments of the user',
    type: GarmentResponseDto,
    isArray: true,
  })
  async findAll(
    @Request() req: AuthenticatedRequest,
  ): Promise<GarmentResponseDto[]> {
    return this.garmentsService.findAll(req.user.userId); // Pass the user ID to the service
  }
}
