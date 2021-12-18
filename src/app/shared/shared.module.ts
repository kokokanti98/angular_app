import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Afin d'utiliser le ngModel
import { FormsModule } from '@angular/forms';
// import { StartRatingComponent } from './start-rating/start-rating.component';
// Importer le pipe personnalisé qui va remplacé les virgule par un point d'une valeur
// import { ReplaceComma } from './pipes/replace-comma.pipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
