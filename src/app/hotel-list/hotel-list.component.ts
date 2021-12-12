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
    // variable de filtre de recherche sur la lsite des hotels 
    // nommée une variable privée: private _mavar
    private _hotelFilter = 'mot';
    //variable pour la liste des hotels filtre via recherche sur
    public filteredHotels: IHotel[] = [];

    // fonction pour changer la valeur de showBadge true<->false
    public toggleisNewBadge(): void {
      this.showBadge = !this.showBadge;
    }
    // Getteur de _hotelFilter
    public get hotelFilter(): string{
      return this._hotelFilter;
    }
    // Getteur de _hotelFilter
    public set hotelFilter(filter: string){
      //va changer la variable _hotelFilter
      this._hotelFilter = filter;
      // va changer la liste des hotel filtrer si _hotelfilter est vide alors la liste est hotels sinon la liste d'hotel change
      this.filteredHotels = this.hotelFilter ? this.filterHotels(this.hotelFilter) : this.hotels;
    }
  // fonction pour récupérer le title-> un getteur
  public getTitle(): string{
    return this.title;
  }
   // Fonction pour recherche la liste des hotels via un critère qui retourne une liste d'hotel
  private filterHotels(criteria: string): IHotel[] {
    // va mettre en minuscule le critère de recherche
    criteria = criteria.toLocaleLowerCase();
    // variable de liste d'hotel avec le champ de recherche criteria
    const res = this.hotels.filter(
       // Pour chaque hotel  de type IHotel dans hotels on va mettre en minuscule son nom puis comparer avec criteria
      (hotel: IHotel) => hotel.hotelName.toLocaleLowerCase().indexOf(criteria) !== -1
    );

    return res;

  }

  constructor() { }

  ngOnInit(): void {
    // Au départ la liste filtrer sera la liste totale des hotels au lancement
    this.filteredHotels = this.hotels;
    console.log('Commencement du cycle de vie du composants');
  }

}
