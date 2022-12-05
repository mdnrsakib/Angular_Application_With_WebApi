import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourPackage } from 'src/app/models/data/tourpackage';
import { TouristInputModel } from 'src/app/models/view-models/input/tourist-input-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { TouristService } from 'src/app/services/data/tourist.service';
import { TourpackageService } from 'src/app/services/data/tourpackage.service';

@Component({
  selector: 'app-tourist-create',
  templateUrl: './tourist-create.component.html',
  styleUrls: ['./tourist-create.component.css']
})
export class TouristCreateComponent implements OnInit {

  tourist: TouristInputModel = { touristName: undefined, bookingDate: undefined, touristOccupation:undefined,tourPackageId:undefined };
  tourPackage:TourPackage[] = [];
  touristForm: FormGroup = new FormGroup({
    touristName: new FormControl('', Validators.required),
    bookingDate: new FormControl(undefined, Validators.required),
    touristOccupation: new FormControl(undefined, [Validators.required]),
    tourPackageId: new FormControl(undefined, Validators.required),
    touristPicture: new FormControl(undefined, Validators.required)
  });

  save() {
    if (this.touristForm.invalid) return;
    Object.assign(this.tourist, this.touristForm.value)
    //console.log(this.product);
    var _self = this;
    
    this.touristService.insert(this.tourist)
      .subscribe({
        next: r => {
          _self.notifyService.message('Data saved', 'DISMISS');
          var file = this.touristForm.controls['touristPicture'].value.files[0];
          var reader = new FileReader();
          
          reader.onload = function (e: any) {
            console.log(e);
            _self.touristService.uploadImage(<number>r.touristId, file)
              .subscribe({
                next: r => {
                  _self.notifyService.message('Picture uploaded', 'DISMISS');
                },
                error: err => {
                  _self.notifyService.message('Picture upload failed', 'DISMISS');
                }
              });
          }
          reader.readAsArrayBuffer(file);
        },
        error: err => {
        _self.notifyService.message('Failed to save tourist', 'DISMISS')
        }
      });


  }

  constructor(
    private touristService: TouristService,
    private tourpackageService:TourpackageService,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {
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