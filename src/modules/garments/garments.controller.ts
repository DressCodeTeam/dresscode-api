import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GarmentsService } from './garments.service';
import { CreateGarmentDto } from './dto/create-garment.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/types/authenticated-request';
import { GarmentResponseDto } from './dto/garment-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@ApiBearerAuth('accessToken')
@UseGuards(JwtAuthGuard)
@Controller('garments')
export class GarmentsController {
  constructor(
    private readonly garmentsService: GarmentsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // TODO: Implement image upload on cloudinary
  @Post()
  @ApiOperation({ summary: "Add a new garment to the use's garment" })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateGarmentDto })
  @ApiCreatedResponse({
    description: 'The created garment',
    type: GarmentResponseDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Request() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: Pick<CreateGarmentDto, 'subcategory_id'>,
  ): Promise<GarmentResponseDto> {
    const imageUrl = await this.cloudinaryService.uploadImage(file);

    return this.garmentsService.create(
      req.user.userId,
      body.subcategory_id,
      imageUrl,
    );
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
