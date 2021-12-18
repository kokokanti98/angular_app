import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { StartRatingComponent } from '../start-rating/start-rating.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
// Importer le pipe personnalisé qui va remplacé les virgule par un point d'une valeur
import { ReplaceComma } from '../shared/pipes/replace-comma.pipe';
// Afin d'utiliser le ngModel
import { FormsModule } from '@angular/forms';
// Pour utiliser le routage
import { RouterModule } from '@angular/router';
// Importer le module pour utiliser Guard
import { HotelDetailGuard } from './shared/guards/hotel-detail.guard';

@NgModule({
  declarations: [
    HotelDetailComponent,
    StartRatingComponent,
    HotelListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      // Redirection vers la liste des hotels quand on accède '/hotels'
      { path: 'hotels', component: HotelListComponent },
      // Redirection vers le detail d'un hotel quand on accède '/hotels/id'
      {
        path: 'hotels/:id', component: HotelDetailComponent,
        canActivate: [HotelDetailGuard]
      }
    ])
  ]
})
export class HotelModule { }
