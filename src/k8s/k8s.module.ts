import { Module } from '@nestjs/common';
import { K8sController } from './k8s.controller';
import { K8sService } from './k8s.service';
import { ansibleManger } from "../ansible/ansible.manger";
@Module({
  controllers: [K8sController],
  providers: [K8sService,ansibleManger]
})
export class K8sModule {}
