import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnsibleModule } from './ansible/ansible.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { K8sModule } from './k8s/k8s.module';
import { VirtualnetworkModule } from './virtualnetwork/virtualnetwork.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AnsibleModule,
    MongooseModule.forRoot(process.env.DBURI),
    K8sModule,
    VirtualnetworkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
