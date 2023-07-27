import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { AnsibleService } from "./ansible.service";
import { InjectModel } from "@nestjs/mongoose";
import { VM, VMSchema, VmDocument } from "./mongo/vm.schema";
import { Model } from "mongoose";
import { ansibleManger } from "./ansible.manger";
import { join } from "path";
@Controller("ansible")
export class AnsibleController {
  constructor(
    private readonly AnsibleService: AnsibleService,
    @InjectModel(VM.name) private VMModel: Model<VmDocument>,
    private readonly AnsibleManger: ansibleManger
  ) {}

  @Get()
  async getAllVm() {
    //let s = { publicIp: 1, name: 'hihi' };
    const s = await this.VMModel.find();
    console.log(s);
    return s;
  }

  @Get(":vmid")
  async getVm(@Param("vmid") vmId: string) {
    let yaml_path=join("./src/ansible/playbook/test2");
    let inven_path=join("./src/ansible/inventory/hi.txt");
    let k=undefined;
    let ma={"masterIp":"192.168.122.7"};
    let command= await this.AnsibleManger.createCommand(yaml_path, k, k);
    let result=await this.AnsibleManger.execCommand(command);
   
    let re=await this.AnsibleManger.getResultAsJson(result.output);
   
   
    return "complet";


  }

  @Post()
  async createVm(@Body() vmData: object) {}

  @Patch(":vmid")
  async updateVm(@Body() updateData: object) {}

  @Delete(":vmid")
  async deleteVm() {}
}
