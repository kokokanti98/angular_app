import { Component, OnInit } from '@angular/core';
// on va importer l'interface IHotel du fichier hotel.ts
import { IHotel } from './hotel';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  private title = 'liste des Hotels';

  // Variable hotels contient les données de tous les hotels
  public hotels: IHotel[] = [
      {
        id: 1,
        hotelName: 'Buea sweet life',
        description: 'Belle vue au bord de la mer',
        price: 230.5,
        imageUrl: 'assets/img/hotel-room.jpg'
      }, {
        id: 2,
        hotelName: 'Marakech',
        description: 'Profitez de la vue sur les montagnes',
        price: 145.5,
        imageUrl: 'assets/img/the-interior.jpg'
      }, {
        id: 3,
        hotelName: 'Abudja new look palace',
        description: 'Séjour complet avec service de voitures',
        price: 120.12,
        imageUrl: 'assets/img/indoors.jpg'
      }, {
        id: 4,
        hotelName: 'Cape town city',
        description: 'Magnifique cadre pour votre séjour',
        price: 135.12,
        imageUrl: 'assets/img/window.jpg'
      }
    ];

    // variable pour regler l'affichage du badge
    public showBadge: boolean = true;
    
    public hotelFilter = 'mot';

    // fonction pour changer la valeur de showBadge true<->false
    public toggleisNewBadge(): void {
      this.showBadge = !this.showBadge;
    }

  // fonction pour récupérer le title-> un getteur
  public getTitle(): string{
    return this.title;
  }

  constructor() { }

  ngOnInit(): void {
    console.log('Commencement du cycle de vie du composants');
  }

}
