import { Agent } from './agent';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from './agent.service';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  //constructor(private HttpClient:HttpClient){}
   toogle:boolean=true;
  // name:string='';
  // id:string='';
  // cources=[
  //   {id:1,name:'badr'
  //   },
  //   {id:2,name:'badr1'
  //   }

  // ]
  title = 'my-dream-app';
  home:string='';
//  clickme(): void{
//    this.name=this.name;
//    this.id=this.id;
//    var obj={name};
//       this.cources.push({id:3,name:'aaaa'});
//  }
// gotopage1(){
//   this.router.navigate(["/first"]);
// }
log(iem:any){
console.log(iem);}
validateEmail(ps1:string,ps2:string){
 

  if(!ps1.match(ps2)) {
   this.toogle=false;
  } else {
    this.toogle=true;
   

  }
}

public agents:Agent[] | undefined;
public editagent?:Agent;
public deletagent?:Agent;
constructor(private agentService:AgentService,private HttpClient:HttpClient){

}
  ngOnInit() {
    this.getAgents();

  }
public getAgents():void{
  this.agentService.getAgents().subscribe(
(response:Agent[])=>{
  this.agents=response;
},
(error:HttpErrorResponse)=>{alert(error.message);}
  );
}

public onAddAgent(addForm: NgForm): void {
  if(this.toogle){
  const button=document.getElementById('close-employee-form1');
  button?.click();
  this.agentService.addAgent(addForm.value).subscribe(
    (response: Agent) => {
      console.log(response);
      this.getAgents();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  );
  }
  else{
    const button=document.getElementById('close-employee-form1');
    button?.click();
  }
}
public updateagent(agent: Agent): void {
  this.agentService.updateAgent(agent).subscribe(
    (response: Agent) => {
      console.log(response);
      this.getAgents();
     
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
     
    }
  );
  
 
}
public deleteagent(id: any): void {
  this.agentService.deleteAgent(id).subscribe(
    (response: void) => {
      console.log(response);
      this.getAgents();
     
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
     
    }
  );
  
 
}
public onOpenModal(agent: Agent, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addEmployeeModal');
  }
  if (mode === 'edit') {
    this.editagent=agent;
    button.setAttribute('data-target', '#updateEmployeeModal');
  }
  if (mode === 'delete') {
    this.deletagent=agent;
    button.setAttribute('data-target', '#deleteEmployeeModal');
  }
  container?.appendChild(button);
  button.click();
}


}
