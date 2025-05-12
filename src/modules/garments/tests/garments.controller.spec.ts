// TODO: Review lint and fix errors
// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthGuard } from '@nestjs/passport';
// import { GarmentsController } from '../garments.controller';
// import { GarmentsService } from '../garments.service';
// import { CreateGarmentDto } from '../dto/create-garment.dto';

// describe('GarmentsController', () => {
//   let controller: GarmentsController;
//   let service: GarmentsService;

//   // Mock utilisateur pour les tests
//   const mockUser = {
//     userId: '123e4567-e89b-12d3-a456-426614174000', // UUID exemple
//   };

//   // Mock Request avec user
//   const mockRequest = {
//     user: mockUser,
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [GarmentsController],
//       providers: [
//         {
//           provide: GarmentsService,
//           useValue: {
//             create: jest.fn(),
//             findAll: jest.fn(),
//           },
//         },
//       ],
//     })
//       .overrideGuard(AuthGuard('jwt')) // On mock le guard JWT
//       .useValue({ canActivate: () => true }) // Toujours autoriser l'accès
//       .compile();

//     controller = module.get<GarmentsController>(GarmentsController);
//     service = module.get<GarmentsService>(GarmentsService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('create', () => {
//     it('should create a garment with user ID', async () => {
//       const createDto: CreateGarmentDto = {
//         image: 'https://example.com/image.jpg',
//         subcategory_id: 1,
//       };

//       const mockResult = {
//         id: 1,
//         id_user: mockUser.userId,
//         image: createDto.image,
//         subcategory_id: createDto.subcategory_id,
//       };

//       (service.create as jest.Mock).mockResolvedValue(mockResult);

//       const result = await controller.create(mockRequest, createDto);

//       expect(service.create).toHaveBeenCalledWith(mockUser.userId, createDto);
//       expect(result).toEqual(mockResult);
//     });

//     it('should throw error when service fails', async () => {
//       const createDto: CreateGarmentDto = {
//         image: 'https://example.com/image.jpg',
//         subcategory_id: 1,
//       };

//       (service.create as jest.Mock).mockRejectedValue(
//         new Error('Creation failed'),
//       );

//       await expect(controller.create(mockRequest, createDto)).rejects.toThrow(
//         'Creation failed',
//       );
//     });
//   });

//   describe('findAll', () => {
//     it('should return user garments', async () => {
//       const mockGarments = [
//         { id: 1, image: 'url1', subcategory_id: 1 },
//         { id: 2, image: 'url2', subcategory_id: 2 },
//       ];

//       (service.findAll as jest.Mock).mockResolvedValue(mockGarments);

//       const result = await controller.findAll(mockRequest);

//       expect(service.findAll).toHaveBeenCalledWith(mockUser.userId);
//       expect(result).toEqual(mockGarments);
//       expect(result.length).toBe(2);
//     });

//     it('should return empty array if no garments', async () => {
//       (service.findAll as jest.Mock).mockResolvedValue([]);

//       const result = await controller.findAll(mockRequest);

//       expect(result).toEqual([]);
//     });
//   });
// });
