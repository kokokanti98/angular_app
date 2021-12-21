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
  // Fonction qui nous retoune un Interface ITask pour récuperer les données de cette même ITask grâce à son id
  public getTaskById(id: number): Observable<ITask> {
    // Si l'id est 0 ou soit pas un nombre on charge celui de par defaut(mode insertion)
    if (id === 0 || !id) {
      return of(this.getDefaultTask());
    }
    return this.getTasks().pipe(
      map(tasks => tasks.find(task => task.id === id)),
    );
  }
  private getDefaultTask(): ITask {
    return {
      id: 0,
      taskName: ''
    };
  }

  // Fonction sur le service pour faire la maj d'une tache
  public updateTask(task: ITask): Observable<ITask> {
     // URL de l'api pour la modification
    const url = `${this.TASK_API_URL}/${task.id}`;
    //Faire la modification
    return this.http.put<ITask>(url, task).pipe(
      catchError(this.handleHttpError)
    );
  }
  // Fonction pour créer une tache
  public createTask(task: ITask): Observable<ITask>{
    task = {
      // on va prendre les valeur de a tache
      ...task,
      // Permet a InMemoryDb de faire un autoincrement
      id: null
    };
    return this.http.post<ITask>(this.TASK_API_URL, task).pipe(
      catchError(this.handleHttpError)
    );
  }
  //Fonction pour supprimmer une tache
  public deleteTask(id: number): Observable<{}> {
    const url = `${this.TASK_API_URL}/${id}`;

    return this.http.delete<ITask>(url).pipe(
      catchError(this.handleHttpError)
    );
  }

  private handleHttpError(err: HttpErrorResponse) {
    let error: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Une erreur est survenue:', err.error.message);
      error = `Une erreur est survenue: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Le backend nous retourne un code ${err.status}, ` +
        `etat du body: ${err.error}`);
        error = `Le backend nous retourne un code ${err.status}, etat du body: ${err.error}`;
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Une erreur est survenue, veuillez réessayez plus tard'
      + '\n'
      + error
    );
  }


}
