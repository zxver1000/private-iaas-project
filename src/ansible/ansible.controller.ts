import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { AnsibleService } from "./ansible.service";
import { InjectModel } from "@nestjs/mongoose";
import { VM, VMSchema, VmDocument } from "./mongo/vm.schema";
import { Model } from "mongoose";
import { ansibleManger } from "./ansible.manger";
import { join } from "path";
import { VMCreateDto } from "./mongo/vm.CreateDTO";
@Controller("ansible")
export class AnsibleController {
  constructor(
    private readonly AnsibleService: AnsibleService,
    @InjectModel(VM.name) private VMModel: Model<VmDocument>,
    private readonly AnsibleManger: ansibleManger
  ) {}

  @Get()
  async getVms(@Query('pagenum') pagenum:string) {
    
   const result = await this.AnsibleService.getVms(Number(pagenum));
    
    return result;
  }

  @Get(":vmid")
  async getVm(@Param("vmid") vmId: string) {
    
    const result=await this.AnsibleService.getVmInfo(vmId);
   
    return result;


  }

  @Post()
  async createVm(@Body() vmData: VMCreateDto) {
//request -> type,name,vcpus,stroage@@

let result=await this.AnsibleService.createVm(vmData);

return result;
  
  }

  @Patch(":vmid")
  async updateVm(@Body() updateData: object) {}

  @Delete()
  async deleteVm(@Body('vmId') vmId:string) {
     
    
    const result=await this.AnsibleService.deleteVm(vmId);

    return result;
  }
}
