import { Injectable } from '@nestjs/common';
import { join } from "path";
import { ansibleManger } from "../ansible/ansible.manger";
@Injectable()
export class K8sService {
  constructor(
    private readonly AnsibleManager:ansibleManger
  ){}



  async k8s_init(masterData:Object){

   if(!masterData['masterIp']||!masterData['token']||!masterData['master_name'])return 404;
else{
  try{
    let yaml_path=join("./src/ansible/playbook/k8s_init");
  let inven_string="/home/inventory/"+masterData['master_name']+".txt";
  let inven_path=join(inven_string);
  
  let command=await this.AnsibleManager.createCommand(yaml_path,inven_path, masterData);
 
   let result=await this.AnsibleManager.execCommand(command);
   
   let re=await this.AnsibleManager.getResultAsJson(result.output);

   return 200;
  }catch(e){
    console.log(e);
    return 500;
  }
  
}
  }


  async k8s_join(workerData:Object){
    if(!workerData['masterIp']||!workerData['token']||!workerData['workerIp']||!workerData['worker_name'])
      return 404;
   
   else if(workerData['imagetype']){
      //이거는 디비에서 꺼내와야되는데 ..일단보류

   } 
 else{

  try{
    console.log(workerData);
   let yaml_path=join("./src/ansible/playbook/k8s_join");
   let inven_string="/home/inventory/"+workerData['worker_name']+".txt";
   let inven_path=join(inven_string);
   let command=await this.AnsibleManager.createCommand(yaml_path,inven_path, workerData);
   let result=await this.AnsibleManager.execCommand(command);
   let re=await this.AnsibleManager.getResultAsJson(result.output);
  return 200;
  }catch(e){

    console.log(e);
    return 500;


  }
  

 }


  }




}
