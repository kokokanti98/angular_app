import { Injectable } from '@angular/core';
import { IHotel } from './hotel';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// On en(Observable) a besoin pour récuperer les données d'un fichier json
import { Observable, throwError } from 'rxjs';
// Pour gérer les érreurs et tap pour afficher dans la console
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  // Afin d'avoir la possibilité d'utiliser HotelListService dans les composants
  providedIn: 'root'
})
export class HotelListService {

  // Lien de la liste json se trouve qu'on a déclare dans "assets" du fichier angular.json 
  private readonly HOTEL_API_URL = 'api/hotels.json';
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