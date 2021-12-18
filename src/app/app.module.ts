import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Afin d'utiliser le ngModel
import { FormsModule } from '@angular/forms';
// Nous permettra d'enregistrer une nouvelle langue. Vient du paquet angular/common
import { registerLocaleData } from '@angular/common';
// Importer la langue francaise
import localeFr from '@angular/common/locales/fr';
// Importer le pipe personnalisé qui va remplacé les virgule par un point d'une valeur
import { ReplaceComma } from './shared/pipes/replace-comma.pipe';
// importer HttpClientModule du paquet angular/common/http pour utiliser HttpClient
import { HttpClientModule } from '@angular/common/http';
// Pour utiliser le routage
import { RouterModule } from '@angular/router';
// Importer le module pour utiliser Guard
import { HotelDetailGuard } from './hotels/shared/guards/hotel-detail.guard';
import { AppComponent } from './app.component';
import { HotelListComponent } from './hotels//hotel-list/hotel-list.component';
import { StartRatingComponent } from './start-rating/start-rating.component';
import { HomeComponent } from './home/home.component';
import { HotelDetailComponent } from './hotels/hotel-detail/hotel-detail.component';

// On va appeller puis en passant par paramètre la langue et son abbréviation dans le code
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HotelListComponent,
    ReplaceComma,
    StartRatingComponent,
    HomeComponent,
    HotelDetailComponent
  ],
  imports: [
    BrowserModule,
    // Pour utiliser ngModel
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      // Redirection vers home via '/home'
      { path: 'home', component: HomeComponent },
      // Redirection vers home quand on accède au serveur
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      // Redirection vers la liste des hotels quand on accède '/hotels'
      { path: 'hotels', component: HotelListComponent },
      // Redirection vers le detail d'un hotel quand on accède '/hotels/id'
      {
        path: 'hotels/:id', component: HotelDetailComponent,
        canActivate: [HotelDetailGuard]
      },
      // Pour redirection sur les pages en cas de 404 vers home
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
