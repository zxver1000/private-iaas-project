import { PickType } from '@nestjs/swagger';
import { VM } from './vm.schema';

export class VMCreateDto extends PickType(VM, [
  'guest_name',
  'vcpus',
  'memory',
  'imageType',
  'os',
  'networkInterface'
] as const) {}
