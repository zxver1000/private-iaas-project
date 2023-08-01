import { Controller } from '@nestjs/common';
import { VirtualnetworkService } from './virtualnetwork.service';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  HttpStatus
} from "@nestjs/common";
import { VirtualNetworkCreateDto } from './data/virtual.CreateDTO';
import { SuccessInterceptor } from '../common/interceptor/success.interceptor';
@Controller('virtualnetwork')
export class VirtualnetworkController {

constructor(
private readonly VirtualnetworkService:VirtualnetworkService
){}


@Get()
@UseInterceptors(SuccessInterceptor(HttpStatus.OK))
async getVms(@Query('pagenum') pagenum:string) {
  
 const result = await this.VirtualnetworkService.getAllNetwork(Number(pagenum));
  
  return result;
}

@Get(":networkid")
@UseInterceptors(SuccessInterceptor(HttpStatus.OK))
async getVm(@Param("networkid") networkid: string) {
  
  const result=await this.VirtualnetworkService.getNetworkInfo(networkid);
 
  return result;


}

@Post()
@UseInterceptors(SuccessInterceptor(HttpStatus.CREATED))
async createVm(@Body() networkData: VirtualNetworkCreateDto) {
//require -> prefix,ip,networkname

let result=await this.VirtualnetworkService.createNetwork(networkData);

return result;

}



@Delete()
@UseInterceptors(SuccessInterceptor(HttpStatus.OK))
async deleteVm(@Body('networkid') networkId:string) {
   
  
  const result=await this.VirtualnetworkService.deleteNetwork(networkId);

  return result;
}

}
