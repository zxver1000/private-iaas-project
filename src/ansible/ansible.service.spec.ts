import { Test, TestingModule } from '@nestjs/testing';
import { AnsibleService } from './ansible.service';

describe('AnsibleService', () => {
  let service: AnsibleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnsibleService],
    }).compile();

    service = module.get<AnsibleService>(AnsibleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
