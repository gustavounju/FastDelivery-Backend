import { Test, TestingModule } from '@nestjs/testing';
import { CadeteService } from './cadete.service';

describe('CadeteService', () => {
  let service: CadeteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CadeteService],
    }).compile();

    service = module.get<CadeteService>(CadeteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
