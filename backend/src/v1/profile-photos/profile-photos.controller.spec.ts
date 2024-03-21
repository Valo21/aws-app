import { Test, TestingModule } from '@nestjs/testing';
import { ProfilePhotosController } from './profile-photos.controller';
import { ProfilePhotosService } from './profile-photos.service';

describe('ProfilePhotosController', () => {
  let controller: ProfilePhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilePhotosController],
      providers: [ProfilePhotosService],
    }).compile();

    controller = module.get<ProfilePhotosController>(ProfilePhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
