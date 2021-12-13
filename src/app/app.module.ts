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
import { AppComponent } from './app.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { StartRatingComponent } from './start-rating/start-rating.component';

// On va appeller puis en passant par paramètre la langue et son abbréviation dans le code
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HotelListComponent,
    ReplaceComma,
    StartRatingComponent
  ],
  imports: [
    BrowserModule,
    // Pour utiliser ngModel
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
