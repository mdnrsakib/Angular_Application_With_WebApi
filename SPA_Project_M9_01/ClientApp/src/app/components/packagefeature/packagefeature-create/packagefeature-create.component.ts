import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { Packagefeature } from 'src/app/models/data/packagefeature';
import { TourPackage } from 'src/app/models/data/tourpackage';
import { TransPortMode } from 'src/app/models/shared/app-constants';
import { NotifyService } from 'src/app/services/common/notify.service';
import { PackagefeatureService } from 'src/app/services/data/packagefeature.service';
import { TourpackageService } from 'src/app/services/data/tourpackage.service';

@Component({
  selector: 'app-packagefeature-create',
  templateUrl: './packagefeature-create.component.html',
  styleUrls: ['./packagefeature-create.component.css']
})
export class PackagefeatureCreateComponent implements OnInit {
  packagefeatures:Packagefeature = {tourPackageId:undefined, transportMode:undefined, hotelBooking:undefined, status:undefined}
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
    private notifyService:NotifyService
  ) { }
  save():void{
    if(this.packagefeatureForm.invalid) return;
    Object.assign(this.packagefeatures, this.packagefeatureForm.value);
    //console.log(this.customer);
    this.packagefeatureService.insert(this.packagefeatures)
    .subscribe({
      next: r=>{
        this.notifyService.message('Data saved', 'DISMISS');
        this.packagefeatures = {tourPackageId:undefined, transportMode:undefined, hotelBooking:undefined, status:undefined};
        this.packagefeatureForm.patchValue(this.packagefeatures);
        this.packagefeatureForm.markAsUntouched();
        this.packagefeatureForm.markAsPristine();
        
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
        this.notifyService.message("Failed to load tour package", 'DISMISS');
      }
    });
    Object.keys(TransPortMode).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.TransPortModeOptions.push({label: v, value:<any> TransPortMode[v]});
    });
    console.log(this.TransPortModeOptions)
  }

}