import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskGuard implements CanActivate { 

  constructor(private router: Router) { }

  // Se declenche lorsque qu'on accède à l'url
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("Entrer dans le CanActivate du guard Angular");
    console.log(route);
    // On récupère l'id entrer sur l'url
    const id = +route.url[1].path;
    // On compare si cette id est négatif ou soit isNaN qui signifie not a number donc pas un nombre qui retoune un booleen
    if (isNaN(id) || id < 0) {
      // On affiche une alerte que la tâche est inexistante
      alert('Tâche et id inconnus, retour vers la page d\'accueil');
      // On retoune sur la page de la liste des tâches
      this.router.navigate(['/tasks']);
      return false;
    }
    return true;
  }
  
}
