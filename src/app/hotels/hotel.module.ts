import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
// Afin d'utiliser le ngModel
// import { FormsModule } from '@angular/forms';
// Pour utiliser le routage
import { RouterModule } from '@angular/router';
// Importer le module pour utiliser Guard
import { HotelDetailGuard } from './shared/guards/hotel-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { StartRatingComponent } from '../shared/start-rating/start-rating.component';

@NgModule({
  declarations: [
    HotelDetailComponent,
    HotelListComponent,
    StartRatingComponent
  ],
  imports: [
    RouterModule.forChild([
      // Redirection vers la liste des hotels quand on accède '/hotels'
      { path: 'hotels', component: HotelListComponent },
      // Redirection vers le detail d'un hotel quand on accède '/hotels/id'
      {
        path: 'hotels/:id', component: HotelDetailComponent,
        canActivate: [HotelDetailGuard]
      }
    ]),
    SharedModule
  ]
})
export class HotelModule { }
