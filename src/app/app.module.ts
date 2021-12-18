import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Nous permettra d'enregistrer une nouvelle langue. Vient du paquet angular/common
import { registerLocaleData } from '@angular/common';
// Importer la langue francaise
import localeFr from '@angular/common/locales/fr';
// importer HttpClientModule du paquet angular/common/http pour utiliser HttpClient
import { HttpClientModule } from '@angular/common/http';
// Pour utiliser le routage
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HotelModule } from './hotels/hotel.module';

// On va appeller puis en passant par paramètre la langue et son abbréviation dans le code
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    // Pour utiliser ngModel
    HttpClientModule,
    RouterModule.forRoot([
      // Redirection vers home via '/home'
      { path: 'home', component: HomeComponent },
      // Redirection vers home quand on accède au serveur
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      // Pour redirection sur les pages en cas de 404 vers home
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    HotelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
