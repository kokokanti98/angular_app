import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Afin d'utiliser le ngModel
import { FormsModule } from '@angular/forms';
// Nous permettra d'enregistrer une nouvelle langue. Vient du paquet angular/common
import { registerLocaleData } from '@angular/common';
// Importer la langue francaise
import localeFr from '@angular/common/locales/fr';
import { AppComponent } from './app.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';

// On va appeller puis en passant par paramètre la langue et son abbréviation dans le code
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HotelListComponent
  ],
  imports: [
    BrowserModule,
    // Pour utiliser ngModel
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
