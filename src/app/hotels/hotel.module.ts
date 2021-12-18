import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
// Afin d'utiliser le ngModel
// import { FormsModule } from '@angular/forms';
// Pour utiliser le routage
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HotelRoutingModule } from './hotel-routing.module';
import { StartRatingComponent } from '../shared/start-rating/start-rating.component';

@NgModule({
  declarations: [
    HotelDetailComponent,
    HotelListComponent,
    StartRatingComponent
  ],
  imports: [
    SharedModule,
    HotelRoutingModule
  ]
})
export class HotelModule { }
