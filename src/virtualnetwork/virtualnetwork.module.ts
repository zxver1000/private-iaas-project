import { Module } from '@nestjs/common';
import { VirtualnetworkController } from './virtualnetwork.controller';
import { VirtualnetworkService } from './virtualnetwork.service';
import { ansibleManger } from "../ansible/ansible.manger";
import { virtualNetworkRepository } from './data/virtual.repository';
  import { MongooseModule } from '@nestjs/mongoose';
  import { ServeStaticModule } from '@nestjs/serve-static';
import { VirtualNetwork, VirtualNetworkschema } from './data/virtual.schema';
import { join } from 'path';
@Module({
  imports: [MongooseModule.forFeature([{ name: VirtualNetwork.name, schema: VirtualNetworkschema }]),
ServeStaticModule.forRoot({
    rootPath:join(__dirname,'../ansible','playbook')
  })],
  controllers: [VirtualnetworkController],
  providers: [VirtualnetworkService,ansibleManger,virtualNetworkRepository]
})
export class VirtualnetworkModule {}
