import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { Document, SchemaOptions } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { VMCreateDto } from './vm.CreateDTO';
export type VmDocument = VM & Document;

const options: SchemaOptions = {
  //* MongoDB 아래에 생성될 collection 이름 지정
  //* 지정 안하면 class 첫글자 소문자, 제일 마지막에 s 붙임
  collection: 'vm',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  id: true,
};

@Schema(options)
export class VM extends Document{
  @Prop()
  guest_name: string;

  @Prop()
  privateIp: string;

  @Prop()
  publicIp: string;

  @Prop()
  storage: number;

  @Prop()
  vcpus: number;
  @Prop()
  networkInterface:string;

  @Prop()
  os:string;
  @Prop()
  memory:number;

@Prop()
imageType:string;

readonly readOnlyData: {
  id: string;
  privateIp: string;
  publicIp: string;
  storage: number;
  vcpus: number;
  imageType: string;
  os:string;
  networkInterface:string;
  guest_name:string;
  memory:number;
  
};

}
export const _VMSchema = SchemaFactory.createForClass(VM);


_VMSchema.set('toObject', { virtuals: true });
_VMSchema.set('toJSON', { virtuals: true });
_VMSchema.plugin(mongoosePaginate);
_VMSchema.virtual('readOnlyData').get(function (this: VM) {
  return {
    id:this.id,
    privateIp:this.privateIp,
    publicIp: this.publicIp,
    storage: this.storage,
    vcpus: this.vcpus,
    imageType: this.imageType,
    guest_name:this.guest_name,
    os:this.os,
    networkInterface:this.networkInterface,
    memory:this.memory

  };
});
export const VMSchema = _VMSchema;


export function DeserializedVM(vmdata:Object){
let returnValue={};

if(vmdata['storage'])returnValue['storage']=vmdata['storage'];
if(vmdata['guest_name'])returnValue['guest_name']=vmdata['guest_name'];
if(vmdata['vcpus'])returnValue['vcpus']=vmdata['vcpus'];
if(vmdata['imageType'])returnValue['imageType']=vmdata['imageType'];
if(vmdata['os'])returnValue['os']=vmdata['os'];
if(vmdata['networkInterface'])returnValue['networkInterface']=vmdata['networkInterface'];
if(vmdata['memory'])returnValue['memory']=vmdata['memory'];
if(vmdata['privateIp'])returnValue['privateIp']=vmdata['privateIp'];
return returnValue;

}