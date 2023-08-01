import Ansible from 'node-ansible';

import { InjectModel } from "@nestjs/mongoose";

import { Model ,PaginateModel } from "mongoose";
import { HttpStatus, Logger } from '@nestjs/common';

import { DeserializedVirtualNetwork, VirtualNetwork } from './virtual.schema';
import { VirtualNetworkCreateDto } from './virtual.CreateDTO';
export class virtualNetworkRepository{

constructor(
@InjectModel(VirtualNetwork.name) private VMModel :PaginateModel<VirtualNetwork>){}


// get search post patch  delete

async getAllNetworkInfo(pagenum:number):Promise<Object|number>{

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

async getNetworkInfo(networkId:string){

  try{

    const VmData=await this.VMModel.findById(networkId);

    if(!VmData)return HttpStatus.NO_CONTENT;
    return VmData.readOnlyData;

  }catch(e){
    console.log(e);
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }



  


}

async createNetwork(networkData:VirtualNetworkCreateDto){

  try{
  let De_networkdata=DeserializedVirtualNetwork(networkData);
  const result=await this.VMModel.create(De_networkdata);
  return result.readOnlyData;
  }catch(e){
    console.log(e);
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }


}


async deleteNetwork(networkid:string){
  try{
    let Vm=await this.VMModel.findById(networkid);
    if(!Vm) return HttpStatus.NO_CONTENT;
    
   await Vm.deleteOne();
   return HttpStatus.OK;

  }catch(e){
    console.log(e);
    return HttpStatus.INTERNAL_SERVER_ERROR;

  }

}


}