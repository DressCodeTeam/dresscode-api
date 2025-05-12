import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';
import { 
  BadRequestException, 
  InternalServerErrorException,
  NotFoundException 
} from '@nestjs/common';
import { OutfitsController } from '../outfits.controller';
import { OutfitsService } from '../outfits.service';
import { CreateOutfitDto } from '../dto/create-outfit.dto';

describe('OutfitsController', () => {
  let controller: OutfitsController;
  let service: OutfitsService;

  // Mock data
  const mockUser = { userId: 'user-123' };
  const mockRequest = { user: mockUser };
  const mockOutfit = {
    id: 1,
    id_style: 1,
    garment_ids: [1, 2, 3],
    created_at: new Date()
  };

  // Factory function pour créer des mock outfits
  const createMockOutfit = (overrides = {}) => ({
    ...mockOutfit,
    ...overrides
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutfitsController],
      providers: [
        {
          provide: OutfitsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockOutfit),
            findAll: jest.fn().mockResolvedValue([mockOutfit]),
            findOne: jest.fn().mockResolvedValue(mockOutfit),
            update: jest.fn().mockResolvedValue(undefined),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    })
    .overrideGuard(AuthGuard('jwt'))
    .useValue({ canActivate: () => true })
    .compile();

    controller = module.get<OutfitsController>(OutfitsController);
    service = module.get<OutfitsService>(OutfitsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('create()', () => {
    it('should create an outfit with valid data', async () => {
      const createDto: CreateOutfitDto = {
        garment_ids: [1, 2, 3],
        style_id: 1
      };

      const result = await controller.create(mockRequest, createDto);

      expect(service.create).toHaveBeenCalledWith(mockUser.userId, createDto);
      expect(result).toEqual(mockOutfit);
    });

    // it('should reject invalid garment_ids', async () => {
    //   const invalidDto = {
    //     garment_ids: ['not-a-number'], // Invalid
    //     style_id: 1
    //   };

    //   await expect(controller.create(mockRequest, invalidDto as any))
    //     .rejects.toThrow(BadRequestException);
    // });

    it('should handle service errors', async () => {
      const createDto: CreateOutfitDto = {
        garment_ids: [1, 2, 3],
        style_id: 1
      };

      jest.spyOn(service, 'create').mockRejectedValueOnce(
        new InternalServerErrorException('Database error')
      );

      await expect(controller.create(mockRequest, createDto))
        .rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findAll()', () => {
    it('should return an array of outfits', async () => {
      const outfits = [
        createMockOutfit({ id: 1 }),
        createMockOutfit({ id: 2 })
      ];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(outfits);

      const result = await controller.findAll(mockRequest);

      expect(service.findAll).toHaveBeenCalledWith(mockUser.userId);
      expect(result).toEqual(outfits);
      expect(result.length).toBe(2);
    });

    it('should return empty array when no outfits exist', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([]);
      const result = await controller.findAll(mockRequest);
      expect(result).toEqual([]);
    });
  });

  describe('findOne()', () => {
    it('should return a single outfit', async () => {
      const outfitId = '1';
      const result = await controller.findOne(mockRequest, outfitId);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockOutfit);
    });

    // it('should throw BadRequestException for non-numeric ID', async () => {
    //   await expect(controller.findOne(mockRequest, 'invalid'))
    //     .rejects.toThrow(BadRequestException);
    // });

    it('should throw NotFoundException when outfit doesnt exist', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(
        new NotFoundException('Outfit not found')
      );

      await expect(controller.findOne(mockRequest, '999'))
        .rejects.toThrow(NotFoundException);
    });
  });

  // Tests pour les méthodes non implémentées (à décommenter quand implémentées)
  // describe('update()', () => {
  //   it.skip('should update an outfit', async () => {
  //     // Test à implémenter
  //   });
  // });

  // describe('remove()', () => {
  //   it.skip('should delete an outfit', async () => {
  //     // Test à implémenter
  //   });
  // });
});