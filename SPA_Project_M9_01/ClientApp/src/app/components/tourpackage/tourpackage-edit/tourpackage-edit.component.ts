import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { TourPackage } from 'src/app/models/data/tourpackage';
import { PakageCategory } from 'src/app/models/shared/app-constants';
import { NotifyService } from 'src/app/services/common/notify.service';
import { TourpackageService } from 'src/app/services/data/tourpackage.service';

@Component({
  selector: 'app-tourpackage-edit',
  templateUrl: './tourpackage-edit.component.html',
  styleUrls: ['./tourpackage-edit.component.css']
})
export class TourpackageEditComponent implements OnInit {

  tourpackage:TourPackage = null!;
  tourpackageForm:FormGroup = new FormGroup({
    packageCategory: new FormControl(undefined,Validators.required),
    packageName:new FormControl('', [Validators.required, Validators.maxLength(50)]),
    costPerPerson:new FormControl('', Validators.required),
    tourTime:new FormControl('', Validators.required),
    
  });
  packageCategoryOptions:{label:string,value:number}[]=[];
  constructor(
    private tourpackageService:TourpackageService,
    private notifyService:NotifyService,
    private activatedRoute:ActivatedRoute
  ) { }
save(){
  if(this.tourpackageForm.invalid) return;
      Object.assign(this.tourpackage, this.tourpackageForm.value);
      //console.log(this.customer);
      this.tourpackageService.update(this.tourpackage)
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
    Object.keys(PakageCategory).filter(
      (type) =>isNaN(<any>type) && type !== 'values'
    ).forEach((v:any,i)=>{
      this.packageCategoryOptions.push({label: v, value:<any>PakageCategory[v]})
    });
    let id:number=this.activatedRoute.snapshot.params['id'];
    this.tourpackageService.getById(id)
    .subscribe({
      next: r=> {
        this.tourpackage=r;
        //console.log(this.customer);
        this.tourpackageForm.patchValue(this.tourpackage);
      },
      error: err=>{
        this.notifyService.message('Failed to load tourpackage data', 'DISMISS');
        throwError(()=>err);
      }
    })
  }

}