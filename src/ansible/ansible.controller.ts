import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  HttpStatus
} from "@nestjs/common";
import { AnsibleService } from "./ansible.service";
import { InjectModel } from "@nestjs/mongoose";
import { VM, VMSchema, VmDocument } from "./mongo/vm.schema";
import { Model } from "mongoose";
import { ansibleManger } from "./ansible.manger";
import { join } from "path";
import { VMCreateDto } from "./mongo/vm.CreateDTO";
import { SuccessInterceptor } from "../common/interceptor/success.interceptor";
@Controller("ansible")
export class AnsibleController {
  constructor(
    private readonly AnsibleService: AnsibleService,
  ) {}

  @Get()
  @UseInterceptors(SuccessInterceptor(HttpStatus.OK))
  async getVms(@Query('pagenum') pagenum:string) {
    
   const result = await this.AnsibleService.getVms(Number(pagenum));
    
    return result;
  }

  @Get(":vmid")
  @UseInterceptors(SuccessInterceptor(HttpStatus.OK))
  async getVm(@Param("vmid") vmId: string) {
    
    const result=await this.AnsibleService.getVmInfo(vmId);
   
    return result;


  }

  @Post()
  @UseInterceptors(SuccessInterceptor(HttpStatus.CREATED))
  async createVm(@Body() vmData: VMCreateDto) {
//require -> type,name,vcpus,memory@@

let result=await this.AnsibleService.createVm(vmData);

return result;
  
  }

  @Patch(":vmid")
  async updateVm(@Body() updateData: object) {}

  @Delete()
  @UseInterceptors(SuccessInterceptor(HttpStatus.OK))
  async deleteVm(@Body('vmId') vmId:string) {
     
    
    const result=await this.AnsibleService.deleteVm(vmId);

    return result;
  }
}
