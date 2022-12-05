import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { TourPackage } from 'src/app/models/data/tourpackage';
import { PakageCategory } from 'src/app/models/shared/app-constants';
import { NotifyService } from 'src/app/services/common/notify.service';
import { TourpackageService } from 'src/app/services/data/tourpackage.service';

@Component({
  selector: 'app-tourpackage-create',
  templateUrl: './tourpackage-create.component.html',
  styleUrls: ['./tourpackage-create.component.css']
})
export class TourpackageCreateComponent implements OnInit {

  tourpackage:TourPackage = {packageCategory:undefined, packageName:'', costPerPerson:undefined,tourTime:undefined};
  tourpackageForm:FormGroup = new FormGroup({
    packageCategory: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    packageName:new FormControl('', [Validators.required, Validators.maxLength(50)]),
    costPerPerson:new FormControl('', Validators.required),
    tourTime:new FormControl('', Validators.required),
  });
  packageCategoryOptions:{label:string,value:number}[]=[];
  constructor(
    private tourpackageService:TourpackageService,
    private notifyService:NotifyService
  ) { }
    save():void{
      if(this.tourpackageForm.invalid) return;
      Object.assign(this.tourpackage, this.tourpackageForm.value);
      //console.log(this.customer);
      this.tourpackageService.insert(this.tourpackage)
      .subscribe({
        next: r=>{
          this.notifyService.message('Data saved', 'DISMISS');
          this.tourpackage = {packageCategory:undefined, packageName:'', costPerPerson:undefined,tourTime:undefined};
          this.tourpackageForm.patchValue(this.tourpackage);
          this.tourpackageForm.markAsUntouched();
          this.tourpackageForm.markAsPristine();
          
        },
        error:err=> {
          this.notifyService.message('Failed to save data', 'DISMISS');
          throwError(()=>err);
        }
      })
    }
  ngOnInit(): void {
    Object.keys(PakageCategory).filter(
      (type)=>isNaN(<any>type) && type !='values'
    ).forEach((v:any,i)=>{
      this.packageCategoryOptions.push({label:v, value:<any>PakageCategory[v]});
    });
    console.log(this.packageCategoryOptions)
  }

}