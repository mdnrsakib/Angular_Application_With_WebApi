import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { TravelAgent } from 'src/app/models/data/travelagent';
import { TravelAgentViewModel } from 'src/app/models/view-models/travelagent-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { TravelagentService } from 'src/app/services/data/travelagent.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-travelagent-view',
  templateUrl: './travelagent-view.component.html',
  styleUrls: ['./travelagent-view.component.css']
})
export class TravelAgentViewComponent implements OnInit {

  travelagents:TravelAgentViewModel[] = [];
  columnList:string[] =['agentName', 'email', 'agentAddress','details', 'actions'];
  dataSource:MatTableDataSource<TravelAgent> = new MatTableDataSource(this.travelagents);
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  constructor(
    private travelagentService:TravelagentService,
    private notifyService: NotifyService,
    private matDialog:MatDialog
  ) { }
  confirmDelete(data:TravelAgentViewModel){
    //console.log(data);
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '500ms'
    }).afterClosed()
    .subscribe(result=>{
      //console.log(result);
      if(result){
        this.travelagentService.delete(data)
        .subscribe({
          next: r=>{
            this.notifyService.message('Travel Agent removed', 'DISMISS');
            this.dataSource.data = this.dataSource.data.filter(c => c.travelAgentId != data.travelAgentId);
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
    this.travelagentService.getVM().subscribe({
      next: r=>{
        this.travelagents = r;
        //console.log(this.customers);
        this.dataSource.data = this.travelagents;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        this.notifyService.message("Failed to load Travel Agent", "DISMISS");
        throwError(()=>err)
      }
    });
  }

}
