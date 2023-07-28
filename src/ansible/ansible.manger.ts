import { Playbook, Ansible } from "node-ansible";
import path from "path";
import { join } from "path";
export class ansibleManger {
  constructor() {}

  hihi() {
    return "ss";
  }
  getResultAsJson(output) {
    console.log("getResultAsJson output: ", output);
    const lines = output.split("\n");
    console.log(lines[0]);

    while (lines[0] !== "{") {
      lines.splice(0, 1);
    }

    const newOutput = lines.join("\n");
    console.log(newOutput);
    return JSON.parse(newOutput);
  }
  async createCommand(yaml, inventory, val) {
    var Ansible = require("node-ansible");
    const paths = join("./src/ansible/playbook/test");
    const command = new Ansible.Playbook().playbook(yaml);
   // var result = await k.exec();
   
   // const jsonResult = this.getResultAsJson(result.output);
   // const tasks = jsonResult.plays[0].tasks;

  
 if (val) {
      command.variables(val);
    }

    if (inventory) {
      command.inventory(inventory);
    }

    return command;
    
  }

 async execCommand(command) {
 
   return await command.exec();
  }
}
