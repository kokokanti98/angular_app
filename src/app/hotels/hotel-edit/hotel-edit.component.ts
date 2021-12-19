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
  public errorMessage: string;
  // Variable IHotel
  public hotel: IHotel | undefined;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelListService
  ) { }

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      hotelName: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]
      ],
      price: ['', Validators.required],
      rating: [''],
      description: [''],
      tags: this.fb.array([])
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
    if (this.hotel.id === 0) {
      this.pageTitle = 'Créer un hotel';
    } else {
      this.pageTitle = `Modifier l\'hotel ${this.hotel.hotelName}`;
    }
    // On va mettre les valeurs de la variable hotel sur les champs du formulaire
    this.hotelForm.patchValue({
      hotelName: this.hotel.hotelName,
      price: this.hotel.price,
      rating: this.hotel.rating,
      description: this.hotel.description
    });
    this.hotelForm.setControl('tags', this.fb.array(this.hotel.tags || []));

  }
  public saveHotel(): void {
    // Si notre formulaire est valide
    if(this.hotelForm.valid){
      if(this.hotelForm.dirty){

        const hotel: IHotel =  {
          // retourner la valeur actuel de l'hotel
          ...this.hotel,
          // change la valeur de l'hotel
          ...this.hotelForm.value
        }
        // Creer un nouveau Hotel
        if( hotel.id === 0){
            this.hotelService.createHotel(hotel).subscribe({
              next: () => this.saveCompleted(),
              error: (err) => this.errorMessage = err
            });
        }
        // Modifier un Hotel
        else{
          // va déclencher la fonction dans le service pour faire un update(maj)
          this.hotelService.updateHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
            // Ici on va passer a errorMessage le message d'erreur afficher
            error: (err) => this.errorMessage = err
          });
        }

      }
    }
    console.log(this.hotelForm.value);
  }
  // Fonction pouur supprimer un hotel
  public deleteHotel(): void {
    if (this.hotel.id === 0) {
      this.saveCompleted();
    }
    // Si l hotel existe
    else {
      if (confirm(`Voulez-vous réelement supprimer ${this.hotel.hotelName} ?`)) {
        this.hotelService.deleteHotel(this.hotel.id).subscribe({
          next: () => this.saveCompleted(),
          // Ici on va passer a errorMessage le message d'erreur afficher
          error: (err) => this.errorMessage = err
        });
      }
    }

  }
  // Fonction qui se déclenche après avoir finis d a pporter des changements ds la bdd
  public saveCompleted(): void{
    // Reset le formulaire
    this.hotelForm.reset();
    // Redirection sur la page des liste des hotels
    this.router.navigate(['/hotels']);
  }
  // Getteur du champ tags
  public get tags(): FormArray {
    return this.hotelForm.get('tags') as FormArray;
  }
  // Ajouter un tag
  public addTag(): void {
    this.tags.push(new FormControl());
  }
  // Supprimer un t ag
  public deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }
  // Met en null errorMessage pour par la suite grâce au ngIf cacher le div de errorMessage
  public hideErrorMessage(): void {
    this.errorMessage = null;
  }

}
