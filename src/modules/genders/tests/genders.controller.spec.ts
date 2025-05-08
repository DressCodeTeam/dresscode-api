import { Test, TestingModule } from '@nestjs/testing';
import { GendersController } from '../genders.controller';
import { GendersService } from '../genders.service';

describe('GendersController', () => {
  let controller: GendersController;
  let service: GendersService;

  // beforeEach s'exécute avant chaque test
  beforeEach(async () => {
    // Crée un module de test NestJS
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GendersController],
      providers: [
        {
          // On mock le GendersService
          provide: GendersService,
          // useValue nous permet de créer une version simplifiée du service
          useValue: {
            findAll: jest.fn(), // On mock seulement la méthode findAll
          },
        },
      ],
    }).compile(); // compile() construit le module

    // Récupère les instances dont on a besoin
    controller = module.get<GendersController>(GendersController);
    service = module.get<GendersService>(GendersService);
  });

  // Test de base pour vérifier que le contrôleur est bien défini
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of genders', async () => {
      // 1. On prépare les données mockées
      const mockGenders = [
        { id: 1, name: 'Homme' },
        { id: 2, name: 'Femme' },
        { id: 3, name: 'Unisexe' },
      ];

      // 2. On configure le mock du service
      // Ici on dit: "Quand findAll sera appelé, retourne une Promise qui se résout avec mockGenders"
      (service.findAll as jest.Mock).mockResolvedValue(mockGenders);

      // 3. On appelle la méthode du contrôleur
      const result = await controller.findAll();

      // 4. On vérifie que:
      // - Le service a bien été appelé
      expect(service.findAll).toHaveBeenCalled();
      // - Le résultat correspond à ce qu'on attend
      expect(result).toEqual(mockGenders);
      // - Le résultat contient bien 3 éléments
      expect(result).toHaveLength(3);
    });

    it('should throw an error when service fails', async () => {
      // On configure le mock pour qu'il rejette avec une erreur
      (service.findAll as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );

      // On vérifie que le contrôleur propage bien l'erreur
      await expect(controller.findAll()).rejects.toThrow('Database error');
    });
  });
});
