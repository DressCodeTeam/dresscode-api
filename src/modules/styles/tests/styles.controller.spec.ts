import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { StylesController } from '../styles.controller';
import { StylesService } from '../styles.service';

describe('StylesController', () => {
  let controller: StylesController;
  let service: StylesService;

  // Données mockées
  const mockStyles = [
    { id: 1, name: 'Classique' },
    { id: 2, name: 'Sportif' },
    { id: 3, name: 'Décontracté' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StylesController],
      providers: [
        {
          provide: StylesService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StylesController>(StylesController);
    service = module.get<StylesService>(StylesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of styles', async () => {
      // Configuration du mock
      jest.spyOn(service, 'findAll').mockResolvedValue(mockStyles);

      // Appel de la méthode
      const result = await controller.findAll();

      // Vérifications
      // expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockStyles);
      expect(result.length).toBe(3);
    });

    it('should handle empty result', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });

    it('should propagate service errors', async () => {
      const error = new InternalServerErrorException('Database error');
      jest.spyOn(service, 'findAll').mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow(error);
    });
  });
});
