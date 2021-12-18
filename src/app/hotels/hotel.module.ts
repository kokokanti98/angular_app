import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
// Afin d'utiliser le ngModel
// import { FormsModule } from '@angular/forms';
// Pour utiliser le routage
import { RouterModule } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { SharedModule } from '../shared/shared.module';
import { HotelRoutingModule } from './hotel-routing.module';
import { StartRatingComponent } from '../shared/start-rating/start-rating.component';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { HotelData } from './shared/api/hotel.data';

@NgModule({
  declarations: [
    HotelDetailComponent,
    HotelListComponent,
    StartRatingComponent,
    HotelEditComponent
  ],
  imports: [
    SharedModule,
    // Module pour le rootage sur les hotels
    HotelRoutingModule,
    InMemoryWebApiModule.forFeature(HotelData)
  ]
})
export class HotelModule { }
