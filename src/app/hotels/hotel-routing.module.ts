import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Pour utiliser le routage
import { RouterModule } from '@angular/router';


// Importer le module pour utiliser Guard
import { HotelDetailGuard } from './shared/guards/hotel-detail.guard';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      // Redirection vers la liste des hotels quand on accède '/hotels'
      { path: 'hotels', component: HotelListComponent },
      // Redirection vers la liste des hotels quand on accède '/hotels'
      { path: 'hotels/:id/edit', component: HotelEditComponent },
      // Redirection vers le detail d'un hotel quand on accède '/hotels/id'
      {
        path: 'hotels/:id', component: HotelDetailComponent,
        canActivate: [HotelDetailGuard]
      }
    ]),
  ],
  // exportant le RouterModule pour que ce module est inclus qu'on importe RoutingModule dans un autre module
  exports: [RouterModule]
})
export class HotelRoutingModule { }
