import { Test, TestingModule } from '@nestjs/testing';
import { VirtualnetworkController } from './virtualnetwork.controller';

describe('VirtualnetworkController', () => {
  let controller: VirtualnetworkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VirtualnetworkController],
    }).compile();

    controller = module.get<VirtualnetworkController>(VirtualnetworkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
