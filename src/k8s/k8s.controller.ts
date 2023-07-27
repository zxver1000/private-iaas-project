import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { join } from "path";
import { ansibleManger } from "../ansible/ansible.manger";
import { K8sService } from './k8s.service';
@Controller('k8s')
export class K8sController {
  constructor(private readonly AnsibleManger: ansibleManger,
    private readonly k8sService :K8sService){}


    @Get()
    async clusterInfo(){

      return "hihi";
  }

  @Post('master')
  async initK8s(@Body() masterData:Object){
    //requrire masterip token
    
  let result=await this.k8sService.k8s_init(masterData);
    
  return result;

  }


@Post('worker')
async joinK8s(@Body() workerData:Object){

  let result=await this.k8sService.k8s_join(workerData);
  return result;


}





}
