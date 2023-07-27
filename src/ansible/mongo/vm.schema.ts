import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { Document, SchemaOptions } from 'mongoose';

export type VmDocument = VM & Document;

const options: SchemaOptions = {
  //* MongoDB 아래에 생성될 collection 이름 지정
  //* 지정 안하면 class 첫글자 소문자, 제일 마지막에 s 붙임
  collection: 'vm',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  id: true,
};

@Schema()
export class VM {
  @Prop()
  name: string;

  @Prop()
  privateIp: string;

  @Prop()
  publicIp: string;

  @Prop()
  storage: number;

  @Prop()
  vcpus: number;
}

export const VMSchema = SchemaFactory.createForClass(VM);
