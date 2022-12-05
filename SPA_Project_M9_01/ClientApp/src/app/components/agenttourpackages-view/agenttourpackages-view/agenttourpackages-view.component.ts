import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Agenttourpackage } from 'src/app/models/data/agenttourpackage';
import { AgenttourpackageViewModel } from 'src/app/models/view-models/agenttourpackage-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { TravelagentService } from 'src/app/services/data/travelagent.service';

@Component({
  selector: 'app-agenttourpackages-view',
  templateUrl: './agenttourpackages-view.component.html',
  styleUrls: ['./agenttourpackages-view.component.css']
})
export class AgenttourpackagesViewComponent implements OnInit {

  travelagent:AgenttourpackageViewModel = {};
  
  dataSource= new MatTableDataSource(this.travelagent.agentTourPackages);
  columns:string[] = ['tourPackage', 'costPerPerson', 'tourTime'];
  
    constructor(
      private orderService:TravelagentService,
      private notifyService:NotifyService,
      private activatedRoute:ActivatedRoute
    ){}

  ngOnInit(): void {
    this.travelagent.agentTourPackages=[];
    let id:number = this.activatedRoute.snapshot.params['id'];
    this.orderService.getWithItems(id)
    .subscribe({
      next: r=>{
        this.travelagent= r;
        console.log(this.travelagent.agentTourPackages)
        this.dataSource.data=this.travelagent.agentTourPackages as Agenttourpackage[];
      },
      error:err=>{
        this.notifyService.message('Failed to load orders', 'DISMISS');
        throwError(()=> err);
      }
    });
  }
}
