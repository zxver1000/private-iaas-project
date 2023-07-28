import Ansible from 'node-ansible';

import { InjectModel } from "@nestjs/mongoose";
import { DeserializedVM, VM, VMSchema, VmDocument } from "./vm.schema";
import { Model ,PaginateModel } from "mongoose";
import { HttpStatus, Logger } from '@nestjs/common';
import { VMCreateDto } from './vm.CreateDTO';
export class mongoRepsitory{

constructor(
@InjectModel(VM.name) private VMModel :PaginateModel<VM>){}


// get search post patch  delete

async getVMsInfo(pagenum:number):Promise<Object|number>{

  try{

const Data = await this.VMModel.paginate(
  {},
    {
      sort: { createdAt: -1 }, // 최신 순 정렬
      limit: 10, // 개수 제한
      page: pagenum, // 페이지 번호
    },
  );

  if (Data['docs'].length == 0) return HttpStatus.NO_CONTENT;
  const readonlyDatas = [];
    for (let i = 0; i < Data['docs'].length; i++) {

      readonlyDatas.push(Data['docs'][i].readOnlyData);
    }

 return readonlyDatas;

  }catch(e){
    console.log(e);
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
  
}

async getVMInfo(vmId:string){

  try{

    const VmData=await this.VMModel.findById(vmId);

    if(!VmData)return HttpStatus.NO_CONTENT;
    return VmData.readOnlyData;

  }catch(e){
    console.log(e);
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }



  


}

async createVm(vmData:VMCreateDto){

  try{
  let Vmdata=DeserializedVM(vmData);
  const result=await this.VMModel.create(Vmdata);
  return result.readOnlyData;
  }catch(e){
    console.log(e);
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }


}


async deleteVm(vmId:string){
  try{
    let Vm=await this.VMModel.findById(vmId);
    if(!Vm) return HttpStatus.NO_CONTENT;
    
   await Vm.deleteOne();
   return HttpStatus.OK;

  }catch(e){
    console.log(e);
    return HttpStatus.INTERNAL_SERVER_ERROR;

  }

}


}