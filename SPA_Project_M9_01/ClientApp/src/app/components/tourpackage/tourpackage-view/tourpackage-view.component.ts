import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { TourPackage } from 'src/app/models/data/tourpackage';
import { PakageCategory } from 'src/app/models/shared/app-constants';
import { TourPackageViewModel } from 'src/app/models/view-models/tourpackage-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { TourpackageService } from 'src/app/services/data/tourpackage.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tourpackage-view',
  templateUrl: './tourpackage-view.component.html',
  styleUrls: ['./tourpackage-view.component.css']
})
export class TourpackageViewComponent implements OnInit {

  tourpackages:TourPackageViewModel[] = [];
  columnList:string[] =['packageCategory', 'packageName', 'costPerPerson','tourTime', 'actions'];
  dataSource:MatTableDataSource<TourPackage> = new MatTableDataSource(this.tourpackages);
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  constructor(
    private tourpackageService:TourpackageService,
    private notifyService: NotifyService,
    private matDialog:MatDialog
  ) { }
  getPakageCategory(v:number):string{
    return PakageCategory[v];
  }
  confirmDelete(data:TourPackageViewModel){
    //console.log(data);
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '500ms'
    }).afterClosed()
    .subscribe(result=>{
      //console.log(result);
      if(result){
        this.tourpackageService.delete(data)
        .subscribe({
          next: r=>{
            this.notifyService.message('Tourpackage removed', 'DISMISS');
            this.dataSource.data = this.dataSource.data.filter(c => c.tourPackageId != data.tourPackageId);
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
    this.tourpackageService.getVM().subscribe({
      next: r=>{
        this.tourpackages = r;
        console.log(this.tourpackages);
        this.dataSource.data = this.tourpackages;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        this.notifyService.message("Failed to load tourpackage", "DISMISS");
        throwError(()=>err)
      }
    });
  }

}
