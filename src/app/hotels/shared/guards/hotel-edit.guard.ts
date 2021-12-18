import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { HotelEditComponent } from '../../hotel-edit/hotel-edit.component';

@Injectable({
  providedIn: 'root'
})
export class HotelEditGuard implements CanDeactivate<HotelEditComponent> {
  // Le CanDeactivate prend en paramètre un composant
  canDeactivate(component: HotelEditComponent): boolean {
    // Si mon formulaire contient au moins 1 champs rempli
    if (component.hotelForm.dirty) {
      // Met sur la champ formulaire hotelName Nouveau hotel si sa valeur est null
      const hotelName = component.hotelForm.get('hotelName').value! || 'Nouveau Hotel';
      return confirm(`Voulez-vous annuler les changements effectués sur ${hotelName} ?`)
    }
    return true;
  }
  
}
