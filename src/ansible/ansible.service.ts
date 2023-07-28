import { Injectable, HttpStatus } from '@nestjs/common';
import { mongoRepsitory } from './mongo/mongo.repository';
import { VMCreateDto } from './mongo/vm.CreateDTO';
import { join } from "path";
import { ansibleManger } from './ansible.manger';
@Injectable()
export class AnsibleService {
constructor(private readonly MongoRepsitory:mongoRepsitory,
  private readonly AnsibleManager:ansibleManger)
{}
async getVms(pagenum:number){

  if(!pagenum)return HttpStatus.BAD_REQUEST;

 try{
  let result= await this.MongoRepsitory.getVMsInfo(pagenum);

  return result;
 }catch(e){

  console.log(e);
  return HttpStatus.INTERNAL_SERVER_ERROR;
 }

}

async createVm(VmData:VMCreateDto){

try{


  //동일한 이름 할수없게 체킹 필요!! 
  let yaml_path=join("./src/ansible/playbook/provisioning");
  let inven_string=undefined;

  let command=await this.AnsibleManager.createCommand(yaml_path,inven_string, VmData);
 
   let result=await this.AnsibleManager.execCommand(command);
   
   const jsonResult = this.AnsibleManager.getResultAsJson(result.output);
   const tasks = jsonResult.plays[0].tasks;
 
   VmData['privateIp']=tasks[4].hosts.localhost.msg[0];
 let DBresult=await this.MongoRepsitory.createVm(VmData);
  return DBresult;
}catch(e){
console.log(e);
return HttpStatus.INTERNAL_SERVER_ERROR;

}



}

async getVmInfo(vmId:string){

try{
  let result=await this.MongoRepsitory.getVMInfo(vmId);
  return result;

}catch(e){

  console.log(e);
  return HttpStatus.INTERNAL_SERVER_ERROR;

}



}

async deleteVm(vmId:string){
  if(!vmId)return HttpStatus.BAD_REQUEST;

  try{


    let yaml_path=join("./src/ansible/playbook/removeVm");
    let vmData=await this.getVmInfo(vmId);   

    if(!vmData)return HttpStatus.NO_CONTENT;
    let inven_string=undefined;
 
    
    let command=await this.AnsibleManager.createCommand(yaml_path,undefined, vmData);
   
     let result=await this.AnsibleManager.execCommand(command);

    let DBresult=await this.MongoRepsitory.deleteVm(vmId);
    return DBresult;
  
  }catch(e){
  
    console.log(e);
    return HttpStatus.INTERNAL_SERVER_ERROR;
  
  }
  

}





}
