import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelDetailGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(route);
    // On récupère l'id entrer sur l'url
    const id = +route.url[1].path;
    // On compare si cette id est négatif ou soit isNaN qui signifie not a number donc pas un nombre qui retoune un booleen
    if (isNaN(id) || id <= 0) {
      // On affiche une alerte que l'hotel n'existe pas
      alert('Hotel et id inconnus');
      // On retoune sur la page de la liste des hotels
      this.router.navigate(['/hotels']);
      return false;
    }
    return true;
  }
  
}
