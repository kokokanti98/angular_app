import { Injectable } from '@angular/core';
// Inclure notre Model
import {ITask} from '../models/task';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// On en(Observable) a besoin pour récuperer les données d'un fichier json
// of qui permet de  créer un observable à partir d'un objet
import { Observable, throwError, of } from 'rxjs';
// Pour gérer les érreurs et tap pour afficher dans la console
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  // Afin d'avoir la possibilité d'utiliser TaskListService dans les composants 
  providedIn: 'root'
})
export class TaskListService {
  
  // Pour utiliser l'api angular in memory web api
  private readonly TASK_API_URL = 'api/tasks';
  // Pour utiliser HttpClient
  constructor(private http: HttpClient) {

  }

  // Fonction pour prendre la liste des Tâches
  public getTasks(): Observable<ITask[]> {
    // Va nous retourner la liste des tasks via requête http GET
    return this.http.get<ITask[]>(this.TASK_API_URL).pipe(
      tap(tasks => console.log('tasks: ', tasks)),
      catchError(this.handleHttpError)
    );
  }
  private handleHttpError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Une erreur est survenue:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Le backend nous retourne un code ${err.status}, ` +
        `etat du body: ${err.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Une incident est survenue; veuillez réessayez plus tard.');
  }


}
