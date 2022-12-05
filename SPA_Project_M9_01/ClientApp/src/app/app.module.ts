import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import { MatModulesModule } from './modules/mat-modules/mat-modules.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TravelagentService } from './services/data/travelagent.service';
import { NotifyService } from './services/common/notify.service';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';
import { TravelAgentViewComponent } from './components/travelagent/travelagent-view/travelagent-view.component';
import { TravelagentCreateComponent } from './components/travelagent/travelagent-create/travelagent-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TravelagentEditComponent } from './components/travelagent/travelagent-edit/travelagent-edit.component';
import { TourpackageViewComponent } from './components/tourpackage/tourpackage-view/tourpackage-view.component';
import { TourpackageService } from './services/data/tourpackage.service';
import { TourpackageCreateComponent } from './components/tourpackage/tourpackage-create/tourpackage-create.component';
import { TourpackageEditComponent } from './components/tourpackage/tourpackage-edit/tourpackage-edit.component';
import { PackagefeatureViewComponent } from './components/packagefeature/packagefeature-view/packagefeature-view.component';
import { PackagefeatureService } from './services/data/packagefeature.service';
import { PackagefeatureCreateComponent } from './components/packagefeature/packagefeature-create/packagefeature-create.component';
import { PackagefeatureEditComponent } from './components/packagefeature/packagefeature-edit/packagefeature-edit.component';
import { TouristViewComponent } from './components/tourist/tourist-view/tourist-view.component';
import { TouristService } from './services/data/tourist.service';
import { TouristCreateComponent } from './components/tourist/tourist-create/tourist-create.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { DatePipe } from '@angular/common';
import { TouristEditComponent } from './components/tourist/tourist-edit/tourist-edit.component';
import { AgenttourpackagesViewComponent } from './components/agenttourpackages-view/agenttourpackages-view/agenttourpackages-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ConfirmDialogComponent,
    TravelAgentViewComponent,
    TravelagentCreateComponent,
    TravelagentEditComponent,
    TourpackageViewComponent,
    TourpackageCreateComponent,
    TourpackageEditComponent,
    PackagefeatureViewComponent,
    PackagefeatureCreateComponent,
    PackagefeatureEditComponent,
    TouristViewComponent,
    TouristCreateComponent,
    TouristEditComponent,
    AgenttourpackagesViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatModulesModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    DatePipe
    
  ],
  entryComponents:[ConfirmDialogComponent],
  providers: [HttpClient,TravelagentService,NotifyService,TourpackageService,PackagefeatureService,TouristService],
  bootstrap: [AppComponent]
})
export class AppModule { }
