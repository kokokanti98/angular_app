import { Component, OnInit } from '@angular/core';
// Importer du module qu'on a besoin pour le formulaire
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {

  public pageTitle: string;
  public hotelForm: FormGroup;
  // Variable IHotel
  public hotel: IHotel | undefined;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private hotelService: HotelListService
  ) { }

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      hotelName: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]
      ],
      hotelPrice: ['', Validators.required],
      starRating: [''],
      description: ['']
    });
    // On va récuperer la valeur du champ id sur l'url
    this.route.paramMap.subscribe(params => {
      //l'assigner à une variable constante id
      const id = +params.get('id')!;

      // Lancer cette fonctions qui va récupérer les données de l'id hotel selectionner
      this.getSelectedHotel(id);
    })
  }

  // Fonction pour chercher les données d'un hotel par son id sur notre fichier json
  public getSelectedHotel(id: number): void {
    this.hotelService.getHotelById(id).subscribe(hotel => {
      console.log(hotel);
      // On déclenche cette fonction qui va attribuer à notre variable hotel les valeurs récupérer
      this.displayHotel(hotel);
    });
  }
  public displayHotel(hotel: IHotel | undefined): void {
    // Va attribuer les valeurs sur notre variable this.hotel
    this.hotel = hotel!;
    // Si l'id de l'hotel est 0 change le titre de la page en Créer sinon Modifier
    if (this.hotel.hotelId === 0) {
      this.pageTitle = 'Créer un hotel';
    } else {
      this.pageTitle = `Modifier l\'hotel ${this.hotel.hotelName}`;
    }
    // On va mettre les valeurs de la variable hotel sur les champs du formulaire
    this.hotelForm.patchValue({
      hotelName: this.hotel.hotelName,
      hotelPrice: this.hotel.price,
      starRating: this.hotel.rating,
      description: this.hotel.description
    });

  }
  public saveHotel(): void {
    console.log(this.hotelForm.value);
  }

}
