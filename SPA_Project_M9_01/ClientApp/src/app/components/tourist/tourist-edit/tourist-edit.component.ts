import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Tourist } from 'src/app/models/data/tourist';
import { TourPackage } from 'src/app/models/data/tourpackage';
import { baseUrl } from 'src/app/models/shared/app-constants';
import { TouristInputModel } from 'src/app/models/view-models/input/tourist-input-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { TouristService } from 'src/app/services/data/tourist.service';
import { TourpackageService } from 'src/app/services/data/tourpackage.service';

@Component({
  selector: 'app-tourist-edit',
  templateUrl: './tourist-edit.component.html',
  styleUrls: ['./tourist-edit.component.css']
})
export class TouristEditComponent implements OnInit {

  tourist:Tourist= null!;
  imgPath:string= baseUrl;
  tourPackage:TourPackage[] = [];
  touristForm: FormGroup = new FormGroup({
      touristName: new FormControl('', Validators.required),
    bookingDate: new FormControl(undefined, Validators.required),
    touristOccupation: new FormControl(undefined, [Validators.required]),
    tourPackageId: new FormControl(undefined, Validators.required),
    touristPicture: new FormControl(undefined, Validators.required)
    });
  
    file: File = null!;
    constructor(
        private touristService: TouristService,
        private tourpackageService:TourpackageService,
        private notifyService: NotifyService,
        private activatedRoute:ActivatedRoute
    ){}
    handleFileInputChange(event: any): void {
      if (event.target.files.length) {
        this.file = event.target.files[0];
        this.touristForm.controls['touristPicture'].patchValue(this.file.name);
      }
      else {
        this.touristForm.controls['touristPicture'].patchValue("");
      }
      
    }
    save(){
      if(this.touristForm.invalid) return;
      let _self = this;
       Object.assign(this.tourist, this.touristForm.value);
       console.log(this.tourist);
       let data:TouristInputModel = {touristId:this.tourist.touristId, touristName: this.tourist.touristName, bookingDate:this.tourist.bookingDate, touristOccupation:this.tourist.touristOccupation, tourPackageId:this.tourist.tourPackageId};
       this.touristService.update(data)
       .subscribe({
        next: r=>{
          this.notifyService.message("Product  updated", "DISMISS");
          if(this.file){
           _self. updateImage();
          }
        }
       })
    }
    updateImage(){
      let _self = this;
      var reader = new FileReader();
          
          reader.onload = function (e: any) {
           _self.touristService.uploadImage(<number>_self.tourist.touristId, _self.file)
           .subscribe({
            next:r=>{
              _self.notifyService.message("Picture updated", "DISMISS");
            },
            error: err=>{
              _self.notifyService.message("Picture update failed", "DISMISS");
              throwError(()=>err);
            }
           })
          }
          reader.readAsArrayBuffer(_self.file);
    }
  ngOnInit(): void {
    let id:number = this.activatedRoute.snapshot.params['id'];
    this.touristService.getById(id)
    .subscribe({
      next: r=>{
        this.tourist=r;
        this.touristForm.patchValue(this.tourist)
        console.log(this.tourist)
      },
      error: err=> {
        this.notifyService.message('Failed to load tourist data', 'DISMISS')
        throwError(()=>err);
      } 
    });
    this.tourpackageService.get()
    .subscribe({
      next: r=>{
        this.tourPackage = r;
      },
      error: err=>{
        this.notifyService.message("Failed to load customers", 'DISMISS');
      }
    });
  }
}
