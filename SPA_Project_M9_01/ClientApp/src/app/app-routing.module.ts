import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgenttourpackagesViewComponent } from './components/agenttourpackages-view/agenttourpackages-view/agenttourpackages-view.component';
import { HomeComponent } from './components/home/home.component';
import { PackagefeatureCreateComponent } from './components/packagefeature/packagefeature-create/packagefeature-create.component';
import { PackagefeatureEditComponent } from './components/packagefeature/packagefeature-edit/packagefeature-edit.component';
import { PackagefeatureViewComponent } from './components/packagefeature/packagefeature-view/packagefeature-view.component';
import { TouristCreateComponent } from './components/tourist/tourist-create/tourist-create.component';
import { TouristEditComponent } from './components/tourist/tourist-edit/tourist-edit.component';
import { TouristViewComponent } from './components/tourist/tourist-view/tourist-view.component';
import { TourpackageCreateComponent } from './components/tourpackage/tourpackage-create/tourpackage-create.component';
import { TourpackageEditComponent } from './components/tourpackage/tourpackage-edit/tourpackage-edit.component';
import { TourpackageViewComponent } from './components/tourpackage/tourpackage-view/tourpackage-view.component';
import { TravelagentCreateComponent } from './components/travelagent/travelagent-create/travelagent-create.component';
import { TravelagentEditComponent } from './components/travelagent/travelagent-edit/travelagent-edit.component';
import { TravelAgentViewComponent } from './components/travelagent/travelagent-view/travelagent-view.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'travelagents',component:TravelAgentViewComponent},
  {path:'travelagent-create', component:TravelagentCreateComponent},
  {path:'travelagent-edit/:id', component:TravelagentEditComponent},
  {path:'tourpackages',component:TourpackageViewComponent},
  {path:'tourpackage-create',component:TourpackageCreateComponent},
  {path:'tourpackage-edit/:id',component:TourpackageEditComponent},
  {path:'packagefeatures',component:PackagefeatureViewComponent},
  {path:'packagefeature-create',component:PackagefeatureCreateComponent},
  {path:'packagefeature-edit/:id',component:PackagefeatureEditComponent},
  {path:'tourist',component:TouristViewComponent},
  {path:'tourist-create',component:TouristCreateComponent},
  {path:'tourist-edit/:id',component:TouristEditComponent},
  {path: 'agentpackages-view-model/:id', component:AgenttourpackagesViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
