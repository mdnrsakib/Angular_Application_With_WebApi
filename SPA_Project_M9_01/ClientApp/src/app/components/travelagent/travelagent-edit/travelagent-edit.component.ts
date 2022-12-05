import { Agenttourpackage } from 'src/app/models/data/agenttourpackage';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { TourPackage } from 'src/app/models/data/tourpackage';
import { TravelAgent } from 'src/app/models/data/travelagent';
import { NotifyService } from 'src/app/services/common/notify.service';
import { TourpackageService } from 'src/app/services/data/tourpackage.service';
import { TravelagentService } from 'src/app/services/data/travelagent.service';

@Component({
  selector: 'app-travelagent-edit',
  templateUrl: './travelagent-edit.component.html',
  styleUrls: ['./travelagent-edit.component.css']
})
export class TravelagentEditComponent implements OnInit {
  travelAgent:TravelAgent = {agentName:undefined, email:undefined, agentAddress:undefined}
  tourPackage:TourPackage[] = [];

  travelagentForm:FormGroup= new FormGroup({
    agentName: new FormControl(undefined, Validators.required),
    email: new FormControl(undefined, Validators.required),
    agentAddress: new FormControl(undefined,Validators.required),
    agentTourPackages: new FormArray([])
  })
  constructor(
    private travelagentService: TravelagentService,
    private tourpackageService:TourpackageService,
    private notifyService:NotifyService,
    private activatedRout:ActivatedRoute
  ) { }
get agenttourpackageFormArray(){
  return this.travelagentForm.controls["agentTourPackages"] as FormArray;
}
addItem(oi?:Agenttourpackage){
  if(oi){
    this.agenttourpackageFormArray.push(new FormGroup({
      tourPackageId: new FormControl(oi.tourPackageId, Validators.required),
    }))
  }
  else
  {
    this.agenttourpackageFormArray.push(new FormGroup({
      tourPackageId: new FormControl(undefined, Validators.required),
    }));
  }
  
}
removeItem(index:number){
  if(this.agenttourpackageFormArray.controls.length> 1)
    this.agenttourpackageFormArray.removeAt(index);
}
save(){
  if(this.travelagentForm.invalid) return;
  //console.log(this.orderForm.value);
  Object.assign(this.travelAgent, this.travelagentForm.value);
  console.log(this.travelAgent);
  this.travelagentService.update(this.travelAgent)
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
  ngOnInit(): void {
    let id:number = this.activatedRout.snapshot.params['id'];
    this.travelagentService.getWithItems(id)
    .subscribe({
      next:r=>{
        this.travelAgent = r;
        console.log(this.travelAgent);
        this.travelagentForm.patchValue(this.travelAgent);
        this.travelAgent.agentTourPackages?.forEach(oi=>{
          this.addItem(oi);
        });
        console.log(this.travelagentForm.value)
      },
      error:err=>{
        this.notifyService.message("Falied to load order", "DISMISS");
        throwError(()=>err);
      }
    });
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
  }

}
