import { Test, TestingModule } from '@nestjs/testing';
import { ProfilePhotosService } from './profile-photos.service';

describe('ProfilePhotosService', () => {
  let service: ProfilePhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilePhotosService],
    }).compile();

    service = module.get<ProfilePhotosService>(ProfilePhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
