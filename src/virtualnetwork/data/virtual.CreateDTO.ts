import { PickType } from '@nestjs/swagger';
import { VirtualNetwork } from './virtual.schema';


export class VirtualNetworkCreateDto extends PickType(VirtualNetwork, [
  'networkname',
  'ip',
  'prefix'
] as const) {}
