import { PickType } from '@nestjs/swagger';
import { VM } from './vm.schema';

export class VMCreateDto extends PickType(VM, [
  'name',
  'vcpus',
  'storage',
] as const) {}
