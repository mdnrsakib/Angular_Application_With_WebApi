import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { TourPackage } from 'src/app/models/data/tourpackage';
import { TravelAgent } from 'src/app/models/data/travelagent';
import { NotifyService } from 'src/app/services/common/notify.service';
import { TourpackageService } from 'src/app/services/data/tourpackage.service';
import { TravelagentService } from 'src/app/services/data/travelagent.service';

@Component({
  selector: 'app-travelagent-create',
  templateUrl: './travelagent-create.component.html',
  styleUrls: ['./travelagent-create.component.css']
})
export class TravelagentCreateComponent implements OnInit {

  travelAgent:TravelAgent = {agentName:undefined, email:undefined, agentAddress:undefined}
  tourPackage:TourPackage[] = [];

  //
  statusOptions:{label:string, value:number}[] =[];
  //
  travelagentForm:FormGroup= new FormGroup({
    agentName: new FormControl(undefined, Validators.required),
    email: new FormControl(undefined, Validators.required),
    agentAddress: new FormControl(undefined,Validators.required),
    agentTourPackages: new FormArray([])
  })
  constructor(
    private travelagentService: TravelagentService,
    private tourpackageService:TourpackageService,
    private notifyService:NotifyService
  ) { }
save(){
  if(this.travelagentForm.invalid) return;
  //console.log(this.orderForm.value);
  Object.assign(this.travelAgent, this.travelagentForm.value);
  //console.log(this.order);
  this.travelagentService.insert(this.travelAgent)
  .subscribe({
    next:r=>{
      this.notifyService.message("Data saved", 'DISMISS');
    },
    error:err=>{
      this.notifyService.message("Failed to load Travel Agent", 'DISMISS');
      throwError(()=>err);
    }
  })
}
get agenttourpackageFormArray(){
  return this.travelagentForm.controls["agentTourPackages"] as FormArray;
}
addItem(){
  this.agenttourpackageFormArray.push(new FormGroup({
    tourPackageId: new FormControl(undefined, Validators.required),
  }))
}
removeItem(index:number){
  if(this.agenttourpackageFormArray.controls.length> 1)
    this.agenttourpackageFormArray.removeAt(index);
}
  ngOnInit(): void {
    this.tourpackageService.get()
    .subscribe({
      next: r=>{
        this.tourPackage = r;
      },
      error: err=>{
        this.notifyService.message("Failed to load Travel Agent", 'DISMISS');
      }
    });
    //console.log(this.statusOptions)
    this.addItem();
  }

}
