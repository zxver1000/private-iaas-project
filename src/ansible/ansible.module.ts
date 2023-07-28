import { Module } from '@nestjs/common';
import { AnsibleController } from './ansible.controller';
import { AnsibleService } from './ansible.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VM, VMSchema } from './mongo/vm.schema';
import { Schema } from 'mongoose';
import { ansibleManger } from './ansible.manger';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { mongoRepsitory } from './mongo/mongo.repository';
@Module({
  imports: [MongooseModule.forFeature([{ name: VM.name, schema: VMSchema }]),
ServeStaticModule.forRoot({
  rootPath:join(__dirname,'.','playbook')
})],

  controllers: [AnsibleController],
  providers: [AnsibleService, ansibleManger,mongoRepsitory],
})
export class AnsibleModule {}
