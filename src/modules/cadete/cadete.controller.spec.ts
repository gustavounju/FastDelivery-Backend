import { Test, TestingModule } from '@nestjs/testing';
import { CadeteController } from './cadete.controller';
import { CadeteService } from './cadete.service';

describe('CadeteController', () => {
  let controller: CadeteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CadeteController],
      providers: [CadeteService],
    }).compile();

    controller = module.get<CadeteController>(CadeteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
