import { Test, TestingModule } from '@nestjs/testing';
import { AnsibleController } from './ansible.controller';

describe('AnsibleController', () => {
  let controller: AnsibleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnsibleController],
    }).compile();

    controller = module.get<AnsibleController>(AnsibleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
