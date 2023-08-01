import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { Document, SchemaOptions } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
export type VirtualNetworkDocument = VirtualNetwork & Document;

const options: SchemaOptions = {
  //* MongoDB 아래에 생성될 collection 이름 지정
  //* 지정 안하면 class 첫글자 소문자, 제일 마지막에 s 붙임
  collection: 'VirtualNetwork',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  id: true,
};

@Schema(options)
export class VirtualNetwork extends Document{


  @Prop({
    require:true
  })
  networkname:string;

  @Prop({
    require:true
  })
  ip:string;
  @Prop({
    require:true
  })
  prefix:number;
  


readonly readOnlyData: {
  id:string;
 name:string;
 ip:string;
prefix:number;
  
};

}
export const _VirtualNetworkschema = SchemaFactory.createForClass(VirtualNetwork);

_VirtualNetworkschema.virtual('readOnlyData').get(function (this: VirtualNetwork) {
  return {
   id:this.id,
   networkname:this.networkname,
   ip:this.ip,
   prefix:this.prefix
  };
});

_VirtualNetworkschema.set('toObject', { virtuals: true });
_VirtualNetworkschema.set('toJSON', { virtuals: true });
_VirtualNetworkschema.plugin(mongoosePaginate);

export const VirtualNetworkschema = _VirtualNetworkschema;


export function DeserializedVirtualNetwork(vmdata:Object){
let returnValue={};

if(vmdata['networkname'])returnValue['networkname']=vmdata['networkname'];
if(vmdata['ip'])returnValue['ip']=vmdata['ip'];
if(vmdata['prefix'])returnValue['prefix']=vmdata['prefix'];
return returnValue;

}

