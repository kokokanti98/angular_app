import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelListService } from '../hotel-list.service';
import { IHotel } from '../hotel';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  // Initialiser une variable de type IHotel en vide
  public hotel: IHotel | undefined = <IHotel>{};
  constructor
  (
    private route: ActivatedRoute,
    private hotelListService: HotelListService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // On va récupérer l'id de l'hotel selectionne
    // ! est un non-null assertion operator pour dire que c'est pas une variable null ou undefined
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    // Afficher sur la console la valeur trouver
    console.log('ID de l\'hotel: ',  id);
    this.hotelListService.getHotels().subscribe((hotels: IHotel[]) => {
      // Ici on va rechercher dans la liste d'hotels une avec une id selectionner 
      // Et remplacer this.hotel par l'hotel du même id séléctionner
      this.hotel = hotels.find((hotel: IHotel) => hotel.hotelId === id);
    });
    // Afficher les données de l'hotel séléctionner sur la console
    console.log(this.hotel!.rating);
  }


  public backToList(): void {
    this.router.navigate(['/hotels']);
  }

}