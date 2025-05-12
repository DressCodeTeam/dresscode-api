import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../categories.controller';
import { CategoriesService } from '../categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories with subcategories', async () => {
      // 1. Définir le résultat mocké
      const mockResult = [
        {
          id: 1,
          name: 'Vestes/Manteaux',
          subcategories: [{ id: 1, name: 'Hiver' }],
        },
      ];

      // 2. Configurer le mock du service
      jest.spyOn(service, 'findAll').mockResolvedValue(mockResult);

      // 3. Appeler la méthode du contrôleur
      const result = await controller.findAll();

      // 4. Vérifications
      // expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });

    it('should handle errors from the service', async () => {
      // Simuler une erreur
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValue(new Error('Database error'));

      // On peut soit vérifier que l'erreur est propagée
      await expect(controller.findAll()).rejects.toThrow('Database error');

      // Ou tester la gestion d'erreur si tu as un try/catch dans ton contrôleur
    });
  });
});
