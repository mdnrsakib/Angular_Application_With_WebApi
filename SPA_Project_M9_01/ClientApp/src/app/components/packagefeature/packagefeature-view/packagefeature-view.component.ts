import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { Packagefeature } from 'src/app/models/data/packagefeature';
import { TransPortMode } from 'src/app/models/shared/app-constants';
import { PackagefeatureViewModel } from 'src/app/models/view-models/packagefeature-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { PackagefeatureService } from 'src/app/services/data/packagefeature.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-packagefeature-view',
  templateUrl: './packagefeature-view.component.html',
  styleUrls: ['./packagefeature-view.component.css']
})
export class PackagefeatureViewComponent implements OnInit {

  packagefeatures:PackagefeatureViewModel[] = [];
  columnList:string[] =['packageName','transportMode', 'hotelBooking', 'status','actions'];
  dataSource:MatTableDataSource<Packagefeature> = new MatTableDataSource(this.packagefeatures);
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  constructor(
    private packagefeatureService:PackagefeatureService,
    private notifyService: NotifyService,
    private matDialog:MatDialog
  ) { }
  getTransPortMode(v:number):string{
    return TransPortMode[v];
  }
  confirmDelete(data:PackagefeatureViewModel){
    //console.log(data);
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '500ms'
    }).afterClosed()
    .subscribe(result=>{
      //console.log(result);
      if(result){
        this.packagefeatureService.delete(data)
        .subscribe({
          next: r=>{
            this.notifyService.message('Customer removed', 'DISMISS');
            this.dataSource.data = this.dataSource.data.filter(c => c.packageFeatureId != data.packageFeatureId);
          },
          error:err=>{
            this.notifyService.message('Failed to delete data', 'DISMISS');
            throwError(()=>err);
          }
        })
      }
    })
  }
  ngOnInit(): void {
    this.packagefeatureService.getVM().subscribe({
      next: r=>{
        this.packagefeatures = r;
        console.log(this.packagefeatures);
        this.dataSource.data = this.packagefeatures;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        this.notifyService.message("Failed to load feature", "DISMISS");
        throwError(()=>err)
      }
    });
  }

}
