import { Component, OnInit } from '@angular/core';
// on va importer l'interface IHotel du fichier hotel.ts
import { IHotel } from './hotel';
// On va importer les service HotelListService
import { HotelListService } from './hotel-list.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  private title = 'liste des Hotels';

  // Methode longue pour utiliser HotelListService pour manipulation des données de la liste des hotels
  // private _hotelListService;
  // constructor(hotelListService: HotelListService) {
  //   this._hotelListService = hotelListService;
  // }

  // Variable hotels contient les données de tous les hotels
  public hotels: IHotel[] = [];

    // variable pour regler l'affichage du badge
    public showBadge: boolean = true;
    // de même type que la valeur de l'évènement qu'on appelle dans receiveRatingClicked()
    public receivedRating: string = "";
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
  // Fonction qui va changer la valeur de receivedRating
  public receiveRatingClicked(message: string): void{
    // Sur le composant HTML le message sera startRatingClicked.emit() du composant enfant via Output
    this.receivedRating = message;
  }
  // Racourci Typescript pour utiliser le service HotelListService
  constructor(private hotelListService: HotelListService) { }

  ngOnInit(): void {
    this.hotels = this.hotelListService.getHotels();
    // Au départ la liste filtrer sera la liste totale des hotels au lancement
    this.filteredHotels = this.hotels;
    console.log('Commencement du cycle de vie du composants');
  }

}
