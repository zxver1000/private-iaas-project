import { Injectable, HttpStatus } from '@nestjs/common';
import { join } from "path";
import { virtualNetworkRepository } from './data/virtual.repository';
import { ansibleManger } from "../ansible/ansible.manger";
import { VirtualNetworkCreateDto } from './data/virtual.CreateDTO';
import { DeserializedVirtualNetwork } from './data/virtual.schema';
@Injectable()
export class VirtualnetworkService {
  constructor(
private readonly virtualNetworkRepository:virtualNetworkRepository,
private readonly AnsibleManager:ansibleManger
  ){}


  async getAllNetwork(pagenum:number){

    if(!pagenum)return HttpStatus.BAD_REQUEST;
  
   try{
    let result= await this.virtualNetworkRepository.getAllNetworkInfo(pagenum);
  
    return result;
   }catch(e){
  
    console.log(e);
    return HttpStatus.INTERNAL_SERVER_ERROR;
   }
  
  }
  
  async createNetwork(NetworkData:VirtualNetworkCreateDto){
  
  try{
    //prefix,ip,networkname
    if(!NetworkData['prefix']||!NetworkData['ip']||NetworkData['networkanme']) return HttpStatus.BAD_REQUEST;
  
    //동일한 이름 할수없게 체킹 필요!! 
    let yaml_path=join("./src/ansible/playbook/createNetwork");
    let inven_string=undefined;
  
    let De_networkData=DeserializedVirtualNetwork(NetworkData);
    // 프리픽스 24~30까지만 가능..
    // 추후 0~24조정예정
    if(De_networkData['prefix']>=31||De_networkData['prefix']<24)
    return HttpStatus.BAD_REQUEST;

    let hostNum=32-De_networkData['prefix'];
    hostNum=Math.pow(2,hostNum);
    let netMask=256-hostNum;
    De_networkData['subnetMask']="255.255.255."+String(netMask);

    let arrays=De_networkData['ip'].split(".");
    
    let numnum=Number(arrays[3])+1;
    De_networkData['startIp']=arrays[0]+"."+arrays[1]+"."+arrays[2]+"."+String(numnum);

    if(hostNum+Number(arrays[3])>=255){
      De_networkData['endIp']=arrays[0]+"."+arrays[1]+"."+arrays[2]+"."+254;
    }
    else{
      let nums=Number(arrays[3])+hostNum-2;
      De_networkData['endIp']=arrays[0]+"."+arrays[1]+"."+arrays[2]+"."+String(nums);
    }
    
    let command=await this.AnsibleManager.createCommand(yaml_path,inven_string, De_networkData);
   
     let result=await this.AnsibleManager.execCommand(command);
     
     const jsonResult = this.AnsibleManager.getResultAsJson(result.output);
     const tasks = jsonResult.plays[0].tasks;
    // VmData['privateIp']=tasks[4].hosts.localhost.msg[0];
    let DBresult=await this.virtualNetworkRepository.createNetwork(NetworkData);
    return DBresult;
    
  }catch(e){
  console.log(e);
  return HttpStatus.INTERNAL_SERVER_ERROR;
  
  }
  
  
  
  }
  
  async getNetworkInfo(NetworkId:string){
  
  try{
    let result=await this.virtualNetworkRepository.getNetworkInfo(NetworkId);
    return result;
  
  }catch(e){
  
    console.log(e);
    return HttpStatus.INTERNAL_SERVER_ERROR;
  
  }
  
  
  
  }
  
  async deleteNetwork(NetworkId:string){
    if(!NetworkId)return HttpStatus.BAD_REQUEST;
  
    try{
  

      let yaml_path=join("./src/ansible/playbook/deleteNetwork");
      let networkData=await this.getNetworkInfo(NetworkId);   
      
      if(!networkData)return HttpStatus.OK;
      let inven_string=undefined;
     
        
      let command=await this.AnsibleManager.createCommand(yaml_path,undefined, networkData);
     
       let result=await this.AnsibleManager.execCommand(command);
     
      let DBresult=await this.virtualNetworkRepository.deleteNetwork(NetworkId);
      return DBresult;
      
    }catch(e){
    
      console.log(e);
      return HttpStatus.INTERNAL_SERVER_ERROR;
    
    }
    
  
  }
  

}
