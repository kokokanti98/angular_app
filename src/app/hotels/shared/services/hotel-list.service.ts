import { Injectable } from '@angular/core';
import { IHotel } from '../models/hotel';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// On en(Observable) a besoin pour récuperer les données d'un fichier json
// of qui permet de  créer un observable à partir d'un objet
import { Observable, throwError, of } from 'rxjs';
// Pour gérer les érreurs et tap pour afficher dans la console
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  // Afin d'avoir la possibilité d'utiliser HotelListService dans les composants
  providedIn: 'root'
})
export class HotelListService {

  // Lien de la liste json se troe qu'on a déclare dans "assets" du fichier angular.json 
  //private readonly HOTEL_API_URL = 'api/hotels.json';
  // Pour utiliser l'api angular in memory web api
  private readonly HOTEL_API_URL = 'api/hotels';
  // Pour utiliser HttpClient
  constructor(private http: HttpClient) { 

  }
  
  public getHotels(): Observable<IHotel[]> {
    // Va nous retourner la liste des hotels via requête http GET
    return this.http.get<IHotel[]>(this.HOTEL_API_URL).pipe(
      tap(hotels => console.log('hotels: ', hotels)),
      catchError(this.handleHttpError)
    );
  }

  // Fonction qui nous retoune un Interface IHotel pour récuperer les données de cette même IHotel grâce à son id
  public getHotelById(id: number): Observable<IHotel> {
    // URL pour trouver un hotel par son id
    const url = `${this.HOTEL_API_URL}/${id}`;
    if (id === 0) {
      return of(this.getDefaultHotel());
    }
    // Pour trouver un hotel par son id
    return this.http.get<IHotel>(url).pipe(
      catchError(this.handleHttpError)
    );
  }
  private getDefaultHotel(): IHotel {
    return {
      id: 0,
      hotelName: '',
      description: '',
      price: 0,
      rating: 0,
      imageUrl: ''
    };
  }
  // Fonction sur le service pour faire la maj d'un hotel
  public updateHotel(hotel: IHotel): Observable<IHotel> {
     // URL de l'api pour la modification
    const url = `${this.HOTEL_API_URL}/${hotel.id}`;
    //Faire la modification
    return this.http.put<IHotel>(url, hotel).pipe(
      catchError(this.handleHttpError)
    );
  }
  // Fonction pour créer un Hotel
  public createHotel(hotel: IHotel): Observable<IHotel>{
    hotel = {
      // on va prendre les valeur de hotel
      ...hotel,
      // ajouter des valeurs au champs imageUrl sur l'url des images
      imageUrl: 'assets/img/hotel-room.jpg',
      // Permet a InMemoryDb de faire un autoincrement
      id: null
    };
    return this.http.post<IHotel>(this.HOTEL_API_URL, hotel).pipe(
      catchError(this.handleHttpError)
    );
  }
  // Fonction pour afficher les messages d'erreur prise du site de doc d'angular
  private handleHttpError(err: HttpErrorResponse) {
  if (err.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', err.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${err.status}, ` +
      `body was: ${err.error}`);
  }
  // Return an observable with a user-facing error message.
  return throwError(
    'Something bad happened; please try again later.');
}

}