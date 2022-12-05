import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Packagefeature } from 'src/app/models/data/packagefeature';
import { TourPackage } from 'src/app/models/data/tourpackage';
import { TransPortMode } from 'src/app/models/shared/app-constants';
import { NotifyService } from 'src/app/services/common/notify.service';
import { PackagefeatureService } from 'src/app/services/data/packagefeature.service';
import { TourpackageService } from 'src/app/services/data/tourpackage.service';

@Component({
  selector: 'app-packagefeature-edit',
  templateUrl: './packagefeature-edit.component.html',
  styleUrls: ['./packagefeature-edit.component.css']
})
export class PackagefeatureEditComponent implements OnInit {
  packagefeatures:Packagefeature = null!;
  tourpackages:TourPackage[] = [];
  //
  TransPortModeOptions:{label:string, value:number}[] =[];
  //
  packagefeatureForm:FormGroup= new FormGroup({
    tourPackageId: new FormControl(undefined, Validators.required),
    transportMode: new FormControl(undefined, Validators.required),
    hotelBooking: new FormControl(undefined, Validators.required),
    status: new FormControl(undefined)
  })
  constructor(
    
    private packagefeatureService: PackagefeatureService,
    private tourpackageService:TourpackageService,
    private notifyService:NotifyService,
    private activatedRoute:ActivatedRoute
  ) { }
  save(){
    if(this.packagefeatureForm.invalid) return;
        Object.assign(this.packagefeatures, this.packagefeatureForm.value);
        //console.log(this.customer);
        this.packagefeatureService.update(this.packagefeatures)
        .subscribe({
          next:r=>{
            this.notifyService.message('Data saved', 'DISMISS');
          },
          error:err=> {
            this.notifyService.message('Failed to save data', 'DISMISS');
            throwError(()=>err);
          }
        })
  }
  ngOnInit(): void {
    this.tourpackageService.get()
    .subscribe({
      next: r=>{
        this.tourpackages = r;
      },
      error: err=>{
        this.notifyService.message("Failed to load package feature", 'DISMISS');
      }
    });
    Object.keys(TransPortMode).filter(
      (type) =>isNaN(<any>type) && type !== 'values'
    ).forEach((v:any,i)=>{
      this.TransPortModeOptions.push({label: v, value:<any>TransPortMode[v]})
    });
    let id:number=this.activatedRoute.snapshot.params['id'];
    this.packagefeatureService.getById(id)
    .subscribe({
      next: r=> {
        this.packagefeatures=r;
        //console.log(this.customer);
        this.packagefeatureForm.patchValue(this.packagefeatures);
      },
      error: err=>{
        this.notifyService.message('Failed to load travelagent data', 'DISMISS');
        throwError(()=>err);
      }
    })
  }

}