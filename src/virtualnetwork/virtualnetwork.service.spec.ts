import { Test, TestingModule } from '@nestjs/testing';
import { VirtualnetworkService } from './virtualnetwork.service';

describe('VirtualnetworkService', () => {
  let service: VirtualnetworkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VirtualnetworkService],
    }).compile();

    service = module.get<VirtualnetworkService>(VirtualnetworkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
