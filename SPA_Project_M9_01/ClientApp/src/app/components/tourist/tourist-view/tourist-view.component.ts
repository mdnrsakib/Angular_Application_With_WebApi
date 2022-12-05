import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { baseUrl } from 'src/app/models/shared/app-constants';
import { TouristViewModel } from 'src/app/models/view-models/tourist-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { TouristService } from 'src/app/services/data/tourist.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tourist-view',
  templateUrl: './tourist-view.component.html',
  styleUrls: ['./tourist-view.component.css']
})
export class TouristViewComponent implements OnInit {

  picPath:string = `${baseUrl}/Pictures`
  tourists:TouristViewModel[] =[];
  dataSource:MatTableDataSource<TouristViewModel> = new MatTableDataSource(this.tourists)
  columns:string[] =['touristPicture','touristName', 'bookingDate', 'touristOccupation','packageName', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  constructor(
    private touristService:TouristService,
    private notifyService:NotifyService,
    private matDialog:MatDialog
  ) { }
  confirmDelete(data:TouristViewModel){
    //console.log(data);
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '500ms'
    }).afterClosed()
    .subscribe(result=>{
      //console.log(result);
      if(result){
        this.touristService.delete(data)
        .subscribe({
          next: r=>{
            this.notifyService.message('Customer removed', 'DISMISS');
            this.dataSource.data = this.dataSource.data.filter(c => c.touristId != data.touristId);
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
    this.touristService.getVM()
    .subscribe({
      next:r=>{
        this.tourists = r;
        this.dataSource.data = this.tourists;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

}
